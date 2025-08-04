import React, { useEffect, useState } from 'react';

function App() {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    fetch("https://sastasmart-backend.onrender.com/api/deals")
      .then((res) => res.json())
      .then((data) => setDeals(data));
  }, []);

  return (
    <div>
      <h1>SastaSmart Deals</h1>
      <ul>
        {deals.map((deal, index) => (
          <li key={index}>{deal.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
