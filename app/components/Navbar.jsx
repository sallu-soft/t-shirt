"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Search, ShoppingCart } from "lucide-react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoSearch } from "react-icons/io";
import { HiOutlineSearch } from "react-icons/hi";
import { CartContext } from "@/provider/CartContext";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RxAvatar } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { UserContext } from "@/provider/UsersContext";
import { Context } from "@/provider/ContextProvider";
import SearchProducts from "./SearchProducts";
import { fetchProductByTitle } from "../(admin)/sallu_admin/actions";
import Image from "next/image";

const Navbar = () => {
  const [state, setState] = useState(false);
  const { cart } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { products } = useContext(Context);
  const menus = [{ title: "Products", path: "/search/products" }];
  const logoutUser = () => {
    localStorage.removeItem("user"); // Remove user data from localStorage
    Cookies.remove("session");
    setUser(null); // Reset the user state
  };
  // const handleSearch = (e) => {
  //   setSearchQuery(e.target.value);
  // };

  // useEffect(() => {
  //   let isMounted = true;
  //   const debounceTimeout = setTimeout(() => {
  //     const fetchSearchedProducts = async () => {
  //       if (!searchQuery) return;

  //       setLoading(true); // Set loading to true before the request starts
  //       try {
  //         const { products } = await fetchProductByTitle(searchQuery);
  //         if (isMounted) {
  //           setFilteredProducts(products);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching products:", error);
  //       } finally {
  //         if (isMounted) {
  //           setLoading(false); // Set loading to false after the request completes
  //         }
  //       }
  //     };

  //     if (searchQuery) {
  //       fetchSearchedProducts();
  //     } else {
  //       setFilteredProducts([]);
  //     }
  //   }, 300); // Debounce delay

  //   return () => {
  //     clearTimeout(debounceTimeout);
  //     isMounted = false;
  //   };
  // }, [searchQuery]);
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  
  useEffect(() => {
    let isMounted = true;
    const debounceTimeout = setTimeout(() => {
      const fetchSearchedProducts = async () => {
        if (!searchQuery) return;
  
        setLoading(true); // Set loading to true before the request starts
        try {
          const { products } = await fetchProductByTitle(searchQuery);
          if (isMounted) {
            console.log("Fetched products:", products); // Debugging log
            setFilteredProducts(products);
          }
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          if (isMounted) {
            setLoading(false); // Set loading to false after the request completes
          }
        }
      };
  
      if (searchQuery) {
        fetchSearchedProducts();
      } else {
        setFilteredProducts([]);
      }
    }, 300); // Debounce delay
  
    return () => {
      clearTimeout(debounceTimeout);
      isMounted = false;
    };
  }, [searchQuery]);
  return (
    <nav className="bg-gray-800 w-full border-b md:border-0 shadow-lg sticky top-0 z-50 transition-all py-1">
      <div className="items-center px-4 max-w-screen-2xl mx-auto flex md:px-8 justify-between">
        <div className="flex items-center justify-between md:block">
          <Link href="/">
            <Image src={'/sallu_1.png'} className="w-[180px]" width={180} height={10} />
          </Link>
          {/* <div className="md:hidden">
            <button
              className="text-primary_color outline-none p-2 rounded-md focus:border-gray-400 focus:border"
              onClick={() => setState(!state)}
            >
              <Menu />
            </button>
          </div> */}
        </div>
       
        <div className="bg-white rounded-md w-[40%] h-10 hidden md:inline-flex items-center justify-between relative">
          <input
            onChange={handleSearch}
            value={searchQuery}
            className="h-full w-[80%] rounded-md placeholder:text-sm text-base px-2 text-black border-[3px] border-transparent outline-none focus-visible:border-amazon_yellow "
            type="text"
            placeholder="Search your products"
          />
          <span className="text-2xl bg-amazon_yellow flex justify-center items-center text-black w-12 h-full absolute right-0 rounded-tr-md rounded-br-md">
            <HiOutlineSearch />
          </span>
          
          {searchQuery && (
            <div className="absolute left-0 top-12 w-full mx-auto max-h-96 bg-gray-200 rounded-lg overflow-y-scroll cursor-pointer text-black">
              {loading ? ( // Check if loading is true
                <div className="flex items-center justify-center py-10">
                  <p className="text-xl font-semibold">Loading products...</p>
                
                </div>
              ) : filteredProducts?.length > 0 ? (
                <>
                  {filteredProducts.map((item) => (
                    <Link
                      key={item._id}
                      className="w-full border-b-[1px] border-b-gray-400 flex items-center gap-4"
                      href={`/products/${item._id}`}
                      onClick={() => setSearchQuery("")}
                    >
                      <SearchProducts item={item} />
                    </Link>
                  ))}
                </>
              ) : (
                <div className="bg-gray-50 flex items-center justify-center py-10 rounded-lg shadow-lg">
                  <p className="text-xl font-semibold animate-bounce">
                    Nothing matches your search keywords. Please try again!
                  </p>
                </div>
              )}
            </div>
          )}
         
        </div>
        {/* <div className="md:hidden flex items-center">
          <button onClick={() => setSearchVisible(!searchVisible)} className="text-primary_color p-2">
            <HiOutlineSearch className="text-2xl" />
          </button>
        </div>

        
        <div className={`bg-white rounded-md w-full md:w-[40%] h-10 items-center justify-between relative ${searchVisible ? "flex" : "hidden"} md:flex`}>
          <input
            onChange={handleSearch}
            value={searchQuery}
            className="h-full w-[80%] rounded-md placeholder:text-sm text-base px-2 text-black border-[3px] border-transparent outline-none focus-visible:border-amazon_yellow"
            type="text"
            placeholder="Search your products"
          />
          <span className="text-2xl bg-amazon_yellow flex justify-center items-center text-black w-12 h-full absolute right-0 rounded-tr-md rounded-br-md">
            <HiOutlineSearch />
          </span>
          
          
          {searchQuery && (
            <div className="absolute left-0 top-12 w-full mx-auto max-h-96 bg-gray-200 rounded-lg overflow-y-scroll cursor-pointer text-black">
              {loading ? (
                <div className="flex items-center justify-center py-10">
                  <p className="text-xl font-semibold">Loading products...</p>
                </div>
              ) : filteredProducts?.length > 0 ? (
                <>
                  {filteredProducts.map((item) => (
                    <Link
                      key={item._id}
                      className="w-full border-b-[1px] border-b-gray-400 flex items-center gap-4"
                      href={`/products/${item._id}`}
                      onClick={() => setSearchQuery("")}
                    >
                      <SearchProducts item={item} />
                    </Link>
                  ))}
                </>
              ) : (
                <div className="bg-gray-50 flex items-center justify-center py-10 rounded-lg shadow-lg">
                  <p className="text-xl font-semibold animate-bounce">Nothing matches your search keywords. Please try again!</p>
                </div>
              )}
            </div>
          )}
        </div> */}
        <div
          className={`w-full items-center text-primary_color md:w-3/12 md:flex justify-end gap-2 md:gap-4 flex`}
        >
          <Link href={"/cart"} className="relative">
            <ShoppingCart className="font-semibold relative text-xl md:text-3xl cursor-pointer md:mr-3 mr-1" />
            <p className="bg-primary_color rounded-full w-fit h-6 flex items-center justify-center p-2 absolute bottom-3 text-sm left-3 text-white">
              {cart?.cartItems?.length || 0}
            </p>
          </Link>
          {user?._id && user?.role == "user" ? (
            <>
              <h2 className="text-primary_color text-md md:text-lg ml-0 md:ml-2 font-semibold">
                {user?.name}
              </h2>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="link" className="p-1">
                    <RxAvatar className="md:text-3xl text-2xl text-primary_color" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
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
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href={"/register"} className="relative">
                <p className="bg-primary_color rounded-full w-fit h-6 flex items-center justify-center text-xs px-2 py-4 sm:text-md md:p-4 text-white">
                  Register
                </p>
              </Link>
              <Link href={"/login"} className="relative">
                <p className=" rounded-full w-fit h-6 flex items-center justify-center px-2 py-4 sm:text-sm text-xs md:p-4 text-white border md:border-2 border-primary_color">
                  Sign In
                </p>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
    // <nav className="bg-secondary_color w-full border-b md:border-0 shadow-lg sticky top-0 z-50 transition-all">
    //   <div className="items-center px-4 max-w-screen-2xl mx-auto flex md:px-8 justify-between">
    //     <div className="flex items-center justify-between py-3 md:py-5 md:block">
    //       <Link href="/">
    //         <h1 className="md:text-2xl text-xl font-semibold text-primary_color">Sallu.com.bd</h1>
    //       </Link>
    //     </div>

    //     {/* Toggle button for the search bar on small screens */}
    //     <div className="md:hidden flex items-center">
    //       <button onClick={() => setSearchVisible(!searchVisible)} className="text-primary_color p-2">
    //         <HiOutlineSearch className="text-2xl" />
    //       </button>
    //     </div>

    //     {/* Search bar - hidden on small screens, shown based on searchVisible state */}
    //     <div className={`bg-white rounded-md w-full md:w-[40%] h-10 items-center justify-between relative ${searchVisible ? "flex" : "hidden"} md:flex`}>
    //       <input
    //         onChange={handleSearch}
    //         value={searchQuery}
    //         className="h-full w-[80%] rounded-md placeholder:text-sm text-base px-2 text-black border-[3px] border-transparent outline-none focus-visible:border-amazon_yellow"
    //         type="text"
    //         placeholder="Search your products"
    //       />
    //       <span className="text-2xl bg-amazon_yellow flex justify-center items-center text-black w-12 h-full absolute right-0 rounded-tr-md rounded-br-md">
    //         <HiOutlineSearch />
    //       </span>
          
    //       {/* Searchfield results */}
    //       {searchQuery && (
    //         <div className="absolute left-0 top-12 w-full mx-auto max-h-96 bg-gray-200 rounded-lg overflow-y-scroll cursor-pointer text-black">
    //           {loading ? (
    //             <div className="flex items-center justify-center py-10">
    //               <p className="text-xl font-semibold">Loading products...</p>
    //             </div>
    //           ) : filteredProducts?.length > 0 ? (
    //             <>
    //               {filteredProducts.map((item) => (
    //                 <Link
    //                   key={item._id}
    //                   className="w-full border-b-[1px] border-b-gray-400 flex items-center gap-4"
    //                   href={`/products/${item._id}`}
    //                   onClick={() => setSearchQuery("")}
    //                 >
    //                   <SearchProducts item={item} />
    //                 </Link>
    //               ))}
    //             </>
    //           ) : (
    //             <div className="bg-gray-50 flex items-center justify-center py-10 rounded-lg shadow-lg">
    //               <p className="text-xl font-semibold animate-bounce">Nothing matches your search keywords. Please try again!</p>
    //             </div>
    //           )}
    //         </div>
    //       )}
    //     </div>

    //     {/* Cart and User links */}
    //     <div className="w-full items-center text-primary_color md:w-3/12 md:flex justify-end gap-2 md:gap-4 hidden">
    //       <Link href={"/cart"} className="relative">
    //         <ShoppingCart className="font-semibold relative text-xl md:text-3xl cursor-pointer md:mr-3 mr-1" />
    //         <p className="bg-primary_color rounded-full w-fit h-6 flex items-center justify-center p-2 absolute bottom-3 text-sm left-3 text-white">
    //           {cart?.cartItems?.length || 0}
    //         </p>
    //       </Link>
    //       {user?._id && user?.role == "user" ? (
    //         <>
    //           <h2 className="text-primary_color text-md md:text-lg ml-0 md:ml-2 font-semibold">{user?.name}</h2>
    //           <DropdownMenu>
    //             <DropdownMenuTrigger asChild>
    //               <Button variant="link" className="p-1">
    //                 <RxAvatar className="md:text-3xl text-2xl text-primary_color" />
    //               </Button>
    //             </DropdownMenuTrigger>
    //             <DropdownMenuContent className="w-56">
    //               <DropdownMenuLabel>My Account</DropdownMenuLabel>
    //               <DropdownMenuSeparator />
    //               <DropdownMenuItem>
    //                 <Link href="/my_orders">My Orders</Link>
    //               </DropdownMenuItem>
    //               <DropdownMenuSeparator />
    //               <DropdownMenuItem onSelect={logoutUser}>Logout</DropdownMenuItem>
    //             </DropdownMenuContent>
    //           </DropdownMenu>
    //         </>
    //       ) : (
    //         <>
    //           <Link href={"/register"} className="relative">
    //             <p className="bg-primary_color rounded-full w-fit h-6 flex items-center justify-center text-sm px-2 py-4 text-md md:p-4 text-white">
    //               Register
    //             </p>
    //           </Link>
    //           <Link href={"/login"} className="relative">
    //             <p className="rounded-full w-fit h-6 flex items-center justify-center px-2 py-4 text-sm md:p-4 text-white border md:border-2 border-primary_color">
    //               Sign In
    //             </p>
    //           </Link>
    //         </>
    //       )}
    //     </div>
    //   </div>
    // </nav>
  );
};
export default Navbar;

