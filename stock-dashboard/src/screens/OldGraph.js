import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { saveAs } from 'file-saver';
import Loader from '../components/Loader';

const OldGraph = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDiff, setShowDiff] = useState(false);
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(300);
  const [symbol, setSymbol] = useState('AMGN');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/graph/${symbol}`, {
        params: {
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0]
        }
      });
      setData(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [symbol, startDate, endDate]);

  useEffect(() => {
    const fetchDataAndUpdate = async () => {
      await fetchData();
    };

    fetchDataAndUpdate();
    const interval = setInterval(fetchDataAndUpdate, 60000);

    return () => clearInterval(interval);
  }, [fetchData]);

  if (error) {
    return <div className="text-red-500">Error fetching data: {error}</div>;
  }

  const renderGraph = () => {
    if (loading) {
      return null;
    }

    if (!data) {
      return <div className="text-center">No data available</div>;
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

    const latestDate = data.Date[data.Date.length - 1];

    return (
      <div className="animate-fadeIn">
        <h2 className="text-2xl font-bold mb-4 text-primary">Old Stock Graph - {latestDate}</h2>
        <LineChart width={width} height={height} data={chartData} className="mx-auto">
          <XAxis dataKey="Date" />
          <YAxis tickFormatter={formatDollar} />
          <Tooltip formatter={(value) => formatDollar(value)} />
          <CartesianGrid stroke="#333" />
          <Line type="monotone" dataKey="Close" stroke="#ff7300" />
          <Line type="monotone" dataKey="Open" stroke="#00ff00" />
          <Line type="monotone" dataKey="High" stroke="#0000ff" />
          <Line type="monotone" dataKey="Low" stroke="#ff0000" />
          <Line type="monotone" dataKey="Volume" stroke="#000000" />
        </LineChart>
      </div>
    );
  };

  const generateBIReport = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/graph/report/${symbol}`, {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0]
      }, {
        responseType: 'blob'
      });

      const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
      saveAs(blob, `${symbol}_BI_Report.xlsx`);
    } catch (error) {
      console.error('Failed to generate BI report:', error);
    }
  };

  return (
    <div className="p-4 bg-dark-card rounded-lg shadow-lg">
      {loading && <Loader />}
      <div className={loading ? "blur-sm pointer-events-none" : ""}>
        <div className="mb-4">
          <label className="block mb-2">Select Stock Symbol:</label>
          <select
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="block w-full border border-gray-600 rounded-md p-2 bg-dark-bg text-dark-text"
          >
            <option value="AMGN">AMGN</option>
            <option value="AAPL">AAPL</option>
            <option value="GOOGL">GOOGL</option>
            <option value="MSFT">MSFT</option>
            <option value="TSLA">TSLA</option>
            <option value="NFLX">NFLX</option>
            <option value="NVDA">NVDA</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="block w-full border border-gray-600 rounded-md p-2 bg-dark-bg text-dark-text"
          />
          <label className="block mb-2 mt-4">End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="block w-full border border-gray-600 rounded-md p-2 bg-dark-bg text-dark-text"
          />
        </div>
        <button
          onClick={() => setShowDiff(!showDiff)}
          className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4 hover:bg-blue-600 transition duration-300"
        >
          {showDiff ? 'Show Actual Values' : 'Show Day Differences'}
        </button>
        <button
          onClick={generateBIReport}
          className="bg-green-500 text-white py-2 px-4 rounded-md mb-4 ml-2 hover:bg-green-600 transition duration-300"
        >
          Generate BI Report
        </button>
        <div className="resizable-container mb-4">
          {renderGraph()}
        </div>
      </div>
    </div>
  );
};

export default OldGraph;
