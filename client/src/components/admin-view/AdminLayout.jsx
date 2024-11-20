
import {useState}from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import AdminSidebar from './Sidebar'

function AdminLayout() {
  const [opensidebar, setOpensidebar] = useState(false)
  return (
    <div className='flex min-h-screen w-full'>
        {/* admin sidebar */}
        <AdminSidebar open={opensidebar} setOpen={setOpensidebar}/>
        <div className='flex flex-1 flex-col'>
            {/* admin header */}
            <Header setOpen={setOpensidebar}/>
            <main className='flex flex-col flex-1 bg-muted/40 p-4 md:p-6'>
                <Outlet/>
            </main>
        </div>
    </div>
  )
}

export default AdminLayout