// C:\Users\Mor\Desktop\fina\Stocke_poke\stock-dashboard\src\components\StockDashboard.js
import React from 'react';
import OldGraph from '../../screens/OldGraph';
import NewGraph from '../../screens/NewGraph';

const StockGraph = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <OldGraph />
      <NewGraph />
    </div>
  );
};

export default StockGraph;
