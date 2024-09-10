from datetime import datetime
import json
from threading import Thread
from uuid import uuid4
import time
from difflib import SequenceMatcher

from flask import Flask, jsonify, request, abort
from flask_cors import CORS
from dotenv import load_dotenv
from pymongo import MongoClient

from crew import CybersecurityResearchCrew
from job_manager import append_event, jobs, jobs_lock, Event
import logging
import os
from crewai.crews.crew_output import CrewOutput


load_dotenv()

os.environ['USER_AGENT'] = 'myagent'

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Enable debug logging
logging.basicConfig(level=logging.DEBUG)

# MongoDB setup
client = MongoClient('mongodb://localhost:27017/')  # Connect to the local MongoDB server
db = client['job_results_db']  # Create/use a database called 'job_results_db'
questions_collection = db['questions']  # Create/use a collection called 'questions'

def similar(a, b):
    """Calculate the similarity ratio between two strings."""
    return SequenceMatcher(None, a, b).ratio()

def find_similar_question(question):
    """Find a similar question in the database."""
    for result in questions_collection.find():
        # Check if 'question' key exists in the document
        if 'question' in result:
            similarity = similar(question.lower(), result['question'].lower())
            logging.debug(f"Similarity between '{question}' and '{result['question']}': {similarity}")
            if similarity > 0.9:  # 90% similarity threshold
                return result['_id'], result['result']
        else:
            logging.warning(f"Document missing 'question' field: {result}")
    return None, None


def kickoff_crew(job_id: str, question: str):
    logging.info(f"Crew for job {job_id} is starting")

    results = None
    try:
        cybersecurity_research_crew = CybersecurityResearchCrew(job_id)
        results = cybersecurity_research_crew.run(question)
        logging.info(f"Crew for job {job_id} is complete")

        # Store the new result in MongoDB
        questions_collection.insert_one({
            '_id': job_id,
            'question': question,
            'result': results,
            'timestamp': datetime.now()
        })

    except Exception as e:
        logging.error(f"Error in kickoff_crew for job {job_id}: {e}")
        append_event(job_id, f"An error occurred: {e}")
        with jobs_lock:
            jobs[job_id].status = 'ERROR'
            jobs[job_id].result = str(e)

    with jobs_lock:
        jobs[job_id].status = 'COMPLETE'
        jobs[job_id].result = results
        jobs[job_id].events.append(
            Event(timestamp=datetime.now(), data="Crew complete"))

@app.route('/api/crew', methods=['POST'])
def run_crew():
    logging.info("Received request to run crew")
    logging.debug(f"Request headers: {request.headers}")
    logging.debug(f"Request data: {request.get_data()}")
    
    # Validation
    data = request.json
    if not data or 'question' not in data:
        logging.warning("Invalid input data provided")
        abort(400, description="Invalid input data provided.")

    question = data['question']
    logging.info(f"Received question: {question}")

    # Check for similar questions
    similar_job_id, similar_result = find_similar_question(question)
    if similar_job_id:
        logging.info(f"Found similar question with job_id: {similar_job_id}")
        
        # Insert this question with reference to the similar result
        questions_collection.insert_one({
            '_id': str(uuid4()),  # New unique ID for the current question
            'question': question,
            'result': similar_result,
            'reference_id': similar_job_id,
            'timestamp': datetime.now()
        })

        return jsonify({
            "job_id": similar_job_id,
            "status": "COMPLETE",
            "result": similar_result,
            "source": "similar_question"
        }), 200

    job_id = str(uuid4())
    logging.info(f"Creating new job with id: {job_id}")
    thread = Thread(target=kickoff_crew, args=(job_id, question))
    thread.start()

    response = jsonify({"job_id": job_id})
    logging.info(f"Returning response: {response.get_data()}")
    return response, 202

@app.route('/api/crew/<job_id>', methods=['GET'])
def get_status(job_id):
    logging.info(f"Received status request for job {job_id}")

    # Check if the result is in MongoDB
    result = questions_collection.find_one({'job_id': job_id})
    if result:
        logging.info(f"Returning cached result for job {job_id}")
        return jsonify({
            "job_id": job_id,
            "status": result.get('status', 'COMPLETE'),
            "result": result.get('result', {}),
            "events": result.get('events', []),
            "source": "cache"
        }), 200

    # If not in cache, proceed with the original logic
    max_wait_time = 180  # Wait up to 3 minutes for the job to be available
    start_time = time.time()

    while True:
        with jobs_lock:
            job = jobs.get(job_id)
            if job is not None:
                break
        if time.time() - start_time > max_wait_time:
            logging.warning(f"Job {job_id} not found after waiting")
            abort(404, description="Job not found")
        time.sleep(0.1)

    # Wait for the job to complete
    while job.status != 'COMPLETE':
        time.sleep(0.1)

    if isinstance(job.result, CrewOutput):
        if job.result.json_dict:
            result_json = job.result.json_dict
        elif job.result.json:
            result_json = json.loads(job.result.json)
        else:
            result_json = {"error": "No JSON result available"}
    else:
        try:
            result_json = json.loads(job.result)
        except (TypeError, json.JSONDecodeError):
            result_json = job.result

    response = jsonify({
        "job_id": job_id,
        "status": job.status,
        "result": result_json,
        "events": [{"timestamp": event.timestamp.isoformat(), "data": event.data} for event in job.events],
        "source": "live"
    })
    logging.info(f"Returning response for job {job_id}: {response.get_data()}")
    return response

@app.route("/view_cache")
def view_cache():
    results = list(questions_collection.find({}, {'_id': 1, 'question': 1, 'timestamp': 1}))
    for result in results:
        result['timestamp'] = result['timestamp'].isoformat()
    return jsonify(results)

@app.route("/")
def start():
    return "The server is running!"

if __name__ == '__main__':
    app.run(debug=True)
