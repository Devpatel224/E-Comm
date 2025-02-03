import { Badge } from '../ui/badge'
import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'
import { categoryOptionsMap,brandOptionsMap } from '@/config'
import { CardTitle } from '../ui/card'



function ProductTile({product,handleGetProductDetails}) {


  return (
    <Card className='w-full max-w-80 mx-auto hover:scale-105 transition-all duration-300'>

       <div onClick={()=>handleGetProductDetails(product._id)}>
        <div className='relative overflow-hidden'>
            <img src={product.image} alt={product.title}  className='w-full h-[300px] rounded-t-lg object-cover hover:scale-110 transition-all duration-500' />
            {
                product.salePrice > 0 ?
                <Badge className='absolute top-2 left-2 bg-red-500 hover:bg-red-600'>Sale</Badge> : null 
            }
        </div>
        <CardContent className='px-4 py-2'>
            <CardTitle className='text-xl font-bold mb-1'>{product?.title}</CardTitle>
            <div className='flex justify-between items-center mb-1'>
                <span className='text-sm text-muted-foreground'>{categoryOptionsMap[product?.category]}</span>
                <span className='text-sm text-muted-foreground'>{brandOptionsMap[product?.brand]}</span>
            </div>
            <div className='flex justify-between items-center mb-1'>
                <span className={`${product.salePrice > 0 ? 'line-through' : ''} text-lg font-semibold text-primary`}>${product?.price}</span>
                {
                    product.salePrice > 0 ?
                    <span className='text-lg font-semibold text-primary'>${product?.salePrice}</span> : null 
                }
            </div>
        </CardContent>
        <CardFooter>
            <Button className='w-full'>
                Add to Cart
            </Button>
        </CardFooter>
       </div>
    </Card>
  )
}

export default ProductTile