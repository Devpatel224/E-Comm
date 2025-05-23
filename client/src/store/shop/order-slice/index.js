import { createAsyncThunk , createSlice } from "@reduxjs/toolkit"




const initialeState = {
    approvalURL : null,
    isLoading : false,
    orderId : null
}


export const createOrder = createAsyncThunk("/order/createNewOrder",
    async (orderData,{rejectWithValue})=>{
        try{
            const res = await axios.post('http://localhost:3000/shop/order/create',orderData,{
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
})

const shoppingOrderSlice = createSlice({
    name : "shoppingOrderSlice",
    initialState : initialeState,
    reducers : {},
    extraReducers : (builder)=>{
        builder 
        .addCase(createOrder.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(createOrder.fulfilled,(state,action)=>{
            state.isLoading = true;
            state.approvalURL = action.payload.approvalURL
            state.orderId = action.payload.orderId
        })
        .addCase(createOrder.rejected,(state)=>{
            state.isLoading = false;
            state.approvalURL = null;
            state.orderId = null
        })
    }
})

export default shoppingOrderSlice.reducer