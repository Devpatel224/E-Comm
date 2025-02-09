import React, { useEffect, useState } from 'react'
import bannerOne from '../../assets/banner-1.webp'
import bannerTwo from '../../assets/banner-2.webp'
import bannerThree from '../../assets/banner-3.webp'
import { Button } from '@/components/ui/button'
import { BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightning, Shirt, Umbrella, WatchIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { loginFormControls } from '@/config'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/shop/product-slice'
import ProductTile from '@/components/shopping-view/ProductTile'
import { useNavigate } from 'react-router-dom'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import { useToast } from '@/hooks/use-toast'
import ProductsDetails from '@/components/shopping-view/ProductsDetails'



const categoriesWithIcon =  [
  { id: "men", label: "Men" , icon : Shirt },
  { id: "women", label: "Women", icon : CloudLightning },
  { id: "kids", label: "Kids", icon : BabyIcon},
  { id: "accessories", label: "Accessories" , icon : WatchIcon },
  { id: "footwear", label: "Footwear" , icon : Umbrella },
]

const brands = [
  { id: "nike", label: "Nike" , icon : CloudLightning },
  { id: "adidas", label: "Adidas" , icon : CloudLightning },
  { id: "puma", label: "Puma" , icon : CloudLightning },
  { id: "levi", label: "Levi's"  , icon : CloudLightning},
  { id: "zara", label: "Zara" , icon : CloudLightning },
  { id: "h&m", label: "H&M" , icon : CloudLightning },
]


function Home() {
  const slides = [bannerOne,bannerTwo,bannerThree]
  const {products , productDetails}= useSelector(state=>state.shopProducts)
  const {user} = useSelector(state=>state.auth)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {toast} = useToast()

  const handleNavigateToListingPage = ( getCurrentItem , section ) => {
     sessionStorage.removeItem('filters')
     const currentFilters = {
        [section] : [getCurrentItem.id]
     }
     sessionStorage.setItem('filters',JSON.stringify(currentFilters))
      navigate('/shop/listing')
  }

   function handleGetProductDetails(productId) {
      dispatch(fetchProductDetails(productId))
      console.log(productId)
      console.log(productDetails);      
  }

    function handleAddToCart(getCurrentProductId) {
      dispatch(addToCart({ userId: user?.id,
         productId: getCurrentProductId,
        quantity: 1 })
      )
      .then((data)=>{
        if(data.payload?.success){
          dispatch(fetchCartItems(user?.id));     
          toast({
            title : "Product Successfully Added to Cart" 
          })
        }
    }
  )
  }
  

  useEffect(()=>{
    const interval = setInterval(()=>{
      setCurrentSlide(prevSlide=> (prevSlide - 1 + slides.length) % slides.length)
    },5000)

    return ()=>clearInterval(interval)
  })

  
  useEffect(()=>{
    dispatch(fetchAllFilteredProducts({filterParams:{},sortParams:"price-lowtohigh"}))
  },[dispatch])

 useEffect(()=>{
   if(productDetails !== null){
    setOpen(true)
   }
 },[productDetails])
  
  return (
    <div className='flex flex-col min-h-screen'>
      <div className="relative w-full h-[600px] overflow-hidden">
        {
          slides.map((slide,index)=>(
            <img src={slides[currentSlide]}   alt="" key={index} className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}/>
          ))
        }
        <Button variant="outline" onClick={()=>setCurrentSlide(prevSlide=> (prevSlide - 1 + slides.length) % slides.length)} size='icon' className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80'>
          <ChevronLeftIcon className='w-4 h-4'></ChevronLeftIcon>
        </Button>
        <Button onClick={()=>setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length)} variant="outline" size='icon' className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80'>
          <ChevronRightIcon className='w-4 h-4'></ChevronRightIcon>
        </Button>
      </div>
      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {
                categoriesWithIcon.map((categoryItem,index)=>(
                  <Card onClick={()=>handleNavigateToListingPage(categoryItem , 'category')} className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardContent className='flex flex-col items-center justify-center p-6'>
                        <categoryItem.icon className='w-12 h-12 mb-4 text-primary'></categoryItem.icon>
                        <span className='font-bold'>{categoryItem.id}</span>
                    </CardContent>
                  </Card>
                ))
              }
          </div>
        </div>
      </section>
      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {
                brands.map((brandItem,index)=>(
                  <Card onClick={()=>handleNavigateToListingPage(brandItem , 'brand')} className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardContent className='flex flex-col items-center justify-center p-6'>
                        <brandItem.icon className='w-12 h-12 mb-4 text-primary'></brandItem.icon>
                        <span className='font-bold'>{brandItem.id}</span>
                    </CardContent>
                  </Card>
                ))
              }
          </div>
        </div>
      </section>
      <section className="py-12">
      <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>Feature Products</h2>
           <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {
                products && products.length > 0 ?
                  products.map((product,index)=>(
                    <ProductTile product={product} handleGetProductDetails={handleGetProductDetails}  
                    handleAddToCart={handleAddToCart}
                    key={product._id} />
                  ))
                : null
              }
           </div>
        </div>
      </section>
           <ProductsDetails open={open} setOpen={setOpen} productDetails={productDetails}></ProductsDetails>
    </div>
  )
}

export default Home