'use client'
import { fetchProduct, getCategories } from '@/app/(admin)/sallu_admin/actions';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react'

const CategorySideBar = () => {
    const [categoryList, setCategoryList] = useState([]);
    const [paramsCategory, setParamsCategory] = useState('');
    const params = usePathname();

    useEffect(() => {
        async function fetchCategories() {
            try {
                const { categories } = await getCategories();
                const { products } = await fetchProduct();
                
                const uniqueCategories = [ ...new Set(products?.map(product => product?.category))];
                const matchedCategories = categories.filter(category =>
                    uniqueCategories.includes(category.category_name)
                );
                setCategoryList(matchedCategories); // Add 'All' as the first category
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        }
        fetchCategories();
    }, []);

    useEffect(() => {
        params && setParamsCategory(params.split("/")[2]);
    }, [params]);

    return (
        <div>
            <h2 className="font-bold mb-3 text-lg text-primary">Categories</h2>
            <Link
                        href={`/search/products`}
                        className={`flex gap-2 p-3 border rounded-lg mb-3 md:mr-10 hover:border-primary hover:bg-purple-50 hover:text-primary hover:shadow-md items-center justify-center ${
                            paramsCategory === "products" ? "border-primary text-primary bg-purple-50 shadow-md" : ""
                        }`}
                    >
                        
                            
                        
                        <h2>All Products</h2>
                    </Link>
            {categoryList.map((category, index) => {
                return (
                    <Link
                        href={`/search/${category.category_name}`}
                        key={index}
                        className={`flex gap-2 p-3 border rounded-lg mb-3 md:mr-10 hover:border-primary hover:bg-purple-50 hover:text-primary hover:shadow-md items-center justify-center ${
                            paramsCategory === category.category_name ? "border-primary text-primary bg-purple-50 shadow-md" : ""
                        }`}
                    >
                        
                            <Image src={category.category_image} alt={category.category_name} width={30} height={30} />
                        
                        <h2>{category.category_name}</h2>
                    </Link>
                );
            })}
        </div>
    );
};

export default CategorySideBar;