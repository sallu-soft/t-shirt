'use client'
import { createContext, useEffect, useState } from "react";


export const CartContext = createContext();

const CartContextProvider = ({children}) => {
    const [cart, setCart] = useState({});
    useEffect(()=>{
        setCartToState();
    },[]);
    const setCartToState = () => {
        setCart(localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[]);
    }
    const deleteItemFromCart = (id) => {
        const newCartItems = cart?.cartItems?.filter((i) => i.product !== id);
    
        localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
        setCartToState();
      };
        const addItemToCart = async ({
        product,
        title,
        price,
        image,
        stock,
        quantity=1,
    }) =>{
        const item = {
            product,
            title,
            price,
            image,
            stock,
            quantity,
        };
        const isItemExist = cart?.cartItems?.find((i)=> i.product === item.product)
        let newCartItem;
        if(isItemExist){
            newCartItem = cart?.cartItems?.map((i)=> i.product === isItemExist.product ? item : i)
        }else{
            newCartItem = [...(cart?.cartItems || []),item]
        }
        localStorage.setItem("cart", JSON.stringify({cartItems:newCartItem}));
        setCartToState();
    }
    return (
        <CartContext.Provider value={{cart,addItemToCart,deleteItemFromCart}}>
            {children}
        </CartContext.Provider>
    )
}
export default CartContextProvider;