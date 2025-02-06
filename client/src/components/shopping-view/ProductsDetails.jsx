import React from 'react'
import { Dialog, DialogClose , DialogContent } from '../ui/dialog'
import { Separator } from '../ui/separator'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { StarIcon } from 'lucide-react'
import { Input } from '../ui/input'

import { useDispatch, useSelector } from 'react-redux'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import { useToast } from '@/hooks/use-toast'


function ProductsDetails({open, setOpen,productDetails}) {
 
// console.log(productDetails._id)
    
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const toast = useToast()
  function handleAddToCart(getCurrentProductId) {
    console.log(getCurrentProductId);
    
    dispatch(addToCart({ userId: user?.id,
       productId: getCurrentProductId,
      quantity: 1 })
    )
    .then((data)=>{
      if(data.payload?.success){
        dispatch(fetchCartItems(user?.id))
        toast({
            title : "Product Successfully Added to Cart"
        })
      }
  }
)
    }

    
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[70vw]'>
            <div className='relative overflow-hidden rounded-lg'>
                <img src={productDetails?.image} alt={productDetails?.title} width={600}  height={600} className='aspect-square w-full object-cover'/>
            </div>
            
            <div className=''>
               <h1 className='text-3xl font-semibold'>{productDetails?.title}</h1> 
                <p className='text-lg font-medium text-gray-600 mb-5'>{productDetails?.description}</p>
            <div className='flex items-center justify-between pr-4'>
                <p className={`text-2xl font-semibold text-primary ${productDetails?.salePrice? 'line-through' : ''}`}>${productDetails?.price}</p>

                {productDetails?.salePrice > 0 ? <p className='text-2xl font-semibold text-primary'>${productDetails?.salePrice}</p> : null }

            </div>
            <div className='flex items-center gap-2 mt-2'>
            <div className='flex items-center gap-0.5'>
                                    <StarIcon className='h-5 w-5 fill-primary'/>
                                    <StarIcon className='h-5 w-5 fill-primary'/>
                                    <StarIcon className='h-5 w-5 fill-primary'/>
                                    <StarIcon className='h-5 w-5 fill-primary'/>
                                    <StarIcon className='h-5 w-5 fill-primary'/>
                                </div>
                                <span className='text-primary '>(4.5)</span>
            </div>
            <div className='mt-4 mb-5'>
                <button onClick={()=>handleAddToCart(productDetails?._id)} className='bg-primary text-white px-4 py-2 rounded-lg w-full'>Add to cart</button>
            </div>
            <Separator/>
                <div className='max-h-[300px] overflow-auto'>
                    <h2 className='text-xl font-bold mb-4'>Reviews</h2>
                    <div className='grid gap-6'>
                        <div className='flex gap-4'>
                            <Avatar className="w-10 h-10 border">
                                <AvatarFallback>SM</AvatarFallback>
                            </Avatar>
                            <div className='grid gap-1'>
                                <div className='flex items-center gap-2'>
                                    <h3 className='font-bold'>Dev Patel</h3>
                                </div>
                                <div className='flex items-center gap-0.5'>
                                    <StarIcon className='h-5 w-5 fill-primary'/>
                                    <StarIcon className='h-5 w-5 fill-primary'/>
                                    <StarIcon className='h-5 w-5 fill-primary'/>
                                    <StarIcon className='h-5 w-5 fill-primary'/>
                                    <StarIcon className='h-5 w-5 fill-primary'/>
                                </div>
                                <p className='text-muted-foreground'>This is an awesome Product</p>
                            </div>
                        </div>
                    </div>
                    <div className='grid gap-6'>
                        <div className='flex gap-4'>
                            <Avatar className="w-10 h-10 border">
                                <AvatarFallback>SM</AvatarFallback>
                            </Avatar>
                            <div className='grid gap-1'>
                                <div className='flex items-center gap-2'>
                                    <h3 className='font-bold'>Dev Patel</h3>
                                </div>
                                <div className='flex items-center gap-0.5'>
                                    <StarIcon className='h-5 w-5 fill-primary'/>
                                    <StarIcon className='h-5 w-5 fill-primary'/>
                                    <StarIcon className='h-5 w-5 fill-primary'/>
                                    <StarIcon className='h-5 w-5 fill-primary'/>
                                    <StarIcon className='h-5 w-5 fill-primary'/>
                                </div>
                                <p className='text-muted-foreground'>This is an awesome Product</p>
                            </div>
                        </div>
                    </div>
                    <div className='grid gap-6'>
                        <div className='flex gap-4'>
                            <Avatar className="w-10 h-10 border">
                                <AvatarFallback>SM</AvatarFallback>
                            </Avatar>
                            <div className='grid gap-1'>
                                <div className='flex items-center gap-2'>
                                    <h3 className='font-bold'>Dev Patel</h3>
                                </div>
                                <div className='flex items-center gap-0.5'>
                                    <StarIcon className='h-5 w-5 fill-primary'/>
                                    <StarIcon className='h-5 w-5 fill-primary'/>
                                    <StarIcon className='h-5 w-5 fill-primary'/>
                                    <StarIcon className='h-5 w-5 fill-primary'/>
                                    <StarIcon className='h-5 w-5 fill-primary'/>
                                </div>
                                <p className='text-muted-foreground'>This is an awesome Product</p>
                            </div>
                        </div>
                    </div>
                    <div className='mt-6 flex gap-2 items-center'>
                        <input placeholder='Write a review...' className='w-full px-3 py-2 rounded-lg outline-1 outline-primary border' />
                        <button className='bg-primary text-white px-3 py-2 rounded-lg'>Submit</button>
                    </div>
                    </div>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default ProductsDetails