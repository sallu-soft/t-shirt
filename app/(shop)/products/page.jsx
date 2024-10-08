import { fetchProduct } from '@/app/(admin)/sallu_admin/actions';
import Products from '@/app/components/Products';
import Shop from '@/app/components/Shop';
import React from 'react'

const ProductPage = async () => {
    const {products} = await fetchProduct();
  return (
    <div className="text-black">
       <Shop products={products}/>
    </div>
  )
}

export default ProductPage