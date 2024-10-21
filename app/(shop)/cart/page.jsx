'use client';
import { toast } from '@/components/ui/use-toast';
import { CartContext } from '@/provider/CartContext';
import { UserContext } from '@/provider/userContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';

const CartPage = () => {
    const router = useRouter();
    const { addItemToCart, deleteItemFromCart, increaseQty,decreaseQty, cart } = useContext(CartContext);
    const handleContinue = () => {
      if (user) {
        router.push('/checkout'); // Navigate to checkout if user exists
      } else {
        toast({
          variant:"destructive",
          title: "Please Login",
          description: "Please Login First to Checkout",
        });
        router.push('/login'); // Redirect to login page
      }
    };
    const { user } = useContext(UserContext);
    console.log(cart?.cartItems)
    // const increaseQty = (cartItem) => {
    //   const newQty = cartItem?.quantity + 1;
    //   const item = { ...cartItem, quantity: newQty };
  
    //   if (newQty > Number(cartItem.stock)) return;
  
    //   addItemToCart(item);
    // };
  
    // const decreaseQty = (cartItem) => {
    //   const newQty = cartItem?.quantity - 1;
    //   const item = { ...cartItem, quantity: newQty };
  
    //   if (newQty <= 0) return;
  
    //   addItemToCart(item);
    // };
    // const increaseQty = (cartItem) => {
    //   const newQty = cartItem?.quantity + 1;
      
    //   if (newQty > Number(cartItem.stock)) return; // Don't exceed stock
    
    //   // Call addItemToCart to update the quantity of the existing item
    //   addItemToCart({
    //     ...cartItem, // Spread the existing item details
    //     quantity: newQty // Update the quantity
    //   });
    // };
    
    // const decreaseQty = (cartItem) => {
    //   const newQty = cartItem?.quantity - 1;
    
    //   if (newQty <= 0) return; // Prevent quantity from going below 1
    
    //   // Call addItemToCart to update the quantity of the existing item
    //   addItemToCart({
    //     ...cartItem, // Spread the existing item details
    //     quantity: newQty // Update the quantity
    //   });
    // };
    
    const amountWithoutTax = cart?.cartItems?.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
  
    const taxAmount = (amountWithoutTax * 0.15).toFixed(2);
  
    const totalAmount = (Number(amountWithoutTax) + Number(taxAmount)).toFixed(2);
    return (
    //   <div className="min-h-[70vh] lg:w-[60%] md:w-[80%] w-[95%] mx-auto">
    //     {
    //       carth?.map((i) => (
    //         <p key={i.product}>{i.title}</p>
    //       ))
    //     }
    //   </div>
    <>
    <section className="py-3  sm:py-5 bg-orange-100">
      <div className="container max-w-screen-xl mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-2">
          {cart?.cartItems?.length || 0} Item(s) in Cart
        </h2>
      </div>
    </section>

    {cart?.cartItems?.length > 0 ? (
      <section className="py-10">
        <div className="container max-w-screen-xl  mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <main className="md:w-3/4">
              <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                {cart?.cartItems?.map((cartItem) => (
                  <div>
                    <div className="flex flex-wrap lg:flex-row gap-5  mb-4">
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
                      <div className="w-24">
                        <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                        <button
                            data-action="decrement"
                            className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                            onClick={() => decreaseQty(cartItem)}
                            >
                            <span className="m-auto text-2xl font-thin">−</span>
                            </button>
                            <input
                            type="number"
                            className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-basecursor-default flex items-center text-gray-900 custom-input-number"
                            name="custom-input-number"
                            value={cartItem.quantity}
                            readOnly
                            />
                            <button
                            data-action="increment"
                            className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                            onClick={() => increaseQty(cartItem)}
                            >
                            <span className="m-auto text-2xl font-thin">+</span>
                            </button>
                        </div>
                      </div>
                      <div>
                        <div className="leading-5">
                          <p className="font-semibold not-italic">
                            ${cartItem.price * cartItem.quantity.toFixed(2)}
                          </p>
                          <small className="text-gray-400">
                            {" "}
                            ${cartItem.price} / per item{" "}
                          </small>
                        </div>
                      </div>
                     
                      <div className="flex-auto">
                        <div className="float-right">
                          <a
                            className="px-4 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                            onClick={() =>
                              deleteItemFromCart(cartItem?.product)
                            }
                          >
                            Remove
                          </a>
                        </div>
                      </div>
                    </div>

                    <hr className="my-4" />
                  </div>
                ))}
              </article>
            </main>
            <aside className="md:w-1/4">
              <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                <ul className="mb-5">
                  <li className="flex justify-between text-gray-600  mb-1">
                    <span>Amount before Tax:</span>
                    <span>${amountWithoutTax}</span>
                  </li>
                  <li className="flex justify-between text-gray-600  mb-1">
                    <span>Total Units:</span>
                    <span className="text-primary_color">
                      {cart?.cartItems?.reduce(
                        (acc, item) => acc + item.quantity,
                        0
                      )}{" "}
                      (Units)
                    </span>
                  </li>
                  <li className="flex justify-between text-gray-600  mb-1">
                    <span>TAX:</span>
                    <span>${taxAmount}</span>
                  </li>
                  <li className="text-lg font-bold border-t flex justify-between mt-3 pt-3">
                    <span>Total price:</span>
                    <span>${totalAmount}</span>
                  </li>
                </ul>

                <button onClick={()=>handleContinue()} className="px-4 py-3 mb-2 inline-block text-lg w-full text-center font-medium text-white bg-primary_color border border-transparent rounded-md hover:bg-orange-700 cursor-pointer">
                  Continue 
                </button>

                <Link
                  href="/"
                  className="px-4 py-3 inline-block text-lg w-full text-center font-medium text-primary_color bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100"
                >
                  Back to shop
                </Link>
              </article>
            </aside>
          </div>
        </div>
      </section>
    ):(
      <div className="justify-center items-center flex h-[55vh]">
        <Link href="/" className="bg-primary_color px-4 py-3 rounded-md ">
          Back To Shopping
        </Link>
      </div>
    )}
  </>
    );
};

export default CartPage;