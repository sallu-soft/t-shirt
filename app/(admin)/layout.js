
import Sidebar from './sallu_admin/Sidebar'
import Admin from '../components/Admin'
import { Input } from '@/components/ui/input'
import Footer from '../components/Footer'
import { Toaster } from '@/components/ui/toaster'
import { Inter } from 'next/font/google'
import "../globals.css"
import AdminNavbar from './sallu_admin/components/AdminNavbar'
import Cookies from 'js-cookie'
import { cookies } from 'next/headers'
import { getSession } from '@/lib/session'
import { fetchSingleUser } from './sallu_admin/actions'
import { redirect } from 'next/navigation'
const inter = Inter({ subsets: ["latin"] });



const AdminLayout =async ({children}) => {
  const session =await getSession()
  if (!session) {
    // If no session, redirect to the login page
    redirect('/login');
  }

  const { user } = await fetchSingleUser(session.id);

  if (!user || user.role !== "admin" || user.phone !== session.phone) {
    // If no user or the user is not an admin, redirect to the login page
    redirect('/login');
  }
  const serializableUser = JSON.stringify(user);
  console.log()
  return (
    <html lang="en">
    <body className={inter.className}>
    <div className="flex">
        <Sidebar/>
        <div className="w-full">
          <AdminNavbar user={serializableUser}/>
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