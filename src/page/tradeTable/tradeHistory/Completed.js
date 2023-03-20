import React, {useState} from "react";
import {useSelector} from "react-redux";
import {buyOrSellSide, timeConverter, translateStatus} from "../../../common/CommonFunctions";

export default function Completed(props) {
    const {
        historyTab
    } = props
    const tradeHistory = useSelector(state => state.tradeHistory)
    const [expand, setIsExpand] = useState("false")
    const completed = [];
    const failed = [];


    tradeHistory.map((item) => {
        if (item.status === 7) {
            completed.push(item)
        } else {
            failed.push(item)
        }
    })


    const completedData = completed.map((item) => {
        const hash = item.hash;
        const createdDate = timeConverter(item.create_at)
        const side = buyOrSellSide(item.side);
        const baseAmount = item.base_amount + " " + item.base_asset;
        const quoteAmount = item.quote_amount + " " + item.quote_asset;
        const counterparty = item.trader_email;
        const orderType = item.order_type;
        const status = translateStatus(item.status);
        const spread = item.spread;
        const feeAsset = item.fee_asset;
        const feeRate = item.fee_rate;

        return {hash, createdDate, side, baseAmount, quoteAmount, counterparty, status, orderType, spread, feeAsset, feeRate}
    })

    const failedData = failed.map((item) => {
        const hash = item.hash;
        const createdDate = timeConverter(item.create_at)
        const side = buyOrSellSide(item.side);
        const baseAmount = item.base_amount + " " + item.base_asset;
        const quoteAmount = item.quote_amount + " " + item.quote_asset;
        const counterparty = item.trader_email;
        const orderType = item.order_type;
        const status = translateStatus(item.status);

        return {hash, createdDate, side, baseAmount, quoteAmount, counterparty, status, orderType}
    })

    const data = historyTab === "completed" ? completedData : failedData

    const res = [];
    const ind = [];
    data.map((item) => {
        const checked = ind.indexOf(item.hash)
        if (checked < 0) {
            let obj;
            if (item.orderType === 2) {
                obj = {type: "direct", timeStamp: item.createdDate, order: [item]}
            } else {
                if (item.role === 1) {
                    obj = {type: "match", timeStamp: item.createdDate, order: [null, null]}
                    if (item.side === "BUY") {
                        obj.order[0] = item
                    } else {
                        obj.order[1] = item
                    }
                } else {
                    obj = {type: "match", timeStamp: item.createdDate, order: [item]}
                }
            }

            res.push(obj)
            ind.push(item.hash)
        } else {
            if (item.side === "SELL") {
                res[checked].order[1] = item
            } else {
                res[checked].order[0] = item
            }
        }
    })


    return (
        <div className="tt-body tt-row-tbl tt-hist-cmplt tt-head show">
            <div className="tt-entries">
                <div className="tt-row">
                    <div className="tt-td tt-th tt-date">DATE CREATED</div>
                    <div className="tt-td tt-th tt-side">SIDE</div>
                    <div className="tt-td tt-th tt-side-amt">BASE AMOUNT</div>
                    <div className="tt-td tt-th tt-trade-amt">QUOTE AMOUNT</div>
                    <div className="tt-td tt-th tt-cp">COUNTERPARTY</div>
                    <div className="tt-td tt-th tt-status">STATUS</div>
                </div>
                {
                    res.map((item) => {
                        return item.order.length === 1 ? <div className="tt-row tt-entry-group tt-do-dtl">
                                <div className="tt-td tt-date">{item.timeStamp}</div>
                                <div className="tt-td tt-side">
                                    <div className={`${item.order[0]?.side === "BUY" ? "sub" : "add"}`}>{item.order[0].side}</div>
                                </div>
                                <div className="tt-td tt-side-amt">
                                    <div className="tt-party">{item.order[0].baseAmount}</div>
                                </div>
                                <div className="tt-td tt-trade-amt">
                                    <div className="tt-party">{item.order[0].quoteAmount}</div>
                                </div>
                                <div className="tt-td tt-cp">
                                    <div className="tt-party">{item.order[0].counterparty}</div>
                                </div>
                                <div className="tt-td tt-status">
                                    <div className={`tt-party ${item.order[0].status === "Completed" ? "add" : ""}`}>{item.order[0].status}</div>
                                </div>
                            </div> :
                            <div className="tt-row tt-entry-group tt-mo-dtl">
                                <div className="tt-short">
                                    <div className="tt-td tt-date">{item.timeStamp}</div>
                                    <div className="tt-td tt-side">
                                        <div className="tt-group">
                                            <div className="sub">{item.order[0].side}</div>
                                            <div className="add">{item.order[1].side}</div>
                                        </div>
                                    </div>
                                    <div className="tt-td tt-side-amt">
                                        <div className="tt-group">
                                            <div className="tt-party">{item.order[0].baseAmount}</div>
                                            <div className="tt-party">{item.order[1].baseAmount}</div>
                                        </div>
                                    </div>
                                    <div className="tt-td tt-trade-amt">
                                        <div className="tt-group">
                                            <div className="tt-party">{item.order[0].quoteAmount}</div>
                                            <div className="tt-party">{item.order[1].quoteAmount}</div>
                                        </div>
                                    </div>
                                    <div className="tt-td tt-cp">
                                        <div className="tt-group">
                                            <div className="tt-party">{item.order[0].counterparty}</div>
                                            <div className="tt-party">{item.order[1].counterparty}</div>
                                        </div>
                                    </div>
                                    <div className="tt-td tt-status">
                                        <div className="tt-group">
                                            <div className={`tt-party ${item.order[0].status === "Completed" ? "add" : ""}`}>{item.order[0].status}</div>
                                            <div className="tt-party"></div>
                                        </div>
                                        <div className={`tt-select tt-expand icon ${historyTab === "failed" ? "hide" :""}`} onClick={() => setIsExpand(!expand)}>
                                            {expand ? <span className="icon-tri-down show"></span> : <span className="icon-tri-up show"></span> }
                                        </div>
                                    </div>
                                </div>
                                {historyTab === "completed" && <div className={`tt-full expand ${expand? "" : "hide" }`}>
                                    <div className="tt-td tt-empty"></div>
                                    <div className="tt-td tt-empty"></div>
                                    <div className="tt-td tt-label">
                                        <div>Broker commission (Gross)</div>
                                        <div>AENX Fee (0.1%)</div>
                                        <div><b>Broker commission (Net)</b></div>
                                    </div>
                                    {
                                        item.order[1].side === "BUY" &&  <div className="tt-td tt-comm-dtl">
                                            <div className="tt-comm-gross add">{item.order[1].spread + " " + item.order[1].feeAsset}</div>
                                            <div className="tt-fee sub">{item.order[1].feeRate + " " + item.order[1].feeAsset}</div>
                                            <div className="tt-comm-net add">{(item.order[1].spread - item.order[1].feeRate)  + " " + item.order[1].feeAsset}</div>
                                        </div>}
                                    {
                                        item.order[0].side === "SELL" &&
                                            <div className="tt-td tt-comm-dtl">
                                                <div className="tt-comm-gross add">{item.order[0].spread + " " + item.order[0].feeAsset}</div>
                                                <div className="tt-fee sub">{item.order[0].spread + " " + item.order[0].feeAsset}</div>
                                                <div className="tt-comm-net add">{item.order[0].spread + " " + item.order[0].feeAsset}</div>
                                            </div>

                                    }

                                    <div className="tt-td tt-empty"></div>
                                </div>}

                            </div>

                    })
                }


            </div>
            <div className="tt-view-more pointer">View more trade history in <a>Dashboard</a></div>
        </div>
    )
}