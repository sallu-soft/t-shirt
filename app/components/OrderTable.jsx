

'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import { FaEye, FaFileInvoice } from 'react-icons/fa'
import { MdDeleteOutline } from 'react-icons/md'
import { deleteProduct, updateOrderStatus } from '../(admin)/sallu_admin/actions'

const OrderTable = ({ orders }) => {
  // Use an object to keep track of payment statuses for each order
  const [paymentStatuses, setPaymentStatuses] = useState({});

  const handleStatusChange = async (orderId, newStatus) => {
    setPaymentStatuses((prev) => ({
      ...prev,
      [orderId]: newStatus, // Update the status for the specific order
    }));

    try {
      await updateOrderStatus(orderId, newStatus); // Send updated status to the server
      console.log('Payment status updated successfully');
    } catch (error) {
      console.error('Failed to update payment status:', error);
    }
  };

  return (
    <table className="min-w-full border-collapse border border-gray-200">
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-300 px-4 py-2">Order ID</th>
          <th className="border border-gray-300 px-4 py-2">Name</th>
          <th className="border border-gray-300 px-4 py-2">Phone</th>
          <th className="border border-gray-300 px-4 py-2">Address</th>
          <th className="border border-gray-300 px-4 py-2">Payment Method</th>
          <th className="border border-gray-300 px-4 py-2">Delivery Status</th>
          <th className="border border-gray-300 px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id} className="hover:bg-gray-100">
            <td className="border border-gray-300 px-4 py-2">{order._id.toString().slice(0, 8)}</td>
            <td className="border border-gray-300 px-4 py-2">{order.name}</td>
            <td className="border border-gray-300 px-4 py-2">{order.mobile_no}</td>
            <td className="border border-gray-300 px-4 py-2">{order.address}</td>
            <td className="border border-gray-300 px-4 py-2">{order.payment_method}</td>
            <td className="border border-gray-300 px-4 py-2">
              <select
                className={`${
                  order.payment_status === 'Delivered' ? 'text-green-700' :
                  order.payment_status === 'Shipped' ? 'text-yellow-700' :
                  'text-red-700'
                } font-semibold border border-gray-300 rounded p-1`}
                value={paymentStatuses[order._id] || order.payment_status} // Use order.payment_status as fallback
                onChange={(e) => handleStatusChange(order._id, e.target.value)} // Pass order ID
              >
                <option value="Pending">Pending</option>
                <option value="Delivered">Delivered</option>
                <option value="Shipped">Shipped</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </td>
            <td className="border justify-center border-gray-300 py-2 flex gap-x-2">
              <Link href={`/sallu_admin/orders_list/${order._id.toString()}`}>
                <Button variant="" className="text-white text-xl bg-orange-500 p-1"><FaEye /></Button>
              </Link>
              <Link href={`/sallu_admin/edit-product/${order._id.toString()}`}>
                <Button variant="" type="submit" className="text-white text-xl bg-green-500 p-1"><BiEdit /></Button>
              </Link>
              <Link href={`/Invoice/${order._id.toString()}`}>
                <Button variant="" type="submit" className="text-white text-xl bg-yellow-500 p-1"><FaFileInvoice /></Button>
              </Link>
              <form action={deleteProduct}>
                <input type="hidden" name="id" value={order._id.toString()} />
                <Button variant="destructive" type="submit" className="text-white text-xl p-1">
                  <MdDeleteOutline />
                </Button>
              </form>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default OrderTable;