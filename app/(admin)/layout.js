'use client'
import Sidebar from './sallu_admin/Sidebar'
import Admin from '../components/Admin'
import { Input } from '@/components/ui/input'
import Footer from '../components/Footer'
import { Toaster } from '@/components/ui/toaster'
import { Inter } from 'next/font/google'
import "../globals.css"
import Navbar from '../components/Navbar'
import AdminNavbar from './sallu_admin/components/AdminNavbar'
const inter = Inter({ subsets: ["latin"] });



const AdminLayout = ({children}) => {
    // const [password,setPassword] = useState('')
    // const [orders,setOrders] = useState([])
    // useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       const res = await fetch(`${process.env.NEXT_PUBLIC_CORS}/api/orders`, {
    //         revalidate: 20,
    //         cache: "no-store",
    //       });
  
    //       if (!res.ok) {
    //         console.log("Fetching Failed");
    //         return;
    //       }
  
    //       const data = await res.json();
    //       setOrders(data.orders);
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   };
    //   if(password === process.env.NEXT_PUBLIC_PAGE_ROUTE){
    //     fetchData();
    //   }
      
    // }, [password]);
  return (
    <html lang="en">
    <body className={inter.className}>
    <div className="flex">
        <Sidebar/>
        <div className="w-full">
          <AdminNavbar/>
          <div className="m-4">
          {children}
          </div>
          
        </div>
    </div>
        <Toaster />
      </body>
  </html>
     
      
    
     
        
  )
}

export default AdminLayout;