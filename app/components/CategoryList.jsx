
import React from 'react';
import { getCategories } from '../(admin)/sallu_admin/actions';

import CatCarousel from './CatCarousel';

const CategoryList = async () => {
  const { categories } = await getCategories();

  return (
      
     <CatCarousel categories={categories}/>
  );
};

export default CategoryList;
