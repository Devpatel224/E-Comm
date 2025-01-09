import { configureStore } from "@reduxjs/toolkit"
import authReducer from './auth-slice/index'
import adminProductReducer from './admin/products-slice/index'
import shopProductReducer from './shop/product-slice/index'

const store = configureStore({
    reducer:{
        auth : authReducer,
        adminProducts : adminProductReducer,
        shopProducts : shopProductReducer
    }
})


export default store