import OrdersList from '@/app/components/OrdersList'
import React from 'react'

const MyOrders = () => {
    
  return (
    <div className="md:w-[75%] w-[95%] mx-auto">
        <h2 className="text-3xl font-semibold text-primary_color my-2">My Orders</h2>
        <OrdersList/>
    </div>
  )
}

export default MyOrders