import OrdersList from '@/app/components/OrdersList'
import React from 'react'

const MyOrders = () => {
    
  return (
    <div className="w-[75%] mx-auto">
        <h2 className="text-3xl font-semibold text-primary_color">My Orders</h2>
        <OrdersList/>
    </div>
  )
}

export default MyOrders