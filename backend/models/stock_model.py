# C:\Users\Mor\Desktop\fina\Stocke_poke\backend\models\stock_model.py
import pandas as pd

ALL_STOCKS = []

def fetch_all_stock_symbols():
    global ALL_STOCKS
    url_sp500 = "https://en.wikipedia.org/wiki/List_of_S%26P_500_companies"
    url_tase = "https://en.wikipedia.org/wiki/TA-125_Index"
    
    sp500_table = pd.read_html(url_sp500, header=0)
    sp500_df = sp500_table[0]
    sp500_stocks = sp500_df[['Symbol', 'Security']].to_dict(orient='records')

    tase_table = pd.read_html(url_tase, header=0)
    tase_df = tase_table[1]
    tase_df = tase_df.rename(columns={'Name': 'Security'})
    tase_stocks = tase_df[['Symbol', 'Security']].to_dict(orient='records')

    ALL_STOCKS = sp500_stocks + tase_stocks

def get_all_stocks():
    return ALL_STOCKS

if __name__ == '__main__':
    fetch_all_stock_symbols()
    print(ALL_STOCKS)  # Print to verify the data fetching
