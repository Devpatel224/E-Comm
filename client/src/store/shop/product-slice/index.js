import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    products:[],
    isLoading:false,
    productDetails : null
}

export const fetchAllFilteredProducts = createAsyncThunk('/products/fetchAllFilteredProducts',
    async ({filterParams,sortParams},{rejectWithValue})=>{
        try{            
            const query = new URLSearchParams({
                ...filterParams,
                sortBy:sortParams
            })
            
            const res = await axios.get(`http://localhost:3000/shop/products/get?${query}`)

        return res?.data
    }
        catch(err){
            if(err.response && err.response.data){
                return rejectWithValue(err.response.data.message || "Some Error Occurs")
            }
            else return rejectWithValue("Something Went Wrong")
        }
})

export const fetchProductDetails = createAsyncThunk('/products/fetchProductDetails',
    async (id,{rejectWithValue})=>{
        try{                   
            const res = await axios.get(`http://localhost:3000/shop/products/get/${id}`)

        return res?.data
    }
        catch(err){
            if(err.response && err.response.data){
                return rejectWithValue(err.response.data.message || "Some Error Occurs")
            }
            else return rejectWithValue("Something Went Wrong")
        }
})



const shopProductSlice = createSlice({
    name:"shoppingProducts",
    initialState,
    reducers:{
        setProductDetails:(state,action)=>{
            state.productDetails = null
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllFilteredProducts.pending,(state,action)=>{
            state.isLoading = true
        })
        .addCase(fetchAllFilteredProducts.fulfilled,(state,action)=>{
            state.isLoading = false
            state.products = action.payload.data
        })
        .addCase(fetchAllFilteredProducts.rejected,(state,action)=>{
            state.isLoading = false
            state.products = []
        })
        .addCase(fetchProductDetails.pending,(state,action)=>{
            state.isLoading = true;
        })
        .addCase(fetchProductDetails.fulfilled,(state,action)=>{
            state.isLoading = false
            state.productDetails = action.payload.data
        })
        .addCase(fetchProductDetails.rejected,(state,action)=>{
            state.isLoading = false
            state.productDetails = null
        })
    }
})

export const {setProductDetails} = shopProductSlice.actions
export default shopProductSlice.reducer