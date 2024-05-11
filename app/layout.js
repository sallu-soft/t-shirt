import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import ContextProvider from "@/provider/ContextProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <ContextProvider>

          <Navbar/>
          
          {children}
          </ContextProvider>
          <Toaster />
        </body>
    </html>
  );
}
