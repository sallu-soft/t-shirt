"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Search, ShoppingCart } from "lucide-react";
import {MdOutlineShoppingCart} from "react-icons/md";
import {IoSearch} from "react-icons/io";
import { CartContext } from "@/provider/CartContext";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { RxAvatar } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { UserContext } from "@/provider/UsersContext";

const Navbar = () => {
  const [state, setState] = useState(false);
  const {cart} = useContext(CartContext);
  const { user, setUser } = useContext(UserContext);
  const menus = [
    { title: "Products", path: "/search/products" },
  ];
  const logoutUser = () => {
    localStorage.removeItem("user"); // Remove user data from localStorage
    Cookies.remove('session', { path: '/' });
    setUser(null); // Reset the user state
  };
  
  return (
    <nav className="bg-secondary_color w-full border-b md:border-0 shadow-lg sticky top-0 z-50 transition-all">
      <div className="items-center px-4 max-w-screen-2xl mx-auto md:flex md:px-8 justify-between">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <Link href="/">
            <h1 className="text-2xl font-semibold text-primary_color">Sallu.com.bd</h1>
          </Link>
          <div className="md:hidden">
            <button
              className="text-primary_color outline-none p-2 rounded-md focus:border-gray-400 focus:border"
              onClick={() => setState(!state)}
            >
              <Menu />
            </button>
          </div>
        </div>
        <div
          className={` pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            state ? "block" : "hidden"
          }`}
        >
          <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            {menus.map((item, idx) => (
              <li key={idx} className="text-primary_color hover:text-indigo-600 font-semibold text-lg">
                <Link href={item.path}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full items-center text-primary_color md:w-3/12 md:flex justify-end gap-4 hidden">
          <Search className="font-semibold text-3xl cursor-pointer" />
          <Link href={'/cart'} className="relative">
            <ShoppingCart className="font-semibold relative text-3xl cursor-pointer"/>
            <p className="bg-primary_color rounded-full w-fit h-6 flex items-center justify-center p-2 absolute bottom-3 left-3  text-white">{cart?.cartItems?.length || 0}</p>
          </Link>
          {user?._id?<>
          <h2 className="text-primary_color text-lg ml-2 font-semibold">{user?.name}</h2>
          <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link"><RxAvatar className="text-3xl text-primary_color" /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
            >
              <Link href="/my_orders">My Orders</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
              onSelect={() => {
                logoutUser(); // Now calling logoutUser from context
              }}
            >
              Logout
        </DropdownMenuItem>
       
      </DropdownMenuContent>
    </DropdownMenu></>:<>
          <Link href={'/register'} className="relative">
            
            <p className="bg-primary_color rounded-full w-fit h-6 flex items-center justify-center p-4   text-white">Register</p>
          </Link>
          <Link href={'/login'} className="relative">
            
            <p className=" rounded-full w-fit h-6 flex items-center justify-center p-4   text-white">Sign In</p>
          </Link></>}
          
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
