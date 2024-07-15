# routes/edu_routes.py

from flask import Blueprint, jsonify
from NEWS.scraper_factory import ScraperFactory
from enums import NewsSource

edu_bp = Blueprint('edu', __name__)

# Dummy data for tutorials
tutorials_data = [
    {"title": "Stock Market Basics", "url": "https://www.investopedia.com/articles/basics/06/invest1000.asp"},
]

# Dummy data for glossary
glossary_data = [
    {"title": "Stock Market Basics", "url": "https://www.nasdaq.com/glossary"},
]

# Dummy data for videos
videos_data = [
    {"title": "How To Start Investing In Stocks", "embed_url": "https://www.youtube.com/embed/86rPBAnRCHc"},
]

@edu_bp.route('/articles', methods=['GET'])
def get_articles():
    sources = [NewsSource.GOOGLE_NEWS, NewsSource.YAHOO_FINANCE]
    most_popular_stock = 'AAPL'  # Example query

    articles = []
    for source in sources:
        scraper = ScraperFactory.get_scraper(source, most_popular_stock)
        articles.extend(scraper.scrape())
    
    return jsonify(articles)
    

@edu_bp.route('/tutorials', methods=['GET'])
def get_tutorials():
    return jsonify(tutorials_data)

@edu_bp.route('/glossary', methods=['GET'])
def get_glossary():
    return jsonify(glossary_data)

@edu_bp.route('/videos', methods=['GET'])
def get_videos():
    return jsonify(videos_data)
