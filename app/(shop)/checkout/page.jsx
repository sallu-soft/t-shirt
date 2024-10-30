"use client";
import { Context } from "@/provider/ContextProvider";
import axios from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { CartContext } from "@/provider/CartContext";
import { createOrder, reduceProductStock } from "@/app/(admin)/sallu_admin/actions";
import { UserContext } from "@/provider/UsersContext";

const Checkout = () => {
  const { cart, emptyCart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const totalAmount = cart?.cartItems?.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const [deliveryCharge, setDeliveryCharge] = useState(80);
  const { toast } = useToast();
  const { form } = useContext(Context);
  const router = useRouter();
  console.log(deliveryCharge)
  const [selectedOption, setSelectedOption] = useState("inside_dhaka");
  const { childSizes, totalSizes, title, price, images, adultSizes, model } =
    form;
  const [formData, setFormData] = useState({
    name: user?.name,
    address: user?.address,
    mobile_no: user?.phone,
    whatsapp: "",
    cart: cart?.cartItems,
    delivery_charge: deliveryCharge,
    totalPrice: totalAmount,
    paymentMethod: "Cash",
    user:user?._id,
  });
  console.log(formData)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      delivery_charge: deliveryCharge,
    }));
  }, [deliveryCharge]);
  const handleSubmit = async (e) => {
  
    // Create FormData object and append fields
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('name', formData.name);
    formDataToSubmit.append('address', formData.address);
    formDataToSubmit.append('mobile_no', formData.mobile_no);
    formDataToSubmit.append('whatsapp', formData.whatsapp);
    formDataToSubmit.append('delivery_charge', formData.delivery_charge);
    formDataToSubmit.append('totalPrice', formData.totalPrice);
    formDataToSubmit.append('paymentMethod', formData.paymentMethod);
    formDataToSubmit.append('user', formData.user);
    
    // Assuming cart is an array of objects, we need to stringify it before appending
    formDataToSubmit.append('cart', JSON.stringify(formData.cart));
    
    try {
      // Call the server action to handle order submission or update
      await createOrder(formDataToSubmit);
      for (const item of formData?.cart) {
        await reduceProductStock(item.product,item.sku, item.quantity);
      } // Assuming `submitOrder` is the function handling the request
      emptyCart();
      
      toast({
        title: 'Order submitted!',
        description: 'Your order has been successfully submitted.',
      });
      router.push("/")
      // Optionally redirect or update the UI as needed
    } catch (error) {
      console.error('Error submitting order:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit order.',
      });
    }
  };
  const handlePaymentMethodChange = (e) => {
    const paymentMethod = e.target.value;
    setFormData({
      ...formData,
      paymentMethod,
    });
  };
  const HandleBkash = async () => {
    // console.log(process.env.NEXT_PUBLIC_CORS)
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_CORS}/api/bkash/payment/create`,
        {
          name: formData?.name,
          address: formData?.address,
          mobile_no: formData?.mobile_no,
          whatsapp: formData?.whatsapp,
          childSizes: childSizes,
          adultSizes: adultSizes,
          totalPrice: formData?.totalPrice,
          model: formData?.model,
          paymentMethod: formData?.paymentMethod,
        },
        { withCredentials: true }
      );
      console.log(data.bkashURL);
      window.location.href = data.bkashURL;
    } catch (error) {
      console.log("Hellow Bkash" + error);
    }
  };
  if(user?.name){
  return (
    <div className="md:w-[70%] w-[95%] mx-auto mt-3 md:mt-10">
      <div className="flex flex-wrap gap-x-5">
        <div className="w-[100%] md:w-[48%] flex flex-col gap-y-2">
          <div className=" shadow-xl border border-primary_color p-6 rounded-lg">
            <h2 className="text-center text-lg font-bold text-yellow-600 mb-4">
              Delivery Information
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-1">
              <div class="sm:col-span-1">
                <label
                  for="name"
                  class="block text-md font-medium leading-6 text-gray-900"
                >
                  আপনার নাম <span className="text-red-600">*</span>
                </label>
                <div class="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autocomplete="given-name"
                    class="block w-full rounded-md border-0  h-12 text-lg text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  px-3 "
                    placeholder="আপনার সম্পূর্ন নাম লিখুন"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div class="sm:col-span-1">
                <label
                  for="address"
                  class="block text-md font-medium leading-6 text-gray-900"
                >
                  আপনার ঠিকানা <span className="text-red-600">*</span>
                </label>
                <div class="mt-2">
                  <textarea
                    col="3"
                    rows="3"
                    type="text"
                    name="address"
                    id="address"
                    autocomplete="given-name"
                    class="block w-full rounded-md border-0 min:h-12 text-lg text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 px-3"
                    placeholder="আপনার সম্পূর্ন ঠিকানা লিখুন"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div class="sm:col-span-1">
                <label
                  for="mobile_no"
                  class="block text-md font-medium leading-6 text-gray-900"
                >
                  ফোন নাম্বার <span className="text-red-600">*</span>
                </label>
                <div class="mt-2">
                  <input
                    type="text"
                    name="mobile_no"
                    id="mobile_no"
                    autocomplete="given-name"
                    class="block w-full rounded-md border-0 h-12 text-lg text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 px-3"
                    placeholder="আপনার সচল মোবাইল নাম্বার লিখুন"
                    value={formData.mobile_no}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div class="sm:col-span-1">
                <label
                  for="whatsapp"
                  class="block text-md font-medium leading-6 text-gray-900"
                >
                  What's app (optional)
                </label>
                <div class="mt-2">
                  <input
                    type="text"
                    name="whatsapp"
                    id="whatsapp"
                    autocomplete="given-name"
                    class="block w-full rounded-md border-0 h-12 text-lg text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 px-3"
                    placeholder="আপনার সচল হোয়াটস অ্যাপ নাম্বার লিখুন"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className=" shadow-xl border border-primary_color p-6 rounded-lg">
            <div className="">
              <h2 className="text-center text-lg font-bold text-yellow-600 mb-4">
                Shipping Method
              </h2>
              <div className="border border-gray-300 rounded-lg">
                {/* Inside Dhaka */}
                <label
                  className={`flex items-center justify-between p-4 border-b border-gray-300 ${
                    selectedOption === "inside_dhaka" ? "bg-gray-100" : ""
                  }`}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="shipping"
                      value="inside_dhaka"
                      selected
                      checked={selectedOption === "inside_dhaka"}
                      onChange={() => {
                        setSelectedOption("inside_dhaka");
                        setDeliveryCharge(80);
                      }}
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <div className="ml-3">
                      <span className="block font-bold text-gray-700">
                        INSIDE DHAKA
                      </span>
                      <span className="block text-sm text-gray-500">
                        WITHIN 1 - 2 WORKING DAYS
                      </span>
                    </div>
                  </div>
                  <div className="font-semibold text-gray-700">৳80.00</div>
                </label>

                {/* Outside Dhaka */}
                <label
                  className={`flex items-center justify-between p-4 ${
                    selectedOption === "outside_dhaka" ? "bg-gray-100" : ""
                  }`}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="shipping"
                      value="outside_dhaka"
                      checked={selectedOption === "outside_dhaka"}
                      onChange={() => {
                        setSelectedOption("outside_dhaka");
                        setDeliveryCharge(120);
                      }}
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <div className="ml-3">
                      <span className="block font-bold text-gray-700">
                        OUTSIDE DHAKA
                      </span>
                      <span className="block text-sm text-gray-500">
                        WITHIN 3 - 4 WORKING DAYS
                      </span>
                    </div>
                  </div>
                  <div className="font-semibold text-gray-700">৳120.00</div>
                </label>
                <label
                  className={`flex items-center justify-between p-4 ${
                    selectedOption === "cumilla" ? "bg-gray-100" : ""
                  }`}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="shipping"
                      value="cumilla"
                      checked={selectedOption === "cumilla"}
                      onChange={() => {
                        setSelectedOption("cumilla");
                        setDeliveryCharge(50);
                      }}
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <div className="ml-3">
                      <span className="block font-bold text-gray-700">
                        CUMILLA
                      </span>
                      <span className="block text-sm text-gray-500">
                        WITHIN 1 WORKING DAYS
                      </span>
                    </div>
                  </div>
                  <div className="font-semibold text-gray-700">৳50.00</div>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-1 w-[100%] md:w-[48%] h-fit shadow-2xl">
          <div className="relative h-full">
            <div className="px-3 py-4  max-lg:mb-8">
              <h2 className="text-xl font-semibold py-2">Order Summary</h2>
              {/* <div className="space-y-6 mt-10">
                <div className="grid sm:grid-cols-2 items-start gap-6">
                  <div className="max-w-[190px] px-4 py-6 shrink-0 bg-gray-200 rounded-md">
                    <Image
                      src={images[0]}
                      alt={title}
                      width={200}
                      height={100}
                      className="w-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-[#333] text-lg">{title}</h3>
                    <ul className="text-xs text-[#333] space-y-2 mt-2">
                      <li className="flex gap-4 font-bold text-md  justify-between">
                        <h3>Size :</h3>
                        <div className="gap-3 flex flex-col w-[70%]">
                          <div className="flex flex-wrap gap-3 font-bold text-md uppercase">
                            {Object.entries(childSizes).map(
                              ([size, value], index) =>
                                value !== 0 ? (
                                  <div className="flex gap-2">
                                    {`${size} -  ${value}`},
                                  </div>
                                ) : (
                                  ""
                                )
                            )}
                          </div>
                          <div className="flex gap-3 font-bold text-md uppercase">
                            {Object.entries(adultSizes).map(
                              ([size, value], index) =>
                                value !== 0 ? (
                                  <div className="flex gap-2">
                                    {`${size} -  ${value}`},
                                  </div>
                                ) : (
                                  ""
                                )
                            )}
                          </div>
                        </div>
                      
                      </li>
                      <li className="flex flex-wrap gap-4 text-md font-bold">
                        Quantity{" "}
                        <span className="ml-auto text-md font-bold">
                          {totalSizes}
                        </span>
                      </li>
                      <li className="flex flex-wrap gap-4 font-bold text-md">
                        Total Price{" "}
                        <span className="ml-auto font-bold text-md">
                          ৳ {totalSizes * price}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div> */}
              
                {cart?.cartItems?.map((cartItem) => (
                  <div>
                    <div className="flex flex-wrap justify-between lg:flex-row gap-5  mb-4">
                      <div className="w-full lg:w-2/5 xl:w-2/4">
                        <figure className="flex leading-5">
                          <div>
                            <div className="block w-16 h-16 rounded border border-gray-200 overflow-hidden">
                              <img src={cartItem.image} alt={cartItem.title} />
                            </div>
                          </div>
                          <figcaption className="ml-3">
                            <p>
                              <a href="#" className="hover:text-blue-600">
                                {cartItem.title}
                              </a>
                            </p>
                            <p className="mt-1 text-gray-400">
                              {" "}
                              size & color: {cartItem.size} X {cartItem.color}
                            </p>
                          </figcaption>
                        </figure>
                      </div>
                      <div>
                        {cartItem.quantity}
                      </div>
                      <div>
                        <div className="leading-5">
                          <p className="font-semibold not-italic">
                            ৳{cartItem.price * cartItem.quantity.toFixed(2)}
                          </p>
                          <small className="text-gray-400">
                            {" "}
                            ৳{cartItem.price} / per item{" "}
                          </small>
                        </div>
                      </div>
                     
                    </div>

                    <hr className="my-4" />
                  </div>
                ))}
              
            </div>

            <div className="mb-10 w-full px-4 pb-9">
              <h4 className="flex flex-wrap gap-4 text-base text-[#333] font-bold">
                Delivery Charge
                <span className="ml-auto">৳{deliveryCharge}</span>
              </h4>
            </div>
            <div className="absolute left-0 bottom-0  bg-gray-200 w-full p-4">
              <h4 className="flex flex-wrap gap-4 text-base text-[#333] font-bold">
                Total{" "}
                <span className="ml-auto">৳{totalAmount + deliveryCharge}</span>
              </h4>
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
              checked={formData.paymentMethod === "Bkash"}
              onChange={handlePaymentMethodChange}
              className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
              aria-labelledby="pay_with_bikash"
              aria-describedby="pay_with_bikash"
            />
            <label
              htmlFor="pay_with_bikash"
              className="text-md font-medium text-white ml-2 block"
            >
              Pay With Bikash
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="cash"
              type="radio"
              name="Method"
              value="Cash"
              checked={formData.paymentMethod === "Cash"}
              onChange={handlePaymentMethodChange}
              className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
              aria-labelledby="cash"
              aria-describedby="cash"
            />
            <label
              htmlFor="cash"
              className="text-md font-medium text-white ml-2 block"
            >
              Cash On Delivery
            </label>
          </div>
        </fieldset>
        <div className="my-4 flex justify-end">
          <button
            class="px-6 py-3 rounded text-lg font-semibold bg-orange-600 text-gray-100"
            onClick={() => {
              if (formData.paymentMethod === "Bkash") {
                HandleBkash(formData);
              } else {
                handleSubmit();
              }
            }}
          >
            অর্ডার কনফার্ম করুন
          </button>
        </div>
      </div>
    </div>
  )}else{
    router.push('/login')
  };
};

export default Checkout;
