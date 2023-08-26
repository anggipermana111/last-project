import React from 'react';

const OrderList = () => {
  const orders = [
    { id: 1, movie: 'Avengers: Endgame', date: '2023-08-25', status: 'Completed' },
    { id: 2, movie: 'Spider-Man: No Way Home', date: '2023-08-24', status: 'Pending' },
    // ...data lainnya
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Order List</h2>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Movie</th>
            <th className="py-2">Date</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td className="py-2">{order.id}</td>
              <td className="py-2">{order.movie}</td>
              <td className="py-2">{order.date}</td>
              <td className="py-2">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
