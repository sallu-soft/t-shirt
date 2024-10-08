
import { fetchProduct } from "../(admin)/sallu_admin/actions";
import Banner from "../components/Banner";
import CategoryList from "../components/CategoryList";
import Shop from "../components/Shop";

export default async function Home() {
  const {products} = await fetchProduct();
  return (
    <>
      <Banner/>
      <CategoryList/>
      {/* <Shop products={products}/> */}
    </>
  );
}
