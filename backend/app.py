# C:\Users\Mor\Desktop\fina\Stocke_poke\backend\app.py
from flask import Flask
from flask_cors import CORS
from models.stock_model import fetch_all_stock_symbols
from routes.stock_routes import stock_bp
from routes.suggestion_routes import suggestion_bp
from routes.graph_routes import graph_bp
from routes.rest_routes import rest_bp

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

app.register_blueprint(stock_bp, url_prefix='/api/stock')
app.register_blueprint(suggestion_bp, url_prefix='/api/suggestions')
app.register_blueprint(graph_bp, url_prefix='/api/graph/')
app.register_blueprint(rest_bp, url_prefix='/api/rest')

fetch_all_stock_symbols()

if __name__ == '__main__':
    app.run(debug=True)
