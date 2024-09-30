"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, ShoppingCart } from "lucide-react";
import {MdOutlineShoppingCart} from "react-icons/md";
import {IoSearch} from "react-icons/io";

const Navbar = () => {
  const [state, setState] = useState(false);

  const menus = [
    // { title: "হোম", path: "/" },
  ];

  return (
    <nav className="bg-secondary_color w-full border-b md:border-0 shadow-lg sticky top-0 z-50 transition-all">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8 justify-between">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <Link href="/">
            <h1 className="text-2xl font-semibold text-primary_color">ছাল্লু গার্মেন্টস</h1>
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
              <li key={idx} className="text-gray-600 hover:text-indigo-600 font-semibold text-lg">
                <Link href={item.path}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full text-primary_color md:w-3/12 md:flex justify-end gap-2 hidden">
          <Search className="font-semibold text-3xl cursor-pointer" />
          <ShoppingCart className="font-semibold text-3xl cursor-pointer" />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
