 
# C:\Users\Mor\Desktop\fina\Stocke_poke\backend\enums.py
from enum import Enum

class StockMarket(Enum):
    SP500 = "S&P 500"
    TASE = "TA-125"

class DataSource(Enum):
    YAHOO_FINANCE = "Yahoo Finance"
    WIKIPEDIA = "Wikipedia"
