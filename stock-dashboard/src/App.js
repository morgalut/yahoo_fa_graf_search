import React, { useState } from 'react';
import Header from './components/Header';
import StockInfo from './components/StockInfo';
import StockGraph from './components/Graph/StockGraph';
import Loader from './components/Loader'; // Import Loader component
import './styles/App.css';

const App = () => {
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSetStockData = (data) => {
    setLoading(true); // Start loading
    if (data) {
      setStockData(data);
      setError(false);
    } else {
      setStockData(null);
      setError(true);
    }
    setLoading(false); // Stop loading after setting data
  };

  return (
    <div className="App">
      <Header setStockData={handleSetStockData} /><br/>
      {loading && <Loader />} {/* Show Loader component while loading */}
      <div className={loading ? "blurred" : ""}> {/* Blur content while loading */}
        {stockData ? (
          <StockInfo data={stockData} />
        ) : (
          error && <p>No data available. Please enter a valid stock symbol.</p>
        )}
        <StockGraph setLoading={setLoading} /> {/* Pass setLoading to StockGraph */}
      </div>
    </div>
  );
};

export default App;
