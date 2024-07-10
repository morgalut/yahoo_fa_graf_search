import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ setStockData }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = async (e) => {
        const value = e.target.value;
        setQuery(value);
        if (value.length > 1) {
            try {
                const response = await axios.get(`http://localhost:5000/api/stock/search?q=${value}`);
                setSuggestions(response.data);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSearch = async (symbol) => {
        if (symbol) {
            try {
                const response = await axios.get(`http://localhost:5000/api/stock/${symbol}`);
                setStockData(response.data);
            } catch (error) {
                console.error('Error fetching stock data:', error);
                setStockData(null);
            }
        }
    };

    return (
        <div className="relative w-full max-w-lg">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search for stocks..."
                className="w-full p-2 border border-gray-300 rounded"
            />
            <button
                onClick={() => handleSearch(query)}
                className="absolute right-0 top-0 p-2 bg-blue-500 text-white rounded-r"
            >
                Search
            </button>
            {suggestions.length > 0 && (
                <ul className="absolute left-0 right-0 bg-white border border-gray-300 mt-1 max-h-48 overflow-y-auto">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={`${suggestion.symbol}-${index}`}
                            onClick={() => handleSearch(suggestion.symbol)}
                            className="p-2 cursor-pointer hover:bg-gray-200"
                        >
                            {suggestion.symbol} - {suggestion.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
