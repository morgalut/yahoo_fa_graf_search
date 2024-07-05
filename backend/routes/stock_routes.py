from flask import Blueprint, jsonify, request
import yfinance as yf
from file_scraper.stock_service import ALL_STOCKS, load_all_stocks

# Load the stocks initially
load_all_stocks()

stock_bp = Blueprint('stock_bp', __name__, url_prefix='/api/stock')

@stock_bp.route('/<symbol>', methods=['GET'])
def get_stock_data(symbol):
    print(f"Fetching data for symbol: {symbol}")  # Debug statement
    symbol = symbol.upper()
    try:
        stock = yf.Ticker(symbol)
        hist = stock.history(period="1mo", interval="1d")
        if hist.empty:
            return jsonify({"error": f"No data found for symbol {symbol}"}), 404
        latest_data = hist.iloc[-1]
        info = stock.info
        data = {
            "symbol": symbol,
            "name": next((item['Security'] for item in ALL_STOCKS if item['Symbol'] == symbol), symbol),
            "date": latest_data.name.strftime('%Y-%m-%d'),
            "open": latest_data['Open'],
            "high": latest_data['High'],
            "low": latest_data['Low'],
            "close": latest_data['Close'],
            "price": float(latest_data['Close']),
            "market_cap": info.get('marketCap'),
            "dividend_yield": info.get('dividendYield'),
            "52_week_high": info.get('fiftyTwoWeekHigh'),
            "52_week_low": info.get('fiftyTwoWeekLow'),
            "volume": latest_data['Volume'],
            "average_volume": info.get('averageVolume'),
            "pe_ratio": info.get('trailingPE'),
            "eps": info.get('trailingEps'),
            "sector": info.get('sector'),
            "industry": info.get('industry')
        }
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@stock_bp.route('/search', methods=['GET'])
def search_stocks():
    query = request.args.get('q', '').lower()
    print(f"Search query: {query}")  # Debug output for search query
    results = [
        stock for stock in ALL_STOCKS
        if query in stock['Security'].lower() or query in stock['Symbol'].lower()
        or query in stock['Exchange'].lower() or query in stock['Sector'].lower()
        or query in stock['Industry'].lower()
    ]
    print(f"Search results: {results}")  # Debug output for search results
    return jsonify(results)



@stock_bp.route('/all_stocks', methods=['GET'])
def get_all_stocks():
    return jsonify(ALL_STOCKS)
