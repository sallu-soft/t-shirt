

'use client'
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState({ cartItems: [] });

  useEffect(() => {
    setCartToState();
  }, []);

  // Fetch the cart from localStorage
  const setCartToState = () => {
    const storedCart = localStorage.getItem("cart");
    setCart(storedCart ? JSON.parse(storedCart) : { cartItems: [] });
  };

  // Add item to the cart, increasing quantity if the item exists
  const addItemToCart = ({
  product,
  title,
  price,
  image,
  stock,
  quantity,
  color,
  size,
}) => {
  const newItem = {
    product,
    title,
    price,
    image,
    stock,
    quantity,
    color,
    size,
  };

  // Check if the item already exists in the cart (matching product, size, and color)
  const isItemExist = cart?.cartItems?.find(
    (i) =>
      i.product === newItem.product &&
      i.size === newItem.size &&
      i.color === newItem.color
  );

  let newCartItems;

  if (isItemExist) {
    // Update the existing item by adding the new quantity to the current quantity
    newCartItems = cart?.cartItems?.map((i) =>
      i.product === newItem.product && i.size === newItem.size && i.color === newItem.color
        ? { ...i, quantity: i.quantity + newItem.quantity } // Add quantities together
        : i
    );
  } else {
    // If the item doesn't exist, add it to the cart
    newCartItems = [...cart?.cartItems, newItem];
  }

  // Update cart state and save to localStorage
  setCart({ cartItems: newCartItems });
  localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
};
const increaseQty = (cartItem) => {
    const newQty = cartItem.quantity + 1;
  
    // Ensure we don't exceed the available stock
    if (newQty > cartItem.stock) return;
  
    // Map through the cart items and update the quantity of the matching item
    const updatedCartItems = cart.cartItems.map((item) =>
      item.product === cartItem.product && item.size === cartItem.size && item.color === cartItem.color
        ? { ...item, quantity: newQty } // Update the quantity
        : item
    );
  
    // Update cart state and localStorage
    setCart({ cartItems: updatedCartItems });
    localStorage.setItem("cart", JSON.stringify({ cartItems: updatedCartItems }));
  };
  
  const decreaseQty = (cartItem) => {
    const newQty = cartItem.quantity - 1;
  
    // Prevent the quantity from going below 1
    if (newQty <= 0) return;
  
    // Map through the cart items and update the quantity of the matching item
    const updatedCartItems = cart.cartItems.map((item) =>
      item.product === cartItem.product && item.size === cartItem.size && item.color === cartItem.color
        ? { ...item, quantity: newQty } // Update the quantity
        : item
    );
  
    // Update cart state and localStorage
    setCart({ cartItems: updatedCartItems });
    localStorage.setItem("cart", JSON.stringify({ cartItems: updatedCartItems }));
  };

  // Delete item from the cart
  const deleteItemFromCart = (id) => {
    const newCartItems = cart?.cartItems?.filter((i) => i.product !== id);

    // Update cart state and save to localStorage
    setCart({ cartItems: newCartItems });
    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
  };
  const emptyCart = () => {
    setCart({ cartItems: [] });
    localStorage.removeItem("cart"); // Remove cart from localStorage
  };

  return (
    <CartContext.Provider value={{ cart, increaseQty,decreaseQty, addItemToCart, deleteItemFromCart ,emptyCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;