import React, {useEffect, useState} from "react";
import {
    datePickerTimeFormat,
    dateToEpoch, decimalTimes,
    emailValidation,
    fixedDecimalCal,
    timeDifference
} from "../../common/CommonFunctions";
import CustomDatePicker from "../../components/CustomDatePicker";
import {useDispatch, useSelector} from "react-redux";
import {updatePopUpState} from "../../reducer/PopUpSlice";
import {ApiActions} from "../../api/ApiActions";
import {createOTCDirectOrder} from "../../reducer/DirectOrderSlice";
import moment from "moment";
import {useLocation} from "react-router-dom";

export default function Buy(props) {
    const {
    } = props;
    const location = useLocation();

    const [buyAmount, setBuyAmount] = useState("");
    const [withAmount, setWithAmount] = useState("");
    const [expire, setExpire] = useState("");
    const [orderDuration, setOrderDuration] = useState("");
    const [counterParty, setCounterParty] = useState("");
    const [buyAmountError, setBuyAmountError] = useState(false)
    const [withAmountError, setWithAmountError] = useState(false)
    const [orderDurationError, setOrderDurationError] = useState(false)
    const [counterpartyError, setCounterpartyError] = useState(false)
    const [expireError, setExpireError] = useState(false)
    const [clickedCalendar, setClickedCalendar] = useState(false);
    const [buyToken, setBuyToken] = useState("BTC");
    const [sellToken, setSellToken] = useState("USDT");
    const [pageError, setPageError]= useState("")
    const dispatch = useDispatch();
    const tokens = ["AENS","BNB","BTC","ETH", "SMPT", "TETH", "TUSD", "UNI","USDT"]


    console.log(pageError)

    useEffect(() => {
        if(new Date(expire) > new Date()){
            setExpireError(false)
            setOrderDuration(timeDifference(expire))
        }else{
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


    const handleAmountChange = (e) => {
        e.preventDefault();
        if (isNaN(e.target.value)) {
            setBuyAmountError(true)
        } else {
            setBuyAmountError(false)
        }
        setBuyAmount(e.target.value)
    }

    const handleWithAmountChange = (e) => {
        e.preventDefault();

        if (isNaN(e.target.value)) {
            setWithAmountError(true)
        } else {
            setWithAmountError(false)
        }
        setWithAmount(e.target.value)
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
        }else if(d < new Date()){
            setExpireError(true)
        } else {
            setExpireError(false)
        }

        setExpire(date)
    }

    const handleOrderDurationChange = (e) =>{
        e.preventDefault();
        if(isNaN(e.target.value) || e.target.value <=0){
            setOrderDurationError(true)
        }else {
            setOrderDurationError(false)
        }
        setOrderDuration(e.target.value)
    }


    const handleCounterPartyChange = (e) => {
        e.preventDefault();
        if (!isNaN(e.target.value) && e.target.value.length < 6) {
            setCounterpartyError(true)
        } else if (isNaN(e.target.value) && !emailValidation(e.target.value)) {
            setCounterpartyError(true)
        } else {
            setCounterpartyError(false)
        }
        setCounterParty(e.target.value)
    }

    const handleCreateOTCSuccess = (data, status) =>{
        console.log(data)
        if(status === 200){
            dispatch(updatePopUpState({type:"offerComplete", isOpen: true, data:{url: location.pathname}}))
            setBuyAmount("");
            setWithAmount("");
            setExpire("");
            setCounterParty("");
            setPageError("");
        }else{
            setPageError(data.message)
        }
    }

    const handleSubmit = () => {
        if(buyAmount === ""){
            setBuyAmountError(true)
        }
        if(withAmount === ""){
            setWithAmountError(true)
        }
        if(expire === ""){
            setExpireError(true)
        }
        if(counterParty === ""){
            setCounterpartyError(true)
        }

        if(buyAmount === "" || withAmount === "" || expire === "" || counterParty === "" || buyAmountError || withAmountError || expireError || counterpartyError){
            return
        }else if(withAmount > 10){
            dispatch(updatePopUpState({type: "insufficientFunds", isOpen: true}))
        } else{
            dispatch(ApiActions({
                name:"createOTCDirectOrder",
                actions:createOTCDirectOrder,
                data:{trader: counterParty, baseAsset: buyToken,quoteAsset: sellToken,baseAmount:buyAmount, quoteAmount: withAmount,side:2, expire:dateToEpoch(expire)},
                onSuccess: handleCreateOTCSuccess
            }))
        }
    }

    return (
        <>
            <div className="do-form do-buy">
                <div className="input-row buy-token">
                    <div className="form-row">
                        <div className="input-field">
                            <div className="label">Buy</div>
                            <input className="token-amt right" bubble="text" placeholder="Input Amount"
                                   value={buyAmount}
                                   onChange={handleAmountChange}/>
                            <div className="icon wallet" text="abc"><span className="icon-wallet"></span></div>
                            <div className="token-list dd-menu">
                                <div className="infield-label token-name">{buyToken}</div>
                                <div className="icon-select "><span className="icon-tri-down"></span></div>
                                <div className="drop-down">
                                    <ul>
                                        {
                                            tokens.map((item,index) =>{
                                                return <li onClick={() => setBuyToken(item)} key={index}>{item}</li>
                                            })
                                        }
                                    </ul>
                                </div>

                            </div>

                        </div>
                        <div className={`error ${buyAmountError ? "show" : ""}`}>Please enter valid base amount</div>
                    </div>
                </div>

                <div className="input-row cost-token">
                    <div className="form-row">
                        <div className="input-field">
                            <div className="label">With Amount</div>
                            <input className="cost-amt right" type="text" placeholder="Input Amount" value={withAmount}
                                   onChange={handleWithAmountChange}/>
                            <div className="icon wallet"><span className="icon-wallet"></span></div>
                            <div className="token-list dd-menu">
                                <div className="infield-label token-name">{sellToken}</div>
                                <div className="icon-select"><span className="icon-tri-down"></span>
                                </div>
                                <div className="drop-down">
                                    <ul>
                                        {
                                            tokens.map((item,index) =>{
                                                return <li onClick={() => setSellToken(item)} key={index}>{item}</li>
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="do-fee">
                            <div className="fee-text">Estimated fee (0.06%): <span
                                className="est-fee">{`${decimalTimes(buyAmount, 0.0006)} ${buyToken} `}</span>
                            </div>
                            <span className="icon-remark"></span>
                        </div>
                        <div className={`error ${withAmountError ? "show" : ""}`}>Please enter valid quote amount</div>
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
                            <input
                                className="days center"
                                type="text"
                                placeholder="1"
                                value={orderDuration}
                                onChange={handleOrderDurationChange}
                            />
                            <div className="infield-label">DAY(S)</div>
                        </div>
                        <div className={`error ${orderDurationError ? "show" : ""}`}>Please input valid duration</div>
                    </div>
                </div>

                <div className="input-row counterparty">
                    <div className="form-row">
                        <div className="input-field pad-right">
                            <div className="label">Counterparty</div>
                            <input
                                className="cp-id center"
                                type="text"
                                placeholder="Input counterparty code or email"
                                value={counterParty}
                                onChange={handleCounterPartyChange}
                            />
                            <div className="icon contacts"><span className="icon-contacts"></span>
                            </div>
                        </div>
                        <div className={`error ${counterpartyError ? "show" : ""}`}>Please input valid counterparty code
                            or email
                        </div>
                    </div>
                </div>

                <div className="form-footer">

                    <div className={`error ${pageError ? "show" : ""}`}>{pageError}</div>

                    <div className="button submit pointer" onClick={handleSubmit}>SUBMIT ORDER</div>
                </div>
            </div>
        </>
    )
}