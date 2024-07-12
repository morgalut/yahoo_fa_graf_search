from flask import Blueprint, jsonify

edu_bp = Blueprint('edu', __name__)

# Dummy data for articles
articles_data = [
    {"title": "Understanding Stocks", "url": "https://www.cnbc.com/world/?region=world"},
]

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
    return jsonify(articles_data)

@edu_bp.route('/tutorials', methods=['GET'])
def get_tutorials():
    return jsonify(tutorials_data)

@edu_bp.route('/glossary', methods=['GET'])
def get_glossary():
    return jsonify(glossary_data)

@edu_bp.route('/videos', methods=['GET'])
def get_videos():
    return jsonify(videos_data)
