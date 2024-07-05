// C:\Users\Mor\Desktop\fina\Stocke_poke\stock-dashboard\src\components\StockGraph.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const StockGraph = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const symbol = 'AAPL'; // Replace with your symbol or fetch dynamically
      const response = await axios.get(`http://localhost:5000/api/graph/${symbol}`);
      setData(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data on component mount

    const interval = setInterval(fetchData, 60000); // Fetch data every minute
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return <div>Error fetching data: {error}</div>;
  }

  const renderGraph = () => {
    if (!data) {
      return <div>Loading...</div>;
    }

    // Transform the data into a format that recharts can understand
    const chartData = data.Date.map((date, index) => ({
      Date: date,
      Close: data.Close[index],
    }));

    return (
      <div>
        <LineChart width={600} height={300} data={chartData}>
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Line type="monotone" dataKey="Close" stroke="#ff7300" />
        </LineChart>
        {/* Additional charts can be added based on the 'data' structure */}
      </div>
    );
  };

  return (
    <div>
      <h2>Stock Graph</h2>
      {renderGraph()}
    </div>
  );
};

export default StockGraph;
