# C:\Users\Mor\Desktop\fina\Stocke_poke\backend\routes\suggestion_routes.py
from flask import Blueprint, jsonify
from file_scraper.stock_service import ALL_STOCKS

suggestion_bp = Blueprint('suggestion_bp', __name__)

@suggestion_bp.route('/<input>', methods=['GET'])
def get_suggestions(input):
    input = input.lower()
    matching_suggestions = [
        {"symbol": stock['Symbol'], "name": stock['Security']}
        for stock in ALL_STOCKS
        if input in stock['Symbol'].lower() or input in stock['Security'].lower()
        or input in stock['Exchange'].lower() or input in stock['Sector'].lower()
        or input in stock['Industry'].lower()
    ][:5]
    print(f"Suggestions for input '{input}':", matching_suggestions)  # Debugging line
    return jsonify(matching_suggestions)

