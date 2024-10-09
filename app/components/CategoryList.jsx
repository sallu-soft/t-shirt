import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { getCategories } from '../(admin)/sallu_admin/actions';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

const CategoryList = async () => {
  const { categories } = await getCategories();

  return (
      
      <Carousel className="w-full max-w-7xl mx-auto my-2">
      <CarouselContent className="-ml-1">
        
        {categories?.length > 0
            ? categories?.map((category, index) => {
                return (
                  <CarouselItem key={index} className="pl-1 basis-1/2 md:basis-1/4 lg:basis-1/6">
                  <Link
                    key={index}
                    href={`/search/${category?.category_name}`}
                    className="flex items-center justify-center gap-2 bg-orange-100 p-2 rounded-lg cursor-pointer hover:scale-110 transition-all ease-in-out"
                  >
                    <Image
                      src={category?.category_image}
                      alt={"icon"}
                      width={45}
                      height={45}
                    />
                    <h2 className="text-primary">{category?.category_name}</h2>
                  </Link>
                  </CarouselItem>
                );
              })
            : [1, 2, 3, 4, 5, 6].map((item, index) => (
                <div
                  key={index}
                  className="h-[120px] w-full bg-slate-200 animate-pulse rounded-lg"
                ></div>
              ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CategoryList;