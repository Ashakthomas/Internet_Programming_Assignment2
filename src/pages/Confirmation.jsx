import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Confirmation = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Confirm the order via PUT request
    axios.put(`http://localhost:5000/api/orders/confirm/${id}`)
      .then(response => {
        setOrder(response.data.order);
        setMessage(response.data.message);
      })
      .catch(err => {
        console.error(err);
        setMessage('Failed to confirm the order. It may have been removed.');
      });
  }, [id]);

  if (!message) return <div className="text-center mt-10 text-lg">Confirming your reservation...</div>;

  return (
    <div className="max-w-lg mx-auto py-8 px-4 text-center">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Reservation Status</h1>

      <p className={`text-xl font-semibold mb-6 ${order ? 'text-green-600' : 'text-red-600'}`}>
        {message}
      </p>

      {order && (
        <div className="text-left mb-6 border p-4 rounded shadow">
          <p><strong>Name:</strong> {order.name}</p>
          <p><strong>Phone:</strong> {order.phone}</p>
          <p><strong>Email:</strong> {order.email}</p>
          <p><strong>License:</strong> {order.license}</p>
          <p><strong>Start Date:</strong> {order.startDate.slice(0, 10)}</p>
          <p><strong>Duration:</strong> {order.duration} day(s)</p>
          <p><strong>Total:</strong> AU${order.total}</p>
          <p className="mt-2 font-bold text-green-600">Status: {order.status}</p>
        </div>
      )}

      <Link to="/" className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
        Back to Home
      </Link>
    </div>
  );
};

export default Confirmation;
