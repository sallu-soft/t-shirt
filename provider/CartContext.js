

// 'use client'
// import { createContext, useEffect, useState } from "react";

// export const CartContext = createContext();

// const CartContextProvider = ({ children }) => {
//   const [cart, setCart] = useState({ cartItems: [] });

//   useEffect(() => {
//     setCartToState();
//   }, []);

//   const setCartToState = () => {
//     const storedCart = localStorage.getItem("cart");
//     setCart(storedCart ? JSON.parse(storedCart) : { cartItems: [] });
//   };
//   const addItemToCart = ({
//   product,
//   title,
//   price,
//   image,
//   stock,
//   quantity,
//   color,
//   size,
//   sku
// }) => {
//   const newItem = {
//     product,
//     title,
//     price,
//     image,
//     stock,
//     quantity,
//     color,
//     size,
//     sku,
//   };
//   const isItemExist = cart?.cartItems?.find(
//     (i) =>
//       i.product === newItem.product &&
//       i.size === newItem.size &&
//       i.color === newItem.color
//   );

//   let newCartItems;

//   if (isItemExist) {
//     newCartItems = cart?.cartItems?.map((i) =>
//       i.product === newItem.product && i.size === newItem.size && i.color === newItem.color
//         ? { ...i, quantity: i.quantity + newItem.quantity } // Add quantities together
//         : i
//     );
//   } else {
//     newCartItems = [...cart?.cartItems, newItem];
//   }
//   setCart({ cartItems: newCartItems });
//   localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
// };
// const increaseQty = (cartItem) => {
//     const newQty = cartItem.quantity + 1;
  
//     if (newQty > cartItem.stock) return;
//     const updatedCartItems = cart.cartItems.map((item) =>
//       item.product === cartItem.product && item.size === cartItem.size && item.color === cartItem.color
//         ? { ...item, quantity: newQty } // Update the quantity
//         : item
//     );
  
//     // Update cart state and localStorage
//     setCart({ cartItems: updatedCartItems });
//     localStorage.setItem("cart", JSON.stringify({ cartItems: updatedCartItems }));
//   };
  
//   const decreaseQty = (cartItem) => {
//     const newQty = cartItem.quantity - 1;
  
//     // Prevent the quantity from going below 1
//     if (newQty <= 0) return;
  
//     // Map through the cart items and update the quantity of the matching item
//     const updatedCartItems = cart.cartItems.map((item) =>
//       item.product === cartItem.product && item.size === cartItem.size && item.color === cartItem.color
//         ? { ...item, quantity: newQty } // Update the quantity
//         : item
//     );
  
//     // Update cart state and localStorage
//     setCart({ cartItems: updatedCartItems });
//     localStorage.setItem("cart", JSON.stringify({ cartItems: updatedCartItems }));
//   };

//   // Delete item from the cart
//   const deleteItemFromCart = (id) => {
//     const newCartItems = cart?.cartItems?.filter((i) => i.product !== id);

//     // Update cart state and save to localStorage
//     setCart({ cartItems: newCartItems });
//     localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
//   };
//   const emptyCart = () => {
//     setCart({ cartItems: [] });
//     localStorage.removeItem("cart"); // Remove cart from localStorage
//   };

//   return (
//     <CartContext.Provider value={{ cart, increaseQty,decreaseQty, addItemToCart, deleteItemFromCart ,emptyCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export default CartContextProvider;

'use client';
import { createContext, useEffect, useState } from "react";

const CartContext = createContext();
let emptyCart;
const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState({ cartItems: [] });

  useEffect(() => {
    setCartToState();
  }, []);

  const setCartToState = () => {
    const storedCart = localStorage.getItem("cart");
    setCart(storedCart ? JSON.parse(storedCart) : { cartItems: [] });
  };

  const addItemToCart = ({ product, title, price, image, stock, quantity, color, size, sku }) => {
    const newItem = { product, title, price, image, stock, quantity, color, size, sku };

    // Check if the item already exists in the cart based on SKU, color, and size
    const isItemExist = cart.cartItems.find(
      (i) => i.sku.sku === newItem.sku.sku && i.color === newItem.color && i.size === newItem.size
    );

    let newCartItems;

    if (isItemExist) {
      // Increase the quantity of the existing item by the quantity selected by the user
      newCartItems = cart.cartItems.map((i) =>
        i.sku.sku === newItem.sku.sku && i.color === newItem.color && i.size === newItem.size
          ? { ...i, quantity: i.quantity + quantity } // Update quantity
          : i
      );
    } else {
      // Add the new item if it doesn't exist
      newCartItems = [...cart.cartItems, newItem];
    }

    setCart({ cartItems: newCartItems });
    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
  };

  const increaseQty = (cartItem) => {
    const newQty = cartItem.quantity + 1;
    if (newQty > cartItem.stock) return;

    const updatedCartItems = cart.cartItems.map((item) =>
      item.sku.sku === cartItem.sku.sku && item.color === cartItem.color && item.size === cartItem.size
        ? { ...item, quantity: newQty }
        : item
    );

    setCart({ cartItems: updatedCartItems });
    localStorage.setItem("cart", JSON.stringify({ cartItems: updatedCartItems }));
  };

  const decreaseQty = (cartItem) => {
    const newQty = cartItem.quantity - 1;
    if (newQty <= 0) return;

    const updatedCartItems = cart.cartItems.map((item) =>
      item.sku.sku === cartItem.sku.sku && item.color === cartItem.color && item.size === cartItem.size
        ? { ...item, quantity: newQty }
        : item
    );

    setCart({ cartItems: updatedCartItems });
    localStorage.setItem("cart", JSON.stringify({ cartItems: updatedCartItems }));
  };

  const deleteItemFromCart = (sku) => {
    const newCartItems = cart.cartItems.filter((i) => i.product !== sku); // Ensure to filter by SKU

    setCart({ cartItems: newCartItems });
    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
  };

  emptyCart = () => {
    setCart({ cartItems: [] });
    localStorage.removeItem("cart");
  };
  
  return (
    <CartContext.Provider value={{ cart, increaseQty, decreaseQty, addItemToCart, deleteItemFromCart, emptyCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
export {CartContext , emptyCart}