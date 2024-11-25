
import Link from "next/link";
import { fetchProduct } from "../(admin)/sallu_admin/actions";
import AllProducts from "../components/AllProducts";
import Banner from "../components/Banner";
import CategoryList from "../components/CategoryList";
import Products from "../components/Products";
import Shop from "../components/Shop";
import RecentProducts from "../components/RecentProducts";

export default async function Home() {
  return (
    <>
      
      <Banner/>
      <CategoryList/>
      <div className="2xl:w-[80%] xl:w-[90%] md:w-[95%] mx-auto" >
      <h2 className="text-center font-semibold text-2xl my-3 text-primary_color">Our Latest Products</h2>
      <RecentProducts />
      <div className="flex items-center justify-center">
      <Link href="/search/products" className="py-2 px-4 rounded text-center w-fit text-md my-3 text-white bg-primary_color ">Veiw More Products</Link>
      </div>
      </div>
      {/* <Shop products={products}/> */}
    </>
  );
}
