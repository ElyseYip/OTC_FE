import React, {useState} from "react";
import Intro from "./tab1/Intro.js";
import DirectOrders from "./tab2/DirectOrders";
import MatchOrders from "./tab3/MatchOrders";
import TradeTable from "./tradeTable/TradeTable";
import ImportantDetails from "./importantDetails/ImportantDetails";
import {useNavigate} from "react-router-dom";

export default function HomePage() {
    const getTab = localStorage.getItem('tab');
    const [tab, setTab] = useState(getTab? getTab: "intro")
    localStorage.setItem("tab", tab)

    const navigate = useNavigate()
    return (
        <div className="body otc">
            <div className="banner-row">
                <div className="banner-text">
                    <div className="banner-title-sm">WELCOME TO</div>
                    <div className="banner-title-big">AENX OTC PORTAL</div>
                    <div className="banner-desc">(i) Trade and settle
                        cryptocurrency block orders over-the-counter
                        cost-effectively and with minimal market impact; Or (ii)
                        EARN the “broker spread” by matching two other
                        counterparties and their block orders on our platform.
                    </div>
                </div>
            </div>

            <div className="page-content about-content">

                <div className="tab-menu content-box">

                    <div className="tabs">
                        <button className={`tablinks tab1 ${tab==="intro"? "active":""}`} onClick={()=>{setTab("intro");navigate("/otc")}} id="defaultOpen">INTRO</button>
                        <button className={`tablinks tab1 ${tab==="direct"? "active":""}`} onClick={()=>{setTab("direct");navigate("/otc/direct")}}>DIRECT ORDERS</button>
                        <button className={`tablinks tab1 ${tab==="match"? "active":""}`} onClick={()=>{setTab("match");navigate("/otc/match")}}>MATCH ORDERS</button>
                    </div>
                    {
                     tab === "intro" && <Intro onChange={(e) => setTab(e)}/>
                    }
                    {
                        tab === "direct" &&  <DirectOrders/>
                    }
                    {
                        tab === "match" &&  <MatchOrders/>
                    }

                </div>

                {
                    tab === "intro" ? <ImportantDetails/> : <TradeTable orderTab={tab}/>
                }


            </div>
        </div>
    )
}