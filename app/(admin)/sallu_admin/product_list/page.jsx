// app/page.jsx or your main component file

import { Button } from "@/components/ui/button"; // Adjust according to your delete action
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";// Adjust import for editing products
import { deleteProduct, fetchProducts } from "../actions";
import { MdDeleteOutline } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
// Import the fetchProducts function

export default async function ProductList({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;
  const limit = 10;

  try {
    // Call the fetchProducts function
    const { products, totalPages } = await fetchProducts(page, limit);
    
    if (products.length === 0) {
      return <h1 className="text-red-500 text-3xl font-bold flex items-center justify-center h-screen">No Products</h1>;
    } else {
      return (
        <div className="w-full mt-2 mx-auto">
          <div className="overflow-x-auto">
              
                 <table className="min-w-full border-collapse border border-gray-200">
                 <thead>
                   <tr className="bg-gray-200">
                     <th className="border border-gray-300 px-4 py-2">Title</th>
                     <th className="border border-gray-300 px-4 py-2">Description</th>
                     <th className="border border-gray-300 px-4 py-2">Price</th>
                     <th className="border border-gray-300 px-4 py-2">Category</th>
                     <th className="border border-gray-300 px-4 py-2">Actions</th>
                   </tr>
                 </thead>
                 <tbody>
                   {products.map((product) => (
                     <tr key={product._id.toString()} className="hover:bg-gray-100">
                       <td className="border border-gray-300 px-4 py-2">{product.title}</td>
                       <td className="border border-gray-300 px-4 py-2">{product.description.slice(0,50)}...</td>
                       <td className="border border-gray-300 px-4 py-2">${product.price}</td>
                       <td className="border border-gray-300 px-4 py-2">{product.category}</td>
                       <td className="border justify-center border-gray-300 px-4 py-2 flex space-x-2">
                         <Link href={`/sallu_admin/edit-product/${product._id.toString()}`} className="">
                         <Button variant="" type="submit" className="text-white text-2xl bg-green-500 p-2"><BiEdit/></Button>
                           
                         </Link>
                         <form action={deleteProduct}>
                           <input type="hidden" name="id" value={product._id.toString()} />
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
              <Link href={`/sallu_admin/product_list/?page=${page - 1}`} passHref>
                <Button variant="outline" disabled={page === 1}>
                  Previous
                </Button>
              </Link>

              <span className="text-sm">
                Page {page} of {totalPages}
              </span>

              {/* Next Button */}
              <Link href={`/sallu_admin/product_list/?page=${page + 1}`} passHref>
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