// app/page.jsx or your main component file

import { Button } from "@/components/ui/button"; // Adjust according to your delete action
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";// Adjust import for editing products
import { deleteProduct, fetchOrders } from "../actions";
import { MdDeleteOutline } from "react-icons/md";
import { BiEdit, BiSolidWatch } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
// Import the fetchProducts function

export default async function OrdersList({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;
  const limit = 10;

  try {
    // Call the fetchProducts function
    const { orders, totalPages } = await fetchOrders(page, limit);
    
    if (orders.length === 0) {
      return <h1 className="text-red-500 text-3xl font-bold flex items-center justify-center h-screen">No Orders</h1>;
    } else {
      return (
        
        <div className="w-full mt-2 mx-auto">
            <h2 className="my-2 font-semibold text-2xl text-primary_color">Orders</h2>
          <div className="overflow-x-auto">
              
                 <table className="min-w-full border-collapse border border-gray-200">
                 <thead>
                   <tr className="bg-gray-200">
                     <th className="border border-gray-300 px-4 py-2">Name</th>
                     <th className="border border-gray-300 px-4 py-2">Phone</th>
                     <th className="border border-gray-300 px-4 py-2">Address</th>
                     <th className="border border-gray-300 px-4 py-2">Payment Method</th>
                     <th className="border border-gray-300 px-4 py-2">Payment Status</th>
                     
                     <th className="border border-gray-300 px-4 py-2">Actions</th>
                   </tr>
                 </thead>
                 <tbody>
                   {orders.map((order) => (
                     <tr key={order._id.toString()} className="hover:bg-gray-100">
                       
                       <td className="border border-gray-300 px-4 py-2">{order.name}</td>
                       <td className="border border-gray-300 px-4 py-2">{order.mobile_no}</td>
                       <td className="border border-gray-300 px-4 py-2">{order.address}</td>
                       <td className="border border-gray-300 px-4 py-2">{order.payment_method}</td>
                       <td className="border border-gray-300 px-4 py-2">{order.payment_status}</td>
                       
                       <td className="border justify-center border-gray-300 py-2 flex gap-x-2">

                         <Link href={`/sallu_admin/orders_list/${order._id.toString()}`} className="">
                         <Button variant="" className="text-white text-2xl bg-orange-500 p-2"><FaEye /></Button>
                           
                         </Link>
                         <Link href={`/sallu_admin/edit-product/${order._id.toString()}`} className="">
                         <Button variant="" type="submit" className="text-white text-2xl bg-green-500 p-2"><BiEdit/></Button>
                           
                         </Link>
                         <form action={deleteProduct}>
                           <input type="hidden" name="id" value={order._id.toString()} />
                           <Button variant="destructive" type="submit" className="text-white text-2xl p-2">
                             <MdDeleteOutline/>
                           </Button>
                         </form>
                       </td>
                       
                     </tr>
                   ))}
                 </tbody>
               </table>
     
            {/* Pagination controls */}
            <div className="gap-3 items-center flex justify-center py-4">
              {/* Previous Button */}
              <Link href={`/sallu_admin/orders_list/?page=${page - 1}`} passHref>
                <Button variant="outline" disabled={page === 1}>
                  Previous
                </Button>
              </Link>

              <span className="text-sm">
                Page {page} of {totalPages}
              </span>

              {/* Next Button */}
              <Link href={`/sallu_admin/orders_list/?page=${page + 1}`} passHref>
                <Button variant="outline" disabled={page === totalPages}>
                  Next
                </Button>
              </Link>
            </div>
          </div>
        </div>
      );
    }
  } catch (error) {
    console.log(error);
  }
}