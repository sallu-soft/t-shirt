import { ordersList } from '@/app/(admin)/sallu_admin/actions';
import OrdersList from '@/app/components/OrdersList'
import { cookies } from 'next/headers';
import React from 'react'

const MyOrders = async () => {
  const sessionCookie = cookies().get('session');

    let userSession = null;
    if (sessionCookie) {
        try {
            userSession = JSON.parse(sessionCookie.value); // Parse the JSON string if it exists
        } catch (error) {
            console.error("Error parsing session cookie:", error);
        }
    }
  const {orders} = await ordersList(userSession?.id);
  return (
    <div className="md:w-[75%] w-[95%] mx-auto">
        <h2 className="text-3xl font-semibold text-primary_color my-2">My Orders</h2>
        <OrdersList orders={orders}/>
    </div>
  )
}

export default MyOrders