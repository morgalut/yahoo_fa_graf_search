// C:\Users\Mor\Desktop\fina\Stocke_poke\stock-dashboard\src\components\Graph\OldGraph.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const OldGraph = () => {
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
      Open: data.Open[index],
      Close: data.Close[index],
      High: data.High[index],
      Low: data.Low[index],
      Volume: data.Volume[index]
    }));

    const formatDollar = (value) => `$${value.toFixed(2)}`;

    return (
      <div>
        <LineChart width={600} height={300} data={chartData}>
          <XAxis dataKey="Date" />
          <YAxis tickFormatter={formatDollar} />
          <Tooltip formatter={(value) => formatDollar(value)} />
          <CartesianGrid stroke="#f5f5f5" />
          <Line type="monotone" dataKey="Close" stroke="#ff7300" />
          <Line type="monotone" dataKey="Open" stroke="#00ff00" />
          <Line type="monotone" dataKey="High" stroke="#0000ff" />
          <Line type="monotone" dataKey="Low" stroke="#ff0000" />
          <Line type="monotone" dataKey="Volume" stroke="#000000" />
        </LineChart>
      </div>
    );
  };

  return (
    <div>
      <h2>Old Stock Graph</h2>
      {renderGraph()}
    </div>
  );
};

export default OldGraph;
