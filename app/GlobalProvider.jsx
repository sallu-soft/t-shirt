import CartContextProvider from '@/provider/CartContext'
import ContextProvider from '@/provider/ContextProvider'
import UserContextProvider from '@/provider/userContext'
import React from 'react'

const GlobalProvider = ({children}) => {
  return (
    <UserContextProvider>
    <ContextProvider>
    <CartContextProvider>
        {children}
    </CartContextProvider>
    </ContextProvider>
    </UserContextProvider>
  )
}

export default GlobalProvider