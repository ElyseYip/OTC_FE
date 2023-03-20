import React, {useState} from "react";
import Summary from "./Summary";
import Share from "./Share";
import Order from "./Order";
import {useNavigate} from "react-router-dom";

export default function MatchOrders(){
    const [step, setStep] = useState("step1");
    const navigate = useNavigate();
    const [summaryData, setSummaryData] = useState({});
    console.log(summaryData)

    return(
        <div id="tab3" className="tabcontent otc-mo">

            <div className="mo-order-row mo-form">

                <div className="mo-steps">
                    <div className="steps-bar">
                        <div className={`mo-step step1 ${step==="step1"? "active":""}`} onClick={() => setStep("step1")}>ORDER</div>
                        <div className="mo-arrow"><span className="icon-step-arrow"></span></div>
                        <div className={`mo-step step2 ${step==="step2"? "active":""}`} onClick={() => setStep("step2")}>SUMMARY</div>
                        <div className="mo-arrow"><span className="icon-step-arrow"></span></div>
                        <div className={`mo-step step3 ${step==="step3"? "active":""}`} onClick={() => setStep("step3")}>SHARE</div>
                    </div>
                </div>

                {
                    step === "step1" && <Order setStep={setStep} setSummaryData={setSummaryData}/>
                }
                {
                    step === "step2" && <Summary setStep={setStep} summaryData={summaryData}/>
                }
                {
                    step === "step3" &&  <Share setStep={setStep}/>
                }

            </div>
        </div>

    )
}