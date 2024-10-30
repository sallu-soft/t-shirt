"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "@/provider/CartContext";
import { fetchProduct, fetchSingleProduct } from "@/app/(admin)/sallu_admin/actions";
import { Context } from "@/provider/ContextProvider";
// export const metadata = {
//   title: product.title,
//   description: product.description,
// };

const SingleProduct = ({ params }) => {
  const { addItemToCart } = useContext(CartContext);
  const { products } = useContext(Context);
  const [product, setProduct] = useState({})
  const [myimg, setMyimg] = useState(product?.images?.[0]);
  


  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  console.log(myimg)
useEffect(() => {
    async function fetchProducts() {
      try {
        const {product} = await fetchSingleProduct(params.title);
        setProduct(product); 
        setMyimg(product?.images?.[0])// Set the fetched categories
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    }

    fetchProducts();
  }, [params.title]);
  console.log(product)
  // const product = products?.filter(
  //   (product) => product._id === (params.title[0])
  // )[0];
  const availableSizes = [...new Set(product.skus?.map((sku) => sku.size))];
  const availableColors = [...new Set(product.skus?.map((sku) => sku.color))];

  const selectedSKU = product.skus?.find(
    (sku) => sku.size === selectedSize && sku.color === selectedColor
  );
  const stock = selectedSKU ? selectedSKU.stock : 0;
  const jsonLd = {
    '@context': 'localhost:3000',
    '@type': 'Product',
    name: product?.name,
    image: product?.images?.[0],
    description: product?.description,
  }
  const handleSize = (size) => {
    setSelectedSize(size);
  };
  const handleColor = (color) => {
    setSelectedColor(color);
  };
 
  const [totalSizes, setTotalSizes] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter()
  // useEffect(() => {
  //   // Calculate total sizes whenever individual sizes change
  //   const adultTotal = Object.values(adultSizes).reduce(
  //     (acc, curr) => acc + curr,
  //     0
  //   );
  //   const childTotal = Object.values(childSizes).reduce(
  //     (acc, curr) => acc + curr,
  //     0
  //   );
  //   setTotalSizes(adultTotal + childTotal);
  // }, [adultSizes, childSizes]);
  const handleOrder = () => {
    setForm({
      adultSizes: adultSizes,
      childSizes: childSizes,
      price: price,
      title: title,
      totalSizes: totalSizes,
      images: images,
      model: model,
    });
  };
  const handleAddToCart = () => {
    addItemToCart({
      product: product._id,
      title: product.title,
      price: product.price-product?.discount,
      image: product.images[0],
      stock: product.stock,
      quantity: quantity,
      size: selectedSize,
      color: selectedColor,
      sku:selectedSKU
    });
    router.push("/cart")
  };
  // const router = useRouter();
  // const images = JSON.parse(router.query.images)
  const totalStock = product?.skus?.reduce((acc, sku) => acc + sku.stock, 0) || 0;
  return (
   
    <section className="text-gray-600 body-font overflow-hidden">
  <div className="container flex flex-wrap px-5 py-5 md:py-24 mx-auto">
    <div className="relative md:w-1/2 w-2/2 gap-x-2 md:mx-0 mx-auto flex flex-col">
      {/* Images */}
     
      <Image
        height={400}
        width={400}
        alt={product?.title}
        className="lg:w-[500px] border-primary_color border w-fit lg:h-fit h-64 object-contain object-center rounded "
        src={myimg}
      />

      <div className="gap-2 flex mt-2 flex-wrap">
        {product?.images?.map((currImg, index) => (
          <figure key={index}>
            <Image
              onClick={() => {
                setMyimg(currImg);
              }}
              src={currImg}
              alt={"sonot"}
              className={`w-full md:h-[130px] h-20 object-cover object-center rounded border-primary_color border ${
                product?.stock < 1 ? "cursor-not-allowed" : ""
              }`}
              height={400}
              width={400}
            />
          </figure>
        ))}
      </div>
    </div>

    <div className="md:w-1/2 w-2/2 lg:pl-10 lg:py-6 mt-6 lg:mt-0">
      {/* Title and Price */}
      <h2 className="text-md title-font font-semibold text-orange-700 tracking-widest pb-2">
        {product?.category}
      </h2>
      <h1 className="text-secondary_color text-3xl title-font font-medium mb-1">
        {product?.title}
      </h1>
      
      <p className="title-font my-3 text-red-700 font-bold ">
        <span className="text-3xl">৳{product && (product?.price)-(product?.discount)}</span> <span className="line-through text-md">৳{product?.price}</span>
      </p>
      <p className="text-gray-600 text-lg title-font font-medium mb-1">
        {product?.description}
      </p>
      <p className={`font-semibold my-2 text-md  title-font  w-fit py-2 px-4 rounded-xl mb-1 ${totalStock > 0 ? "border-green-700 border-2 text-green-700" : "border-red-700 border-2 text-red-700"}`}>
        {totalStock > 0? "In Stock" : "Out of Stock"}
      </p>

      
      <div className="my-2">
        <span className="my-2">Size:</span>
        <div className="flex gap-2 flex-wrap">
          {availableSizes.map((size) => (
            
            <div
                  key={size}
                  onClick={() => handleSize(size)}
                  className={`rounded border appearance-none w-fit border-gray-300 py-2 text-base px-3 flex cursor-pointer ${
                    selectedSize === size
                      ? "bg-primary_color text-white"
                      : "bg-white text-black"
                  } ${stock < 1 ? "cursor-not-allowed opacity-50" : ""}`}
                  disabled={stock < 1}
                >
                  <p>{size?.toUpperCase()}</p>
                </div>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="my-2">
        <span className="my-2">Color:</span>
        <div className="flex gap-2 flex-wrap my-2">
          {availableColors.map((color) => (
            
            <div
            key={color}
            onClick={() => handleColor(color)}
            className={`rounded border w-fit appearance-none border-gray-300 py-2 text-base px-3 flex cursor-pointer ${
              selectedColor === color
                ? "bg-primary_color text-white"
                : "bg-white text-black"
            } ${stock < 1 ? "cursor-not-allowed opacity-50" : ""}`}
            disabled={stock < 1}
          >
            <p>{color?.toUpperCase()}</p>
          </div>
          ))}
        </div>
      </div>
      {/* Quantity */}
      {/* <div className="flex mt-1 gap-x-4 w-full pb-2 items-center border-b-2 border-gray-100 mb-2">
        <div className="flex flex-row h-10 rounded-lg relative bg-gray-200">
          <button
            className="text-gray-900 hover:text-gray-700 h-full w-20 rounded-l cursor-pointer outline-none"
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            disabled={product?.stock < 1}
          >
            <span className="text-2xl font-bold">−</span>
          </button>
          <input
            type="number"
            className="outline-none w-[40px] h-[40px] focus:outline-none font-semibold text-md pl-2 bg-primary_color hover:text-black focus:text-black md:text-base cursor-default text-white flex justify-center items-center text-center custom-input-number"
            name="custom-input-number"
            value={quantity}
            readOnly
            disabled={product?.stock < 1}
          />
          <button
            className="text-gray-900 hover:text-gray-700 h-full w-20 rounded-r cursor-pointer"
            onClick={() => setQuantity((prev) => Math.min(product.stock, prev + 1))}
            disabled={product?.stock < 1}
          >
            <span className="m-auto text-2xl font-bold">+</span>
          </button>
        </div>
      </div> */}
       <div className="flex mt-1 gap-x-4 w-full pb-2 items-center border-b-2 border-gray-100 mb-2">
        <div className="flex flex-row h-10 rounded-lg relative bg-gray-200">
          <button
            className="text-gray-900 hover:text-gray-700 h-full w-20 rounded-l cursor-pointer outline-none"
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            disabled={stock < 1}
          >
            <span className="text-2xl font-bold">−</span>
          </button>
          <input
            type="number"
            className="outline-none w-[40px] h-[40px] focus:outline-none font-semibold text-md pl-2 bg-primary_color hover:text-black focus:text-black md:text-base cursor-default text-white flex justify-center items-center text-center custom-input-number"
            name="custom-input-number"
            value={quantity}
            readOnly
            disabled={stock < 1}
          />
          <button
            className="text-gray-900 hover:text-gray-700 h-full w-20 rounded-r cursor-pointer"
            onClick={() => setQuantity((prev) => Math.min(stock, prev + 1))}
            disabled={stock < 1}
          >
            <span className="m-auto text-2xl font-bold">+</span>
          </button>
        </div>
      </div>

      <p>Stock: {stock}</p>

      {/* Add to Cart Button */}
      <div className="flex">
        <button
          className={`text-white ${
            stock > 0 ? "bg-primary_color" : "bg-orange-200 cursor-not-allowed"
          } cursor-pointer border-0 py-2 px-6 focus:outline-none ml-auto rounded`}
          disabled={stock < 1}
          onClick={() => handleAddToCart()}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  </div>
  <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
</section>
  );
};

export default SingleProduct;