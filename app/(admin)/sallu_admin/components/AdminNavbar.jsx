import React, { useState } from 'react';
import { FaBars, FaTimes, FaUser, FaUserMd } from 'react-icons/fa';
import Link from 'next/link'; // Replace this if you're not using Next.js

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
        <div className="">
            <FaUser className="text-2xl"/>
        </div>
        
      </div>
    </nav>
  );
};

export default AdminNavbar;