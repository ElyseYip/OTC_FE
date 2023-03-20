import {createSlice} from "@reduxjs/toolkit";

const initialState = {}

const cancelOrderSlice = createSlice({
    name: "cancelOrder",
    initialState,
    reducers:{
        cancelOrder(state, action){
            return action.payload
        }
    }
})

export const {cancelOrder} = cancelOrderSlice.actions
export default cancelOrderSlice.reducer