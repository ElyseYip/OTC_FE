import React from "react";
import {useNavigate} from "react-router-dom";

export default function Intro(props) {
    const {
        onChange
    } = props

    const navigate = useNavigate();

    return (
        <div id="tab1" className="tabcontent otc-intro">

            <div className="intro-row">
                <div className="tab-title center">INTRODUCTION TO OTC TRADING</div>
                <div className="center"><p>There're 2 ways to participate in OTC trading:</p></div>

                <div className="explain-row">
                    <div className="explain-box direct">
                        <div className="explain-title">DIRECT ORDERS</div>
                        <div className="explain-text">Buy/sell larger positions with off-exchange
                            counterparties without market impact
                        </div>
                        <div className="explain-img">
                            <img src="./images/otc/direct-order.png"/>
                        </div>
                        <a onClick={() => {onChange("direct");navigate("/otc/direct") }}>
                            <div className="explain-btn nowrap">START <b>TRADING</b></div>
                        </a>
                    </div>
                    <div className="explain-box match">
                        <div className="explain-title">MATCH ORDERS</div>
                        <div className="explain-text">Match order between two counterparties you have
                            identified and earn the broker spread!
                        </div>
                        <div className="explain-img">
                            <img src="./images/otc/match-order.png"/>
                        </div>
                        <a onClick={() => {onChange("match");navigate("/otc/match")}}>
                            <div className="explain-btn nowrap">START <b>MATCHING</b></div>
                        </a>
                    </div>
                </div>
            </div>

            <div className="sellpoint-row">
                <div className="sell-text">
                    <div className="sell-text-big"><span className="blue">NO LIMITS</span> TO THE SIZE OR
                        FREQUENCY OF YOUR ORDER
                    </div>
                    <div className="sell-text-sm">(KYC requirements apply)</div>
                </div>
            </div>

        </div>
    )
}