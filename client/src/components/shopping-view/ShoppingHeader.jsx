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

const MenuItems = ()=>{
  return <nav className="flex flex-col mb-3 lg:mb-0 gap-6 lg:items-center lg:flex-row">
      {
        shoppingViewHeaderMenuItems.map(menuItem=><Link className="text-sm" key={menuItem.id} to={menuItem.path}>{menuItem.label}</Link>)
      }
  </nav>
}

const HeaderRightContent = ()=>{

  const {user} = useSelector(state=>state.auth)
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
      <Button variant='outline' size='icon' >
      <ShoppingCart className="w-6 h-6"/>
      <span className="sr-only">User Cart</span>
      </Button>
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
          <DropdownMenuItem className="flex items-center mb-1" onClick={() => navigate("/shop/account")}>
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4"/>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  </div>
}

function ShoppingHeader() {
  const {isAuthenticated , user} = useSelector(state=>state.auth)
  
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