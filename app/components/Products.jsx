import React from 'react';
import ProductCard from './ProductCard';

const Products = ({ products, selectedCategory }) => {
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="lg:w-[70%] mt-5 md:w-[90%] w-[95%] my-4 mx-auto">
      <h2 className="my-4 py-3 flex justify-center text-secondary_color items-center font-semibold text-2xl relative after:content-[''] after:w-[40px] after:h-1 after:bg-primary_color after:absolute after:bottom-1 after:transition-all after:duration-300 hover:after:w-[100px]">
        {selectedCategory === 'All' ? 'All Products' : `${selectedCategory} Products`}
      </h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-col-1 gap-3">
        {filteredProducts.map((product,ind) => (
          <ProductCard key={ind} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;