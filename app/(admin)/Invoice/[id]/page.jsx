import InvoicePage from "@/app/components/InvoicePage";
import { getOrder } from "../../sallu_admin/actions";




// const getOrders = async (id) => {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_CORS}/api/orders/${id}`,
//       {
//         cache: "no-store",
//       }
//     );
//     if (!res.ok) {
//       throw new Error("Failed to fetch Order");
//     }

//     return res.json();
//   } catch (error) {
//     console.log("Error While fetching Orders:" + error);
//   }
// };
const page = async ({ params }) => {
  const order  = await getOrder(params.id);
  console.log(order)
  return (
  <InvoicePage order={order}/>
    
  );
};

export default page;
