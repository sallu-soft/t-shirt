import CartContextProvider from '@/provider/CartContext'
import ContextProvider from '@/provider/ContextProvider'
import React from 'react'

const GlobalProvider = ({children}) => {
  return (
    <ContextProvider>
    <CartContextProvider>
        {children}
    </CartContextProvider>
    </ContextProvider>
  )
}

export default GlobalProvider