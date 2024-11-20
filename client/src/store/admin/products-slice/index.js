
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    isLoading : false,
    products : []
}

export const addNewProduct = createAsyncThunk('/products/addnewproduct',
    async (formData,{rejectWithValue})=>{
        try{const res = await axios.post("http://localhost:3000/admin/products/add",formData,{
            withCredentials: true,
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        return res?.data
    }
        catch(err){
            if(err.response && err.response.data){
                return rejectWithValue(err.response.data.message || "Some Error Occurs")
            }
            else return rejectWithValue("Something Went Wrong")
        }
})

export const fetchAllProducts = createAsyncThunk('/products/fetchAllProducts',
    async ( _,{rejectWithValue})=>{
        try{const res = await axios.get("http://localhost:3000/admin/products/get")

        return res?.data
    }
        catch(err){
            if(err.response && err.response.data){
                return rejectWithValue(err.response.data.message || "Some Error Occurs")
            }
            else return rejectWithValue("Something Went Wrong")
        }
})

export const editAProduct = createAsyncThunk('/products/editAProduct',
    async ({id,formData},{rejectWithValue})=>{
        try{const res = await axios.put(`http://localhost:3000/admin/products/edit/${id}`,formData,{
            withCredentials: true,
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        return res?.data
    }
        catch(err){
            if(err.response && err.response.data){
                return rejectWithValue(err.response.data.message || "Some Error Occurs")
            }
            else return rejectWithValue("Something Went Wrong")
        }
})

export const deleteProduct = createAsyncThunk('/products/deleteproduct',
    async (id,{rejectWithValue})=>{
        try{const res = await axios.delete(`http://localhost:3000/admin/products/delete/${id}`,formData,{
            withCredentials: true,
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        return res?.data
    }
        catch(err){
            if(err.response && err.response.data){
                return rejectWithValue(err.response.data.message || "Some Error Occurs")
            }
            else return rejectWithValue("Something Went Wrong")
        }
})

const AdminProductsSlice = createSlice({
    name : 'adminProducts',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllProducts.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(fetchAllProducts.fulfilled,(state,action)=>{
            state.isLoading = false
            state.products = action.payload.data
        })
        .addCase(fetchAllProducts.rejected,(state,action)=>{
            state.isLoading = false
            state.products = []
        })
    }
})

export default AdminProductsSlice.reducer