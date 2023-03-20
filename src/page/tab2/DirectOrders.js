import React, {useState} from "react";
import Buy from "./Buy";
import Sell from "./Sell";

export default function DirectOrders(){
    const [options, setOptions] = useState("buy");

    return(
        <div id="tab2" className="tabcontent otc-do">

            <div className="do-row">
                <div className="side pointer">
                    <div className={`side-btn buy ${options === "buy" ? "active": ""}`} onClick={() => setOptions("buy")}>BUY</div>
                    <div className={`side-btn sell ${options === "sell" ? "active": ""}`} onClick={() => setOptions("sell")}>SELL</div>
                </div>

                {
                    options === "buy" && <Buy />
                }
                {
                    options === "sell" && <Sell/>
                }



            </div>
        </div>
    )
}