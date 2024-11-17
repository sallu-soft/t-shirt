import Image from 'next/image';
import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
    <footer className="bg-secondary_color text-gray-300 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        
        {/* About Us Section */}
        <div>
         
          <Image src={"/sallu_1.png"} alt={"logo"} width="200" height="120"/>
          <p className="text-sm leading-6 mb-4">
          Sallu.com.bd is a dynamic e-commerce platform in Bangladesh, offering a wide range of products to cater to diverse customer needs.
          </p>
          <ul>
            <li className="flex items-center mb-2">
              <FaMapMarkerAlt className="mr-2" /> 291, Jomidar Palace, Fakirapool, Dhaka-1000
            </li>
            <li className="flex items-center mb-2">
              <FaPhoneAlt className="mr-2" /> 01776105863
            </li>
            <li className="flex items-center">
              <FaEnvelope className="mr-2" /> contact.sallusoft@gmail.com
            </li>
          </ul>
        </div>

        {/* Categories Section */}
        <div>
          <h3 className="text-white font-bold mb-4">CATEGORIES</h3>
          <ul>
            <li className="mb-2"><a href="#" className="hover:text-white">Hot Deals</a></li>
            <li className="mb-2"><a href="#" className="hover:text-white">Laptops</a></li>
            <li className="mb-2"><a href="#" className="hover:text-white">Smartphones</a></li>
            <li className="mb-2"><a href="#" className="hover:text-white">Cameras</a></li>
            <li><a href="#" className="hover:text-white">Accessories</a></li>
          </ul>
        </div>

        {/* Information Section */}
        <div>
          <h3 className="text-white font-bold mb-4">INFORMATION</h3>
          <ul>
            <li className="mb-2"><a href="#" className="hover:text-white">About Us</a></li>
            <li className="mb-2"><a href="#" className="hover:text-white">Contact Us</a></li>
            <li className="mb-2"><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li className="mb-2"><a href="#" className="hover:text-white">Orders and Returns</a></li>
            <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Service Section */}
        <div>
          <h3 className="text-white font-bold mb-4">SERVICE</h3>
          <ul>
            
            <li className="mb-2"><a href="/cart" className="hover:text-white">View Cart</a></li>
            
            <li className="mb-2"><a href="/my_orders" className="hover:text-white">Track My Order</a></li>
            <li><a href="#" className="hover:text-white">Help</a></li>
          </ul>
        </div>
      </div>
      
    </footer>
    <div className="text-center py-2 text-secondary_color bg-primary_color">Copyright © 2024 All rights reserved | This Site is made withby SalluSoft</div>
    </>
  );
};

export default Footer;