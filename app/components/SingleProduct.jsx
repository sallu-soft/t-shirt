'use client'
import { CartContext } from '@/provider/CartContext';
import { Context } from '@/provider/ContextProvider';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'

const SingleProduct = ({product}) => {
    const router = useRouter();
    const { addItemToCart } = useContext(CartContext);
    const { products } = useContext(Context);
    // const [product, setProduct] = useState({});
    const [myimg, setMyimg] = useState(product?.images?.[0]);
    const [loading, setLoading] = useState(true);
  
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    
  const availableSizes = [
    ...new Set(
      product.skus
        ?.filter((sku) => sku.stock > 0 && sku.size)
        .map((sku) => sku.size)
    ),
  ];

  const availableColors = [
    ...new Set(
      product.skus
        ?.filter((sku) => sku.stock > 0 && sku.color)
        .map((sku) => sku.color)
    ),
  ];
  const selectedSKU = product.skus?.find(
    (sku) => sku.size === selectedSize && sku.color === selectedColor
  );

  const stock = selectedSKU ? selectedSKU.stock : 0;
  const totalStock = product?.skus?.reduce((acc, sku) => acc + sku.stock, 0) || 0;
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  const maxCharacters = 400; // Maximum characters to display initially
  const description = product?.description || "";
  const handleSize = (size) => {
    setSelectedSize(size);
  };

  const handleColor = (color) => {
    setSelectedColor(color);
  };

  const handleAddToCart = () => {
    addItemToCart({
      product: product._id,
      title: product.title,
      price: product.price - product?.discount,
      image: product.images[0],
      stock: product.stock,
      quantity: quantity, // set your quantity as needed
      size: selectedSize,
      color: selectedColor,
      sku: selectedSKU
    });
    router.push("/cart");
  };
   
  
    
  
    return (
      <>
      
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container flex flex-wrap px-5 py-5 md:py-10 mx-auto">
          <div className="relative md:w-1/2 w-2/2 gap-x-2 md:mx-0 mx-auto justify-center items-center flex flex-col">
            <Image
              height={500}
              width={500}
              alt={product?.title}
              className="w-[500px] border-primary_color border lg:h-fit object-contain object-center rounded "
              src={myimg}
            />
            {/* <div className="max-w-[100%] fluid__image-container justify-center flex">
            <ReactImageMagnify {...{
      smallImage: {
          alt: 'Product Image',
          isFluidWidth: true,
          src: myimg,
      },
      largeImage: {
          src: myimg,
          width: 800, // Adjust to control zoom level
          height: 1200,
      },
      enlargedImageContainerDimensions: {
        width: '150%',  // Adjust the width to eliminate the blank space
        height: '100%',
    },
      enlargedImageContainerStyle: { transform: 'translateX(-50%)' },
      shouldUsePositiveSpaceLens: true
  }} />
           </div> */}
            <div className="gap-2 flex mt-2 flex-wrap items-start">
              {product?.images?.map((currImg, index) => (
                <figure key={index}>
                  <Image
                    onClick={() => setMyimg(currImg)}
                    src={currImg}
                    alt={"sonot"}
                    className={`md:w-[90px] w-20 md:h-[90px] h-20 object-cover object-center rounded border-primary_color border ${
                      product?.stock < 1 ? "cursor-not-allowed" : ""
                    }`}
                    height={200}
                    width={200}
                  />
                </figure>
              ))}
            </div>
          </div>
  
          <div className="md:w-1/2 w-2/2 xl:pl-5 md:pl-2 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-md title-font font-semibold text-orange-700 tracking-widest pb-2">
              {product?.category}
            </h2>
            <h1 className="text-secondary_color text-3xl title-font font-medium mb-1">
              {product?.title}
            </h1>
  
            <p className="title-font my-3 text-red-700  ">
              <span className="text-3xl">৳{product && (product?.price)-(product?.discount)}</span> <span className="line-through text-md">৳{product?.price}</span>
            </p>
            <p className={` my-2 text-md title-font w-fit py-2 rounded-xl mb-1 ${totalStock > 0 ? " text-green-700" : " text-red-700"}`}>
              {totalStock > 0 ? "In Stock" : "Out of Stock"}
            </p>
            <p className="text-gray-600 text-lg title-font font-medium mb-1">
        {showFullDescription
          ? description
          : description.slice(0, maxCharacters) + (description.length > maxCharacters ? "..." : "")}{description.length > maxCharacters && (
            <button
              onClick={toggleDescription}
              className="text-blue-500 hover:underline focus:outline-none"
            >
              {showFullDescription ? "See Less" : "See More"}
            </button>
          )}
      </p>
      
           
  
            {/* Render size selection only if there are available sizes */}
            {availableSizes.length > 0 && (
              <div className="my-2">
                <span className="my-2">Sizes:</span>
                <div className="flex gap-2 flex-wrap">
                  {availableSizes.map((size) => (
                    <div
                      key={size}
                      onClick={() => handleSize(size)}
                      className={`rounded border appearance-none w-fit border-gray-300 py-2 text-base px-3 flex cursor-pointer ${
                        selectedSize === size ? "bg-primary_color text-white" : "bg-white text-black"
                      } ${stock < 1 ? "cursor-not-allowed opacity-50" : ""}`}
                      disabled={stock < 1}
                    >
                      <p>{size?.toUpperCase()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
  
            {/* Render color selection only if there are available colors */}
            {availableColors.length > 0 && (
              <div className="my-2">
                <span className="my-2">Colors:</span>
                <div className="flex gap-2 flex-wrap my-2">
                  {availableColors.map((color) => (
                    <div
                      key={color}
                      onClick={() => handleColor(color)}
                      className={`rounded border w-fit appearance-none border-gray-300 py-2 text-base px-3 flex cursor-pointer ${
                        selectedColor === color ? "bg-primary_color text-white" : "bg-white text-black"
                      } ${stock < 1 ? "cursor-not-allowed opacity-50" : ""}`}
                      disabled={stock < 1}
                    >
                      <p>{color?.toUpperCase()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
  
            {/* Quantity Selector and Add to Cart Button */}
            Quantity
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
            <div className="flex mt-3">
              <button
                className={`text-white py-3 px-5 rounded ${stock > 0 ? "bg-primary_color" : "bg-orange-200 cursor-not-allowed"}`}
                disabled={stock < 1}
                onClick={() => handleAddToCart()}
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
        
      </section>
      </>
    );
  };

export default SingleProduct