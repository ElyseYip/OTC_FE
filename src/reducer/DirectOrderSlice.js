import {createSlice} from "@reduxjs/toolkit";

const initialState = [];

const directOrderSlice = createSlice({
    name: "directOrder",
    initialState,
    reducers:{
        createOTCDirectOrder(state, action){
            if(action.payload?.data?.message){
                return
            }
            state.push(action.payload.data)
        }
    }
})

export const {createOTCDirectOrder} = directOrderSlice.actions;
export default directOrderSlice.reducer;