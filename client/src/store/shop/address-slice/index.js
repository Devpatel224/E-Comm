import { asyncThunkCreator, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading : false,
    addressList : []
}

export const addAddress = createAsyncThunk('/address/add',
    async (data,{rejectWithValue})=>{        
            try{

              const res = await axios.post("http://localhost:3000/shop/address/add",data,{
                withCredentials:true,
                headers:{
                    'Content-Type':'application/json'
                }
              })  

              return res?.data
            }
            catch(err){
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
              const res = await axios.get(`http://localhost:3000/shop/address/get/${userId}`,{
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
export const editAddress = createAsyncThunk('/address/edit',
    async ({userId,addressId,formData},{rejectWithValue})=>{        
            try{
              const res = await axios.put(`http://localhost:3000/shop/address/edit/${userId}/${addressId}`,formData,{
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
              const res = await axios.delete(`http://localhost:3000/shop/address/delete/${userId}/${addressId}`,{
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
        })
        .addCase(addAddress.rejected,(state)=>{
            state.isLoading = false
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

        .addCase(editAddress.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(editAddress.fulfilled,(state,action)=>{
            state.isLoading = false
            state.addressList = action.payload.data
        })
        .addCase(editAddress.rejected,(state)=>{
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