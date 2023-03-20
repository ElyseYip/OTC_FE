import React, {useState, useEffect} from "react";
import {datePickerTimeFormat, decimalMinus, emailValidation, timeDifference} from "../../common/CommonFunctions";
import CustomDatePicker from "../../components/CustomDatePicker";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import {ApiActions} from "../../api/ApiActions";
import {updatePopUpState} from "../../reducer/PopUpSlice";

export default function Order(props) {
    const {
        setStep,
        setSummaryData
    } = props;

    const navigate = useNavigate();
    const dispatch=useDispatch();
    const [expire, setExpire] = useState("");
    const [orderDuration, setOrderDuration] = useState("");
    const [party1Code, setParty1Code] = useState("");
    const [party1Buy, setParty1Buy] = useState("");
    const [party1Sell, setParty1Sell] = useState("");
    const [party1Commission, setParty1Commission] = useState("")
    const [party2Code, setParty2Code] = useState("");
    const [party2Buy, setParty2Buy] = useState("");
    const [party2Sell, setParty2Sell] = useState("");
    const [party2Commission, setParty2Commission] = useState("")
    const [expireError, setExpireError] = useState(false)
    const [orderDurationError, setOrderDurationError] = useState(false)
    const [party1CodeError, setParty1CodeError] = useState(false)
    const [party1BuyError, setParty1BuyError] = useState(false)
    const [party1SellError, setParty1SellError] = useState(false)
    const [party2CodeError, setParty2CodeError] = useState(false)
    const [party2BuyError, setParty2BuyError] = useState(false)
    const [party2SellError, setParty2SellError] = useState(false)
    const [pageError, setPageError] = useState("");
    const [clickedCalendar, setClickedCalendar] = useState(false);
    const [cp1SellToken, setCP1SellToken] = useState("USDT");
    const [cp1BuyToken, setCP1BuyToken] = useState("BTC");
    const [cp2BuyToken, setCP2BuyToken] = useState("USDT");
    const [cp2SellToken, setCP2SellToken] = useState("BTC");
    const tokens = ["AENS", "BNB", "BTC", "ETH", "SMPT", "TETH", "TUSD", "UNI", "USDT"]

    console.log(pageError)


    useEffect(() => {
        if (new Date(expire) > new Date()) {
            setExpireError(false)
            setOrderDuration(timeDifference(expire))
        } else {
            setOrderDuration("")
        }

    }, [expire])


    useEffect(() => {
        if (orderDurationError) {
            setExpire("")
        } else if (orderDuration) {
            const newDate = moment().add(orderDuration, 'days')
            const date = datePickerTimeFormat(newDate._d)
            setExpire(date)
        }
    }, [orderDuration])

    useEffect(() => {
        if (party2Buy && !party2BuyError && party1Sell && !party1SellError) {
            const commission = decimalMinus(party1Sell, party2Buy)

            setParty1Commission(commission)
        }
    }, [party2Buy, party2BuyError, party1Sell, party1SellError])

    useEffect(() => {
        if (party1Buy && !party1BuyError && party2Sell && !party2SellError) {
            const commission = decimalMinus(party2Sell,party1Buy)

            setParty2Commission(commission)
        }
    }, [party1Buy, party1BuyError, party2Sell, party2SellError])



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

    const handleOrderDuration = (e) => {
        e.preventDefault();
        if (isNaN(e.target.value) || e.target.value <= 0) {
            setOrderDurationError(true)
        } else {
            setOrderDurationError(false)
        }
        setOrderDuration(e.target.value)
    }

    const handleParty1Code = (e) => {
        e.preventDefault();
        if (!isNaN(e.target.value) && e.target.value.length !== 6) {
            setParty1CodeError(true)
        } else if (isNaN(e.target.value) && !emailValidation(e.target.value)) {
            setParty1CodeError(true)
        } else {
            setParty1CodeError(false)
        }
        setParty1Code(e.target.value)
    }

    const handleParty1Buy = (e) => {
        e.preventDefault();
        if (isNaN(e.target.value)) {
            setParty1BuyError(true)
        } else {
            setParty1BuyError(false)
        }
        setParty1Buy(e.target.value)
    }


    const handleParty1Sell = (e) => {
        e.preventDefault();
        if (isNaN(e.target.value)) {
            setParty1SellError(true)
        } else {
            setParty1SellError(false)
        }

        setParty1Sell(e.target.value)
    }

    const handleParty2Code = (e) => {
        e.preventDefault();
        if (!isNaN(e.target.value) && e.target.value.length !== 6) {
            setParty2CodeError(true)
        } else if (isNaN(e.target.value) && !emailValidation(e.target.value)) {
            setParty2CodeError(true)
        } else {
            setParty2CodeError(false)
        }
        setParty2Code(e.target.value)
    }

    const handleParty2Buy = (e) => {
        e.preventDefault();
        if (isNaN(e.target.value)) {
            setParty2BuyError(true)
        } else {
            setParty2BuyError(false)
        }
        setParty2Buy(e.target.value)
    }

    const handleParty2Sell = (e) => {
        e.preventDefault();
        if (isNaN(e.target.value)) {
            setParty2SellError(true)
        } else {
            setParty2SellError(false)
        }
        setParty2Sell(e.target.value)
    }

    const handleReset = () => {
        setParty1Code("");
        setParty1Buy("");
        setParty1Sell("");
        setParty2Code("");
        setParty2Buy("");
        setParty2Sell("");
        setExpireError("");
        setParty1CodeError(false);
        setParty2CodeError(false);
        setParty1BuyError(false);
        setParty2BuyError(false);
        setParty1SellError(false);
        setParty2SellError(false);
        setPageError("");
    }

    const handleNextSuccess = (data, status) =>{
        console.log(data)
        if(status === 200){
            setStep("step2")
            setSummaryData({
                counterParty1: party1Code,
                counterParty2: party2Code,
                party1Buy: party1Buy,
                party1Sell:party1Sell,
                party2Sell: party2Sell,
                party2Buy: party2Buy,
                party1Commission: party1Commission,
                party2Commission:party2Commission,
                cp1SellToken:cp1SellToken,
                cp1BuyToken:cp1BuyToken,
                cp2SellToken: cp2SellToken,
                cp2BuyToken: cp2BuyToken,
                expire: expire,
                orderDuration: orderDuration,
            })
        }else{
            setPageError(data.message)
        }
    }

    const handleNext = () => {
        if (expire === "") {
            setExpireError(true)
        }
        if (party1Code === "") {
            setParty1CodeError(true)
        }
        if (party1Buy === "") {
            setParty1BuyError(true)
        }
        if (party1Sell === "") {
            setParty1SellError(true)
        }
        if (party2Code === "") {
            setParty2CodeError(true)
        }
        if (party2Buy === "") {
            setParty2BuyError(true)
        }
        if (party2Sell === "") {
            setParty2SellError(true)
        }
        if (expire === "" || party1Code === "" || party1Buy === "" || party1Sell === "" || party2Code === "" || party2Buy === "" || party2Sell === "" || party1CodeError || party1BuyError || party1SellError || party2CodeError || party2BuyError || party2SellError || party1Commission<0 || party2Commission <0) {
            return
        } else {
            dispatch(ApiActions({
                name:"validateMatchOrder",
                actions:"validateMatchOrder",
                data:{askTrader:party2Code,askBaseAmount:party2Sell, askQuoteAmount:party2Buy,bidTrader:party1Code,bidBaseAmount:party1Buy,bidQuoteAmount:party1Sell,baseAsset:cp1BuyToken,quoteAsset:cp2BuyToken,expire:"86400"},
                onSuccess: handleNextSuccess
            }))

        }
    }
    const handleCP1BuyToken = (item) => {
        setCP1BuyToken(item)
        setCP2SellToken(item)
    }

    const handleCP1SellToken = (item) => {
        setCP1SellToken(item)
        setCP2BuyToken(item)

    }

    const handleCP2SellToken = (item) => {
        setCP1BuyToken(item)
        setCP2SellToken(item)
    }

    const handleCP2BuyToken = (item) => {
        setCP2BuyToken(item)
        setCP1SellToken(item)
    }

    return (
        <div className="mo-step-page order show">
            <div className="mo-date-row">

                <div className="date-box expire">
                    <div className="input-row">
                        <div className="label">Expires</div>
                        <div className="input-field">
                            <CustomDatePicker
                                setDate={setExpire}
                                setClickedCalendar={setClickedCalendar}
                                clickedCalendar={clickedCalendar}
                                handleExpiryChange={handleExpiryChange}
                                date={expire}
                            />
                        </div>
                    </div>
                    <div className={`error ${expireError ? "show" : ""}`}>Please input valid date</div>
                </div>

                <div className="date-box duration">
                    <div className="input-row">
                        <div className="label">Order Duration<span
                            className="after-icon icon-remark"></span></div>
                        <div className="input-field">
                            <input
                                className="days center"
                                type="text"
                                placeholder="1"
                                value={orderDuration}
                                onChange={handleOrderDuration}
                            />
                            <div className="infield-label">DAY(S)</div>
                        </div>
                    </div>
                    <div className={`error ${orderDurationError ? "show" : ""}`}>Please input valid duration</div>
                </div>
            </div>

            <div className="mo-row">

                <div className="mo-box party1">

                    <div className="box-header">COUNTERPARTY 1</div>
                    <div className="box-body">


                        <div className="input-row counterparty">
                            <div className="form-row">
                                <div className="label">Counterparty code or user email <span
                                    className="icon-remark"></span></div>
                                <div className="input-field pad-right">
                                    <input
                                        className="cp-id"
                                        placeholder="Input counterparty code or email"
                                        value={party1Code}
                                        onChange={handleParty1Code}
                                    />
                                    <div className="icon contacts"><span
                                        className="icon-contacts"></span></div>
                                </div>
                                <div className={`error ${party1CodeError ? "show" : ""}`}>Please input valid
                                    counterparty code or email
                                </div>
                            </div>
                        </div>

                        <div className="input-row buy-token">
                            <div className="form-row">
                                <div className="label">Buy</div>
                                <div className="input-field">
                                    <input
                                        className="buy-amt"
                                        placeholder="Input Amount"
                                        value={party1Buy}
                                        onChange={handleParty1Buy}
                                    />
                                    <div className="token-list dd-menu">
                                        <div className="infield-label token-name">{cp1BuyToken}</div>
                                        <div className="icon-select "><span
                                            className="icon-tri-down"></span></div>
                                        <div className="drop-down">
                                            <ul>
                                                {
                                                    tokens.map((item) => {
                                                        return <li onClick={() => handleCP1BuyToken(item)}>{item}</li>
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className={`error ${party1BuyError ? "show" : ""}`}>Please enter valid base
                                    amount
                                </div>
                            </div>
                        </div>

                        <div className="input-row sell-token">
                            <div className="form-row">
                                <div className="label">Sell</div>
                                <div className="input-field">
                                    <input
                                        className="sell-amt "
                                        type="text"
                                        placeholder="Input Amount"
                                        value={party1Sell}
                                        onChange={handleParty1Sell}
                                    />
                                    <div className="token-list dd-menu">
                                        <div className="infield-label token-name">{cp1SellToken}</div>
                                        <div className="icon-select "><span
                                            className="icon-tri-down"></span></div>
                                        <div className="drop-down">
                                            <ul>
                                                {
                                                    tokens.map((item) => {
                                                        return <li onClick={() => handleCP1SellToken(item)}>{item}</li>
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className={`error ${party1SellError ? "show" : ""}`}>Please enter valid quote
                                    amount
                                </div>
                            </div>
                        </div>

                        <div className="input-row commission">
                            <div className="form-row">
                                <div className="label">COMMISSION (GROSS)</div>
                                <div className="input-field">
                                    <input
                                        className="comm pad-right right" type="text"
                                        readOnly
                                        placeholder={party1Commission? `${party1Commission} ${cp1SellToken}`:`0 ${cp1SellToken}`}
                                    />
                                </div>
                            </div>
                            <div className={`error ${party1Commission <0 ? "show" : ""}`}>Spread cannot be negative</div>
                        </div>

                    </div>
                </div>


                <div className="mo-box party2">

                    <div className="box-header">COUNTERPARTY 2</div>
                    <div className="box-body">


                        <div className="input-row counterparty">
                            <div className="form-row">
                                <div className="label">Counterparty code or user email <span
                                    className="icon-remark"></span></div>
                                <div className="input-field pad-right">
                                    <input
                                        className="cp-id"
                                        type="text"
                                        placeholder="Input counterparty code or email"
                                        value={party2Code}
                                        onChange={handleParty2Code}
                                    />
                                    <div className="icon contacts"><span
                                        className="icon-contacts"></span></div>
                                </div>
                                <div className={`error ${party2CodeError ? "show" : ""}`}>Please input valid
                                    counterparty code or email
                                </div>
                            </div>
                        </div>

                        <div className="input-row sell-token">
                            <div className="form-row">
                                <div className="label">Sell</div>
                                <div className="input-field">
                                    <input
                                        className="buy-amt"
                                        type="text"
                                        placeholder="Input Amount"
                                        value={party2Sell}
                                        onChange={handleParty2Sell}
                                    />
                                    <div className="token-list dd-menu">
                                        <div className="infield-label token-name">{cp2SellToken}</div>
                                        <div className="icon-select "><span
                                            className="icon-tri-down"></span></div>
                                        <div className="drop-down">
                                            <ul>
                                                {
                                                    tokens.map((item) => {
                                                        return <li onClick={() => handleCP2SellToken(item)}>{item}</li>
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className={`error ${party2SellError ? "show" : ""}`}>Please enter valid base
                                    amount
                                </div>
                            </div>
                        </div>

                        <div className="input-row buy-token">
                            <div className="form-row">
                                <div className="label">Buy</div>
                                <div className="input-field">
                                    <input
                                        className="sell-amt "
                                        type="text"
                                        placeholder="Input Amount"
                                        value={party2Buy}
                                        onChange={handleParty2Buy}
                                    />
                                    <div className="token-list dd-menu">
                                        <div className="infield-label token-name">{cp2BuyToken}</div>
                                        <div className="icon-select "><span
                                            className="icon-tri-down"></span></div>
                                        <div className="drop-down">
                                            <ul>
                                                {
                                                    tokens.map((item) => {
                                                        return <li onClick={() => handleCP2BuyToken(item)}>{item}</li>
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className={`error ${party2BuyError ? "show" : ""}`}>Please enter valid quote
                                    amount
                                </div>
                            </div>
                        </div>

                        <div className="input-row commission">
                            <div className="form-row">
                                <div className="label">COMMISSION (GROSS)</div>
                                <div className="input-field">
                                    <input className="comm pad-right right"
                                           type="text"
                                           readOnly
                                           placeholder={party2Commission? `${party2Commission} ${cp2SellToken}`: `0 ${cp2SellToken}`}/>
                                </div>
                            </div>
                            <div className={`error ${party2Commission <0 ? "show" : ""}`}>Spread cannot be negative</div>
                        </div>

                    </div>
                </div>

            </div>

            <div className={`error mo-sys-error ${pageError? "show" : ""}`}>{pageError}</div>
            <div className="controls-row">
                <div className="button btn-reset pointer gray" onClick={handleReset}>RESET</div>
                <div className="button btn-next pointer purple" onClick={handleNext}>NEXT</div>
            </div>
        </div>
    )
}