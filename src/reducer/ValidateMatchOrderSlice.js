import {createSlice} from "@reduxjs/toolkit";

const initialState = {};

const validateMatchOrderSlice = createSlice({
    name:"validateMatchOrder",
    initialState,
    reducer:{
        validateMatchOrder(state, action){
            if(action.payload?.data?.message){
                return
            }
            state.push(action.payload.data)
        }
    }
})

export const {validateMatchOrder} = validateMatchOrderSlice.actions;
export default validateMatchOrderSlice.reducer;