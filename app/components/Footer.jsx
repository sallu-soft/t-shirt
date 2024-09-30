import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
    <footer className="bg-secondary_color text-gray-300 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        
        {/* About Us Section */}
        <div>
          <h3 className="text-white font-bold mb-4">ABOUT US</h3>
          <p className="text-sm leading-6 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.
          </p>
          <ul>
            <li className="flex items-center mb-2">
              <FaMapMarkerAlt className="mr-2" /> 1734 Stonecoal Road
            </li>
            <li className="flex items-center mb-2">
              <FaPhoneAlt className="mr-2" /> +021-95-51-84
            </li>
            <li className="flex items-center">
              <FaEnvelope className="mr-2" /> email@email.com
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
            <li className="mb-2"><a href="#" className="hover:text-white">My Account</a></li>
            <li className="mb-2"><a href="#" className="hover:text-white">View Cart</a></li>
            <li className="mb-2"><a href="#" className="hover:text-white">Wishlist</a></li>
            <li className="mb-2"><a href="#" className="hover:text-white">Track My Order</a></li>
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