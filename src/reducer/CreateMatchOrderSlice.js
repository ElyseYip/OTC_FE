import {createSlice} from "@reduxjs/toolkit";

const initialState={};

const createMatchOrderSlice = createSlice({
    name:"createMatchOrder",
    initialState,
    reducers:{
        createMatchOrder(state, action){
            if(action.payload?.data?.message){
                return
            }
            state.push(action.payload.data)
        }
    }
})

export const {createMatchOrder} = createMatchOrderSlice.actions;
export default createMatchOrderSlice.reducer;