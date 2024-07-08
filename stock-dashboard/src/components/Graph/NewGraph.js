import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import './ResizableContainer.css';

const NewGraph = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [showDiff, setShowDiff] = useState(false);
    const [width, setWidth] = useState(600);
    const [height, setHeight] = useState(300);
    const [symbol, setSymbol] = useState('AAPL'); // Default symbol

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/graph/${symbol}`);
            setData(response.data);
        } catch (error) {
            setError(error.message);
        }
    }, [symbol]);

    useEffect(() => {
        const fetchDataAndUpdate = async () => {
            await fetchData();
        };

        fetchDataAndUpdate(); // Initial fetch

        const interval = setInterval(fetchDataAndUpdate, 60000); // Fetch every minute

        return () => clearInterval(interval);
    }, [fetchData]);

    if (error) {
        return <div>Error fetching data: {error}</div>;
    }

    const renderGraph = () => {
        if (!data) {
            return <div>Loading...</div>;
        }

        const chartData = data.Date.map((date, index) => ({
            Date: date,
            Open: showDiff ? data.OpenDiff[index] : data.Open[index],
            Close: showDiff ? data.CloseDiff[index] : data.Close[index],
            High: showDiff ? data.HighDiff[index] : data.High[index],
            Low: showDiff ? data.LowDiff[index] : data.Low[index],
            Volume: showDiff ? data.VolumeDiff[index] : data.Volume[index]
        }));

        const formatDollar = (value) => `$${value.toFixed(2)}`;

        // Display the latest date in the chart title
        const latestDate = data.Date[data.Date.length - 1]; // Assuming data.Date is sorted in ascending order

        return (
            <div>
                <h2>New Stock Graph - {latestDate}</h2>
                <LineChart width={width} height={height} data={chartData}>
                    <XAxis dataKey="Date" />
                    <YAxis tickFormatter={formatDollar} />
                    <Tooltip formatter={(value) => formatDollar(value)} />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Line type="monotone" dataKey="Close" stroke="#ff7300" />
                    <Line type="monotone" dataKey="Open" stroke="#00ff00" />
                    <Line type="monotone" dataKey="High" stroke="#0000ff" />
                    <Line type="monotone" dataKey="Low" stroke="#ff0000" />
                </LineChart>
            </div>
        );
    };

    return (
        <div>
            <div>
                <label>Select Stock Symbol:</label>
                <select value={symbol} onChange={(e) => setSymbol(e.target.value)}>
                    <option value="AMGN">AMGN</option>
                    <option value="AAPL">AAPL</option>
                    <option value="GOOGL">GOOGL</option>
                    <option value="MSFT">MSFT</option>
                    <option value="TSLA">TSLA</option>
                    <option value="NFLX">NFLX</option>
                    <option value="NVDA">NVDA</option>
                    {/* Add more options as needed */}
                </select>
            </div>
            <button onClick={() => setShowDiff(!showDiff)}>
                {showDiff ? 'Show Actual Values' : 'Show Day Differences'}
            </button>
            <div className="resizable-container">
                {renderGraph()}
            </div>
            <div className="controls">
                <label>
                    Width:
                    <input
                        type="number"
                        value={width}
                        onChange={(e) => setWidth(parseInt(e.target.value, 10))}
                    />
                </label>
                <label>
                    Height:
                    <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(parseInt(e.target.value, 10))}
                    />
                </label>
            </div>
        </div>
    );
};

export default NewGraph;
