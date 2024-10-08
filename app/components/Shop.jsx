'use client'
import React, { useState } from 'react';
import Categories from './Categories';
import Products from './Products';
// import products from '@/product';
const Shop = ({products}) => {
  const [selectedCategory, setSelectedCategory] = useState('All'); // Default to 'All' or any category

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <Categories onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory} products={products}/>
      <Products products={products} selectedCategory={selectedCategory} />
    </div>
  );
};

export default Shop;