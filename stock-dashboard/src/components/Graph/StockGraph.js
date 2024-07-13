// C:\Users\Mor\Desktop\fina\Stocke_poke\stock-dashboard\src\components\StockDashboard.js
import React, { useState } from 'react';
import OldGraph from '../../screens/OldGraph';
import NewGraph from '../../screens/NewGraph';
import anime from 'animejs';
import '../../styles/StockDashboard.css';

const StockGraph = () => {
  const [show, setShow] = useState('first');

  const handleDropdownChange = (option) => {
    if (option === 'second') {
      setShow('second');
      anime({
        targets: '.graph-container',
        opacity: [1, 0],
        duration: 500,
        easing: 'easeInOutQuad',
        complete: () => {
          anime({
            targets: '.graph-container',
            opacity: [0, 1],
            duration: 500,
            easing: 'easeInOutQuad',
          });
        },
      });
    } else if (option === 'both') {
      setShow('both');
      anime({
        targets: '.old-graph',
        translateX: ['0%', '-50%'],
        translateY: ['0%', '0%'],
        duration: 1000,
        easing: 'easeInOutQuad',
      });
      anime({
        targets: '.new-graph',
        translateX: ['0%', '50%'],
        translateY: ['0%', '0%'],
        duration: 1000,
        easing: 'easeInOutQuad',
      });
    } else {
      setShow('first');
      anime({
        targets: '.graph-container',
        opacity: [1, 0],
        duration: 500,
        easing: 'easeInOutQuad',
        complete: () => {
          anime({
            targets: '.graph-container',
            opacity: [0, 1],
            duration: 500,
            easing: 'easeInOutQuad',
          });
        },
      });
    }
  };

  return (
    <div>
      <select onChange={(e) => handleDropdownChange(e.target.value)}>
        <option value="first">Show the first graph</option>
        <option value="second">Show the second graph</option>
        <option value="both">Show both graphs</option>
      </select>
      <div className="graph-container">
        {show === 'first' && <div className="old-graph"><OldGraph /></div>}
        {show === 'second' && <div className="new-graph"><NewGraph /></div>}
        {show === 'both' && (
          <div className="both-graphs">
            <div className="old-graph"><OldGraph /></div>
            <div className="new-graph"><NewGraph /></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockGraph;
