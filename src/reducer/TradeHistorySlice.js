import {createSlice} from "@reduxjs/toolkit";

const initialState = [];

const tradeHistorySlice = createSlice({
    name:"openOffers",
    initialState,
    reducers:{
        fetchTradeHistory(state, action){
            return action.payload.data
        }
    }
})

export const {fetchTradeHistory} = tradeHistorySlice.actions;
export default tradeHistorySlice.reducer