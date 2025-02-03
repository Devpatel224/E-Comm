import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialeState = {
    cartItems : [],
    isLoading : false,
}

export const addToCart = createAsyncThunk('cart/addToCart',
    async ({userId,productId,quantity},{rejectWithValue})=>{
        try{
            const res = await axios.post('http://localhost:3000/shop/cart/add',{userId,productId,quantity},{
                withCredentials:true,
                headers :{
                    'Content-Type' : 'application/json'
                }
            })

            return res?.data
        }catch(err){
            if(err.response && err.response.data){
                return rejectWithValue(err.response.data.message || "Some Error Occurs")
            }
            else return rejectWithValue("Something Went Wrong")
        }
    }
)
export const fetchCartItems = createAsyncThunk('cart/getCartItems',
    async (userId,{rejectWithValue})=>{
        try{
            const res = await axios.get(`http://localhost:3000/shop/cart/get/${userId}`,{
                withCredentials:true
            })

            return res?.data
        }catch(err){
            if(err.response && err.response.data){
                return rejectWithValue(err.response.data.message || "Some Error Occurs")
            }
            else return rejectWithValue("Something Went Wrong")
        }
    }
)
export const deleteCartItem = createAsyncThunk('cart/deleteCartItem',
    async ({userId,productId},{rejectWithValue})=>{
        try{
            const res = await axios.delete(`http://localhost:3000/shop/cart/${userId}/${productId}`,{
                withCredentials:true
            })

            return res?.data
        }catch(err){
            if(err.response && err.response.data){
                return rejectWithValue(err.response.data.message || "Some Error Occurs")
            }
            else return rejectWithValue("Something Went Wrong")
        }
    }
)
export const updateCartQuantity = createAsyncThunk('cart/updateCartQuantity',
    async ({userId,productId,quantity},{rejectWithValue})=>{
        try{
            const res = await axios.put(`http://localhost:3000/shop/cart/update-cart`,{userId,productId,quantity},{
                withCredentials:true
            })

            return res?.data
        }catch(err){
            if(err.response && err.response.data){
                return rejectWithValue(err.response.data.message || "Some Error Occurs")
            }
            else return rejectWithValue("Something Went Wrong")
        }
    }
)

const shoppingCartSlice = createSlice({
    name : 'shoppingCart',
    initialState : initialeState,
    reducer:{},
    extraReducers : (builder)=>{
        builder.addCase(addToCart.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(addToCart.fulfilled,(state,action)=>{
            state.isLoading = false
            state.cartItems = action.payload.data
        })
        .addCase(addToCart.rejected,(state)=>{
            state.isLoading = false
            state.cartItems = []
        })

        builder.addCase(fetchCartItems.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(fetchCartItems.fulfilled,(state,action)=>{
            state.isLoading = false
            state.cartItems = action.payload.data
        })
        .addCase(fetchCartItems.rejected,(state)=>{
            state.isLoading = false
            state.cartItems = []
        })

        builder.addCase(updateCartQuantity.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(updateCartQuantity.fulfilled,(state,action)=>{
            state.isLoading = false
            state.cartItems = action.payload.data
        })
        .addCase(updateCartQuantity.rejected,(state)=>{
            state.isLoading = false
            state.cartItems = []
        })
        builder.addCase(deleteCartItem.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteCartItem.fulfilled,(state,action)=>{
            state.isLoading = false
            state.cartItems = action.payload.data
        })
        .addCase(deleteCartItem.rejected,(state)=>{
            state.isLoading = false
            state.cartItems = []
        })

    }
})

export default shoppingCartSlice.reducer