import Image from "next/image";
import Navbar from "./components/Navbar";
import Product from "./components/SingleProduct";
import Products from "./components/Products";
import Banner from "./components/Banner";
import Categories from "./components/Categories";
import Shop from "./components/Shop";

export default function Home() {
  return (
    <>
      <Banner/>
      <Shop/>
    </>
  );
}
