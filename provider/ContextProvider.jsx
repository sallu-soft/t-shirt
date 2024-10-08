'use client'


import { fetchProduct } from "@/app/(admin)/sallu_admin/actions";
import { createContext, useEffect, useState } from "react";


export const Context = createContext();

const ContextProvider = ({children}) => {
    const [products, setProducts] = useState([])
useEffect(() => {
    async function fetchProducts() {
      try {
        const {products} = await fetchProduct();
        setProducts(products); // Set the fetched categories
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    }

    fetchProducts();
  }, []);
    const [form, setForm] = useState({
        adultSizes:{},
        childSizes:{},
        totalSizes:0,
        title:"",
        price:0,
        images:[]
    });
    return (
        <Context.Provider value={{form, setForm, products}}>
            
            {children}
        </Context.Provider>
    )
}
export default ContextProvider;