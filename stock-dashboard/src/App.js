import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import StockInfo from './components/StockInfo';
import StockGraph from './components/Graph/StockGraph';
import Loader from './components/Loader';
import Footer from './components/Footer';
import Articles from './components/EducationalResources/Articles';
import Tutorials from './components/EducationalResources/Tutorials';
import Glossary from './components/EducationalResources/Glossary';
import Videos from './components/EducationalResources/Videos';
import './styles/App.css';
import './styles/pop.css';

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
        <Router>
            <div className="App">
                <Header setStockData={handleSetStockData} /><br/>
                {loading && <Loader />}
                <div className={loading ? "blur-sm pointer-events-none" : ""}>
                    <Routes>
                        <Route path="/" element={stockData ? <StockInfo data={stockData} /> : (error && <p>No data available. Please enter a valid stock symbol.</p>)} />
                        <Route path="/articles" element={<Articles />} />
                        <Route path="/tutorials" element={<Tutorials />} />
                        <Route path="/glossary" element={<Glossary />} />
                        <Route path="/videos" element={<Videos />} />
                    </Routes>
                    <StockGraph setLoading={setLoading} />
                </div><br />
                <Footer />
            </div>
        </Router>
    );
};

export default App;
