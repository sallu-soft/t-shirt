
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
// 'use client'
// import Image from 'next/image';
// import Link from 'next/link';
// import React, { useEffect, useRef, useState } from 'react';
// import { getCategories } from '../(admin)/sallu_admin/actions';
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from '@/components/ui/carousel';
// import { Card, CardContent } from '@/components/ui/card';

// const CategoryList = async () => {
//   const { categories } = await getCategories();
//   const carouselRef = useRef(null);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) =>
//         prevIndex + 1 >= (categories?.length || 1) ? 0 : prevIndex + 1
//       );
//     }, 3000); // 3-second interval for auto-move
//     return () => clearInterval(interval);
//   }, [categories]);

//   useEffect(() => {
//     if (carouselRef.current) {
//       carouselRef.current.scrollLeft = currentIndex * (carouselRef.current.offsetWidth);
//     }
//   }, [currentIndex]);

//   return (
//     <Carousel className="w-full max-w-7xl mx-auto my-2 overflow-hidden" ref={carouselRef}>
//       <CarouselContent className="flex transition-all duration-500">
//         {categories?.length > 0
//           ? categories.map((category, index) => (
//               <CarouselItem
//                 key={index}
//                 className="flex-none w-1/2 md:w-1/4 lg:w-1/6 px-2"
//               >
//                 <Link
//                   href={`/search/${category?.category_name}`}
//                   className="flex flex-col items-center justify-center gap-2 bg-orange-100 p-2 rounded-lg hover:scale-105 transition-all ease-in-out"
//                 >
//                   <Image src={category?.category_image} alt="icon" width={45} height={45} />
//                   <h2 className="text-primary text-center text-sm md:text-base">
//                     {category?.category_name}
//                   </h2>
//                 </Link>
//               </CarouselItem>
//             ))
//           : Array.from({ length: 6 }).map((_, index) => (
//               <div
//                 key={index}
//                 className="h-[120px] w-full bg-slate-200 animate-pulse rounded-lg"
//               ></div>
//             ))}
//       </CarouselContent>
//       <CarouselPrevious onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))} />
//       <CarouselNext
//         onClick={() =>
//           setCurrentIndex((prev) =>
//             prev + 1 >= (categories?.length || 1) ? 0 : prev + 1
//           )
//         }
//       />
//     </Carousel>
//   );
// };

// export default CategoryList;