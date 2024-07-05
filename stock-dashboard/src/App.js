// src/App.js

import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import StockInfo from './components/StockInfo';
import StockGraph from './components/StockGraph';

const App = () => {
    const [stockData, setStockData] = useState(null);

    return (
        <div className="App">
            <SearchBar setStockData={setStockData} />
            {stockData ? (
                <StockInfo data={stockData} />
            ) : (
                <p>No data available. Please enter a valid stock symbol.</p>
            )}
            <StockGraph/>
        </div>
    );
};

export default App;
