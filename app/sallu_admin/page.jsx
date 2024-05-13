
// import OrderList from '../components/OrderList';

// const getOrders = async ()=>{
//     try{
//         const res = await fetch(`${process.env.NEXT_PUBLIC_CORS}/api/orders`,{
//             cache:"no-store"

//         })
//         if(!res.ok){
//             throw new Error("Failed to fetch Orders");
           
//         }
//         return res.json();
//     }catch(error){
//         console.log("Error While fetching Orders:" + error)
//     }
// }
// const page = async () => {
//     const {orders} = await getOrders();
//    return (
//     <div>
//         <OrderList Orders={orders}/>
      
//     </div>
//   )
// }

// export default page


import OrderList from '../components/OrderList';

const page = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_CORS}/api/orders`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Orders");
  }

  const { orders } = await res.json();

  return (
    <div>
      <OrderList Orders={orders} />
    </div>
  );
};

export default page;
