import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function OpenOffersTab(props){
    const {
        onChange,
        value,
        orderTab,
    } = props
    const navigate= useNavigate();

    return(
        <div className="tt-submenu tt-offers show">
            <div className="tt-submenu-row">
                <div className={`tt-subtab ${value==="sent"? "active" :""}`} onClick={() =>{onChange("sent"); navigate(`/otc/${orderTab}/open/sent`)}}>SENT</div>
                <div className={`tt-subtab ${value==="received"? "active" :""}`} onClick={() =>{onChange("received");navigate(`/otc/${orderTab}/open/received`)}}>RECEIVED</div>
            </div>
        </div>
    )
}