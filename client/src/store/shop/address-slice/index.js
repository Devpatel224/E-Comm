import { asyncThunkCreator, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading : false,
    addressList : []
}

export const addAddress = createAsyncThunk('/address/add',
    async ({data},{rejectWithValue})=>{        
            try{
              const res = await axios.post("http://localhost:3000/shop/address/add",data,{
                withCredentials:true
              })  

              return res?.data
            }
            catch(e){
                if(err.response && err.response.data){

                    return rejectWithValue(err.response.data || "Invalid Data")
                }
                else{
                    return rejectWithValue("Some Error Occur")
                }
            }
  }
)

export const fetchAddress = createAsyncThunk('/address/fetch',
    async ({userId},{rejectWithValue})=>{        
            try{
              const res = await axios.get(`http://localhost:3000/shop/address/fetch/${userId}`,{
                withCredentials:true
              })  

              return res?.data
            }
            catch(e){
                if(err.response && err.response.data){

                    return rejectWithValue(err.response.data || "Invalid Data")
                }
                else{
                    return rejectWithValue("Some Error Occur")
                }
            }
  }
)
export const updateAddress = createAsyncThunk('/address/edit',
    async ({userId,addressId},{rejectWithValue})=>{        
            try{
              const res = await axios.put(`http://localhost:3000/shop/address/fetch/${userId}/${addressId}`,{
                withCredentials:true
              })  

              return res?.data
            }
            catch(e){
                if(err.response && err.response.data){

                    return rejectWithValue(err.response.data || "Invalid Data")
                }
                else{
                    return rejectWithValue("Some Error Occur")
                }
            }
  }
)
export const deleteAddress = createAsyncThunk('/address/delete',
    async ({userId,addressId},{rejectWithValue})=>{        
            try{
              const res = await axios.delete(`http://localhost:3000/shop/address/fetch/${userId}/${addressId}`,{
                withCredentials:true
              })  

              return res?.data
            }
            catch(e){
                if(err.response && err.response.data){

                    return rejectWithValue(err.response.data || "Invalid Data")
                }
                else{
                    return rejectWithValue("Some Error Occur")
                }
            }
  }
)

const addressSlice = createSlice({
    name:"address",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{

        builder.addCase(addAddress.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(addAddress.fulfilled,(state,action)=>{
            state.isLoading = false
            state.addressList = action.payload.data
        })
        .addCase(addAddress.rejected,(state)=>{
            state.isLoading = false
            state.addressList = []
        })

        .addCase(fetchAddress.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(fetchAddress.fulfilled,(state,action)=>{
            state.isLoading = false
            state.addressList = action.payload.data
        })
        .addCase(fetchAddress.rejected,(state)=>{
            state.isLoading = false
            state.addressList = []
        })

        .addCase(updateAddress.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(updateAddress.fulfilled,(state,action)=>{
            state.isLoading = false
            state.addressList = action.payload.data
        })
        .addCase(updateAddress.rejected,(state)=>{
            state.isLoading = false
            state.addressList = []
        })

        .addCase(deleteAddress.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteAddress.fulfilled,(state,action)=>{
            state.isLoading = false
            state.addressList = action.payload.data
        })
        .addCase(deleteAddress.rejected,(state)=>{
            state.isLoading = false
            state.addressList = []
        })      
    }
})



export default addressSlice.reducer