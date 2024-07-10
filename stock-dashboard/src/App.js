import React, { useState } from 'react';
import Header from './components/Header';
import StockInfo from './components/StockInfo';
import StockGraph from './components/Graph/StockGraph';
import Loader from './components/Loader';
import Footer from './components/Footer'; // Import Footer component
import './styles/App.css';

const App = () => {
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSetStockData = (data) => {
    setLoading(true);
    if (data) {
      setStockData(data);
      setError(false);
    } else {
      setStockData(null);
      setError(true);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <Header setStockData={handleSetStockData} /><br/>
      {loading && <Loader />}
      <div className={loading ? "blur-sm pointer-events-none" : ""}>
        {stockData ? (
          <StockInfo data={stockData} />
        ) : (
          error && <p>No data available. Please enter a valid stock symbol.</p>
        )}
        <StockGraph setLoading={setLoading} />
      </div><br />
      <Footer /> {/* Include Footer component */}
    </div>
  );
};

export default App;
