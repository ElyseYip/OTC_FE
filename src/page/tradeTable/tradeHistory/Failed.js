import React from "react";
import {useSelector} from "react-redux";

export default function Failed(){
    const failedTrade = useSelector(state => state.tradeHistory)

    return(
        <div className="tt-body tt-row-tbl tt-hist-fail tt-head show">

            <div className="tt-entries">

                <div className="tt-row">
                    <div className="tt-td tt-th tt-date">DATE CREATED</div>
                    <div className="tt-td tt-th tt-side">SIDE</div>
                    <div className="tt-td tt-th tt-side-amt">BASE AMOUNT</div>
                    <div className="tt-td tt-th tt-trade-amt">QUOTE AMOUNT</div>
                    <div className="tt-td tt-th tt-cp">COUNTERPARTY</div>
                    <div className="tt-td tt-th tt-status">STATUS</div>
                </div>
                <div className="tt-row tt-entry-group tt-mo-dtl">
                    <div className="tt-td tt-date">2010-10-21 15:20:10</div>
                    <div className="tt-td tt-side">
                        <div className="tt-group">
                            <div className="sub">BUY</div>
                            <div className="add">SELL</div>
                        </div>
                    </div>
                    <div className="tt-td tt-side-amt">
                        <div className="tt-group">
                            <div className="tt-party">1,000,000,000 BTC</div>
                            <div className="tt-party">9000 BTC</div>
                        </div>
                    </div>
                    <div className="tt-td tt-trade-amt">
                        <div className="tt-group">
                            <div className="tt-party">542,1010.002 ETH</div>
                            <div className="tt-party">101.92 ETH</div>
                        </div>
                    </div>
                    <div className="tt-td tt-cp">
                        <div className="tt-group">
                            <div className="tt-party">counterparty01@abc.com</div>
                            <div className="tt-party">party05@llwlw.com</div>
                        </div>
                    </div>
                    <div className="tt-td tt-status">
                        <div className="tt-status-desc">
                            <div className="tt-party">DECLINED</div>
                            <div className="tt-party"></div>
                        </div>
                    </div>
                </div>

                <div className="tt-row tt-entry-group tt-do-dtl">
                    <div className="tt-td tt-date">2010-10-21 15:20:10</div>
                    <div className="tt-td tt-side">
                        <div className="add">BUY</div>
                    </div>
                    <div className="tt-td tt-side-amt">
                        <div className="tt-party">10.1 VRC</div>
                    </div>
                    <div className="tt-td tt-trade-amt">
                        <div className="tt-party">10000000.1234 BTC</div>
                    </div>
                    <div className="tt-td tt-cp">
                        <div className="tt-party">bosa11@lsos.com</div>
                    </div>
                    <div className="tt-td tt-status">
                        <div className="tt-party">CANCELLED</div>
                    </div>
                </div>

                <div className="tt-row tt-entry-group tt-do-dtl">
                    <div className="tt-td tt-date">2010-10-21 15:20:10</div>
                    <div className="tt-td tt-side">
                        <div className="sub">SELL</div>
                    </div>
                    <div className="tt-td tt-side-amt">
                        <div className="tt-party">10.1 VRC</div>
                    </div>
                    <div className="tt-td tt-trade-amt">
                        <div className="tt-party">10000000.1234 BTC</div>
                    </div>
                    <div className="tt-td tt-cp">
                        <div className="tt-party">bosa11@lsos.com</div>
                    </div>
                    <div className="tt-td tt-status">
                        <div className="tt-party">EXPIRED</div>
                    </div>
                </div>

            </div>
            <div className="tt-view-more pointer">View more trade history in <a>Dashboard</a></div>
        </div>
    )
}