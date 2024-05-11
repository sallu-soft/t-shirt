'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const OrderList = ({ Orders }) => {
  
    const router = useRouter();
    // const [orderStatus, setOrderStatus] = useState('');

    const handleStatusChange = async (e, id) => {
        // setOrderStatus(e.target.value);
        try{
            const apiUrl = process.env.NEXT_PUBLIC_CORS;
         const res = await fetch(`${apiUrl}/api/orders/${id}`,{
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({status:e.target.value})
          });
          console.log(res)
          if(res.ok) {
            toast("Updated Status Successfully")
            router.refresh();
          }else{
            throw new Error("Failed to Update Status");
          }
        }catch(error){
          console.log(error)
        }
      };
        const [currentPage, setCurrentPage] = useState(1);
        const [searchTerm, setSearchTerm] = useState('');

        // Pagination
        const itemsPerPage = 10;
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        

        const paginate = (pageNumber) => setCurrentPage(pageNumber);

        // Search functionality
        const filteredOrders = Orders.filter(order => 
          order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.mobile_no.includes(searchTerm) || order?._id.substring(order._id.length - 5).includes(searchTerm)
        );

        const handleSearch = (e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1); // Reset pagination when search term changes
        };

  return (
    <div className="mx-auto w-[95%] lg:w-[65%]">
      {/* {Orders.map((t)=>(
       <> <div className="p-4 border border-slate-300 my-3 flex justify-between items-start">
        <div >
            <h2 className="font-bold text-2xl">{t?.name}</h2>
            <div>{t?.address}</div>
        </div>
    </div></>

    ))} */}
      <div
        className="relative mt-5 flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded 
  bg-pink-900 text-white"
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow justify-between flex items-center">
              <h3 className="font-semibold text-lg text-white">Order Tables</h3>
              <input
                className="text-black p-2 rounded"
                type="text"
                placeholder="Search by name or mobile no..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto ">
        <table className="items-center w-full bg-transparent border-collapse">
			 <thead>
       <tr>
         
         <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
           Name
         </th>
         <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
           Invoice
         </th>
         <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
           Mobile No
         </th>
         <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
           Payment
         </th>
         <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
           Address
         </th>
         <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
           Model
         </th>
         <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
           Quantity
         </th>
         <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
           Price
         </th>
         <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
           Status
         </th>
         <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">Action</th>
       </tr>
     </thead>

     <tbody>
       {filteredOrders.slice(indexOfFirstItem,indexOfLastItem).map((t) => {
         const paidStatus = t?.isPaid ? "Paid" : "Unpaid"; // Define constant variable inside map
         const mergedArray = Object.entries(t?.adult_sizes).concat(Object.entries(t?.child_sizes)).filter(([_, value]) => value > 0);
         return (
           <tr key={t?._id}>
             
             <th className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex">
               <span className="ml-3 font-bold text-white">
                 {t?.name}
               </span>
             </th>
             <th className="">
               
             {t?._id.substring(t._id.length - 5)}
             
             </th>
             <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
               {t?.mobile_no}
             </td>
             <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
               {paidStatus} {/* Use the constant variable */}
             </td>
             <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
               {t?.address}
             </td>
             <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
               {t?.model}
             </td>

             <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                 {mergedArray?.map(([key,value]) =>{
                    return <span className="px-2 py-1 flex-wrap text-md m-1 bg-white shadow-lg uppercase font-semibold rounded text-gray-900" key={value}>{`${key} : ${value}`}</span>
                 })}
             </td>
             <td className="border-t-0  align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 px-6">
                 {t?.total_price}
             </td>
             <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
             <select value={t?.status} className="bg-transparent" onChange={(e)=>handleStatusChange(e,t?._id)}>
                 <option className="bg-gray-500 !p-2" value="Pending">Pending</option>
                 <option className="bg-gray-500 !p-2" value="Delivered">Delivered</option>
                 <option className="bg-gray-500 !p-2" value="Shipped">Shipped</option>
             </select>
             </td>
             <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
             <DropdownMenu>
                   <DropdownMenuTrigger><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                 <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
               </svg></DropdownMenuTrigger>
               <DropdownMenuContent>
                 
                 <DropdownMenuItem><Link href={{ pathname: '/invoice', query: { order: t } }} as={`/invoice/${t._id}`} className="">Invoice</Link></DropdownMenuItem>
                 <DropdownMenuItem>Delete</DropdownMenuItem>
               </DropdownMenuContent>
             </DropdownMenu>
             </td>
           </tr>
         );
       })}
     </tbody>
		</table>
    {/* Pagination */}
    <ul className="pagination flex p-3 justify-end">
        {Array.from({ length: Math.ceil(filteredOrders.length / itemsPerPage) }).map((_, index) => (
          <li onClick={() => paginate(index + 1)} key={index} className="page-item bg-white p-2 px-4 text-pink-800 m-2">
            <button  className="page-link">{index + 1}</button>
          </li>
        ))}
      </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
