import React, {useState} from "react";
import OffersTable from "../openOffers/OffersTable";
import ReceivedNotInUse from "../openOffers/ReceivedUnused.js";
import {useNavigate} from "react-router-dom";

export default function TradeHistory(props){
    const {
        onChange,
        value,
        orderTab
    } = props

    const navigate = useNavigate();

    return(
        <div className="tt-submenu tt-history show">
            <div className="tt-submenu-row">
                <div className={`tt-subtab ${value==="completed"? "active" :""}`} onClick={() =>{onChange("completed"); navigate(`/otc/${orderTab}/history/sent`)}}>COMPLETED</div>
                <div className={`tt-subtab ${value==="failed"? "active" :""}`} onClick={() =>{onChange("failed"); navigate(`/otc/${orderTab}/history/failed`)}}>FAILED</div>
            </div>
        </div>
    )
}