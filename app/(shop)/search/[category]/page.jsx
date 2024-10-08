'use client';

import { fetchProduct, fetchProductByCategory } from '@/app/(admin)/sallu_admin/actions';
import Products from '@/app/components/Products';
import React, { useEffect, useState } from 'react';

const ProductsByCategory = ({ params }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const {productsByCat} =await fetchProductByCategory(params.category);
        setProducts(productsByCat); // Update state with products
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    }

    params && getProducts(); 
  }, [params]);

  return (
    <div>
      <Products products={products} />
      
    </div>
  );
};

export default ProductsByCategory;

