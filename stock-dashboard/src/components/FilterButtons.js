// C:\Users\Mor\Desktop\fina\Stocke_poke\stock-dashboard\src\components\FilterButtons.js
import React from 'react';

function FilterButtons({ onFilter }) {
  const handleFilter = (interval, period) => {
    onFilter(interval, period);
  };

  return (
    <div>
      <button onClick={() => handleFilter('1h', '1d')}>Hourly - 1 Day</button>
      <button onClick={() => handleFilter('1d', '1mo')}>Daily - 1 Month</button>
      <button onClick={() => handleFilter('1wk', '3mo')}>Weekly - 3 Months</button>
      <button onClick={() => handleFilter('1mo', '1y')}>Monthly - 1 Year</button>
      <button onClick={() => handleFilter('1y', '5y')}>Yearly - 5 Years</button>
    </div>
  );
}

export default FilterButtons;
