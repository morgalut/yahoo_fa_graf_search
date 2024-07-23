# backend/app.py
from config import create_app, cache
from apscheduler.schedulers.background import BackgroundScheduler
from models.stock_model import fetch_all_stock_symbols
from routes.stock_routes import stock_bp
from routes.suggestion_routes import suggestion_bp
from routes.graph_routes import graph_bp
from routes.rest_routes import rest_bp
from routes.edu_routes import edu_bp
from enums import NewsSource
from NEWS.scraper_factory import ScraperFactory
import csv

app = create_app()

# Register blueprints
app.register_blueprint(stock_bp, url_prefix='/api/stock')
app.register_blueprint(suggestion_bp, url_prefix='/api/suggestions')
app.register_blueprint(graph_bp, url_prefix='/api/graph')
app.register_blueprint(rest_bp, url_prefix='/api/rest')
app.register_blueprint(edu_bp, url_prefix='/api/edu')

with app.app_context():
    fetch_all_stock_symbols()

def read_stock_tickers(csv_file_path: str) -> list:
    stock_tickers = []
    try:
        with open(csv_file_path, 'r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                stock_tickers.append(row['Ticker'])
    except FileNotFoundError:
        print(f"File not found: {csv_file_path}")
    except Exception as e:
        print(f"An error occurred: {e}")
    return stock_tickers

def scrape_and_update():
    sources = [NewsSource.GOOGLE_NEWS]
    stock_tickers = read_stock_tickers('csv_files/all_stocks.csv')

    articles = []
    for stock in stock_tickers:
        for source in sources:
            scraper = ScraperFactory.get_scraper(source, stock)
            try:
                articles.extend(scraper.scrape())
            except Exception as e:
                print(f"Error scraping {stock} from {source}: {e}")
    
    # Save articles to your database or any other storage
    print(articles)  # Replace with actual save logic

scheduler = BackgroundScheduler()
scheduler.add_job(scrape_and_update, 'interval', days=1)  # Schedules job to run daily
scheduler.start()

if __name__ == '__main__':
    app.run(debug=True)
