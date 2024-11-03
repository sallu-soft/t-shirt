import { Button } from "@/components/ui/button"; // Adjust according to your delete action
import Link from "next/link";

import { MdDeleteOutline } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { deleteProduct, fetchProducts } from "@/app/(admin)/sallu_admin/actions";
import ProductCard from "@/app/components/ProductCard";
// Import the fetchProducts function

export default async function ProductsPage({ searchParams }) {
  const page = parseInt(searchParams?.page) || 1;
  const limit = 16;

  try {
    // Call the fetchProducts function
    const { products, totalPages } = await fetchProducts(page, limit);
    
    if (products.length === 0) {
      return <h1 className="text-red-500 text-3xl font-bold flex items-center justify-center h-screen">No Products</h1>;
    } else {
      return (
        <div className="w-full flex justify-center items-center mt-2 flex-col">
           <div className="grid items-center lg:grid-cols-4 md:grid-cols-3 gap-3 sm:grid-cols-2 grid-cols-2 justify-center">
         {products?.map((product, ind) => (
           <ProductCard key={product._id} product={product} /> 
         ))}
       </div>
        {/* Pagination controls */}
         <div className="gap-3 items-center flex justify-center py-4">
             {/* Previous Button */}
            <Link href={`/search/products/?page=${page > 1 ? page - 1 : 1}`} passHref>
              <Button variant="outline" disabled={page === 1}>
                Previous
               </Button>
             </Link>

             <span className="text-sm">
               Page {page} of {totalPages}
             </span>

             <Link href={`/search/products/?page=${page < totalPages ? page + 1 : totalPages}`} passHref>
              <Button variant="outline" disabled={page >= totalPages}>
                 Next
               </Button>
             </Link>
           </div>
        </div>
      );
    }
  } catch (error) {
    console.log(error);
  }
}