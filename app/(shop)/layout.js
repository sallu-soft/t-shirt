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
          <h3 className="text-center bg-primary_color text-white py-2 text-sm">আমাদের যে কোন পণ্য অর্ডার করতে কল বা WhatsApp করুন:  +8801645316275 </h3>
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
