'use client'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Context } from '@/provider/ContextProvider';
import Image from 'next/image'
import Link from 'next/link';
import InvoicePage from '../components/InvoicePage'
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'

const SingleProduct = () => {
    const {form , setForm} = useContext(Context)
    const searchParams = useSearchParams();
    const description = searchParams?.get('description');
    const model = searchParams?.get('model');
    const images = JSON.parse(searchParams?.get('images'));
    const price = parseInt(searchParams?.get('price') || '0');
    const title = searchParams?.get('title');
    const [myimg, setMyimg] = useState(images?.[0]);
    const [adultSizes, setAdultSizes] = useState({
      s: 0,
      m: 0,
      l: 0,
      xl: 0,
      xxL: 0,
  });
  const [childSizes, setChildSizes] = useState({
      year4_5: 0,
      year6_7: 0,
      year8_10: 0,
      year11_13: 0,
  });
  const [totalSizes, setTotalSizes] = useState(0);
  useEffect(() => {
    // Calculate total sizes whenever individual sizes change
    const adultTotal = Object.values(adultSizes).reduce((acc, curr) => acc + curr, 0);
    const childTotal = Object.values(childSizes).reduce((acc, curr) => acc + curr, 0);
    setTotalSizes(adultTotal + childTotal);
   
  }, [adultSizes, childSizes]);
  const handleOrder = ()=>{
    setForm({
      adultSizes:adultSizes,
      childSizes:childSizes,
      price:price,
      title:title,
      totalSizes:totalSizes,
      images:images,
      model:model
    })
  };
  console.log(adultSizes, childSizes)
    // const router = useRouter();
    // const images = JSON.parse(router.query.images)
   
    
  return (
    <section className="text-gray-600 body-font overflow-hidden">
    <div className="container flex flex-wrap px-5 py-5 md:py-24 mx-auto">
      {/* <div className="lg:w-4/5 mx-auto flex flex-wrap"> */}
        <div className="md:w-1/2 w-2/2 gap-x-2 md:mx-0 mx-auto flex">
            <div className="gap-y-4 flex flex-col">
                
                 {
          images?.map((currImg,index)=>{
            return(
              <figure>
                <Image onClick={()=>{setMyimg(currImg)}} src={currImg} alt={"sonot"} className="w-full md:h-[130px] h-20 object-cover object-center rounded" key={index} height={400}
                width={400}/>
              </figure>
            )
          })
        }
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
            সাল্লু গার্মেন্টস 
          </h2>
          <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
            {title}
          </h1>
          <p className="title-font text-2xl my-3 font-semibold text-gray-900">
              ৳{price}
            </p>
          <div className="flex mb-4">
            <span className="flex items-center">
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 text-indigo-500"
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
                className="w-4 h-4 text-indigo-500"
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
                className="w-4 h-4 text-indigo-500"
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
                className="w-4 h-4 text-indigo-500"
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
                className="w-4 h-4 text-indigo-500"
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
          <p className="leading-relaxed">
           {description}
          </p>
          {/* <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
            
            <div className="flex items-center">
              <span className="mr-3">Adult:</span>
              <div className="flex gap-2 flex-wrap">
                <div className="rounded border appearance-none border-gray-300 py-2  text-base px-3 flex">
                  <p>S :</p>
                  <input className="ml-2 outline-none focus:outline-none w-10" type="number" name="small" id="small" defaultValue="0" />
                </div>
                <div className="rounded border appearance-none border-gray-300 py-2  text-base px-3 flex">
                  <p>M :</p>
                  <input className="ml-2 outline-none focus:outline-none w-10" type="number" name="medium" id="medium" defaultValue="0" />
                </div>
                <div className="rounded border appearance-none border-gray-300 py-2  text-base px-3 flex">
                  <p>L :</p>
                  <input className="ml-2 outline-none focus:outline-none w-10" type="number" name="large" id="large" defaultValue="0" />
                </div>
                <div className="rounded border appearance-none border-gray-300 py-2  text-base px-3 flex">
                  <p>XL :</p>
                  <input className="ml-2 outline-none focus:outline-none w-10" type="number" name="x-large" id="sm" defaultValue="0" />
                </div>
                <div className="rounded border appearance-none border-gray-300 py-2  text-base px-3 flex">
                  <p>XXL :</p>
                  <input className="ml-2 outline-none focus:outline-none w-10" type="number" name="xx-large" id="sm" defaultValue="0" />
                </div>
                
              </div>
            </div>
            
            
          </div>
          <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
          <div className="flex items-center">
              <span className="mr-3">Child:</span>
              <div className="flex gap-2 flex-wrap">
                <div className="rounded border appearance-none border-gray-300 py-2  text-base px-3 flex">
                  <p>4Y-5Y :</p>
                  <input className="ml-2 outline-none focus:outline-none w-10" type="number" name="year4-5" id="year4-5" defaultValue="0" />
                </div>
                <div className="rounded border appearance-none border-gray-300 py-2  text-base px-3 flex">
                  <p>6Y-7Y :</p>
                  <input className="ml-2 outline-none focus:outline-none w-10" type="number" name="year6-7" id="year6-7" defaultValue="0" />
                </div>
                <div className="rounded border appearance-none border-gray-300 py-2  text-base px-3 flex">
                  <p>8Y-10Y :</p>
                  <input className="ml-2 outline-none focus:outline-none w-10" type="number" name="year8-10" id="year8-10" defaultValue="0" />
                </div>
                <div className="rounded border appearance-none border-gray-300 py-2  text-base px-3 flex">
                  <p>11Y-13Y :</p>
                  <input className="ml-2 outline-none focus:outline-none w-10" type="number" name="year-11-13" id="year11-13" defaultValue="0" />
                </div>
               
                
              </div>
            </div>
          </div> */}

<div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex items-center">
                    <span className="mr-3">Adult:</span>
                    <div className="flex gap-2 flex-wrap">
                        {Object.entries(adultSizes).map(([size, value]) => (
                            <div className="rounded border appearance-none border-gray-300 py-2 text-base px-3 flex" key={size}>
                                <p>{size.toUpperCase()} :</p>
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
                                <p>{size.replace('_', '-').toUpperCase()} :</p>
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
            </div>
          {/* <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
            <div className="flex">
              <span className="mr-3">Color</span>
              <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
              <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
              <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button>
            </div>
            <div className="flex ml-6 items-center">
              <span className="mr-3">Size</span>
              <div className="relative">
                <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                  <option>SM</option>
                  <option>M</option>
                  <option>L</option>
                  <option>XL</option>
                </select>
                <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </div>
            </div>
            <div className="flex ml-6 items-center">
              <span className="mr-3">QTY</span>
              <div className="relative">
                <input className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base w-[150px] pl-3 pr-3" type="number"/>
                
              </div>
            </div>
          </div> */}
          <div className="flex mt-6 gap-x-4 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div>
                  <span className="mr-3">Total Quantity:</span>
                  <span>{totalSizes}</span>
                </div>
                <div>
                  <span className="mr-3">Total Price:</span>
                  <span>{totalSizes*price}</span>
                </div>
            </div>
          <div className="flex">
          
          <Link href={'/checkout'} className="flex ml-auto" onClick={()=>handleOrder()}><button disabled={totalSizes>0?false:true} className=" text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
              অর্ডার করুন</button></Link>
             
          </div>
        </div>
      </div>
    {/* </div> */}
  </section>
  )
}

export default SingleProduct