import React, {useState, useEffect} from "react";
import {
    datePickerTimeFormat,
    dateToEpoch,
    decimalTimes,
    emailValidation,
    timeDifference
} from "../../common/CommonFunctions";
import CustomDatePicker from "../../components/CustomDatePicker";
import {updatePopUpState} from "../../reducer/PopUpSlice";
import {useDispatch} from "react-redux";
import moment from "moment";
import {ApiActions} from "../../api/ApiActions";
import {createOTCDirectOrder} from "../../reducer/DirectOrderSlice";

export default function Sell() {
    const dispatch = useDispatch();
    const [sellAmount, setSellAmount] = useState("");
    const [forAmount, setForAmount] = useState("");
    const [expire, setExpire] = useState("");
    const [orderDuration, setOrderDuration] = useState("");
    const [counterparty, setCounterparty] = useState("");
    const [sellAmountError, setSellAmountError] = useState(false)
    const [forAmountError, setForAmountError] = useState(false)
    const [orderDurationError, setOrderDurationError] = useState(false)
    const [counterpartyError, setCounterpartyError] = useState(false)
    const [expireError, setExpireError] = useState(false)
    const [pageError, setPageError] = useState("")
    const [clickedCalendar, setClickedCalendar] = useState(false);
    const [sellToken, setSellToken] = useState("BTC");
    const [forAmountToken, setForAmountToken] = useState("USDT");
    const tokens = ["AENS", "BNB", "BTC", "ETH", "SMPT", "TETH", "TUSD", "UNI", "USDT"]

    useEffect(() => {
        if (new Date(expire) > new Date()) {
            setExpireError(false)
            setOrderDuration(timeDifference(expire))
        } else {
            setOrderDuration("")
        }

    }, [expire])

    useEffect(() =>{
        if(orderDurationError){
            setExpire("")
        }
        else if(orderDuration) {
            const newDate = moment().add(orderDuration, 'days')
            const date = datePickerTimeFormat(newDate._d)
            setExpire(date)
        }
    },[orderDuration])


    const handleSellAmountChange = (e) => {
        e.preventDefault();
        if (isNaN(e.target.value)) {
            setSellAmountError(true)
        } else {
            setSellAmountError(false)
        }
        setSellAmount(e.target.value)
    }

    const handleForAmountChange = (e) => {
        e.preventDefault();
        if (isNaN(e.target.value)) {
            setForAmountError(true)
        } else {
            setForAmountError(false)
        }
        setForAmount(e.target.value)
    }

    Date.prototype.isValid = function () {

        // If the date object is invalid it
        // will return 'NaN' on getTime()
        // and NaN is never equal to itself.
        return this.getTime() === this.getTime();
    };

    const handleExpiryChange = (e) => {
        e.preventDefault();
        let date;

        let dateValue = e.target.value;

        // if(dateValue.length >=2 ){
        //     date = dateValue.slice(0,2)+"/"
        //     setExpireError(true)
        // }
        // if(dateValue.length >=5){
        //     date = dateValue.slice(0,2)+"/"+dateValue.slice(3,5)+"/"
        //     setExpireError(true)
        // }
        if (dateValue.length > 9) {
            date = dateValue.slice(0, 4) + "-" + dateValue.slice(5, 7) + "-" + dateValue.slice(8, 10)
        }
        const d = new Date(date);

        if (!d.isValid()) {
            setExpireError(true)
        } else if (d < new Date()) {
            setExpireError(true)
        } else {
            setExpireError(false)
        }

        setExpire(date)
    }

    const handleOrderDurationChange = (e) => {
        e.preventDefault();
        if(isNaN(e.target.value) || e.target.value <=0){
            setOrderDurationError(true)
        }else {
            setOrderDurationError(false)
        }
        setOrderDuration(e.target.value)
    }

    const handleCounterpartyChange = (e) => {
        e.preventDefault();
        if (!isNaN(e.target.value) && e.target.value.length < 6) {
            setCounterpartyError(true)
        } else if (isNaN(e.target.value) && !emailValidation(e.target.value)) {
            setCounterpartyError(true)
        } else {
            setCounterpartyError(false)
        }
        setCounterparty(e.target.value)
    }

    const handleCreateOTCSuccess = (data, status) =>{
        console.log(data)
        if(status === 200){
            dispatch(updatePopUpState({type:"offerComplete", isOpen: true}))
            setSellAmount("");
            setForAmount("");
            setExpire("");
            setCounterparty("");
            setPageError("");
        }else{
            setPageError(data.message)
        }
    }

    const handleSubmit = () => {
        if(sellAmount === ""){
            setSellAmountError(true)
        }
        if(forAmount === ""){
            setForAmountError(true)
        }
        if(expire === ""){
            setExpireError(true)
        }
        if(counterparty === ""){
            setCounterpartyError(true)
        }

        if(sellAmount === "" || forAmount === "" || expire === "" || counterparty === "" || sellAmountError || forAmountError || expireError || counterpartyError){
            return
        } else if (sellAmount > 10){
            dispatch(updatePopUpState({type: "insufficientFunds", isOpen: true}))
        } else{
            dispatch(ApiActions({
                name:"createOTCDirectOrder",
                actions:createOTCDirectOrder,
                data:{trader: counterparty,baseAsset: sellToken,quoteAsset: forAmountToken,baseAmount:sellAmount, quoteAmount: forAmount,side:1,expire:dateToEpoch(expire)},
                onSuccess: handleCreateOTCSuccess
            }))
        }
    }


    return (
        <div className="do-form do-buy">
            <div className="input-row buy-token">
                <div className="form-row">
                    <div className="input-field">
                        <div className="label">Sell</div>
                        <input
                            className="token-amt right"
                            bubble="text"
                            placeholder="Input Amount"
                            value={sellAmount}
                            onChange={handleSellAmountChange}
                        />
                        <div className="icon wallet" text="abc"><span
                            className="icon-wallet"></span></div>
                        <div className="token-list dd-menu">
                            <div className="infield-label token-name">{sellToken}</div>
                            <div className="icon-select "><span
                                className="icon-tri-down"></span></div>
                            <div className="drop-down">
                                <ul>
                                    {
                                        tokens.map((item) => {
                                            return <li onClick={() => setSellToken(item)}>{item}</li>
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={`error ${sellAmountError ? "show" : ""}`}>Please enter valid base amount</div>
                </div>
            </div>

            <div className="input-row cost-token">
                <div className="form-row">
                    <div className="input-field">
                        <div className="label">For Amount</div>
                        <input
                            className="cost-amt right"
                            type="text"
                            placeholder="Input Amount"
                            value={forAmount}
                            onChange={handleForAmountChange}
                        />
                        <div className="icon wallet"><span className="icon-wallet"></span></div>
                        <div className="token-list dd-menu">
                            <div className="infield-label token-name">{forAmountToken}</div>
                            <div className="icon-select"><span className="icon-tri-down"></span>
                            </div>
                            <div className="drop-down">
                                <ul>
                                    {
                                        tokens.map((item) => {
                                            return <li onClick={() => setForAmountToken(item)}>{item}</li>
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="do-fee">
                        <div className="fee-text">Estimated fee (0.06%): <span className="est-fee">{`${decimalTimes(forAmount, 0.0006)} ${forAmountToken} `}</span>
                        </div>
                        <span className="icon-remark"></span>
                    </div>
                    <div className={`error ${forAmountError ? "show" : ""}`}>Please enter valid quote amount</div>
                </div>
            </div>

            <div className="input-row expire">
                <div className="form-row">
                    <div className="input-field pad-right">
                        <div className="label">Expires</div>
                        <CustomDatePicker
                            setDate={setExpire}
                            setClickedCalendar={setClickedCalendar}
                            clickedCalendar={clickedCalendar}
                            handleExpiryChange={handleExpiryChange}
                            date={expire}
                        />
                    </div>
                    <div className={`error ${expireError ? "show" : ""}`}>Please input valid date</div>
                </div>
            </div>

            <div className="input-row duration">
                <div className="form-row">
                    <div className="input-field pad-right">
                        <div className="label">Order Duration<span
                            className="after-icon icon-remark"></span></div>
                        <input className="days center" type="text" placeholder="1" value={orderDuration}
                               onChange={handleOrderDurationChange}/>
                        <div className="infield-label">DAY(S)</div>
                    </div>
                    <div className={`error ${orderDurationError ? "show" : ""}`}>Please input valid duration</div>
                </div>
            </div>

            <div className="input-row counterparty">
                <div className="form-row">
                    <div className="input-field pad-right">
                        <div className="label">Counterparty</div>
                        <input className="cp-id center" type="text"
                               placeholder="Input counterparty code or email" value={counterparty}
                               onChange={handleCounterpartyChange}/>
                        <div className="icon contacts"><span className="icon-contacts"></span>
                        </div>
                    </div>
                    <div className={`error ${counterpartyError ? "show" : ""}`}>Please input valid counterparty code or
                        email
                    </div>
                </div>
            </div>


            <div className="form-footer">

                <div className={`error ${pageError ? "show" : ""}`}>{pageError}</div>

                <div className="button submit pointer" onClick={handleSubmit}>SUBMIT ORDER</div>
            </div>
        </div>
    )
}