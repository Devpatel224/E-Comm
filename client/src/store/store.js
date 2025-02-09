import { configureStore } from "@reduxjs/toolkit"
import authReducer from './auth-slice/index'
import adminProductReducer from './admin/products-slice/index'
import shopProductReducer from './shop/product-slice/index'
import shopCartReducer from './shop/cart-slice/index'
import addressReducer from  './shop/address-slice/index'

const store = configureStore({
    reducer:{
        auth : authReducer,
        adminProducts : adminProductReducer,
        shopProducts : shopProductReducer,
        shopCart : shopCartReducer,
        address : addressReducer
    }
})


export default store