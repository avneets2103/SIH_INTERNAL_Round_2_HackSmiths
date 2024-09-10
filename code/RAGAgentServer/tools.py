from typing import List
from dotenv import load_dotenv
from langchain_text_splitters import RecursiveCharacterTextSplitter
load_dotenv()
import os
os.environ['SERPER_API_KEY'] = os.getenv('SERPER_API_KEY')

from crewai_tools import SerperDevTool
from crewai_tools import tool
from langchain_community.document_loaders import WebBaseLoader
from langchain_community.vectorstores import FAISS
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain.tools.retriever import create_retriever_tool
from langchain_community.tools import TavilySearchResults
from langchain_community.utilities import DuckDuckGoSearchAPIWrapper
from langchain_community.tools import DuckDuckGoSearchResults

serper_search = SerperDevTool()

os.environ["TAVILY_API_KEY"] = os.getenv("TAVILY_API_KEY")
tavily_tool = TavilySearchResults(
    max_results=1,
    search_depth="advanced",
    include_answer=True,
    include_raw_content=True,
    include_images=True,
)

@tool('TavilySearch')
def tavily_search(search_query: str):
    """Search the web for information on a given topic"""
    return tavily_tool.run(search_query)

duckduckWrapper = DuckDuckGoSearchAPIWrapper(max_results=1)
duckTool = DuckDuckGoSearchResults(api_wrapper=duckduckWrapper)

@tool('DuckDuckGoSearch')
def duck_search(search_query: str):
    """Search the web for information on a given topic"""
    return duckTool.run(search_query)

def create_cybersecurity_retriever():
    urls = [
        "https://www.cisa.gov/news-events/cybersecurity-advisories",
        "https://www.sans.org/blog/",
        "https://www.darkreading.com/ics-ot",
        "https://www.securityweek.com/category/ics-ot/",
        "https://www.cybersecuritynews.com/",
        "https://www.hackread.com/",
        "https://www.cyberscoop.com/",
        "https://www.infosecurity-magazine.com/",
        "https://krebsonsecurity.com/",
        "https://www.schneier.com/",
    ]
    
    documents = []
    for url in urls:
        loader = WebBaseLoader(url)
        documents.extend(loader.load())
    
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    splits = text_splitter.split_documents(documents)
    
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    vectorstore = FAISS.from_documents(splits, embeddings)
    retriever = vectorstore.as_retriever(search_kwargs={"k": 5})
    
    return create_retriever_tool(
        retriever,
        "cybersecurity_researcher",
        "Search for cybersecurity threats, recent articles and incidents from the provided websites."
    )

cybersecurity_retriever_tool = create_cybersecurity_retriever()

@tool('CustomCybersecuritySearch')
def custom_cybersecurity_search(search_query: str):
    """Search for cybersecurity information using the custom retriever tool"""
    return cybersecurity_retriever_tool.run(search_query)