// src/components/Header.js
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import Offcanvas from './Offcanvas';
import StockInfo from './StockInfo';
import Popover from './Popover';

const Header = () => {
    const [isOffcanvasOpen, setOffcanvasOpen] = useState(false);
    const [stockData, setStockData] = useState(null);
    const [popovers, setPopovers] = useState([]);

    const handleSetStockData = (data) => {
        setStockData(data);
        setOffcanvasOpen(true);
    };

    const handleOffcanvasClose = () => {
        if (stockData && !popovers.some(popover => popover.symbol === stockData.symbol)) {
            setPopovers([...popovers, { symbol: stockData.symbol, data: stockData }]);
        }
        setOffcanvasOpen(false);
    };

    const handlePopoverClose = (index) => {
        setPopovers(popovers.filter((_, i) => i !== index));
    };

    const handlePopoverClick = (data) => {
        setStockData(data);
        setOffcanvasOpen(true);
    };

    return (
        <>
            <header className="bg-dark-card border-b border-gray-700">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <nav className="flex items-center justify-between h-16 lg:h-20">
                        <div className="flex items-center space-x-4">
                            <a href="#" className="text-2xl font-bold text-primary">Stock Dashboard</a>
                            <div className="hidden md:flex md:items-center md:space-x-10">
                                <a href="#" title="Features" className="text-sm font-medium text-dark-text transition-all duration-200 lg:text-base hover:text-primary focus:text-primary"> Features </a>
                                <a href="#" title="About us" className="text-sm font-medium text-dark-text transition-all duration-200 lg:text-base hover:text-primary focus:text-primary"> About us </a>
                                <a href="#" title="Pricing" className="text-sm font-medium text-dark-text transition-all duration-200 lg:text-base hover:text-primary focus:text-primary"> Pricing </a>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <SearchBar setStockData={handleSetStockData} />
                            <button type="button" className="inline-flex p-2 text-dark-text transition-all duration-200 rounded-md md:hidden focus:bg-gray-800 hover:bg-gray-800">
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            </button>
                        </div>
                    </nav>
                </div>
            </header>
            <Offcanvas isOpen={isOffcanvasOpen} onClose={handleOffcanvasClose}>
                {stockData ? <StockInfo data={stockData} /> : <p>No data available. Please enter a valid stock symbol.</p>}
            </Offcanvas>
            {popovers.map((popover, index) => (
                <Popover 
                    key={index} 
                    stockName={popover.symbol} 
                    position={index} 
                    onClose={() => handlePopoverClose(index)} 
                    onClick={() => handlePopoverClick(popover.data)} 
                />
            ))}
        </>
    );
};

export default Header;
