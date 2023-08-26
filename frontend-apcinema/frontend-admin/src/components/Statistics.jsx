import React from 'react';

const Statistics = () => {
  const statistics = [
    { label: 'Total Orders', value: 250 },
    { label: 'Pending Orders', value: 40 },
    { label: 'Completed Orders', value: 210 },
    // ...data lainnya
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
      <div className="grid grid-cols-2 gap-4">
        {statistics.map(stat => (
          <div key={stat.label} className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-semibold mb-2">{stat.label}</h3>
            <p className="text-xl">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
