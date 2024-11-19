import { createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
isAuthenticated : false,
isLoading:false,
user:null
};

export const registerUser = createAsyncThunk('/auth/register',
    async(formData,{rejectWithValue})=>{
        try{const res = await axios.post("http://localhost:3000/auth/register",formData,{
            withCredentials: true,
        })
        return res.data;}
        catch(e){
            if(e.response && e.response.data){
                return rejectWithValue(e.response.data.message || "Registration Fails")
            }else{
                return rejectWithValue("Some Error Occurs")
            }
        }   
    }
)

export const loginUser = createAsyncThunk('/auth/login',
    async(formData,{rejectWithValue})=>{
        try{const res = await axios.post("http://localhost:3000/auth/login",formData,{
            withCredentials: true,
        })

        return res.data;}
        catch(e){
            if(e.response && e.response.data){
                return rejectWithValue(e.response.data.message || "Login Fails")
            }else{
                return rejectWithValue("Some Error Occurs")
            }
        }
    }
)


const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser:(state,action)=>{

        },
        extraReducers:(builder)=>{
            builder
            .addCase(registerUser.pending,(state)=>{
                state.isLoading  = true
            }).addCase(registerUser.fulfilled,(state,action)=>{
                state.isLoading  = false
                state.user = null
                state.isAuthenticated = false
            }).addCase(registerUser.rejected,(state,action)=>{
                state.isLoading = false
                state.user = null
                state.isAuthenticated = false
            })
            .addCase(loginUser.pending,(state)=>{
                state.isLoading  = true
            }).addCase(loginUser.fulfilled,(state,action)=>{
                state.isLoading  = false
                state.user = action.payload.user
                state.isAuthenticated = true
            }).addCase(loginUser.rejected,(state,action)=>{
                state.isLoading = false
                state.user = null
                state.isAuthenticated = false
            })
        }
    }
})

export const {setUser} = authSlice.actions
export default authSlice.reducer