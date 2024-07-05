# C:\Users\Mor\Desktop\fina\Stocke_poke\backend\routes\graph_routes.py
from flask import Blueprint, jsonify, request
import yfinance as yf

graph_bp = Blueprint('graph_bp', __name__)

@graph_bp.route('/<symbol>', methods=['GET'])
def get_stock_data_graph(symbol):
    symbol = symbol.upper()

    try:
        data = yf.download(symbol, start='2023-01-01', end='2024-01-01')  # Adjust date range as needed
        
        processed_data = {
            'Date': data.index.strftime('%Y-%m-%d').tolist(),
            'Close': data['Close'].tolist()
        }
        
        return jsonify(processed_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
