


// import OrderList from '../components/OrderList';

// const page = async () => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_CORS}/api/orders`, {
//     revalidate: 20,
//     cache:"no-store"
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch Orders");
//   }

//   const { orders } = await res.json();

//   return (

//     <div>
//       <OrderList Orders={orders} />
//     </div>
//   );
// };

// export default page;
'use client'
import { useEffect, useState } from 'react';
import OrderList from '../../components/OrderList';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Admin from '../../components/Admin';

const page = () => {
  
  
    
  

  return (<>
    {/* {password===process.env.NEXT_PUBLIC_PAGE_ROUTE?<AdminLayout>
      <Sidebar/>
      <Admin/>
      
    </AdminLayout>:<div className="flex w-full mx-auto h-[80vh] max-w-sm items-center space-x-2">
    <div className="w-full gap-2 flex flex-col"><lebel className="text-lg font-semibold text-center">Password</lebel> 
    <Input type="password" 
           placeholder="Password"
           id="password"
           name="password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}/></div>
     
   </div>} */}
    <Admin/>
      
      
   </>
    
  );
};

export default page;