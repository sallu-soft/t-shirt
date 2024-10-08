import { fetchProduct } from '@/app/(admin)/sallu_admin/actions';
import Products from '@/app/components/Products';
import React from 'react'

const page =async () => {
    const {products} =await fetchProduct();
  return (
    <Products products={products}/>
  )
}

export default page