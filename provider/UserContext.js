

// 'use client';
// import { createContext, useEffect, useState } from "react";

// // Create UserContext
// export const UserContext = createContext();

// const UserContextProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     // Check localStorage for user data on initial load
//     const savedUser = localStorage.getItem("user");
//     return savedUser ? JSON.parse(savedUser) : null;
//   });

//   const logoutUser = () => {
//     const isConfirmed = confirm("Are you sure you want to log out?");
//     if (isConfirmed) {
//       setUser(null); // Update the user state
//       localStorage.removeItem("user"); // Remove user data from localStorage
//     }
//   };

//   // Function to update user data and save it to localStorage
//   const updateUser = (userData) => {
//     setUser(userData); // Update state
//     localStorage.setItem("user", JSON.stringify(userData)); // Store user data in localStorage
//   };

//   return (
//     <UserContext.Provider value={{ user, updateUser, setUser, logoutUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default UserContextProvider;

'use client';
import { createContext, useEffect, useState } from "react";

// Create UserContext
export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize to null

  // Use useEffect to load user data from localStorage on the client side
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const logoutUser = () => {
    const isConfirmed = confirm("Are you sure you want to log out?");
    if (isConfirmed) {
      setUser(null); // Update the user state
      localStorage.removeItem("user"); // Remove user data from localStorage
    }
  };

  // Function to update user data and save it to localStorage
  const updateUser = (userData) => {
    setUser(userData); // Update state
    localStorage.setItem("user", JSON.stringify(userData)); // Store user data in localStorage
  };

  return (
    <UserContext.Provider value={{ user, updateUser, setUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;