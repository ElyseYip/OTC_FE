import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {buyOrSellSide, timeConverter, translateStatus} from "../../../common/CommonFunctions";
import {updatePopUpState} from "../../../reducer/PopUpSlice";

export default function ReceivedUnused(){
    const dispatch = useDispatch();
    const receivedOffers = useSelector(state => state.openOffers)
    console.log(receivedOffers)
    const data = receivedOffers.map((item) => {
        const createdDate = timeConverter(item.create_at)
        const side = buyOrSellSide(item.side);
        const baseAmount = item.base_amount +" "+ item.base_asset;
        const quoteAmount = item.quote_amount +" "+ item.quote_asset;
        const counterparty = item.trader_email;
        const expires = timeConverter(item.expire_at);
        const status = translateStatus(item.status);
        const baseAsset = item.base_asset;
        const quoteAsset = item.quote_asset;

        return {createdDate, side, baseAmount, quoteAmount, counterparty, expires, status, baseAsset, quoteAsset}
    })

    const handleConfirm = (side, baseAmount, quoteAmount, baseAsset, quoteAsset) =>{
        dispatch(updatePopUpState({type:"orderDetails", isOpen: true, data:{side: side,baseAmount:baseAmount, quoteAmount:quoteAmount, baseAsset:baseAsset, quoteAsset:quoteAsset }}))
    }

    const handleReject = () =>{

    }

    return(
        <div className="tt-body tt-col-tbl tt-offers-recd tt-head show">

            <div className="tt-entries">
                <div className="tt-col tt-date">
                    <div className="tt-th">DATE CREATED</div>
                    {
                        data.map((item) =>{
                            return <div className="tt-td">{item.createdDate}</div>
                        })
                    }
                </div>
                <div className="tt-col tt-side">
                    <div className="tt-th">SIDE</div>

                        {
                            data.map((item) =>{
                                return <div className={`tt-td ${item.side === "BUY" ? "add": "sub"}`}>{item.side}</div>
                            })
                        }

                </div>
                <div className="tt-col tt-side-amt">
                    <div className="tt-th">BASE AMOUNT</div>
                    {
                        data.map((item) =>{
                            return <div className="tt-td">{item.baseAmount}</div>
                        })
                    }
                </div>
                <div className="tt-col tt-trade-amt">
                    <div className="tt-th">QUOTE AMOUNT</div>
                    {
                        data.map((item) =>{
                            return <div className="tt-td">{item.quoteAmount}</div>
                        })
                    }
                </div>
                <div className="tt-col tt-cp">
                    <div className="tt-th">COUNTERPARTY</div>
                    {
                        data.map((item) =>{
                            return <div className="tt-td">{item.counterparty}</div>
                        })
                    }
                </div>
                <div className="tt-col tt-expire">
                    <div className="tt-th">EXPIRES IN</div>
                    {
                        data.map((item) =>{
                            return <div className="tt-td">{item.expires}</div>
                        })
                    }
                </div>
                <div className="tt-col tt-actions">
                    <div className="tt-th">STATUS</div>
                        {
                            data.map((item, index) =>{
                                return  <div className="tt-td tt-btns">
                                    <div className="tt-btn btn-cfm">
                                        <span className="icon icon-ok"></span>
                                        <span className="btn-text" onClick={() => handleConfirm(item.side, item.baseAmount, item.quoteAmount, item.baseAsset, item.quoteAsset)}>CONFIRM</span>
                                    </div>
                                    <div className="tt-btn btn-rej">
                                        <span className="icon icon-canc"></span>
                                        <span className="btn-text" onClick={handleReject}>REJECT</span>
                                    </div>
                                </div>
                            })
                        }
                        {/*<div className="tt-btn btn-cfm">*/}
                        {/*    <span className="icon icon-ok"></span>*/}
                        {/*    <span className="btn-text" onClick={handleConfirm}>CONFIRM</span>*/}
                        {/*</div>*/}
                        {/*<div className="tt-btn btn-rej">*/}
                        {/*    <span className="icon icon-canc"></span>*/}
                        {/*    <span className="btn-text" onClick={handleReject}>REJECT</span>*/}
                        {/*</div>*/}
                    {/*<div className="tt-td add">COMPLETED</div>*/}
                    {/*<div className="tt-td">PROCESSING</div>*/}
                    {/*<div className="tt-td sub">CANCELLED</div>*/}
                    {/*<div className="tt-td sub">REJECTED</div>*/}
                </div>
            </div>

            <div className="tt-view-more pointer">View more received offers in <a>Dashboard</a></div>

        </div>
    )
}