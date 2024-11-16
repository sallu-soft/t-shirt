'use client'
import React, { useRef } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import Image from 'next/image';
const CatCarousel = ({categories}) => {
    const plugin = useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
      )
  return (
    
    <Carousel plugins={[
        plugin.current
      ]} onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset} className="w-full max-w-7xl mx-auto md:px-0 px-3 my-2">
      <CarouselContent className="-ml-1">
        <CarouselItem className="pl-1 basis-1/2 md:basis-1/4 lg:basis-1/6">
        <Link
                    
                    href="/search/products"
                    className="flex items-center justify-center gap-2 bg-orange-100 p-1 sm:p-2 rounded-lg py-[7px] cursor-pointer hover:scale-110 transition-all ease-in-out"
                  >
                    
                    <h2 className="text-primary sm:text-base text-sm md:py-2.5 py-0">All Products</h2>
                  </Link>
        </CarouselItem>
        {categories?.length > 0
            ? categories?.map((category, index) => {
                return (
                  <CarouselItem key={index} className="pl-1 basis-1/2 md:basis-1/4 lg:basis-1/6">
                  
                  <Link
                    key={index}
                    href={`/search/${category?.category_name}`}
                    className="flex items-center justify-center gap-2 bg-orange-100 p-1 sm:p-2 rounded-lg cursor-pointer hover:scale-110 transition-all ease-in-out"
                  >
                    <Image
                      src={category?.category_image}
                      alt={"icon"}
                      width={45}
                      height={45}
                      className="sm:w-[45px] sm:h-[45px] w-[25px] h-[25px]"
                    />
                    <h2 className="text-primary sm:text-base text-sm">{category?.category_name}</h2>
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
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  )
}

export default CatCarousel