import React from "react";

export default function Share(props){
    const {
        setStep
    } = props

    return (
        <div className="mo-step-page share show">

            <div className="mo-share-row">
                <div className="mo-share-intro">Share the match order <b>link</b> or <b>QR
                    code</b> to counterparties to complete order.
                </div>
                <div className="mo-share-link">
                    <div className="otc-link">https://aenxchange.com/dashboard/otc</div>
                    <div className="icon copy"><span className="icon-copy"></span></div>
                </div>
                <div className="mo-qr"><img src="images/elements/qrcode-sample.jpg"/></div>

                <div className="controls-row">
                    <div className="button btn-offers pointer blue">OPEN OFFERS</div>
                    <div className="button btn-add pointer purple" onClick={() =>setStep("step1")}>+ NEW OFFER</div>
                </div>
            </div>
        </div>
    )
}