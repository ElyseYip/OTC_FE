import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    type:"",
    isOpen:false,
    data:{}
}

const popUpSlice = createSlice({
    name: "popUp",
    initialState,
    reducers:{
        updatePopUpState(state, action){
            return action.payload
        }
    }
})

export const {updatePopUpState} = popUpSlice.actions
export default popUpSlice.reducer