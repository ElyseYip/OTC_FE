import {createSlice} from "@reduxjs/toolkit";

const initialState = {}

const confirmOrderSlice = createSlice({
    name: "takeOrder",
    initialState,
    reducers:{
        takeOrder(state, action){
            return action.payload
        }
    }
})

export const {takeOrder} = confirmOrderSlice.actions
export default confirmOrderSlice.reducer