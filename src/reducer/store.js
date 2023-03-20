import {configureStore} from "@reduxjs/toolkit";
import popUpReducer from "./PopUpSlice";
import directOrderReducer from "./DirectOrderSlice";
import openOffersReducer from "./OpenOffersSlice";
import tradeHistoryReducer from "./TradeHistorySlice";
import validateMatchOrderReducer from "./ValidateMatchOrderSlice";
import createMatchOrderReducer from "./CreateMatchOrderSlice";
import cancelOrderReducer from "./CancelOrderSlice";
import confirmOrderSlice from "./ConfirmOrderSlice";


import apiMiddleware from "../middleware/apiMiddleware";
export default configureStore({
    reducer: {
        popUp: popUpReducer,
        createOrder: directOrderReducer,
        validateMatchOrder: validateMatchOrderReducer,
        matchOrder: createMatchOrderReducer,
        openOffers: openOffersReducer,
        tradeHistory: tradeHistoryReducer,
        cancelOrder: cancelOrderReducer,
        confirmOrder: confirmOrderSlice,
    },
    middleware:[apiMiddleware]
})