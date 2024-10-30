'use client'
import { UserContext } from '@/provider/UsersContext'
import React, { useContext, useEffect, useState } from 'react'
import { ordersList } from '../(admin)/sallu_admin/actions'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const OrdersList = () => {
    const { user } = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchedOrders = async () => {
            if (user?._id) { // Make sure user is available
                try {
                    const response = await ordersList(user._id);
                    setOrders(response.orders);
                    console.log(response.orders)
                } catch (error) {
                    console.error('Error fetching orders:', error);
                }
            }
        };

        fetchedOrders(); // Make sure to call the async function
    }, [user,orders]); // Only re-run when the user changes
    if (user && user?.name){
    return (
        <>
        {orders?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((orderData) => (
                    <div key={orderData._id} className="bg-white rounded-lg shadow-lg flex flex-col h-full">
                        <div className="p-6 flex-grow">
                            <div className="flex justify-between mb-4">
                                <h3 className="text-xl font-semibold text-gray-800">Order Summary</h3>
                                <p className="text-sm text-gray-500">{new Date(orderData?.createdAt).toLocaleDateString('en-GB')}</p>
                            </div>
                            <div className="mb-4">
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-700">Total Price:</span>
                                    <span className="text-indigo-600 font-semibold">${orderData.total_price}</span>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span className="font-medium text-gray-700">Payment Method:</span>
                                    <span className="text-gray-800">{orderData.payment_method}</span>
                                </div>
                            </div>
        
                            <h4 className="text-lg font-semibold text-gray-800 mb-2">Ordered Items</h4>
                            <ul className="space-y-4">
                                {orderData.ordered_items.map((item) => (
                                    <li key={item._id} className="flex items-center space-x-4">
                                        <img src={item.image} alt={item.title} className="w-16 h-16 rounded-lg object-cover" />
                                        <div>
                                            <p className="text-gray-800 font-semibold">{item.title}</p>
                                            <p className="text-gray-600 text-sm">{item.size} - {item.color}</p>
                                            <p className="text-gray-800">{item.quantity} x ${item.price}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-gray-100 p-4 flex justify-between items-center mt-auto">
                            <span className="text-gray-500 text-sm">Order ID: {orderData._id}</span>
                            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div className="justify-center items-center flex flex-col gap-y-3 h-[55vh]">
                <h2 className="text-2xl text-primary_color font-bold">You Did Not Order Yet</h2>
                <Link href="/" className="bg-primary_color px-4 py-3 rounded-md ">
                    Back To Shopping
                </Link>
            </div>
        )}
        </>
    )}else{
        router.push('/login')
    }
};

export default OrdersList;