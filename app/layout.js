import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import ContextProvider from "@/provider/ContextProvider";
import { Toaster } from "@/components/ui/toaster";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "এক দিনের কসাই ।। টিশার্ট ",
  description: "একটি টিশার্ট ব্রান্ড ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <ContextProvider>

          <Navbar/>
          
          {children}
          <Footer/>
          </ContextProvider>
          <Toaster />
        </body>
    </html>
  );
}
