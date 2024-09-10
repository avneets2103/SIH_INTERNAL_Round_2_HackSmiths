from typing import List
from pydantic import BaseModel

class Article(BaseModel):
    heading: str
    summary: str
    reference: str
    unsplash_prompt: str  # New field for Unsplash API prompt

class ArticlesResponse(BaseModel):
    articles: List[Article]