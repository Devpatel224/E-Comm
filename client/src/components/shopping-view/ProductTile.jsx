import { Badge } from 'lucide-react'
import React from 'react'
import { CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'
import Image from 'next/image'

function ProductTile({product}) {
  return (
    <Card className='w-full max-w-sm mx-auto'>
       <div>
        <div className='relative'>
            <Image src={product.image} alt={product.title} fill className='object-contain w-full h-[300px] rounded-t-lg'/>
            {
                product.salePrice > 0 ?
                <Badge className='absolute top-2 left-2 bg-red-500 hover:bg-red-600'>Sale</Badge> : null 
            }
        </div>
        <CardContent className='p-4'>
            <CardTitle className='text-xl font-bold mb-2'>{product.title}</CardTitle>
            <div className='flex justify-between items-center mb-2'>
                <span className='text-sm text-muted-foreground'>{product?.category}</span>
                <span className='text-sm text-muted-foreground'>{product?.brand}</span>
            </div>
            <div className='flex justify-between items-center mb-2'>
                <span className={`${product.salePrice > 0 ? 'line-through' : ''} text-lg font-semibold text-primary`}>{product?.price}</span>
                {
                    product.salePrice > 0 ?
                    <span className='text-lg font-semibold text-primary'>{product?.salePrice}</span> : null 
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