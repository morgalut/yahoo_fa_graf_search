# backend/routes/edu_routes.py
from typing import Any, Dict, List
from flask import Blueprint, jsonify, request
from NEWS.scraper_factory import ScraperFactory
from enums import NewsSource
from datetime import datetime, timedelta
import csv
from config import create_cache, create_app  # Import the cache object from config module

app = create_app()
cache = create_cache(app)

edu_bp = Blueprint('edu', __name__)

# Cache for articles
articles_cache = {
    "data": [],
    "timestamp": datetime.now() - timedelta(minutes=10)  # Force update on first request
}

# Dummy data for tutorials, glossary, and videos
tutorials_data = [{"title": "Stock Market Basics", "url": "https://www.investopedia.com/articles/basics/06/invest1000.asp"}]
glossary_data = [{"title": "Stock Market Basics", "url": "https://www.nasdaq.com/glossary"}]
videos_data = [{"title": "How To Start Investing In Stocks", "embed_url": "https://www.youtube.com/embed/86rPBAnRCHc"}]

def read_stock_tickers(csv_file_path: str) -> List[str]:
    stock_tickers = []
    with open(csv_file_path, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            stock_tickers.append(row['Ticker'])
    return stock_tickers

@cache.cached(timeout=60 * 10, key_prefix='scrape_articles')  # Cache results for 10 minutes
def scrape_articles(stock_tickers: List[str], sources: List[NewsSource], page: int = 1, limit: int = 5) -> List[Dict[str, Any]]:
    all_articles = []
    count = 0

    for stock in stock_tickers:
        for source in sources:
            scraper = ScraperFactory.get_scraper(source, stock)
            articles = scraper.scrape()
            for article in articles:
                if 'economy' in article['title'].lower() or 'stock' in article['title'].lower():
                    all_articles.append(article)
                    count += 1
                    if count >= limit:
                        break
        if count >= limit:
            break

    # Sort articles by date to prioritize the most recent ones
    all_articles.sort(key=lambda x: x['date'], reverse=True)
    return all_articles

def get_cached_articles(stock_tickers: List[str], sources: List[NewsSource], page: int = 1, limit: int = 5) -> List[Dict[str, Any]]:
    now = datetime.now()
    if (now - articles_cache['timestamp']) > timedelta(minutes=5):
        articles_cache['data'] = scrape_articles(stock_tickers, sources, page, limit)
        articles_cache['timestamp'] = now
    return articles_cache['data'][:limit]

@edu_bp.route('/articles', methods=['GET'])
def get_articles():
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 5))
    query = request.args.get('query', '').lower()
    source_param = request.args.get('source', 'all')
    sources = {
        'google': [NewsSource.GOOGLE_NEWS],
        'all': [NewsSource.GOOGLE_NEWS]
    }.get(source_param.lower(), [NewsSource.GOOGLE_NEWS])

    csv_file_path = 'csv_files/all_stocks.csv'
    stock_tickers = read_stock_tickers(csv_file_path)

    if query:
        stock_tickers = [query]  # Override stock tickers with the query keyword

    all_articles = get_cached_articles(stock_tickers, sources, page, limit)

    # Filter articles based on query
    if query:
        all_articles = [article for article in all_articles if query in article['title'].lower()]

    # Implement pagination
    paginated_articles = all_articles[:limit]

    if not paginated_articles:
        return jsonify({
            'message': 'There are no such articles in the system',
            'articles': [],
            'page': page,
            'limit': limit,
            'total_articles': 0
        })

    # Log the articles being returned
    print("Articles being returned:", paginated_articles)

    return jsonify({
        'articles': paginated_articles,
        'page': page,
        'limit': limit,
        'total_articles': len(all_articles)
    })

@edu_bp.route('/tutorials', methods=['GET'])
def get_tutorials():
    return jsonify(tutorials_data)

@edu_bp.route('/glossary', methods=['GET'])
def get_glossary():
    return jsonify(glossary_data)

@edu_bp.route('/videos', methods=['GET'])
def get_videos():
    return jsonify(videos_data)
