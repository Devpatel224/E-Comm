import { Link } from "react-router-dom"
import { HousePlug ,Menu , ShoppingCart ,  LogOut , UserCog } from "lucide-react"
import { Sheet ,SheetContent,SheetTrigger } from "../ui/sheet"
import { Button } from "../ui/button"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { shoppingViewHeaderMenuItems } from "@/config"
import { DropdownMenu , DropdownMenuTrigger , DropdownMenuContent , DropdownMenuLabel , DropdownMenuSeparator , DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { Avatar , AvatarFallback  } from "../ui/avatar"
import { logoutUser } from "@/store/auth-slice"
import { useToast } from '@/hooks/use-toast'
import { useDispatch } from "react-redux"
import CartWrapper from "./CartWrapper"
import { useState , useEffect } from "react"
import { fetchCartItems } from "@/store/shop/cart-slice"
import { fetchAllFilteredProducts } from "@/store/shop/product-slice"

const MenuItems = ()=>{

  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const handleNavigateToPages = (menuItem)=>{
    sessionStorage.removeItem('filters')    
    
    const currentFilters = menuItem.id !== 'home' && menuItem.id !== 'products' ? {
      'category' : [menuItem.id]
    }:null;
   
    sessionStorage.setItem('filters',JSON.stringify(currentFilters))
    
    navigate(menuItem.path)

    if(menuItem.id !== 'home' && menuItem.id !== 'products' ){
      setTimeout(() => {
        dispatch(
          fetchAllFilteredProducts({ filterParams: currentFilters, sortParams: "price-lowtohigh" })
        );
      }, 0);
    }
    
  }

  // useEffect(()=>{
  //   sessionStorage.getItem("filters")
  //   const filters = JSON.parse(sessionStorage.getItem("filters"))
  //   dispatch(fetchAllFilteredProducts({filterParams:{filters},sortParams:"price-lowtohigh"}))
  // },)
  
  return <nav className="flex flex-col mb-3 lg:mb-0 gap-6 lg:items-center lg:flex-row">
      {
        shoppingViewHeaderMenuItems.map(menuItem=><label  onClick={()=>handleNavigateToPages(menuItem)} className="text-sm cursor-pointer" key={menuItem.id} to={menuItem.path}>{menuItem.label}</label>)
      }
  </nav>
}

const HeaderRightContent = ()=>{

  const {user} = useSelector(state=>state.auth)
  const [openCartSheet, setOpenCartSheet] = useState(false)
  const {cartItems} = useSelector((state)=>state.shopCart)
  

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {toast} = useToast()

  const handleLogout = ()=>{
    dispatch(logoutUser()).then(()=>{
        toast({
            title: "Logout Successfully",
            description: "You have been logged out successfully",
            variant: "default"
        })
    })
  }

  return <div className="flex lg:items-center lg:flex-row flex-col gap-2">
      <Sheet open={openCartSheet} onOpenChange={()=>setOpenCartSheet(false)}> 
      <Button onClick={()=>setOpenCartSheet(true)} variant='outline' size='icon' >
      <ShoppingCart className="w-6 h-6"/>
      <span className="sr-only">User Cart</span>
      </Button>
      <CartWrapper setOpenCartSheet={setOpenCartSheet} cartItems={cartItems && cartItems.items && cartItems.items.length > 0 ? cartItems.items : []}/>
      </Sheet>

      <DropdownMenu >
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56 bg-background border-[1px] border-border p-2">
          <DropdownMenuLabel className="text-base font-medium mb-2">Logged in as {user?.username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center mb-1 cursor-pointer" onClick={() => navigate("/shop/account")}>
            <UserCog className="mr-2 h-4 w-4 " />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center cursor-pointer" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4"/>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  </div>
}

function ShoppingHeader() {
  const {isAuthenticated , user} = useSelector(state=>state.auth)
   const dispatch= useDispatch()

  useEffect(() => {
      dispatch(fetchCartItems(user?.id))
     }, [dispatch])
  
  return (
    <header className='sticky  top-0 z-40 w-full border-b bg-background'>
      <div className='h-16 flex items-center justify-between px-4 md:px6'>
        <Link to='/shop/home' className="flex items-center gap-2">
        <HousePlug className="h-6 w-6"/>
        <span className="font-bold">ECommerce</span>
        </Link> 
        <Sheet>
          <SheetTrigger asChild>
              <Button variant='outilne' size='icon' className="lg:hidden">
              <Menu className="h-6 w-6"/>
                <span className="sr-only">Toggle HeaderMenu</span>
              </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
          <MenuItems></MenuItems>
          <HeaderRightContent/>
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems></MenuItems>
          </div>
            <div className="hidden lg:block ">
              <HeaderRightContent/>
            </div> 
      </div>
    </header>
  )
}

export default ShoppingHeader