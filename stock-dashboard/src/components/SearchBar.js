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
        <div>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search for stocks..."
            />
            <button onClick={() => handleSearch(query)}>Search</button>
            {suggestions.length > 0 && (
                <ul>
                    {suggestions.map((suggestion, index) => (
                        <li key={`${suggestion.symbol}-${index}`} onClick={() => handleSearch(suggestion.symbol)}>
                            {suggestion.symbol} - {suggestion.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
