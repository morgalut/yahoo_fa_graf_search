"""
Routes for retrieving stock data for graphical representation.
"""

from datetime import datetime, timedelta
import yfinance as yf
from flask import Blueprint, jsonify

graph_bp = Blueprint('graph_bp', __name__)

@graph_bp.route('/<symbol>', methods=['GET'])
def get_stock_data_graph(symbol):
    """
    Retrieve historical stock data for a given symbol.
    
    Args:
        symbol (str): Stock symbol to retrieve data for.
        
    Returns:
        JSON: Historical stock data including Date, Close, Open, High, Low, and Volume.
        Returns an error message and 500 status code if data retrieval fails.
    """
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
        error_message = f"Failed to fetch data for symbol '{symbol}'"
        return jsonify({"error": error_message}), 500
