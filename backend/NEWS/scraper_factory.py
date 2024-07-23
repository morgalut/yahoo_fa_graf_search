# backend/NEWS/scraper_factory.py
from newsapi import NewsApiClient, newsapi_exception
import os
from dotenv import load_dotenv
from enums import NewsSource
from datetime import datetime
from typing import List, Dict, Any
from config import cache  # Import the cache object from config module

# Load environment variables from .env file
load_dotenv()

class NewsScraper:
    def __init__(self, query):
        self.query = query
        self.api = NewsApiClient(api_key=os.getenv('NEWSAPI_KEY'))

    @cache.cached(timeout=60 * 5, key_prefix='news_scraper')  # Cache results for 5 minutes
    def scrape(self):
        try:
            search = self.api.get_everything(q=self.query, language='en', sources='google-news')
            return search['articles']
        except newsapi_exception.NewsAPIException as e:
            # Log the error message and handle it
            print(f"NewsAPIException: {e}")
            return []

class ScraperFactory:
    @staticmethod
    def get_scraper(source: NewsSource, query: str) -> 'BaseScraper':
        if source == NewsSource.GOOGLE_NEWS:
            return GoogleNewsScraper(query)
        else:
            raise ValueError("Unknown news source")

class BaseScraper:
    def __init__(self, query: str):
        self.query = query

    def scrape(self) -> List[Dict[str, Any]]:
        raise NotImplementedError("Subclasses should implement this!")

class GoogleNewsScraper(BaseScraper):
    def __init__(self, query: str):
        super().__init__(query)
        api_key = os.getenv('NEWSAPI_KEY')
        if not api_key:
            raise ValueError("No NewsAPI key provided")
        self.api = NewsApiClient(api_key=api_key)

    @cache.cached(timeout=60 * 5, key_prefix='google_news_scraper')  # Cache results for 5 minutes
    def scrape(self) -> List[Dict[str, Any]]:
        try:
            search = self.api.get_everything(q=self.query, language='en', sources='google-news')
            articles = []

            for article in search['articles']:
                articles.append({
                    "title": article.get('title'),
                    "url": article.get('url'),
                    "image": article.get('urlToImage'),
                    "date": datetime.strptime(article.get('publishedAt'), '%Y-%m-%dT%H:%M:%SZ').strftime('%Y-%m-%d') if article.get('publishedAt') else '1970-01-01'
                })

            return articles
        except newsapi_exception.NewsAPIException as e:
            # Log the error message and handle it
            print(f"NewsAPIException: {e}")
            return []

# Debugging code to ensure the API key is loaded
api_key = os.getenv('NEWSAPI_KEY')
print(f"NewsAPI Key: {api_key}")  # This line for debugging
if not api_key:
    raise ValueError("No NewsAPI key provided")
