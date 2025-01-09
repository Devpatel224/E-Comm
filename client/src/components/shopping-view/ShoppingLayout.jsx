import React from 'react'
import { Outlet } from 'react-router-dom'
import ShoppingHeader from './ShoppingHeader'

function ShoppingLayout() {
 
  return (
    <div className='flex flex-col bg-white overflow-hidden w-full'>
      {/* common header */}
      <ShoppingHeader/>
      <main className='felx flex-col w-full'>
        <Outlet/>
      </main>
    </div>
  )
}

export default ShoppingLayout