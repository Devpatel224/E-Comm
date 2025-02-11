import React from 'react'
import image from '../../assets/account.jpg'
import Address from '@/components/shopping-view/Address'
import { useSelector } from 'react-redux'
import CartItem from '@/components/shopping-view/CartItem'
import { Button } from '@/components/ui/button'

function Checkout() {
  const {cartItems} = useSelector(state => state.shopCart);
 

  const totalCartAmount = cartItems && cartItems.items && cartItems.items.length > 0 ?
  cartItems.items.reduce((sum,currentItem)=> sum + (
     currentItem?.salePrice > 0 ? currentItem.salePrice : currentItem.price 
    ) * currentItem.quantity,0) : 0 

  return (
    <div className='flex flex-col'>
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={image} className='h-full w-full overscroll-cover object-center' alt="" />
      </div>
      <div className='grid grid-cols-1  sm:grid-cols-2  gap-5 p-5 mt-5 overflow-hidden '>
          <Address />
          <div className="flex flex-col gap-4">
            {
              cartItems && cartItems.items && cartItems.items.length > 0 ? cartItems.items.map(item => <CartItem cartItem={item} key={item.productId}/>) : null
            }
          <div className="flex justify-between ">
                <span className="font-bold">Total </span>
                <span className="font-bold">${totalCartAmount}</span>
            </div>            
          <Button className='mt-5 w-full'>Chekout With Paypal</Button>
          </div>
      </div>
    </div>
  )
}

export default Checkout