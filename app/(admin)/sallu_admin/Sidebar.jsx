'use client'
import { Button } from '@/components/ui/button'
import { HomeIcon, ListIcon, User } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'
import { FaClipboardList } from 'react-icons/fa';
import { MdOutlineCreateNewFolder, MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { BiCategory } from "react-icons/bi";



const Sidebar = () => {
    const [isOpen,setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Controls the product dropdown menu
    const [isDropdownOpenOrder, setIsDropdownOpenOrder] = useState(false); // Controls the product dropdown menu

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const toggleDropdownOrder = () => {
        
        setIsDropdownOpenOrder(!isDropdownOpenOrder);
    };

  return (
    <aside className="w-[300px] shadow-primary_color h-screen shadow-md flex flex-col justify-between">
     <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Dashboard</h1>
        <div className=" divide-y divide-gray-300">
            <Link href="/sallu_admin" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
                    <span className="mr-3">
                        <HomeIcon/>
                    </span>
                    <span>Dashboard</span>
            </Link>
            <div>
                <button 
                    className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-100 rounded"
                    onClick={toggleDropdown} // Toggles the dropdown
                >
                    <span className="mr-3">
                        <MdOutlineProductionQuantityLimits />
                    </span>
                    <span>Products</span>
                </button>

                {/* Dropdown menu (submenus) */}
                {isDropdownOpen && (
                    <div className="ml-8 my-1">
                        <Link href="/sallu_admin/product_list"  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
                        <FaClipboardList className="text-gray-700 text-xl"/>
                            <span className="block">
                                Product List
                            </span>
                        </Link>
                        <Link href="/sallu_admin/add_product"  className="flex items-center p-2 gap-2 hover:bg-gray-100 rounded">
                        <MdOutlineCreateNewFolder className="text-gray-700 text-xl"/>
                            <span className="block">
                                Create Product
                            </span>
                        </Link>
                        <Link href="/sallu_admin/product_categories" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
                        <BiCategory className="text-gray-700 text-xl"/>
                            <span className="block">
                                Create Category
                            </span>
                        </Link>
                        <Link href="/sallu_admin/orders_list" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
                        <BiCategory className="text-gray-700 text-xl"/>
                            <span className="block">
                                Orders
                            </span>
                        </Link>
                        
                    </div>
                )}
            </div>
            <div>
                <button 
                    className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-100 rounded"
                    onClick={toggleDropdownOrder} // Toggles the dropdown
                >
                    <span className="mr-3">
                        <MdOutlineProductionQuantityLimits />
                    </span>
                    <span>Orders</span>
                </button>

                {/* Dropdown menu (submenus) */}
                {isDropdownOpenOrder && (
                    <div className="ml-8 my-1">
                       
                        <Link href="/sallu_admin/orders_list" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
                        <BiCategory className="text-gray-700 text-xl"/>
                            <span className="block">
                                Orders List
                            </span>
                        </Link>
                        
                    </div>
                )}
            </div>
            
            <Link href="#" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
                <span className="mr-3">
                    <User/>
                </span>
                <span>Users</span>
            </Link>
             {/* Products Dropdown */}
            
            
        </div>
    </div>

     
   </aside>
  
  )
}

export default Sidebar;