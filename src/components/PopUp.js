import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updatePopUpState} from "../reducer/PopUpSlice";
import {ApiActions} from "../api/ApiActions";
import {cancelOrder} from "../reducer/CancelOrderSlice";
import {takeOrder} from "../reducer/ConfirmOrderSlice";
import {useNavigate} from "react-router-dom";
import {decimalTimes} from "../common/CommonFunctions";

export default function PopUpComponent() {
    const popUp = useSelector(state => state.popUp)
    const dispatch = useDispatch();

    console.log(popUp)

    const handleClick = () => {
        dispatch(updatePopUpState({type: "", isOpen: false}))
    }

    const onConfirmSuccess = (data, status) => {
        console.log(status)
        console.log(status === 200)
        if(status === 200){
            dispatch(updatePopUpState({type: "receivedOrderComplete", isOpen: true}))
        }
    }
    const onDeclineSuccess = (data, status) =>{
        if(status === 200){
            dispatch(updatePopUpState({type: "confirmOrderDeclined", isOpen: true }))
        }
    }
    const onCancelSuccess = (data, status) =>{
        if(status === 200){
            dispatch(updatePopUpState({type: "offerCancelled", isOpen: true }))
        }
    }

    const handleConfirmOrder = (orderId, code, amount) => {
        dispatch(ApiActions({name:"takeOrder", actions: takeOrder, data:{orderId: orderId, code:code, amount: amount }, onSuccess:onConfirmSuccess}))
    }


    const handleDeclineYes = (orderId) =>{
        dispatch(ApiActions({name:"cancelOrder",actions:cancelOrder,data:{orderId: orderId}, onSuccess:onDeclineSuccess}))
    }

    const handleCancelOrder = (orderId) =>{
        dispatch(ApiActions({name:"cancelOrder",actions:cancelOrder,data:{orderId: orderId}, onSuccess:onCancelSuccess}))
    }

    return (
        <>
            {
                popUp.type === "insufficientFunds" && <div className={`popup pu-nofund ${popUp.isOpen ? "" : "hide"}`}>
                    <div className="pu-content pu-col max600">
                        <span className="close" onClick={handleClick}></span>
                        <div className="pu-title">INSUFFICIENT FUNDS</div>
                        <p className="center">Your selected token balance isn't high enough to complete this order.<br/>Please
                            deposit more funds or switch to a different wallet.</p>
                        <div className="controls-row">
                            <div className="button jean">YOUR WALLET</div>
                        </div>

                    </div>
                </div>
            }
            {
                popUp.type === "offerComplete" && <div className={`popup pu-otc ${popUp.isOpen ? "" : "hide"}`}>
                    <div className="pu-content pu-col max600">
                        <span className="close" onClick={handleClick}></span>

                        <div className="pu-title">YOUR OFFER IS COMPLETE</div>
                        <p className="center">You can check the offer status in<br/><a href="#"><u>OPEN OFFERS</u></a></p>
                        <div className="controls-row">
                            <div className="button denim" onClick={handleClick}>+ NEW OFFER</div>
                        </div>

                    </div>
                </div>
            }
            {
                popUp.type === "matchComplete" && <div className={`popup pu-otc ${popUp.isOpen ? "" : "hide"}`}>
                    <div className="pu-content pu-col max600">
                        <span className="close" onClick={handleClick}></span>
                        <div className="pu-title">YOUR MATCH ORDER IS COMPLETE</div>
                        <p className="center">Notification emails are sent to both counterparties.</p>
                        <p className="center">You can check the offer status in<br/><a href="#"><u>OPEN OFFERS</u></a></p>

                        <div className="controls-row pu-col">
                            <p>Share link & QR code:</p>
                            <div className="button jean" onClick={handleClick}>SHARE</div>
                        </div>
                    </div>
                </div>
            }
            {
                popUp.type === "orderAlmostComplete" && <div className={`popup pu-kyc ${popUp.isOpen ? "" : "hide"}`}>
                    <div className="pu-content pu-col max600">
                        <span className="close" onClick={handleClick}></span>

                        <div className="pu-title">YOUR ORDER IS ALMOST COMPLETE!</div>
                        <p className="center">Just one more step!<br/>Please proceed to finish the KYC
                        </p>
                        <div className="controls-row">
                            <div className="button jean">COMPLETE KYC</div>
                        </div>

                    </div>
                </div>
            }
            {
                popUp.type === "orderCancel" && <div className={`popup pu-otc ${popUp.isOpen ? "" : "hide"}`}>
                    <div className="pu-content pu-col max600">
                        <span className="close" onClick={handleClick}></span>

                        <div className="pu-title">CANCEL ORDER</div>
                        <p className="center">Are you sure you want to cancel the order?</p>
                        <div className="controls-row pu-rej">
                            <div className="button btn-ok jean" onClick={() => handleCancelOrder(popUp.data.orderId)}>YES</div>
                            <div className="button btn-no gray" onClick={handleClick}>NO</div>
                        </div>
                        <div className="error pu-error center">Your instruction cannot be processed at this moment.<br/>Please
                            try again</div>

                    </div>
                </div>
            }
            {
                popUp.type === "declineReceivedOffers" && <div className={`popup pu-otc ${popUp.isOpen ? "" : "hide"}`}>
                    <div className="pu-content pu-col max600">
                        <span className="close" onClick={handleClick}></span>

                        <div className="pu-title">DECLINE ORDER</div>
                        <p className="center">Are you sure you want to decline the order?</p>
                        <div className="controls-row pu-rej">
                            <div className="button btn-ok jean" onClick={()=>handleDeclineYes((popUp.data?.orderId))}>YES</div>
                            <div className="button btn-no gray" onClick={handleClick}>NO</div>
                        </div>
                        <div className="error pu-error center">Your instruction cannot be processed at this moment.<br/>Please
                            try again</div>

                    </div>
                </div>
            }
            {
                popUp.type === "orderComplete" && <div className={`popup pu-otc ${popUp.isOpen ? "" : "hide"}`}>
                    <div className="pu-content pu-col max600">
                        <span className="close" onClick={handleClick}></span>

                        <div className="pu-title">YOUR ORDER IS COMPLETE</div>
                        <p className="center">You can check the order status in<br/><a href="#"><u>RECEIVED OFFERS</u></a>
                        </p>

                    </div>
                </div>
            }
            {
                popUp.type === "receivedOrderComplete" && <div className={`popup pu-otc ${popUp.isOpen ? "" : "hide"}`}>
                    <div className="pu-content pu-col max600">
                        <span className="close" onClick={handleClick}></span>

                        <div className="pu-title">YOUR ORDER IS COMPLETED</div>
                        <p className="center">You can check the order status in<br/><a href="#" onClick={handleClick}><u>TRADE HISTORY</u></a>
                        </p>

                    </div>
                </div>
            }
            {
                popUp.type === "orderCancelled" && <div className={`popup pu-otc ${popUp.isOpen ? "" : "hide"}`}>
                    <div className="pu-content pu-col max600">
                        <span className="close" onClick={handleClick}></span>

                        <div className="pu-title">YOU HAVE REJECTED<br/>AN ORDER</div>
                        <p className="center">You can check the order status in<br/><a href="#"><u>CANCELLED OFFERS</u></a>
                        </p>

                    </div>
                </div>
            }
            {
                popUp.type === "confirmOrderDeclined" && <div className={`popup pu-otc ${popUp.isOpen ? "" : "hide"}`}>
                    <div className="pu-content pu-col max600">
                        <span className="close" onClick={handleClick}></span>

                        <div className="pu-title">YOU HAVE DECLINED<br/>AN ORDER</div>
                        <p className="center">You can check the order status in<br/><a href="#" onClick={handleClick}><u>TRADE HISTORY</u></a>
                        </p>

                    </div>
                </div>
            }
            {
                popUp.type === "offerCancelled" && <div className={`popup pu-otc ${popUp.isOpen ? "" : "hide"}`}>
                    <div className="pu-content pu-col max600">
                        <span className="close" onClick={handleClick}></span>

                        <div className="pu-title">YOU HAVE CANCELLED<br/>YOUR OFFER</div>
                        <p className="center">You can check the order status in<br/><a href="#" onClick={handleClick}><u>TRADE HISTORY</u></a>
                        </p>

                    </div>
                </div>
            }
            {
                popUp.type === "orderRejected" && <div className={`popup pu-otc ${popUp.isOpen ? "" : "hide"}`}>
                    <div className="pu-content pu-col max600">
                        <span className="close" onClick={handleClick}></span>

                        <div className="pu-title">REJECT ORDER</div>
                        <p className="center">Are you sure you want to reject the order?</p>
                        <div className="controls-row">
                            <div className="button btn-ok jean">YES</div>
                            <div className="button btn-no gray">NO</div>
                        </div>
                        <div className="error pu-error center show">Your instruction cannot be processed at this moment.<br/>Please
                            try again.</div>

                    </div>
                </div>
            }
            {
                popUp.type === "orderDetails" && <div className={`popup pu-otc ${popUp.isOpen ? "" : "hide"}`}>
                    <div className="pu-content pu-col max600">
                        <span className="close" onClick={handleClick}></span>

                        <div className="pu-title">ORDER DETAILS</div>
                        <div className="pu-entries popup-ord-smry">
                            <div className="pu-row">
                                <div className="pu-td">{popUp.data?.side === "BUY" ? "You Buy" : "You Sell"}</div>
                                <div className="pu-td">{popUp.data?.baseAmountWithToken}</div>
                            </div>
                            <div className="pu-row">
                                <div className="pu-td">{popUp.data?.side === "BUY" ? "With Amount" : "For Amount"}</div>
                                <div className="pu-td">{popUp.data?.quoteAmountWithToken}</div>
                            </div>
                            <div className="pu-row">
                                <div className="pu-td">Trade Fee (0.006%)</div>
                                <div className="pu-td">{popUp.data?.side === "BUY" ? `${decimalTimes(popUp.data?.baseAmount ,0.0006)} ${popUp.data?.baseAsset}` : `${decimalTimes(popUp.data?.quoteAmount, 0.0006)} ${popUp.data?.quoteAsset}`}</div>
                            </div>
                            <div className="pu-line"></div>
                            <div className="pu-row">
                                <div className="pu-td">Total (Net)</div>
                                <div className="pu-td">{`${popUp.data?.side === "BUY" ? `${popUp.data?.baseAmount - (popUp.data?.baseAmount *0.0006)} ${popUp.data?.baseAsset}` : `${popUp.data?.quoteAmount - (popUp.data?.quoteAmount *0.0006)} ${popUp.data?.quoteAsset}`}`}</div>
                            </div>
                        </div>
                        <div className="controls-row">
                            <div className="button jean" onClick={() => handleConfirmOrder(popUp.data?.orderId, popUp.data?.code, popUp.data?.baseAmount)}>CONFIRM ORDER</div>
                        </div>
                        <div className="error pu-error center">Your instruction cannot be processed at this moment.<br/>Please
                            try again</div>

                    </div>
                </div>
            }

        </>
    )

}