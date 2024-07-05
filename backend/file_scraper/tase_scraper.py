# C:\Users\Mor\Desktop\fina\Stocke_poke\backend\tase_scraper.py
import pandas as pd

def fetch_tase_stocks():
    """
    Scrape TASE stock symbols from Wikipedia and return them as a list of dictionaries.
    """
    url_tase = "https://en.wikipedia.org/wiki/TA-125_Index"
    tase_table = pd.read_html(url_tase, header=0)
    tase_df = tase_table[1]
    tase_df = tase_df.rename(columns={'Name': 'Security'})
    tase_stocks = tase_df[['Symbol', 'Security']].to_dict(orient='records')
    return tase_stocks
