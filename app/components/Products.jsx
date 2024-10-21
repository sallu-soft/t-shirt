import React from 'react';
import ProductCard from './ProductCard';

const Products = ({products}) => {
  // const filteredProducts = selectedCategory === 'All'
  //   ? products
  //   : products.filter(product => product.category === selectedCategory);
  
  return (
    <div className="w-full">
      {/* <h2 className="my-4 py-3 flex justify-center text-secondary_color items-center font-semibold text-2xl relative after:content-[''] after:w-[40px] after:h-1 after:bg-primary_color after:absolute after:bottom-1 after:transition-all after:duration-300 hover:after:w-[100px]">
        {selectedCategory === 'All' ? 'All Products' : `Our Products`}
        Featured Products
      </h2> */}
      {products?<div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-col-1 gap-3">
        {products?.map((product,ind) => (
          <ProductCard key={ind} product={product} />
        ))}
      </div>:<div className="flex justify-center items-center w-full h-[80vh]">Loading...</div>}
      
    </div>
  );
};

export default Products;
