from typing import List
from crewai import Agent
from langchain_community.document_loaders import WebBaseLoader
from langchain_community.vectorstores import FAISS
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_groq import ChatGroq
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.tools.retriever import create_retriever_tool
from tools import duck_search,tavily_search,serper_search,custom_cybersecurity_search
from dotenv import load_dotenv
import os
import json
from crewai_tools import SerperDevTool

load_dotenv()

import os
os.environ['USER_AGENT'] = os.getenv("USER_AGENT")

class CybersecurityResearchAgents:
    def __init__(self):
        self.llm = ChatGroq(
            groq_api_key=os.getenv("GROQ_API_KEY"),
            verbose=True,
            model_name="llama3-70b-8192",  # You can change this to other available models
            temperature=0.6,
            max_tokens=4000
        )
        self.duckTool=duck_search
        self.tavilyTool=tavily_search
        self.serperTool=SerperDevTool()
        self.cybersecurityTool = custom_cybersecurity_search

    
    def research_manager(self, question: str) -> Agent:
        return Agent(
            role="Cybersecurity Research Manager",
            goal="""Generate a JSON object which contains information about the articles about cyberthreat incidents, breaches, cybersecurity, and blogs, specifically related for Indian Cyber space and in IT/OT sector
            . JSON Object should be an array of objects under "articles" section, where each object has a "heading" denoting article heading,
                    "summary" which is a 2-3 line short description of the article, and
                    "reference" in which a link to the original reference url from which this information has been taken is there.
                    "unsplash_prompt" which is a short, descriptive phrase to generate a relevant image using the Unsplash API.
                It is your job to ensure that the JSON object is in the format as shown below.
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

                Important:
                - The final JSON object must match the format of the example JSON object given above.
                - "Keep changing the final answer, until the JSON Object matches the format as given in above example JSON Object
                - If you can't find information for a specific question, just reply back as "Sorry, I'll not be able to assist with that".
                - Do not generate fake information. Only return the information you find. Nothing else!
                - Do not stop searching until you find the requested information for the question, ensure that the answer is recent, up-to-date, useful.
                - The answer to the information asked in the question exists so keep researching until you find the information.
                - Make sure you attach the relevant links in "reference"
                - Ensure to give atleast 15 articles in final JSON object.
                """,
            backstory="""As a research manager, you are responsible for aggregating all the searched information
                into a JSON object.""",
            llm=self.llm,
            tools=[self.serperTool,self.duckTool,self.tavilyTool],
            verbose=True,
            allow_delegation=True,
        )

    def cybersecurity_researcher(self) -> Agent:
        return Agent(
            role="Cybersecurity Researcher",
            goal="""Analyze articles and blogs related to cybersecurity threats, breaches, incidents, 
            cybersecurity practices from provided sources, specifically based for IT/OT sector in Indian Cyberspace.
            Look up for the articles and blogs for user's question and return the most recent information,
             It is your job to return this collected 
            information in a JSON object
                """,
            backstory="""You are an experienced cybersecurity analyst and researcher specializing in threat intelligence. 
            Your expertise lies in identifying,researching and analyzing emerging cyber threats,incidents and cybersecurity practices particularly those 
            affecting IT and OT environments in Indian cyberspace. As a researcher, you are responsible for looking up and searching for analyzing emerging cyber threats,incidents and cybersecurity practices
            and returning this collected information in a JSON object.
                Important:
                - Once you've found the information, immediately stop searching for additional information.
                - Only return the requested information. NOTHING ELSE!
                - Make sure you find the most recent up to date information and articles.
                - Do not generate fake information. Only return the information you find. Nothing else!
                - Make sure that the links and references from where you formed your response/answer are also properly mentioned.
                """,
           tools=[self.cybersecurityTool,self.duckTool,self.tavilyTool],
            llm=self.llm,
            verbose=True,
        )
