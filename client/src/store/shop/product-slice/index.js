import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    products:[],
    isLoading:false,
}

export const fetchAllFilteredProducts = createAsyncThunk('/products/fetchAllFilteredProducts',
    async ( _,{rejectWithValue})=>{
        try{const res = await axios.get("http://localhost:3000/shop/products/get")

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