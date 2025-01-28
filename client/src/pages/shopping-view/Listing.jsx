import React, { useEffect, useState } from 'react'
import Filter from '@/components/shopping-view/Filter'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { ArrowUpDown, Vault } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/components/ui/dropdown-menu'
import { sortOptions } from '@/config'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFilteredProducts } from '@/store/shop/product-slice'
import ProductTile from '@/components/shopping-view/ProductTile'

function Listing() {
  const dispatch = useDispatch()
  const {products} = useSelector((state)=>state.shopProducts)
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState(null)

  function handleSort(value){
    setSort(value)
  }
  
 function handleFilter(getSectionId,getCurrentOption){
 
  let cpyFilters = {...filters}
  const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

  if(indexOfCurrentSection === -1){
    cpyFilters = {...cpyFilters, [getSectionId]: [getCurrentOption]}    
 }
 else{
   const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(getCurrentOption)

   if(indexOfCurrentOption === -1)  cpyFilters[getSectionId].push(getCurrentOption);
   else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1)
}

  setFilters(cpyFilters)
  sessionStorage.setItem('filters',JSON.stringify(cpyFilters))
 }

 useEffect(()=>{
    setSort("price-lowtohigh")
    setFilters(JSON.parse(sessionStorage.getItem('filters')) || {})
 },[])

  useEffect(()=>{
    dispatch(fetchAllFilteredProducts())
  },[dispatch])
  
  console.log(filters,"Filters")
 
  return (
     <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6'>
       <Filter filters={filters} handleFilter={handleFilter}/>
       <div className='bg-background w-full rounded-lg shadow-sm'>
            <div className='p-4 border-b flex  items-center justify-between'>
                <h3 className='text-lg font-extrabold '>Products</h3>
                <div className='flex items-center gap-3'>
                  <span className='text-muted-foreground'>{products?.length }</span>
                  <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='outline' size='sm' className='flex items-center gap-1'>
                      <ArrowUpDown className='h-4 w-4'/>
                       <span className=''>Sort by</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end' className='w-[200px]'>
                    <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                      {
                        sortOptions.map((sortItems) =>(
                          <DropdownMenuRadioItem key={sortItems.id} value={sortItems.id}>
                            {sortItems.label}
                          </DropdownMenuRadioItem>
                        ))
                      }
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                </div>                
            </div>
           <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-4'>
            {
              products.map((product)=>(
                <ProductTile product={product} key={product._id} />
              ))
            }
           </div>
       </div>
     </div>
  )
}


export default Listing