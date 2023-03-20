import React from "react";
import {useDispatch, useSelector} from "react-redux";
import directOrderSlice, {createOTCDirectOrder, directorOrder} from "../../../reducer/DirectOrderSlice";
import {buyOrSellSide, datePickerTimeFormat, timeConverter, translateStatus} from "../../../common/CommonFunctions";
import {updatePopUpState} from "../../../reducer/PopUpSlice";

export default function OffersTable(props) {
    const {
        openOffersTab
    } = props
    const dispatch = useDispatch();
    const createOrder = useSelector(state => state.createOrder)
    const openOffers = useSelector(state => state.openOffers)
    const cancelOrder = useSelector(state => state.cancelOrder)
    console.log(Object.keys(cancelOrder).length !==0)
    console.log(cancelOrder)


    let sent = [];
    const received = [];
    openOffers.map((item) => {
        if (item.role === 1) {
            sent.push(item)
        } else if (item.role === 2) {
            received.push(item)
        }
    })


    let sentFinal =[...sent,...createOrder]

    const sentData = sentFinal.map((item) => {
        const hash = item.hash;
        const role = item.role;
        const code = item.code;
        const orderType = item.order_type;
        const createdDate = timeConverter(item.create_at)
        const side = buyOrSellSide(item.side);
        const orderId = item.order_id;
        const baseAmountWithToken = item.base_amount + " " + item.base_asset;
        const quoteAmountWithToken = item.quote_amount + " " + item.quote_asset;
        const counterparty = item.trader_email;
        const expires = timeConverter(item.expire_at);
        const status = translateStatus(item.status);

        return {
            hash,
            role,
            code,
            orderType,
            createdDate,
            side,
            orderId,
            baseAmountWithToken,
            quoteAmountWithToken,
            counterparty,
            expires,
            status
        }
    })


    const receivedData = received.map((item) => {
        const hash = item.hash;
        const role = item.role;
        const code = item.code;
        const orderType = item.order_type;
        const createdDate = timeConverter(item.create_at)
        const side = buyOrSellSide(item.side);
        const orderId = item.order_id;
        const baseAmountWithToken = item.base_amount + " " + item.base_asset;
        const quoteAmountWithToken = item.quote_amount + " " + item.quote_asset;
        const baseAmount = item.base_amount;
        const quoteAmount = item.quote_amount
        const baseAsset = item.base_asset;
        const quoteAsset = item.quote_asset;
        const counterparty = item.trader_email;
        const expires = timeConverter(item.expire_at);
        const status = translateStatus(item.status);

        return {hash, role, code, orderType, createdDate, side, orderId, baseAmountWithToken, quoteAmountWithToken, baseAmount, quoteAmount, baseAsset, quoteAsset, counterparty, expires, status}
    })

    let data = openOffersTab === "sent" ? sentData : receivedData


    let res = [];
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

    let arr = []
    res.map((item) =>{
        arr.push(item.order[0].code)
    })
    let index = arr.indexOf(cancelOrder.data?.code)
    if(index > -1) {
        res.splice(index,1)
    }


    const handleConfirm = (code, orderId, side, baseAmount, baseAmountWithToken, quoteAmount,quoteAmountWithToken, baseAsset, quoteAsset) => {
        dispatch(updatePopUpState({
            type: "orderDetails",
            isOpen: true,
            data: {
                code: code,
                orderId:orderId,
                side: side,
                baseAmount: baseAmount,
                quoteAmount: quoteAmount,
                baseAmountWithToken: baseAmountWithToken,
                quoteAmountWithToken:quoteAmountWithToken,
                baseAsset: baseAsset,
                quoteAsset: quoteAsset
            }
        }))
    }

    const handleReject = (orderId) => {
        dispatch(updatePopUpState({
            type: "declineReceivedOffers",
            isOpen: true,
            data:{orderId: orderId}
        }))

    }

    const handleCancel = (orderId) => {
        dispatch(updatePopUpState({type: "orderCancel", isOpen: true, data:{orderId:orderId}}))
    }

    return (
        <div className="tt-body tt-col-tbl tt-offers-sent tt-head show">
            <div className="tt-entries">
                <div className="tt-col tt-date">
                    <div className="tt-th">DATE CREATED</div>
                    {
                        res.map((item) => {
                            return item.order.length === 1 ?
                                <div className="tt-td">{item.timeStamp}</div>
                                :
                                <div className="tt-td tt-td2">{item.timeStamp}</div>


                        })
                    }
                </div>
                <div className="tt-col tt-side">
                    <div className="tt-th">SIDE</div>
                    {
                        res.map((item) => {
                            return item.order.length === 1 ?
                                <div
                                    className={`tt-td ${item.order[0]?.side === "BUY" ? "sub" : "add"}`}>{item.order[0]?.side}</div>
                                :
                                <div className="tt-td tt-td2">
                                    <div className="tt-group">
                                        <div className="sub">{item.order[1]?.side}</div>
                                        <div className="add">{item.order[0]?.side}</div>
                                    </div>
                                </div>


                        })
                    }
                </div>
                <div className="tt-col tt-side-amt">
                    <div className="tt-th">BASE AMOUNT</div>
                    {
                        res.map((item) => {
                            return item.order.length === 1  ?
                                <div className="tt-td">{item.order[0]?.baseAmountWithToken}</div>
                                :
                                <div className="tt-td tt-td2">
                                    <div className="tt-group">
                                        <div>{item.order[1]?.baseAmountWithToken}</div>
                                        <div>{item.order[0]?.baseAmountWithToken}</div>
                                    </div>
                                </div>

                        })
                    }
                </div>
                <div className="tt-col tt-trade-amt">
                    <div className="tt-th">QUOTE AMOUNT</div>
                    {
                        res.map((item) => {
                            return item.order.length === 1  ?
                                <div className="tt-td">{item.order[0]?.quoteAmountWithToken}</div>
                                :
                                <div className="tt-td tt-td2">
                                    <div className="tt-group">
                                        <div>{item.order[1]?.quoteAmountWithToken}</div>
                                        <div>{item.order[0]?.quoteAmountWithToken}</div>
                                    </div>
                                </div>

                        })
                    }
                </div>
                <div className="tt-col tt-cp">
                    <div className="tt-th">COUNTERPARTY</div>
                    {
                        res.map((item) => {
                            return item.order.length === 1 ?
                                <div className="tt-td">{item.order[0]?.counterparty}</div>
                                :
                                <div className="tt-td tt-td2">
                                    <div className="tt-group">
                                        <div>{item.order[1]?.counterparty}</div>
                                        <div>{item.order[0]?.counterparty}</div>
                                    </div>
                                </div>

                        })
                    }
                </div>
                <div className="tt-col tt-expire">
                    <div className="tt-th">EXPIRES IN</div>
                    {
                        res.map((item) => {
                            return item.order.length === 1  ?
                                <div className="tt-td">{item.order[0]?.expires}</div>
                                :
                                <div className="tt-td tt-td2">{item.order[0]?.expires}</div>

                        })
                    }
                </div>
                {
                    openOffersTab === "sent" ? <div className="tt-col tt-status">
                            <div className="tt-th">STATUS</div>
                            {
                                res.map((item) => {
                                    return item.order.length === 1  ?
                                        <div className="tt-td">{item.order[0]?.status}</div>
                                        :
                                        <div className="tt-td tt-td2">
                                            <div className="tt-group">
                                                <div
                                                    className={`${item.order[1]?.status === "Accepted" ? "add" : ""}`}>{item.order[1]?.status}</div>
                                                <div
                                                    className={`${item.order[0]?.status === "Accepted" ? "add" : ""}`}>{item.order[0]?.status}</div>
                                            </div>
                                        </div>
                                })
                            }

                        </div>
                        :
                        <div className="tt-col tt-actions">
                            <div className="tt-th"></div>
                            {
                                res.map((item, index) => {
                                   return  <div className="tt-td tt-btns">
                                        <div className="tt-btn btn-cfm">
                                            <span className="icon icon-ok"></span>
                                            <span className="btn-text"
                                                  onClick={() => handleConfirm(item.order[0].code, item.order[0].orderId,item.order[0].side, item.order[0].baseAmount, item.order[0].baseAmountWithToken, item.order[0].quoteAmount, item.order[0].quoteAmountWithToken,item.order[0].baseAsset, item.order[0].quoteAsset)}>CONFIRM</span>
                                        </div>
                                        <div className="tt-btn btn-rej">
                                            <span className="icon icon-canc"></span>
                                            <span className="btn-text" onClick={() =>handleReject(item.order[0].orderId)}>REJECT</span>
                                        </div>
                                    </div>

                                })
                            }
                        </div>
                }

                <div className="tt-col tt-actions">
                    <div className="tt-th"></div>
                    {
                        openOffersTab === "sent" && res.map((item) => {
                            return item.order.length === 1 ?
                                <div className="tt-td dd-menu">
                                    <div className="icon-select "><span className="icon-menu-dots"/></div>
                                    <div className="drop-down">
                                        <ul>
                                            <li onClick={() =>handleCancel(item.order[0].orderId)}>CANCEL</li>
                                        </ul>
                                    </div>
                                </div>
                                :
                                <div className="tt-td tt-td2 dd-menu">
                                    <div className="icon-select "><span className="icon-menu-dots"/></div>
                                    <div className="drop-down">
                                        <ul>
                                            <li onClick={() =>handleCancel(item.order[0].orderId)}>CANCEL</li>
                                        </ul>
                                    </div>
                                </div>
                        })
                    }
                </div>

            </div>
            <div className="tt-view-more pointer">View more sent offers in <a>Dashboard</a></div>

        </div>
    )
}