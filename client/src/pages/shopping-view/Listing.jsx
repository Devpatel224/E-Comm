import React, { useEffect, useState } from 'react'
import Filter from '@/components/shopping-view/Filter'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { ArrowUpDown, Vault } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/components/ui/dropdown-menu'
import { sortOptions } from '@/config'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/shop/product-slice'
import ProductTile from '@/components/shopping-view/ProductTile'
import { useSearchParams } from 'react-router-dom'
import ProductsDetails from '@/components/shopping-view/ProductsDetails'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import { toast, Toaster } from "react-hot-toast";


function createSearchParamsHelper(filters) {
  let queryParams = []

  for (const [key, value] of Object.entries(filters)) {

    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(',')

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
    }
  }
  return queryParams.join('&')
}


function Listing() {
  const dispatch = useDispatch()
  const { products, productDetails } = useSelector((state) => state.shopProducts)
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [open, setOpen] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const {cartItems} = useSelector((state)=>state.shopCart)
  

  function handleSort(value) {
    setSort(value)
  }

  function handleFilter(getSectionId, getCurrentOption) {

    let cpyFilters = { ...filters }
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      cpyFilters = { ...cpyFilters, [getSectionId]: [getCurrentOption] }
    }
    else {
      const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(getCurrentOption)

      if (indexOfCurrentOption === -1) cpyFilters[getSectionId].push(getCurrentOption);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1)
    }

    setFilters(cpyFilters)
    sessionStorage.setItem('filters', JSON.stringify(cpyFilters))
  }

  function handleGetProductDetails(productId) {
    dispatch(fetchProductDetails(productId))
  }


  function handleAddToCart(getCurrentProductId) {
    dispatch(addToCart({ userId: user?.id,
       productId: getCurrentProductId,
      quantity: 1 })
    )
    .then((data)=>{
      if(data.payload?.success){
        dispatch(fetchCartItems(user?.id))     

        toast.success("Product added to cart successfully")
      }
  }
)
}

  useEffect(() => {
    setSort("price-lowtohigh")
    setFilters(JSON.parse(sessionStorage.getItem('filters')) || {})
  }, [])

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ filterParams: filters, sortParams: sort }))
  }, [dispatch, sort, filters])

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters)
      // setSearchParams(createQueryString)  
      setSearchParams(new URLSearchParams(createQueryString))
    }
  }, [filters])

  useEffect(() => {
    if (productDetails !== null) {
      setOpen(true)
    }
  }, [productDetails])




  return (
    <div className='grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6'>
      <Filter filters={filters} handleFilter={handleFilter} />
      <div className='bg-background w-full rounded-lg shadow-sm'>
        <div className='p-4 border-b flex  items-center justify-between'>
          <h3 className='text-lg font-extrabold '>Products</h3>
          <div className='flex items-center gap-3'>
            <span className='text-muted-foreground'>{products?.length}</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='sm' className='flex items-center gap-1'>
                  <ArrowUpDown className='h-4 w-4' />
                  <span className=''>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-[200px]'>
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {
                    sortOptions.map((sortItems) => (
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
            products.map((product) => (
              <ProductTile product={product} key={product._id} handleGetProductDetails={handleGetProductDetails}
                handleAddToCart={handleAddToCart} />
            ))
          }
        </div>
      </div>
      <ProductsDetails open={open} setOpen={setOpen} productDetails={productDetails}></ProductsDetails>
    </div>
  )
}


export default Listing