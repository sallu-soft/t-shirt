'use client'
import React from 'react';
import CategoryCard from './CategoryCard';

const Categories = ({ onCategorySelect ,selectedCategory, products }) => {
  const uniqueCategories = ['All', ...new Set(products?.map(product => product?.category))]; // 'All' as default option
  console.log(products)
  return (
    
    <div className="lg:w-[70%] mt-5 md:w-[90%] w-[95%] my-4 mx-auto">
  <h2 className="my-4 py-3 flex justify-center text-secondary_color items-center font-semibold text-2xl relative after:content-[''] after:w-[40px] after:h-1 after:bg-primary_color after:absolute after:bottom-1 after:transition-all after:duration-300 hover:after:w-[100px]">
    Categories
  </h2>
  <div className="grid lg:grid-cols-8 md:grid-cols-3 sm:grid-cols-2 grid-col-1 gap-3">
    {uniqueCategories.map((category, index) => (
      <button
        key={index}
        onClick={() => onCategorySelect(category)}
        className={`transition-colors duration-300 ${
          selectedCategory === category ? 'border-secondary_color border-2' : ''
        }`}
      >
        <CategoryCard category={category} />
      </button>
    ))}
  </div>
</div>
  );
};

export default Categories;