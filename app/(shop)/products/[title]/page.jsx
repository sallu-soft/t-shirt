"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Context } from "@/provider/ContextProvider";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "@/provider/CartContext";
import { fetchProduct, fetchSingleProduct } from "@/app/(admin)/sallu_admin/actions";
// export const metadata = {
//   title: product.title,
//   description: product.description,
// };

const SingleProduct = ({ params }) => {
  const { form, setForm, } = useContext(Context);
  const { addItemToCart } = useContext(CartContext);
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
  }, [params.title[0]]);
  // const product = products?.filter(
  //   (product) => product._id === (params.title[0])
  // )[0];

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
  const [adultSizes, setAdultSizes] = useState({
    s: 0,
    m: 0,
    l: 0,
    xl: 0,
    xxL: 0,
  });
  const [childSizes, setChildSizes] = useState({
    "(4-5) Years": 0,
    "(6-7) Years": 0,
    "(8-10) Years": 0,
    "(11-13) Years": 0,
  });
  const [totalSizes, setTotalSizes] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter()
  useEffect(() => {
    // Calculate total sizes whenever individual sizes change
    const adultTotal = Object.values(adultSizes).reduce(
      (acc, curr) => acc + curr,
      0
    );
    const childTotal = Object.values(childSizes).reduce(
      (acc, curr) => acc + curr,
      0
    );
    setTotalSizes(adultTotal + childTotal);
  }, [adultSizes, childSizes]);
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
    });
    router.push("/cart")
  };
  // const router = useRouter();
  // const images = JSON.parse(router.query.images)
  
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


        

  	      {/* <div
            className="relative w-full h-64 md:h-96 bg-gray-200"
            onMouseMove={onMouseMove}
            onMouseEnter={() => setShowOverlay(true)}
            onMouseLeave={() => setShowOverlay(false)}
          >
            <Image
              height={400}
              width={400}
              alt={product?.title}
              className="lg:w-[500px] border-primary_color border w-fit lg:h-fit h-64 object-contain object-center rounded"
              src={myimg}
            />
            {showOverlay && (
              <div
                className="absolute top-0 left-0 w-full h-full border border-gray-300 pointer-events-none"
                style={{
                  left: `${overlayPosition.left}px`,
                  top: `${overlayPosition.top}px`,
                  width: '300px', // Size of the zoom overlay
                  height: '300px',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)', // Optional overlay background
                }}
              >
                <div
                  className="w-full h-full"
                  style={zoomImageStyle}
                />
              </div>
            )}
          </div> */}
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
        {product.category}
      </h2>
      <h1 className="text-secondary_color text-3xl title-font font-medium mb-1">
        {product?.title}
      </h1>
      
      <p className="title-font my-3 text-red-700 font-bold ">
        <span className="text-3xl">৳{product?.price-product?.discount}</span> <span className="line-through text-md">৳{product?.price}</span>
      </p>
      <p className="text-gray-600 text-lg title-font font-medium mb-1">
        {product?.description}
      </p>
      <p className={`font-semibold my-2 text-md  title-font  w-fit py-2 px-4 rounded-xl mb-1 ${product?.stock > 0 ? "border-green-700 border-2 text-green-700" : "border-red-700 border-2 text-red-700"}`}>
        {product?.stock > 0 ? "In Stock" : "Out of Stock"}
      </p>

      {/* Sizes */}
      {product?.sizes?.[0] !== "" && product?.sizes?.length > 0 && (
        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
          <div className="flex items-center">
            <span className="mr-3">Size:</span>
            <div className="flex gap-2 flex-wrap">
              {product?.sizes.map((size) => (
                <div
                  key={size}
                  onClick={() => handleSize(size)}
                  className={`rounded border appearance-none border-gray-300 py-2 text-base px-3 flex cursor-pointer ${
                    selectedSize === size
                      ? "bg-primary_color text-white"
                      : "bg-white text-black"
                  } ${product?.stock < 1 ? "cursor-not-allowed opacity-50" : ""}`}
                  disabled={product?.stock < 1}
                >
                  <p>{size?.toUpperCase()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Colors */}
      {product?.colors?.[0] !== "" && product?.colors?.length > 0 && (
        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
          <div className="flex items-center">
            <span className="mr-3">Color:</span>
            <div className="flex gap-2 flex-wrap">
              {product?.colors.map((color) => (
                <div
                  key={color}
                  onClick={() => handleColor(color)}
                  className={`rounded border appearance-none border-gray-300 py-2 text-base px-3 flex cursor-pointer ${
                    selectedColor === color
                      ? "bg-primary_color text-white"
                      : "bg-white text-black"
                  } ${product?.stock < 1 ? "cursor-not-allowed opacity-50" : ""}`}
                  disabled={product?.stock < 1}
                >
                  <p>{color?.toUpperCase()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="flex mt-1 gap-x-4 w-full pb-2 items-center border-b-2 border-gray-100 mb-2">
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
      </div>

      {/* Add to Cart Button */}
      <div className="flex">
        <button
          className={`text-white ${
            product?.stock > 0 ? "bg-primary_color" : "bg-orange-200 cursor-not-allowed"
          } cursor-pointer border-0 py-2 px-6 focus:outline-none ml-auto rounded`}
          disabled={product?.stock < 1}
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
