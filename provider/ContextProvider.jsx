'use client'

import { createContext, useState } from "react";


export const Context = createContext();

const ContextProvider = ({children}) => {
    const [form, setForm] = useState({
        adultSizes:{},
        childSizes:{},
        totalSizes:0,
        title:"",
        price:0,
        images:[]
    });
    return (
        <Context.Provider value={{form, setForm}}>
            {children}
        </Context.Provider>
    )
}
export default ContextProvider;