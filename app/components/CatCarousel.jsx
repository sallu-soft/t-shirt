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
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  )
}

export default CatCarousel