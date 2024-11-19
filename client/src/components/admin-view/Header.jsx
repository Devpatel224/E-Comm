import React from 'react'
import { AlignJustify , LogOut } from 'lucide-react'
import { Button } from '../ui/button'

function Header({setOpen}) {
  return (
   <header className='flex items-center justify-between px-4 border-b bg-background '>
      <Button onClick={()=>setOpen(true)} className='lg:hidden sm:block mb-5 mt-2'>
      <AlignJustify />
      <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className='flex flex-1 justify-end items-center mb-5 mt-2'>
         <Button className="inline-flex gap-2 items-center rounded-md px-4 py2 shadow-md">
         <LogOut />
         Logout
         </Button>
      </div>

   </header>
  )
}

export default Header