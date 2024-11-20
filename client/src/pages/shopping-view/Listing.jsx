import React from 'react'
import Filter from '@/components/shopping-view/Filter'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/components/ui/dropdown-menu'
import { sortOptions } from '@/config'

function Listing() {
  return (
     <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6'>
       <Filter/>
       <div className='bg-background w-full rounded-lg shadow-sm'>
            <div className='p-4 border-b flex  items-center justify-between'>
                <h3 className='text-lg font-extrabold '>Products</h3>
                <div className='flex items-center gap-3'>
                  <span className='text-muted-foreground'>10 Products</span>
                  <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='outline' size='sm' className='flex items-center gap-1'>
                      <ArrowUpDown className='h-4 w-4'/>
                       <span className=''>Sort by</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end' className='w-[200px]'>
                    <DropdownMenuRadioGroup>
                      {
                        sortOptions.map((option) => (
                          <DropdownMenuRadioItem key={option.value} value={option.value}>
                            {option.label}
                          </DropdownMenuRadioItem>
                        ))
                      }
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                </div>                
            </div>
           <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            <ProductCard/>
           </div>
       </div>
     </div>
  )
}

export default Listing