"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Search, ShoppingCart } from "lucide-react";
import {MdOutlineShoppingCart} from "react-icons/md";
import {IoSearch} from "react-icons/io";
import {HiOutlineSearch} from "react-icons/hi";
import { CartContext } from "@/provider/CartContext";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { RxAvatar } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { UserContext } from "@/provider/UsersContext";
import { Context } from "@/provider/ContextProvider";
import SearchProducts from "./SearchProducts";
import { fetchProductByTitle } from "../(admin)/sallu_admin/actions";

const Navbar = () => {
  const [state, setState] = useState(false);
  const {cart} = useContext(CartContext);
  const [searchQuery,setSearchQuery] = useState("");
  const [filteredProducts,setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { products } = useContext(Context);
  const menus = [
    { title: "Products", path: "/search/products" },
  ];
  const logoutUser = () => {
    localStorage.removeItem("user"); // Remove user data from localStorage
    Cookies.remove('session');
    setUser(null); // Reset the user state
  };
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  }
  // useEffect(() => {
    
  //   const SearchedProducts = async ()=>{
  //   const {products} =await fetchProductByTitle(searchQuery) 
  //   setFilteredProducts(products);
  //   }
  //   SearchedProducts();
  // }, [searchQuery]);

  useEffect(() => {
    let isMounted = true;
    const debounceTimeout = setTimeout(() => {
      const fetchSearchedProducts = async () => {
        if (!searchQuery) return;

        setLoading(true); // Set loading to true before the request starts
        try {
          const { products } = await fetchProductByTitle(searchQuery);
          if (isMounted) {
            setFilteredProducts(products);
          }
        } catch (error) {
          console.error('Error fetching products:', error);
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
        {/* <div
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
        </div> */}
        <div className="bg-white rounded-md w-[40%] h-10 hidden md:inline-flex items-center justify-between relative">
                <input 
                onChange={handleSearch}
                value={searchQuery}
                className="h-full w-[80%] rounded-md placeholder:text-sm text-base px-2 text-black border-[3px] border-transparent outline-none focus-visible:border-amazon_yellow " type="text" placeholder="Search your products" />
                <span className="text-2xl bg-amazon_yellow flex justify-center items-center text-black w-12 h-full absolute right-0 rounded-tr-md rounded-br-md">
                    <HiOutlineSearch />
                </span>
                {/* ========== Searchfield ========== */}
                {searchQuery && (
        <div className="absolute left-0 top-12 w-full mx-auto max-h-96 bg-gray-200 rounded-lg overflow-y-scroll cursor-pointer text-black">
          {loading ? ( // Check if loading is true
            <div className="flex items-center justify-center py-10">
              <p className="text-xl font-semibold">Loading products...</p>
              {/* You can replace the text with a spinner or other loading indicator */}
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
          {/* ========== Searchfield ========== */}
            </div>
        <div className={`w-full items-center text-primary_color md:w-3/12 md:flex justify-end gap-4 hidden ${state?'block':'hidden'}`}>
          <Link href={'/cart'} className="relative">
            <ShoppingCart className="font-semibold relative text-3xl cursor-pointer mr-3"/>
            <p className="bg-primary_color rounded-full w-fit h-6 flex items-center justify-center p-2 absolute bottom-3 left-3 text-white">{cart?.cartItems?.length || 0}</p>
          </Link>
          {user?._id && user?.role=="user" ?<>
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
            
            <p className=" rounded-full w-fit h-6 flex items-center justify-center p-4   text-white border-2 border-primary_color ">Sign In</p>
          </Link></>}
          
        </div>
      </div>
    </nav>
  );
};
export default Navbar;




// "use client";

// import { useContext, useEffect, useState } from "react";
// import Link from "next/link";
// import { Menu, ShoppingCart } from "lucide-react";
// import { HiOutlineSearch } from "react-icons/hi";
// import { RxAvatar } from "react-icons/rx";
// import Cookies from "js-cookie";
// import { CartContext } from "@/provider/CartContext";
// import { UserContext } from "@/provider/UsersContext";
// import { Context } from "@/provider/ContextProvider";
// import SearchProducts from "./SearchProducts";
// import { fetchProductByTitle } from "../(admin)/sallu_admin/actions";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";

// const Navbar = () => {
//   const [state, setState] = useState(false);
//   const { cart } = useContext(CartContext);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const { user, setUser } = useContext(UserContext);
//   const { products } = useContext(Context);

//   const menus = [{ title: "Products", path: "/search/products" }];

//   const logoutUser = () => {
//     localStorage.removeItem("user");
//     Cookies.remove("session");
//     setUser(null);
//   };

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   useEffect(() => {
//     let isMounted = true;
//     const debounceTimeout = setTimeout(() => {
//       const fetchSearchedProducts = async () => {
//         if (!searchQuery) return;
//         setLoading(true);
//         try {
//           const { products } = await fetchProductByTitle(searchQuery);
//           if (isMounted) setFilteredProducts(products);
//         } catch (error) {
//           console.error("Error fetching products:", error);
//         } finally {
//           if (isMounted) setLoading(false);
//         }
//       };

//       if (searchQuery) fetchSearchedProducts();
//       else setFilteredProducts([]);
//     }, 300);

//     return () => {
//       clearTimeout(debounceTimeout);
//       isMounted = false;
//     };
//   }, [searchQuery]);

//   return (
//     <nav className="bg-secondary_color w-full border-b shadow-lg sticky top-0 z-50">
//       <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-4 md:px-8">
//         {/* Logo and Hamburger Menu */}
//         <div className="flex items-center justify-between w-full md:w-auto py-3">
//           <Link href="/">
//             <h1 className="text-2xl font-semibold text-primary_color">Sallu.com.bd</h1>
//           </Link>
//           <button
//             className="text-primary_color md:hidden p-2 focus:border-gray-400 rounded-md"
//             onClick={() => setState(!state)}
//           >
//             <Menu />
//           </button>
//         </div>

//         {/* Search Bar */}
//         <div className={`flex items-center w-full md:w-2/5 bg-white rounded-md h-10 relative ${state ? 'block' : 'hidden md:flex'}`}>
//           <input
//             type="text"
//             placeholder="Search your products"
//             value={searchQuery}
//             onChange={handleSearch}
//             className="h-full w-full pl-2 pr-10 rounded-md text-base text-black border-transparent focus:border-amazon_yellow outline-none"
//           />
//           <span className="absolute right-2 text-2xl text-black bg-amazon_yellow p-1 rounded-md">
//             <HiOutlineSearch />
//           </span>
//           {searchQuery && (
//             <div className="absolute top-12 left-0 w-full max-h-96 bg-gray-200 rounded-lg overflow-y-auto">
//               {loading ? (
//                 <div className="flex items-center justify-center py-10">
//                   <p className="text-xl font-semibold">Loading products...</p>
//                 </div>
//               ) : filteredProducts?.length ? (
//                 filteredProducts.map((item) => (
//                   <Link
//                     key={item._id}
//                     href={`products/${item._id}`}
//                     className="flex items-center gap-4 border-b border-gray-400 p-2"
//                     onClick={() => setSearchQuery("")}
//                   >
//                     <SearchProducts item={item} />
//                   </Link>
//                 ))
//               ) : (
//                 <div className="flex items-center justify-center py-10 bg-gray-50 rounded-lg shadow-lg">
//                   <p className="text-xl font-semibold animate-bounce">
//                     No products found, please try another search.
//                   </p>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Right Side Icons and Dropdown */}
//         <div className={`flex items-center ${state ? "block" : "hidden"} md:flex md:items-center`}>
//           <Link href="/cart" className="relative text-3xl mr-3">
//             <ShoppingCart className="text-primary_color"/>
//             <span className="absolute bottom-3 left-3 bg-primary_color text-white text-xs rounded-full p-1">
//               {cart?.cartItems?.length || 0}
//             </span>
//           </Link>
//           {user ? (
//             <>
//               <h2 className="text-lg font-semibold text-primary_color">{user.name}</h2>
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="link">
//                     <RxAvatar className="text-3xl text-primary_color" />
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent className="w-56">
//                   <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem>
//                     <Link href="/my_orders">My Orders</Link>
//                   </DropdownMenuItem>
//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem onSelect={logoutUser}>Logout</DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </>
//           ) : (
//             <>
//               <Link href="/register" className="p-4 text-white bg-primary_color rounded-full">
//                 Register
//               </Link>
//               <Link href="/login" className="p-4 text-primary_color border-2 border-primary_color rounded-full">
//                 Sign In
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

