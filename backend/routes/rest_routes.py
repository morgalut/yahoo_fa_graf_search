# C:\Users\Mor\Desktop\fina\Stocke_poke\backend\routes\rest_routes.py
from flask import Blueprint, jsonify
from models.stock_model import get_all_stocks

rest_bp = Blueprint('rest_bp', __name__)

@rest_bp.route('/stocks', methods=['GET'])
def get_all_stocks_route():
    stocks = get_all_stocks()
    return jsonify(stocks)

@rest_bp.route('/stocks/<symbol>', methods=['GET'])
def get_stock(symbol):
    symbol = symbol.upper()
    stock = next((stock for stock in get_all_stocks() if stock['Symbol'] == symbol), None)
    if stock:
        return jsonify(stock)
    else:
        return jsonify({"error": f"Stock with symbol '{symbol}' not found"}), 404
