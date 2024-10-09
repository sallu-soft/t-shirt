
import { fetchProduct } from "../(admin)/sallu_admin/actions";
import AllProducts from "../components/AllProducts";
import Banner from "../components/Banner";
import CategoryList from "../components/CategoryList";
import Products from "../components/Products";
import Shop from "../components/Shop";

export default async function Home() {
  const {products} = await fetchProduct();
  return (
    <>
      <Banner/>
      <CategoryList/>
      <div className="md:w-[70%] mx-auto" >
      <AllProducts/>
      </div>
      {/* <Shop products={products}/> */}
    </>
  );
}
