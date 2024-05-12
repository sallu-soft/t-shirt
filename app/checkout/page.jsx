'use client'
import { Context } from '@/provider/ContextProvider';
import axios from 'axios';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useContext, useState } from 'react'
import { useToast } from "@/components/ui/use-toast"

const Checkout = () => {
    const {toast} = useToast();
    const { form} = useContext(Context);
    const router = useRouter();
    const { childSizes, totalSizes, title, price, images, adultSizes, model } = form;
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        mobile_no: '',
        whatsapp: '',
        childSizes:childSizes,
        adultSizes:adultSizes,
        totalPrice:price*totalSizes,
        paymentMethod: 'Cash',
        model:model
      });
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
      const handleSubmit = async (e) => {
        
       
        if(!formData.name || !formData.mobile_no){
          alert("please provide required information");
          return
        }
        console.log(formData)
        try{
            const apiUrl = process.env.NEXT_PUBLIC_CORS;
         const res = await fetch(`api/orders`,{
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(formData)
          });
          console.log(res)
          if(res.ok) {
            
            router.push("/");
            router.refresh();
            toast({
              
              title: "Congratulations! Order Submited Successfully.",
              description: "There was a problem with your request.",
             
            })
          }else{
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
             
            })
            throw new Error("Failed to Submit An Order");
          }
        }catch(error){
          console.log(error)
        }
      }
      const handlePaymentMethodChange = (e) => {
        const paymentMethod = e.target.value;
        setFormData({
          ...formData,
          paymentMethod
        });
      };
      const HandleBkash = async () => {
        // console.log(process.env.NEXT_PUBLIC_CORS)
        try {
          const  {data}  = await axios.post(
            `${process.env.NEXT_PUBLIC_CORS}/api/bkash/payment/create`,
            { name: formData?.name,
            address: formData?.address,
            mobile_no: formData?.mobile_no,
            whatsapp: formData?.whatsapp,
            childSizes:childSizes,
            adultSizes:adultSizes,
            totalPrice:formData?.totalPrice,
            model:formData?.model,
            paymentMethod: formData?.paymentMethod,
            },
            { withCredentials: true }
          );
          console.log(data.bkashURL)
          window.location.href = data.bkashURL;
        } catch (error) {
          console.log("Hellow Bkash"+error);
        }
      };
    
  return (
    <div className="w-[70%] mx-auto mt-10">
        <div className="flex flex-wrap gap-x-10">
            <div className="w-[100%] md:w-[48%]">
                <h3 className="font-semibold text-xl">Billing & Shipping</h3>
                <div className="mt-4 grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-1">
                    <div class="sm:col-span-1">
                        <label for="name" class="block text-md font-medium leading-6 text-gray-900">আপনার নাম <span className="text-red-600">*</span></label>
                        <div class="mt-2">
                            <input type="text" name="name" id="name" autocomplete="given-name" class="block w-full rounded-md border-0  h-12 text-lg text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  px-3 " placeholder="আপনার সম্পূর্ন নাম লিখুন" value={formData.name}
                	        onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div class="sm:col-span-1">
                        <label for="address" class="block text-md font-medium leading-6 text-gray-900">আপনার ঠিকানা <span className="text-red-600">*</span></label>
                        <div class="mt-2">
                            <input type="text" name="address" id="address" autocomplete="given-name" class="block w-full rounded-md border-0 h-12 text-lg text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 px-3" placeholder="আপনার সম্পূর্ন ঠিকানা লিখুন" value={formData.address}
                            onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div class="sm:col-span-1">
                        <label for="mobile_no" class="block text-md font-medium leading-6 text-gray-900">ফোন নাম্বার <span className="text-red-600">*</span></label>
                        <div class="mt-2">
                            <input type="text" name="mobile_no" id="mobile_no" autocomplete="given-name" class="block w-full rounded-md border-0 h-12 text-lg text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 px-3" placeholder="আপনার সচল মোবাইল নাম্বার লিখুন" value={formData.mobile_no}
                            onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div class="sm:col-span-1">
                        <label for="whatsapp" class="block text-md font-medium leading-6 text-gray-900">What's app (optional)</label>
                        <div class="mt-2">
                            <input type="text" name="whatsapp" id="whatsapp" autocomplete="given-name" class="block w-full rounded-md border-0 h-12 text-lg text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 px-3" placeholder="আপনার সচল হোয়াটস অ্যাপ নাম্বার লিখুন" value={formData.whatsapp}
                            onChange={handleInputChange} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-1 w-[100%] md:w-[48%] shadow-2xl">
            
                <div className="relative h-full">
                    <div className="p-8  max-lg:mb-8">
                        <h2 className="text-xl font-semibold">Order Summary</h2>
                        <div className="space-y-6 mt-10">
                        <div className="grid sm:grid-cols-2 items-start gap-6">
                            <div className="max-w-[190px] px-4 py-6 shrink-0 bg-gray-200 rounded-md">
                            <Image src={images[0]} alt={title} width={200} height={100} className="w-full object-contain" />
                            </div>
                            <div>
                            <h3 className="text-[#333] text-lg">{title}</h3>
                            <ul className="text-xs text-[#333] space-y-2 mt-2">
                            <li className="flex gap-4 font-bold text-md  justify-between"><h3>Size :</h3>
                                    <div className="gap-3 flex flex-col w-[70%]"><div className="flex flex-wrap gap-3 font-bold text-md uppercase">{Object.entries(childSizes).map(([size, value], index) =>
                                        value !== 0 ? (<div className="flex gap-2">{`${size} -  ${value}`},</div>) : ""
                                    )}</div>
                                    <div className="flex gap-3 font-bold text-md uppercase">{Object.entries(adultSizes).map(([size, value], index) =>
                                        value !== 0 ? (<div className="flex gap-2">{`${size} -  ${value}`},</div>) : ""
                                    )}</div></div>
                                    {/* {totalSizes !== 0 && totalSizes} */}
                                </li>
                                <li className="flex flex-wrap gap-4 text-md font-bold">Quantity <span className="ml-auto text-md font-bold">{totalSizes}</span></li>
                                <li className="flex flex-wrap gap-4 font-bold text-md">Total Price <span className="ml-auto font-bold text-md">৳ {totalSizes*price}</span></li>
                            </ul>
                            </div>
                        </div>
                        
                        </div> 
                    </div>
                    <div className="absolute left-0 bottom-0 bg-gray-200 w-full p-4">
                        <h4 className="flex flex-wrap gap-4 text-base text-[#333] font-bold">Total <span className="ml-auto">৳{price*totalSizes}</span></h4>
                    </div>
                </div>

                
            </div>
        </div>
        <div className="my-3">
        <fieldset className="flex gap-x-6 py-3 bg-red-500 items-center px-2 rounded">
        <div className="flex items-center">
          <input
            id="pay_with_bikash"
            type="radio"
            name="Method"
            value="Bkash"
            checked={formData.paymentMethod === 'Bkash'}
            onChange={handlePaymentMethodChange}
            className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
            aria-labelledby="pay_with_bikash"
            aria-describedby="pay_with_bikash"
          />
          <label htmlFor="pay_with_bikash" className="text-md font-medium text-white ml-2 block">
            Pay With Bikash
          </label>
        </div>

        <div className="flex items-center">
          <input
            id="cash"
            type="radio"
            name="Method"
            value="Cash"
            checked={formData.paymentMethod === 'Cash'}
            onChange={handlePaymentMethodChange}
            className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
            aria-labelledby="cash"
            aria-describedby="cash"
          />
          <label htmlFor="cash" className="text-md font-medium text-white ml-2 block">
            Cash On Delivery
          </label>
        </div>
      </fieldset>
    <div className="my-4 flex justify-end">
        <button class="px-6 py-3 rounded text-lg font-semibold bg-orange-600 text-gray-100" onClick={()=>{if (formData.paymentMethod === 'Bkash') {
    HandleBkash(formData);
  } else {
    handleSubmit();
  }}}>অর্ডার কনফার্ম করুন</button>
    </div>
    </div>
    </div>
  )
}

export default Checkout