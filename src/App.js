import React, {useEffect} from "react";
import {BrowserRouter as Router, createBrowserRouter, Route, Routes, RouterProvider, Navigate} from "react-router-dom";
import HomePage from "./page/HomePage";
import {useDispatch} from "react-redux";
import {ApiActions} from "./api/ApiActions";
import {fetchOpenOffers} from "./reducer/OpenOffersSlice";
import {fetchTradeHistory} from "./reducer/TradeHistorySlice";
import Summary from "./page/tab3/Summary";
import TradeTable from "./page/tradeTable/TradeTable";
import OffersTable from "./page/tradeTable/openOffers/OffersTable";
import DirectOrders from "./page/tab2/DirectOrders";
import MatchOrders from "./page/tab3/MatchOrders";
import OpenOffersTab from "./page/tradeTable/openOffers/OpenOffersTab";

const router = createBrowserRouter([
    {
        path: "/otc",
        element: <HomePage/>,
        children: [
            {
                path: "/otc/direct",
                element: <DirectOrders/>,
            },
            {
                path: "/otc/match",
                element: <MatchOrders/>,
            },
            {
                path: "/otc/:orderTab/:tableTab",
                element: <TradeTable/>,
                children: [
                    {
                        path: "/otc/:orderTab/:tableTab/:childTab",
                        element: <OpenOffersTab/>
                    },
                ]
            }
        ]
    }
])

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(ApiActions({name: "openOffers", actions: fetchOpenOffers}))
        dispatch(ApiActions({name: "otcHistory", actions: fetchTradeHistory}))
    }, [])

    return (
        // <Router>
        //     <Routes>
        //         <Route path="/otc" element={<HomePage/>}/>
        //         <Route path="/direct" element={<DirectOrders/>}/>
        //         <Route path="/match" element={<MatchOrders/>}/>
        //         {/*<Route  path="/" element={<Summary/>}/>*/}
        //
        //     </Routes>
        // </Router>
        <>
            <RouterProvider router={router}/>
        </>
    );
}

export default App;
