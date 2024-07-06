// C:\Users\Mor\Desktop\fina\Stocke_poke\stock-dashboard\src\components\StockDashboard.js
import React from 'react';
import OldGraph from './OldGraph';
import NewGraph from './NewGraph';

const StockDashboard = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <OldGraph />
      <NewGraph />
    </div>
  );
};

export default StockDashboard;
