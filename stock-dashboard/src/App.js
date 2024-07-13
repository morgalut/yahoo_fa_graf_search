import React, { useState } from 'react';
import Header from './components/Header';
import StockInfo from './components/StockInfo';
import StockGraph from './components/Graph/StockGraph';
import Footer from './components/Footer'; // Import Footer component
import './styles/App.css';
import './styles/pop.css';

const App = () => {
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(false);

  const handleSetStockData = (data) => {
    if (data) {
      setStockData(data);
      setError(false);
    } else {
      setStockData(null);
      setError(true);
    }
  };

  return (
    <div className="App">
      <Header setStockData={handleSetStockData} /><br/>
      <div>
        {stockData ? (
          <StockInfo data={stockData} />
        ) : (
          error && <p>No data available. Please enter a valid stock symbol.</p>
        )}
        <StockGraph />
      </div><br />
      <Footer /> {/* Include Footer component */}
    </div>
  );
};

export default App;
