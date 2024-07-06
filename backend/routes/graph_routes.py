# C:\Users\Mor\Desktop\fina\Stocke_poke\backend\routes\graph_routes.py
from flask import Blueprint, jsonify, request
import yfinance as yf
from datetime import datetime, timedelta

graph_bp = Blueprint('graph_bp', __name__)

@graph_bp.route('/<symbol>', methods=['GET'])
def get_stock_data_graph(symbol):
    symbol = symbol.upper()

    # Calculate date range (from today to one year ago)
    end_date = datetime.now().strftime('%Y-%m-%d')
    start_date = (datetime.now() - timedelta(days=365)).strftime('%Y-%m-%d')

    try:
        data = yf.download(symbol, start=start_date, end=end_date)
        
        processed_data = {
            'Date': data.index.strftime('%Y-%m-%d').tolist(),
            'Close': data['Close'].tolist(),
            'Open': data['Open'].tolist(),
            'High': data['High'].tolist(),
            'Low': data['Low'].tolist(),
            'Volume': data['Volume'].tolist()
        }
        
        return jsonify(processed_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
