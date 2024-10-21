'use client';

import React, { useEffect, useState } from 'react';
import { getOrder, updateOrderStatus } from '../../actions'; // Assuming updateOrderStatus is a server action

const SingleOrder = ({ params }) => {
  const [orderData, setOrderData] = useState(null); // Initialize state
  const [paymentStatus, setPaymentStatus] = useState(''); // New state for payment status

  useEffect(() => {
    async function fetchOrder() {
      try {
        const order = await getOrder(params.id); // Fetch order data from server action
        setOrderData(order); // Set the order data to state
        setPaymentStatus(order.payment_status); // Set initial payment status
      } catch (error) {
        console.error('Failed to fetch order:', error);
      }
    }

    fetchOrder();
  }, [params.id]); // Re-fetch if `params.id` changes

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setPaymentStatus(newStatus); // Update local state

    try {
      await updateOrderStatus(params.id, newStatus); // Send updated status to the server
      console.log('Payment status updated successfully');
    } catch (error) {
      console.error('Failed to update payment status:', error);
    }
  };

  // If data is not yet loaded, show a loading message
  if (!orderData) {
    return <div>Loading...</div>;
  }

  // Render order details once loaded
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4">
        <h2 className="text-white text-2xl font-bold">Order for {orderData.name}</h2>
        <p className="text-white mt-2">Address: {orderData.address}</p>
        <p className="text-white">Mobile No: {orderData.mobile_no}</p>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Order Summary</h3>
        <div className="mb-2 flex justify-between items-center">
          <span className="font-medium text-gray-700">Total Price:</span>
          <span className="text-indigo-600 font-semibold">{orderData.total_price}</span>
        </div>
        <div className="mb-2 flex justify-between items-center">
          <span className="font-medium text-gray-700">Payment Method:</span>
          <span className="text-gray-800">{orderData.payment_method}</span>
        </div>
        <div className="mb-4 flex justify-between items-center">
          <span className="font-medium text-gray-700">Payment Status:</span>
          <select
            className={`${paymentStatus=='Delivered'?'text-green-700':paymentStatus=="Shipped"?"text-yellow-700":'text-red-700'} font-semibold border border-gray-300 rounded p-1` }
            value={paymentStatus}
            onChange={handleStatusChange} // Handle status change
          >
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
            <option value="Shipped">Shipped</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <h3 className="text-lg font-semibold mb-4 text-gray-800">Ordered Items</h3>
        <ul className="divide-y divide-gray-200">
          {orderData.ordered_items.map((item) => (
            <li key={item._id} className="py-4 flex items-center space-x-4">
              <img src={item.image} alt={item.title} className="w-16 h-16 rounded-lg object-cover" />
              <div>
                <p className="text-gray-800 font-semibold">{item.title}</p>
                <p className="text-gray-600 text-sm">
                  {item.size} - {item.color}
                </p>
                <p className="text-gray-800">
                  {item.quantity} x {item.price}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SingleOrder;