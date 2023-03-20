import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {updatePopUpState} from "../../reducer/PopUpSlice";
import {ApiActions} from "../../api/ApiActions";
import {createMatchOrder} from "../../reducer/CreateMatchOrderSlice";
import {decimalTimes} from "../../common/CommonFunctions";

export default function Summary(props){
    const {
        setStep,
        summaryData
    } = props

    const dispatch = useDispatch();
    const [pageError, setPageError] = useState("")

    const expireDate = new Date(summaryData.expire)

    const handleSubmitSuccess = (data, status) =>{
        console.log(data)
        if(status === 200){
            setStep("step3");
            dispatch(updatePopUpState({type: "matchComplete", isOpen: true}))
            setPageError("")
        }else{
            setPageError(data.message)
        }
    }

    const handleSubmit = () =>{
        dispatch(ApiActions({
            name:"createMatchOrder",
            actions: createMatchOrder,
            data:{askTrader:summaryData.counterParty2,askBaseAmount:summaryData.party2Sell, askQuoteAmount:summaryData.party2Buy,bidTrader:summaryData.counterParty1,bidBaseAmount:summaryData.party1Buy,bidQuoteAmount:summaryData.party1Sell,baseAsset:summaryData.cp1BuyToken,quoteAsset:summaryData.cp2BuyToken,expire:"86400"},
            onSuccess: handleSubmitSuccess
        }))
    }

    return(
        <div className="mo-step-page summary show">

            <div className="mo-smry-table">

                <div className="mo-smry-box cp-details">
                    <div className="mo-smry-header">Counterparties</div>

                    <div className="mo-smry-row party1">
                        <div className="party-email">{summaryData.counterParty1}</div>
                        <div className="buy-text">{`Buy ${summaryData.party1Buy} ${summaryData.cp1BuyToken}`}</div>
                        <div className="sell-text">{`Sell ${summaryData.party1Sell} ${summaryData.cp1SellToken}`}</div>
                    </div>

                    <div className="mo-smry-row party2">
                        <div className="party-email">{summaryData.counterParty2}</div>
                        <div className="sell-text">{`Sell ${summaryData.party2Sell} ${summaryData.cp2SellToken}`}</div>
                        <div className="buy-text">{`Buy ${summaryData.party2Buy} ${summaryData.cp2BuyToken}`}</div>
                    </div>
                </div>

                <div className="mo-smry-box">

                    <div className="mo-smry-row comm-gross">
                        <div className="mo-smry-label">Broker Commissions (Gross)</div>
                        <div className="comm-gross add">{`+${summaryData.party2Commission} ${summaryData.cp1BuyToken}`}</div>
                        <div className="comm-gross add">{`+${summaryData.party1Commission} ${summaryData.cp2BuyToken}`}</div>
                    </div>

                    <div className="mo-smry-row fee">
                        <div className="party-email">AENX FEE <span className="fee-pct"/>(0.5%)</div>
                        <div className="fee-amt sub">{`-${decimalTimes(summaryData.party2Commission, 0.005)} ${summaryData.cp1BuyToken}`}</div>
                        <div className="fee-amt sub">{`-${decimalTimes(summaryData.party1Commission,0.005)} ${summaryData.cp2BuyToken}`}</div>
                    </div>
                </div>

                <div className="mo-smry-box">

                    <div className="mo-smry-row comm-net">
                        <div className="mo-smry-label">Broker Commissions (Net)</div>
                        <div className="comm-net add">{`+${summaryData.party2Commission - summaryData.party1Commission*0.005} ${summaryData.cp1BuyToken}` }</div>
                        <div className="comm-net add">{`+${summaryData.party1Commission - summaryData.party2Commission*0.005} ${summaryData.cp2BuyToken}` }</div>
                    </div>
                </div>

                <div className="mo-smry-box">

                    <div className="mo-smry-row duration">
                        <div className="mo-smry-label">ORDER DURATION</div>
                        <div className="days-total">{`${summaryData.orderDuration} day(s)`}</div>
                        <div className="expire-time">{`Ends on ${expireDate}`}</div>
                    </div>
                </div>
                <div className={`error mo-sys-error ${pageError? "show" :""}`}>{pageError}</div>

                <div className="controls-row">
                    <div className="button btn-back pointer gray" onClick={() => setStep("step1")}>BACK</div>
                    <div className="controls-group">
                        <div className="button btn-cancel pointer gray" onClick={() =>setStep("step1")}>CANCEL</div>
                        <div className="button btn-confirm pointer purple" onClick={handleSubmit}>CONFIRM</div>
                    </div>
                </div>
            </div>
        </div>
    )
}