import requests
from bs4 import BeautifulSoup
from enums import NewsSource

class ScraperFactory:
    @staticmethod
    def get_scraper(source, query):
        if source == NewsSource.GOOGLE_NEWS:
            return GoogleNewsScraper(query)
        elif source == NewsSource.YAHOO_FINANCE:
            return YahooFinanceScraper(query)
        else:
            raise ValueError("Unknown news source")

class GoogleNewsScraper:
    def __init__(self, query):
        self.query = query

    def scrape(self):
        url = f"https://news.google.com/search?q={self.query}&hl=en-IL&gl=IL&ceid=IL%3Aen"
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')

        articles = []
        for item in soup.select('article'):
            title = item.select_one('h3').text if item.select_one('h3') else 'No title'
            link = item.select_one('a')['href'] if item.select_one('a') else 'No link'
            if link.startswith('./'):
                link = 'https://news.google.com' + link[1:]
            image = item.select_one('img')['src'] if item.select_one('img') else None  # Example image selection
            articles.append({"title": title, "url": link, "image": image})

        return articles


class YahooFinanceScraper:
    def __init__(self, query):
        self.query = query

    def scrape(self):
        url = f"https://finance.yahoo.com/news/?p={self.query}"
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')

        articles = []
        for item in soup.select('article'):
            title = item.select_one('h3').text if item.select_one('h3') else 'No title'
            link = item.select_one('a')['href'] if item.select_one('a') else 'No link'
            if not link.startswith('https://'):
                link = 'https://finance.yahoo.com' + link
            articles.append({"title": title, "url": link})
        
        return articles
