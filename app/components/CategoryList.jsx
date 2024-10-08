
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { getCategories } from '../(admin)/sallu_admin/actions';

const CategoryList = async () => {
    
    const {categories} = await getCategories();
  return (
    <div className={`mx-4 my-3 md:mx-22 lg:mx-52 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4`}>
        {categories?.length>0 ?
        categories?.map((category,index)=>{
               return <Link href={`/search/${category?.category_name}`} className={`flex flex-col items-center justify-center gap-2 bg-purple-100 p-5 rounded-lg cursor-pointer hover:scale-110 transition-all ease-in-out`}>
                    <Image src={category?.category_image} alt={"icon"} width={45} height={45}/>
                    <h2 className="text-primary">{category?.category_name}</h2>
                    </Link>
            })
        :
            [1,2,3,4,5,6].map((item,index)=>(
                <div className="h-[120px] w-full bg-slate-200 animate-pulse rounded-lg"></div>
            ))
        }
    </div>
  )
}

export default CategoryList;