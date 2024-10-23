import { Inter } from "next/font/google";
import ContextProvider from "@/provider/ContextProvider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../globals.css"
import GlobalProvider from "../GlobalProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sallu.com.bd",
  description: "একটি ই-কমার্স ব্রান্ড ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <GlobalProvider>

          <Navbar/>
          <div className="min-h-[60vh]">
          {children}
          </div>
          <Footer/>
          </GlobalProvider>
          <Toaster />
        </body>
    </html>
  );
}
