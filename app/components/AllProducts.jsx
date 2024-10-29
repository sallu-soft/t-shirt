
// import React from 'react';
// import ProductCard from './ProductCard';
// import { fetch12Product, fetchProduct, fetchProducts} from '@/app/(admin)/sallu_admin/actions';
// import { Context } from '@/provider/ContextProvider';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';

// const AllProducts = async () => {
  
//   const {products} = await fetchProducts()
//   return (
//     <div className="w-full">
     
//       <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-col-1 gap-3">
//         {products?.map((product, ind) => (
//           <ProductCard key={product._id} product={product} /> 
//         ))}
//       </div>
     
//       {/* {loading && <div>Loading...</div>}
//       {!hasMore && <div>No more products</div>} */}
//     </div>
//   );
// };

// export default AllProducts;

// app/page.jsx or your main component file





// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { deleteProduct, fetchProducts } from "../(admin)/sallu_admin/actions";
// import { BiEdit } from "react-icons/bi";
// import { MdDeleteOutline } from "react-icons/md";

// export default async function AllProducts({ searchParams }) {
//   const page = parseInt(searchParams?.page) || 1; // Default to 1 if undefined
//   const limit = 5;

//   try {
//     const { products, totalPages } = await fetchProducts(page, limit);

//     if (products.length === 0) {
//       return (
//         <h1 className="text-red-500 text-3xl font-bold flex items-center justify-center h-screen">
//           No Products
//         </h1>
//       );
//     }

//     return (
//       <div className="w-full mt-2 mx-auto">
//         <div className="overflow-x-auto">
//           <table className="min-w-full border-collapse border border-gray-200">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border border-gray-300 px-4 py-2">Title</th>
//                 <th className="border border-gray-300 px-4 py-2">Description</th>
//                 <th className="border border-gray-300 px-4 py-2">Price</th>
//                 <th className="border border-gray-300 px-4 py-2">Category</th>
//                 <th className="border border-gray-300 px-4 py-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((product) => (
//                 <tr key={product._id.toString()} className="hover:bg-gray-100">
//                   <td className="border border-gray-300 px-4 py-2">{product.title}</td>
//                   <td className="border border-gray-300 px-4 py-2">{product.description.slice(0, 50)}...</td>
//                   <td className="border border-gray-300 px-4 py-2">${product.price}</td>
//                   <td className="border border-gray-300 px-4 py-2">{product.category}</td>
//                   <td className="border justify-center border-gray-300 px-4 py-2 flex space-x-2">
//                     <Link href={`/sallu_admin/edit-product/${product._id.toString()}`}>
//                       <Button variant="" type="button" className="text-white text-2xl bg-green-500 p-2">
//                         <BiEdit />
//                       </Button>
//                     </Link>
//                     <form action={deleteProduct}>
//                       <input type="hidden" name="id" value={product._id.toString()} />
//                       <Button variant="destructive" type="submit" className="text-white text-2xl p-2">
//                         <MdDeleteOutline />
//                       </Button>
//                     </form>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Pagination controls */}
//           <div className="gap-3 items-center flex justify-center py-4">
//             {/* Previous Button */}
//             <Link href={`/search/products/?page=${page > 1 ? page - 1 : 1}`} passHref>
//               <Button variant="outline" disabled={page === 1}>
//                 Previous
//               </Button>
//             </Link>

//             <span className="text-sm">
//               Page {page} of {totalPages}
//             </span>

//             {/* Next Button */}
//             <Link href={`/search/products/?page=${page < totalPages ? page + 1 : totalPages}`} passHref>
//               <Button variant="outline" disabled={page >= totalPages}>
//                 Next
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     return (
//       <h1 className="text-red-500 text-3xl font-bold flex items-center justify-center h-screen">
//         Failed to load products
//       </h1>
//     );
//   }
// }


// app/page.jsx or your main component file

