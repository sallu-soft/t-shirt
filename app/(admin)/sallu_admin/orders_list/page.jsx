// app/page.jsx or your main component file

import { Button } from "@/components/ui/button"; // Adjust according to your delete action
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";// Adjust import for editing products
import { deleteProduct, fetchOrders } from "../actions";
import { MdDeleteOutline } from "react-icons/md";
import { BiEdit, BiSolidWatch } from "react-icons/bi";
import { FaEye, FaFileInvoice } from "react-icons/fa";
import OrderTable from "@/app/components/OrderTable";
// Import the fetchProducts function

export default async function OrdersList({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;
  const limit = 10;

  try {
    // Call the fetchProducts function
    const { orders, totalPages } = await fetchOrders(page, limit);
    const plainOrders = orders.map(order => ({
      // Convert ObjectId to string for each field
      _id: order._id.toString(),
      name: order.name,
      address: order.address,
      mobile_no: order.mobile_no,
      total_price: order.total_price,
      payment_method: order.payment_method,
      payment_status: order.payment_status,
      createdAt: order.createdAt.toISOString(), // Ensure date is a string
      updatedAt: order.updatedAt.toISOString(),
      ordered_items: order.ordered_items.map(item => ({
        _id: item._id.toString(), // Convert each item's ObjectId
        title: item.title,
        color: item.color,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
        stock: item.stock,
        image: item.image,
        product: item.product.toString(), // Convert product ID if it's ObjectId
      })),
    }));
    console.log(plainOrders)
    if (orders.length === 0) {
      return <h1 className="text-red-500 text-3xl font-bold flex items-center justify-center h-screen">No Orders</h1>;
    } else {
      return (
        
        <div className="w-full mt-2 mx-auto">
            <h2 className="my-2 font-semibold text-2xl text-primary_color">Orders</h2>
          <div className="overflow-x-auto">
              
                 
                   <OrderTable orders={plainOrders}/>
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