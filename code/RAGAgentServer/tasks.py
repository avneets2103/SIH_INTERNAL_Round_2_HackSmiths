from typing import List
from crewai import Task,Agent
from textwrap import dedent
from crewai.crews.crew_output import CrewOutput
from job_manager import append_event
from models import Article, ArticlesResponse
import logging

class CybersecurityResearchTasks:

    def __init__(self, job_id: str):
        self.job_id = job_id

    def append_event_callback(self, task_output: CrewOutput):
        print(f"Appending event for {self.job_id} with output {task_output}")
        logging.info("Callback called: %s", task_output)
    
    # Convert the CrewOutput object to a JSON string
        if isinstance(task_output, CrewOutput):
            logging.info("yes it is")
            task_output_str = task_output.json()  # Convert to JSON string
        else:
            task_output_str = task_output.raw
            append_event(self.job_id, task_output_str)
        append_event(self.job_id, task_output_str)

    def manage_research(self, agent,question:str,tasks:List[Task]):
        return Task(
            description=dedent("""
            Manage and oversee the research process for cybersecurity threats,incidents,breaches,
            cybersecurity practices. 
             use the results from the cyber security research agent to research about 
            to put together a json object. You are responsible for generating a comprehensive JSON object in response 
            to user query {question}. This JSON object should be well-structured, including sections for articles 
            with the following details:
               
            Example JSON Object:
        {
  "articles": [
    {
      "heading": "Phishing Attacks Surge Globally",
      "summary": "A significant rise in phishing attacks targeting employees in remote work environments.",
      "reference": "www.cybernews.com"
      "unsplash_prompt": "hacker phishing email attack"
    },
    {
      "heading": "Ransomware Attack Hits Major Healthcare Network",
      "summary": "A large healthcare network faces operational disruptions due to a ransomware attack.",
      "report": "A major healthcare provider experienced a ransomware attack that led to the encryption of critical patient data and operational disruptions across multiple facilities. The attackers demanded a substantial ransom in cryptocurrency to provide a decryption key. The healthcare network is working with cybersecurity experts and law enforcement to assess the damage and restore services. The incident highlights the growing threat of ransomware to critical infrastructure and the need for robust cybersecurity measures, including regular backups and network segmentation.",
      "reference": "www.healthtech.com"
      "unsplash_prompt": "hospital computer system cybersecurity"
    },
    {
      "heading": "Zero-Day Vulnerability Discovered in Popular Web Browser",
      "summary": "A zero-day vulnerability in a widely used web browser could allow hackers to gain full control of affected systems.",
      "reference": "www.securityfocus.com"
      "unsplash_prompt": "web browser security vulnerability"
    },
    {
      "heading": "Data Breach Exposes Millions of Records",
      "summary": "A major retail chain suffers a data breach, exposing millions of customer records.",
      "reference": "www.databreachreport.com"
       "unsplash_prompt": "web browser security vulnerability"
    }
  ]
}

            Ensure that the JSON object follows the provided format precisely and update it with the latest, 
            accurate information. If relevant information is not available, respond with a clear "Sorry, 
            I'll not be able to assist with that" message.

            Important:
                - Once you've found the information, immediately stop searching for additional information.
                - Only return the requested information. NOTHING ELSE!
                - Make sure you find the most recent information and articles 
                - Do not generate fake information. Only return the information you find. Nothing else!
                - Make sure that the links and references from where you formed your response/answer are also properly mentioned.
                - Make sure that unsplash prompt is relevant to article and easy such that relevant image can be found out from unsplash api
                - Keep changing the final answer, until the JSON Object matches the format as given in above example JSON Object
            """),
            agent=agent,
            expected_output=dedent("""
        A JSON Object of this format, example shown below:
        {
  "articles": [
    {
      "heading": "Phishing Attacks Surge Globally",
      "summary": "A significant rise in phishing attacks targeting employees in remote work environments.",
      "reference": "www.cybernews.com"
      "unsplash_prompt": "hacker phishing email attack"
    },
    {
      "heading": "Ransomware Attack Hits Major Healthcare Network",
      "summary": "A large healthcare network faces operational disruptions due to a ransomware attack.",
      "reference": "www.healthtech.com"
       "unsplash_prompt": "hospital computer system cybersecurity"
    },
  ]
}                   
        Important:
            - The JSON object must match this format.
            - The content should be accurate, recent, and sourced from reliable references.
            """),
            callback=self.append_event_callback,
            context=tasks,
            output_json=ArticlesResponse
        )

    def cyberSecurity_research(self, agent, question:str):
        return Task(
            description=dedent("""
            Conduct detailed research and analysis into cybersecurity threats,incidents,breaches,
            cybersecurity practices, and articles and blogs related to these using the provided tools.
            Focus on gathering and summarizing information from recent articles and reports related to:

            1. Recent cybersecurity incidents in IT/OT environments in Indian cyber space
            2. Emerging threats and vulnerabilities
            3. Key trends in the cybersecurity landscape

            Compile this information into a structured JSON object.
       

             Important:
                - Once you've found the information, immediately stop searching for additional information.
                - Only return the requested information. NOTHING ELSE!
                - Make sure you find the most recent up to date information and articles for the question.
                - Do not generate fake information. Only return the information you find. Nothing else!
                - Make sure that the links and references from where you formed your response/answer are also properly mentioned.
                               """),
            agent=agent,
            expected_output=dedent("""
            A JSON object with the following structure:
            {
              "article":
                {
                  "heading": "Title of the article",
                  "summary": "Brief 2-3 line summary",
                  "reference": "URL of the original article"
                  "unsplash_prompt":"An easy prompt to find a relevant image for the article"
                }
            }                     
            Important:
            - Once you've found the information, immediately stop searching for additional information.
            - Each article should be formatted as specified.
            - The content must be accurate, recent, and include proper references.
            """),
            callback=self.append_event_callback,
            output_json=Article,
            async_execution=True
        )