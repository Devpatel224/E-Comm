import { Routes, Route } from 'react-router-dom'
import AuthLayout from './components/auth/AuthLayout'
import Login from './pages/auth/login'
import Register from './pages/auth/register'
import AdminLayout from './components/admin-view/AdminLayout'
import Dashboard from './pages/admin-view/Dashboard'
import AdminProducts from './pages/admin-view/Products'
import AdminOrders from './pages/admin-view/Orders'
import AdminFeatures from './pages/admin-view/Features'
import ShoppingLayout from './components/shopping-view/ShoppingLayout'
import NotFound from './pages/not-found'
import Home from './pages/shopping-view/Home'
import Listing from './pages/shopping-view/Listing'
import Checkout from './pages/shopping-view/checkout'
import Account from './pages/shopping-view/Account'
import CheckAuth from './components/common/CheckAuth'
import UnAuthPage from './pages/unauth-page/UnAuthPage'

function App() {
  const isAuthenticated = false;
  const user = null
  
  return (
    <>    

      <div className='flex flex-1 overflow-hidden bg-white'>
          <Routes>
            <Route path='/auth' element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AuthLayout/>
              </CheckAuth>
              }>
                <Route path='login' element={<Login/>}></Route>
                <Route path='register' element={<Register/>}></Route>
            </Route>

            <Route path='/admin' element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout/>
            </CheckAuth>
              }>
              <Route path='dashboard' element={<Dashboard/>}></Route>
              <Route path='products' element={<AdminProducts/>}></Route>
              <Route path='orders' element={<AdminOrders/>}></Route>
              <Route path='features' element={<AdminFeatures/>}></Route>
            </Route>

            <Route path='/shop' element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout/>
            </CheckAuth>
              }>
                <Route path='home' element={<Home/>}></Route>
                <Route path='listing' element={<Listing/>}></Route>
                <Route path='checkout' element={<Checkout/>}></Route>
                <Route path='account' element={<Account/>}></Route>
            </Route>

            <Route path='*' element={<NotFound/>}></Route>
            <Route path='/unauth-page' element={<UnAuthPage/>}></Route>
          </Routes>
      </div>
    </>
  )
}

export default App
