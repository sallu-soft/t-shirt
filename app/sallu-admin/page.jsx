import React from 'react'
import OrderList from '../components/OrderList';

const getOrders = async ()=>{
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_CORS}/api/orders`,{
            
            cache:"no-store"
        })
        if(!res.ok){
            throw new Error("Failed to fetch Orders");
           
        }
        return res.json();
    }catch(error){
        console.log("Error While fetching Orders:" + error)
    }
}
const page = async () => {
    const {orders} = await getOrders();
   return (
    <div>
        <OrderList Orders={orders}/>
        
    </div>
  )
}

export default page



// const getOrders = async () => {
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_CORS}/api/orders`, {
//         revalidate: 10,
//       });
//       if (!res.ok) {
//         throw new Error("Failed to fetch Orders");
//       }
//       const data = await res.json();
//       if (!data) {
//         return { orders: [] }; // Return a default value if data is null or undefined
//       }
//       return data;
//     } catch (error) {
//       console.error("Error While fetching Orders:", error);
//       return { error: true, message: "Failed to fetch orders" }; // Return an error object
//     }
//   };
  
//   const page = async () => {
//     const response = await getOrders();
//     if (response.error) {
//       return <div>Error: {response.message}</div>;
//     }
  
//     const orders = response.orders || []; // Use a default value if orders is null or undefined
//     return (
//       <div>
//         <OrderList orders={orders} />
//       </div>
//     );
//   };
  
//   export default page;