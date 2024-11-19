import React, { Fragment } from 'react'
import { ChartNoAxesCombined, Menu } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { LayoutDashboard , ShoppingCart , BadgeCheck } from "lucide-react"

export const adminsidebarMenuItems = [
  {
      id : 'dashboard',
      label : 'Dashboard',
      path : '/admin/dashboard',
      icon : < LayoutDashboard />
  },
  {
      id : 'products',
      label : 'Producuts',
      path : '/admin/products',
      icon : <ShoppingCart />
  },
  {
      id : 'order',
      label : 'Orders',
      path : '/admin/orders',
      icon : <BadgeCheck />
  }
]

function MenuItems({setOpen}){
  const navigate = useNavigate()
   return <nav className='mt-8 flex-col flex gap-2'>
    {
      adminsidebarMenuItems.map(MenuItem =>(
        <div key={MenuItem.id} onClick={()=>{navigate(MenuItem.path);
          setOpen ? setOpen(false) : null;
        }} className='flex items-center gap-2 rounded-md px-3 py-2 text-xl cursor-pointer text-muted-foreground hover:bg-muted hover:text-foreground'>
             {MenuItem.icon}
             <span>{MenuItem.label}</span>
        </div>
      ))
    }
   </nav>
}

function AdminSidebar({open,setOpen}) {
  const navigate = useNavigate()
  return (
     <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side='left' className="w-64">
          <div className='flex flex-col h-full'>
             <SheetHeader className='border-b'>
              <SheetTitle className='flex gap-2 mb-5'>
          <ChartNoAxesCombined  width={30}/>
                <h1 className='text-xl font-extrabold'> Admin Panel</h1>
              </SheetTitle>
             </SheetHeader>
              <MenuItems setOpen={setOpen}/>
             </div>
        </SheetContent>
      </Sheet>

      <aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex'>
          <div onClick={()=>navigate('/admin/dashboard')} className='flex items-center gap-2 cursor-pointer'>
          <ChartNoAxesCombined  width={30}/>
            <h1 className='text-xl font-extrabold'>Admin Panel</h1>   
          </div>
          <MenuItems></MenuItems>
      </aside>
     </Fragment>
  )
}

export default AdminSidebar