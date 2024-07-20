// C:\Users\Mor\Desktop\fina\Stocke_poke\stock-dashboard\src\components\StockDashboard.js
import React from 'react';
import OldGraph from '../../screens/OldGraph';
import NewGraph from '../../screens/NewGraph';
import StockTimeline from '../../screens/StockTimeline';
import SymbolOverview from '../../screens/SymbolOverview';
import UsdIlsQuote from '../../screens/UsdIlsQuote';
import './StockGraph.css';

const StockGraph = () => {
  return (
    <div className="stock-graph-container">
      <div className="row">
        <OldGraph />
        <NewGraph />
      </div>
      <div className="row">
        <StockTimeline />
      </div>
      <div className="row">
        <SymbolOverview />
        <UsdIlsQuote />
      </div>
    </div>
  );
};

export default StockGraph;
