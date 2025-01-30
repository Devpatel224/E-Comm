import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    products:[],
    isLoading:false,
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

const shopProductSlice = createSlice({
    name:"shoppingProducts",
    initialState,
    reducers:{},
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
    }
})

export default shopProductSlice.reducer