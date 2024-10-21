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
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "@/provider/CartContext";

const SingleProduct = ({ params }) => {
  const { form, setForm, products } = useContext(Context);
  const { addItemToCart } = useContext(CartContext);
  console.log(products)
  const product = products?.filter(
    (product) => product._id === (params.title[0])
  )[0];
  console.log(product)

  const [myimg, setMyimg] = useState(product?.images?.[0]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
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
      price: product.price,
      image: product.images[0],
      stock: product.stock,
      quantity: quantity,
      size: selectedSize,
      color: selectedColor,
    });
  };
  // const router = useRouter();
  // const images = JSON.parse(router.query.images)

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container flex flex-wrap px-5 py-5 md:py-24 mx-auto">
        {/* <div className="lg:w-4/5 mx-auto flex flex-wrap"> */}
        <div className="md:w-1/2 w-2/2 gap-x-2 md:mx-0 mx-auto flex">
          <div className="gap-y-4 flex flex-col">
            {product?.images?.map((currImg, index) => {
              return (
                <figure>
                  <Image
                    onClick={() => {
                      setMyimg(currImg);
                    }}
                    src={currImg}
                    alt={"sonot"}
                    className="w-full md:h-[130px] h-20 object-cover object-center rounded"
                    key={index}
                    height={400}
                    width={400}
                  />
                </figure>
              );
            })}
          </div>
          <Image
            height={400}
            width={400}
            alt="ecommerce"
            className="lg:w-[500px] w-full lg:h-auto h-64 object-cover object-center rounded "
            src={myimg}
          />
        </div>
        <div className="md:w-1/2 w-2/2 lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h2 className="text-md title-font font-semibold text-orange-700 tracking-widest pb-2">
            ছাল্লু গার্মেন্টস
          </h2>
          <h1 className="text-secondary_color text-3xl title-font font-medium mb-1">
            {product?.title}
          </h1>
          <p className="title-font text-3xl my-3 text-red-700 font-bold ">
            ৳{product?.price}
          </p>
          <div className="flex mb-4">
            <span className="flex items-center">
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 text-primary_color"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 text-primary_color"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 text-primary_color"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 text-primary_color"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 text-primary_color"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              <span className="text-gray-600 ml-3">4 Reviews</span>
            </span>
            <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
              <div className="text-gray-500">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </div>
              <div className="text-gray-500">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </div>
              <div className="text-gray-500">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                </svg>
              </div>
            </span>
          </div>
          <p className="leading-relaxed">{product?.description}</p>
          {(product?.sizes[0] !=="")  && product?.sizes?.length>0 &&( 
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex items-center">
                  <span className="mr-3">Size:</span>
                  <div className="flex gap-2 flex-wrap">
                    {product?.sizes.map(
                      (size) => (
                        <div
                          onClick={() => handleSize(size)}
                          className={`rounded border appearance-none border-gray-300 py-2 text-base px-3 flex cursor-pointer ${
                            selectedSize === size
                              ? "bg-primary_color text-white"
                              : "bg-white text-black"
                          }`}
                          key={size}
                        >
                          <p>{size?.toUpperCase()}</p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
          {product?.colors[0] !== '' && product?.colors.length > 0 && (
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex items-center">
                <span className="mr-3">Color:</span>
                <div className="flex gap-2 flex-wrap">
                  {product?.colors.map((color) => (
                    <div
                      onClick={() => handleColor(color)}
                      className={`rounded border appearance-none border-gray-300 py-2 text-base px-3 flex cursor-pointer ${
                        selectedColor === color
                          ? "bg-primary_color text-white"
                          : "bg-white text-black"
                      }`}
                      key={color}
                    >
                      <p>{color?.toUpperCase()}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex items-center">
                    <span className="mr-3">Adult:</span>
                    <div className="flex gap-2 flex-wrap">
                        {Object.entries(adultSizes).map(([size, value]) => (
                            <div className="rounded border appearance-none border-gray-300 py-2 text-base px-3 flex" key={size}>
                                <p>{size?.toUpperCase()} :</p>
                                <input
                                    className="ml-2 outline-none focus:outline-none w-10"
                                    type="number"
                                    name={size}
                                    value={value}
                                    onChange={(e) => {
                                      const newValue = parseInt(e.target.value);
                                      if (!isNaN(newValue)) {
                                          const updatedValue = Math.max(newValue, 0); // Ensure the value is not less than 0
                                          setAdultSizes({ ...adultSizes, [size]: updatedValue });
                                      }
                                  }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex items-center">
                    <span className="mr-3">Child:</span>
                    <div className="flex gap-2 flex-wrap">
                        {Object.entries(childSizes).map(([size, value]) => (
                            <div className="rounded border appearance-none border-gray-300 py-2 text-base px-3 flex" key={size}>
                                <p>{size.replace('_', '-')} :</p>
                                <input
                                    className="ml-2 outline-none focus:outline-none w-10"
                                    type="number"
                                    name={size}
                                    value={value}
                                    onChange={(e) => {
                                      const newValue = parseInt(e.target.value);
                                      if (!isNaN(newValue)) {
                                          const updatedValue = Math.max(newValue, 0); // Ensure the value is not less than 0
                                          setChildSizes({ ...childSizes, [size]: updatedValue });
                                      }
                                  }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div> */}

          <div className="flex mt-1 gap-x-4  w-full pb-2 items-center  border-b-2 border-gray-100 mb-2">
            <div className="flex flex-row h-10 rounded-lg relative bg-gray-200 ">
              <button
                data-action="decrement"
                className=" text-gray-900 hover:text-gray-700 h-full w-20 rounded-l cursor-pointer outline-none"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                <span className=" text-2xl font-bold">−</span>
              </button>
              <input
                type="number"
                className="outline-none w-[40px] h-[40px] focus:outline-none font-semibold text-md pl-2 bg-primary_color hover:text-black focus:text-black md:text-base cursor-default text-white flex justify-center items-center text-center custom-input-number"
                name="custom-input-number"
                value={quantity}
                readOnly
              />
              <button
                data-action="increment"
                className=" text-gray-900 hover:text-gray-700 h-full w-20 rounded-r cursor-pointer"
                onClick={() =>
                  setQuantity((prev) => Math.min(product.stock, prev + 1))
                }
              >
                <span className="m-auto text-2xl font-bold">+</span>
              </button>
            </div>
          </div>
          <div className="flex">
            <Link
              href={"/cart"}
              className="flex ml-auto"
              onClick={() => handleAddToCart()}
            >
              <button
                className={`text-white ${
                  totalSizes > 0
                    ? "bg-primary_color"
                    : "bg-primary_color hover:bg-primary_color"
                } cursor-pointer border-0 py-2 px-6 focus:outline-none hover:bg-primary_color rounded`}
              >
                ADD TO CART
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* </div> */}
    </section>
  );
};

export default SingleProduct;
