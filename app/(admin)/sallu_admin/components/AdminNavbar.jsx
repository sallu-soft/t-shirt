'use client'
import React, { useState } from 'react';
import { FaBars, FaTimes, FaUser, FaUserMd } from 'react-icons/fa';
import Link from 'next/link'; // Replace this if you're not using Next.js
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const AdminNavbar = ({user}) => {
  const [isOpen, setIsOpen] = useState(false);
  const parsedUser = JSON.parse(user);
  const router = useRouter()
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const logoutUser = () => {
    console.log("logout user")
    localStorage.removeItem("user"); // Remove user data from localStorage
    Cookies.remove('session');
    router.refresh()
    // setUser(null); // Reset the user state
  };
  return (
    <nav className="bg-white shadow-sm p-3 text-secondary_color shadow-primary_color w-full sticky top-0 z-40">
      <div className=" mx-10 flex justify-between  items-center">
        {/* Brand Logo */}
        <div className="text-2xl font-bold">
          <Link href="/">Sallu.Com</Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Menu Links */}
        <div className="text-primary_color font-bold flex items-center gap-2">
            
            <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link"><FaUser className="text-2xl text-primary_color"/></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
       
        <DropdownMenuSeparator />
        <DropdownMenuItem
              onSelect={() => {
                logoutUser(); // Now calling logoutUser from context
              }}
            >
              Logout
        </DropdownMenuItem>
       
      </DropdownMenuContent>
    </DropdownMenu>
            <h3 className="font-semibold text-primary_color text-2xl">{parsedUser.name}</h3>
        </div>
        
      </div>
    </nav>
  );
};

export default AdminNavbar;