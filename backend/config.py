# backend/config.py
from flask import Flask
from flask_caching import Cache
from flask_cors import CORS

cache = Cache(config={'CACHE_TYPE': 'redis', 'CACHE_REDIS_URL': 'redis://localhost:6379/0'})

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
    cache.init_app(app)  # Initialize cache with app
    return app
