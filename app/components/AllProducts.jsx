'use client'
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { fetchProducts } from '@/app/(admin)/sallu_admin/actions';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Fetch products for the current page
  const loadMoreProducts = async () => {
    setLoading(true);
    try {
      const { products: newProducts, totalPages } = await fetchProducts(page);

      // Filter out duplicate products using product ID
      setProducts(prevProducts => {
        const productIds = prevProducts.map(product => product._id);
        const uniqueProducts = newProducts.filter(product => !productIds.includes(product._id));
        return [...prevProducts, ...uniqueProducts];
      });

      setHasMore(page < totalPages);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Load products when component mounts or page changes
    loadMoreProducts();
  }, [page]);

  // Detect scroll to the bottom to load more products
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        hasMore &&
        !loading
      ) {
        setPage(prevPage => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading]);

  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-col-1 gap-3">
        {products?.map((product, ind) => (
          <ProductCard key={product._id} product={product} /> 
        ))}
      </div>
      {loading && <div>Loading...</div>}
      {!hasMore && <div>No more products</div>}
    </div>
  );
};

export default AllProducts;