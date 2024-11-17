import React from 'react'
import ProductCard from './ProductCard'
import { fetchProductByCategory } from '../(admin)/sallu_admin/actions'

const RelatedCatProduct =async ({product}) => {
    const {productsByCat} =await fetchProductByCategory(product.category);
  return (
    <div className="grid items-center lg:grid-cols-4 md:grid-cols-3 gap-3 sm:grid-cols-2 grid-cols-2 justify-center">
         {productsByCat?.map((productcat, ind) => (
           (product?._id == productcat?._id)?<ProductCard key={productcat._id} product={productcat} /> :""
         ))}
       </div>
  )
}

export default RelatedCatProduct