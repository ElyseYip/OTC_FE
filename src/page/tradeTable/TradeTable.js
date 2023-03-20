import React, {useState} from "react";
import OffersTable from "./openOffers/OffersTable";
import Completed from "./tradeHistory/Completed";
import ReceivedNotInUse from "./openOffers/ReceivedUnused.js";
import Failed from "./tradeHistory/Failed";
import OpenOffersTab from "./openOffers/OpenOffersTab";
import TradeHistory from "./tradeHistory/TradeHistory";
import {useNavigate} from "react-router-dom";

export default function TradeTable(props){
    const {orderTab} = props;
    const navigate = useNavigate();
    const [tab, setTab] = useState("open")
    const [openOffersTab, setOpenOffersTab] = useState("sent")
    const [historyTab, setHistoryTab] = useState("completed")

    console.log(openOffersTab)
    return (
        <div className="otc-table content-box">
            <div className="trade-table">

                <div className="tt-menu">
                    <div className={`tt-tab tt-offers ${tab === "open"? "active": ""}`} onClick={() =>{setTab("open"); navigate(`/otc/${orderTab}/open/${openOffersTab}`)}}>OPEN OFFERS</div>
                    <div className={`tt-tab tt-offers ${tab === "history"? "active": ""}`} onClick={() =>{setTab("history"); navigate(`/otc/${orderTab}/history/${historyTab}`)}}>TRADE HISTORY</div>
                </div>

                {
                    tab === "open" ?
                        <OpenOffersTab value={openOffersTab} onChange={(e)=>setOpenOffersTab(e)} orderTab={orderTab}/>
                        :
                        <TradeHistory value={historyTab} onChange={(e)=>setHistoryTab(e)} orderTab={orderTab}/>
                }
                {
                    tab === "open" && <OffersTable openOffersTab={openOffersTab}/>
                }
                {/*{*/}
                {/*    tab === "offers" && openOffersTab === "received" && <ReceivedUnused/>*/}
                {/*}*/}
                {
                    tab === "history" && <Completed historyTab={historyTab}/>
                }
                {/*{*/}
                {/*    tab === "history" && historyTab === "failed" && <Failed/>*/}
                {/*}*/}


            </div>

        </div>
    )
}