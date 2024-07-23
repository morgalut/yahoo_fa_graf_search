# C:\Users\Mor\Desktop\fina\Stocke_poke\yahoo_fa_graf_search\backend\enums.py

from enum import Enum

class StockMarket(Enum):
    SP500 = "S&P 500"
    TASE = "TA-125"

class DataSource(Enum):
    WIKIPEDIA = "Wikipedia"

class NewsSource(Enum):
    GOOGLE_NEWS = "Google News"

class SearchMode(Enum):
    SENTENCE = 1
    WINDOW = 2
