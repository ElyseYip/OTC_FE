import {createSlice} from "@reduxjs/toolkit";

const initialState = [];

const openOffersSlice = createSlice({
    name:"openOffers",
    initialState,
    reducers:{
        fetchOpenOffers(state, action){
            console.log(action.payload)
            return action.payload.data
        }
    }
})

export const {fetchOpenOffers} = openOffersSlice.actions;
export default openOffersSlice.reducer