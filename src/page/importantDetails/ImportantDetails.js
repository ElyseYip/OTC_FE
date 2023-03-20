import React from "react";

export default function ImportantDetails(){
    return (
        <div className="terms-row">
            <div className="term-title">Important Details:</div>
            <ol>
                <li>All counterparties / traders and match makers (“Users”) using AENX OTC functionalities are
                    subjected to know-your-client (“KYC”) requirements in order to complete and settle
                    transactions. Users must complete the requirements for KYC Level 2 to participate. This can
                    be initiated from each User’s dashboard upon registering and logging on to the AENX
                    Platform.
                </li>
                <li>All counterparties (buyer or seller) engaging in “Direct Orders” or “Matched Orders” are
                    subjected to standard trading fees as based on the user account’s VIP Level, and whether the
                    user is a Maker or a Taker in the transaction (Fees as depicted under “Overview of Fee
                    Discounts” in the user dashboard).
                </li>
                <li>For Direct Orders: the user initiating the OTC trade by creating a trade ticket is
                    considered to be the “Maker” of the transaction. The counterparty taking the opposite end of
                    the trade by providing the valid verification code as prompted is considered to be the
                    “Taker”. <br/>
                    For Match Orders: match-makers (i.e. brokers) of every matched order is considered to be
                    the “Maker” while both Counterparties 1 and 2 engaged in the Buy/Sell are “Takers” in
                    this case.
                </li>
                <li>Trading fees incurred by the buyer and seller are denominated in the digital currency of the
                    ‘Receiving’ leg of the traded pair. For example, if the counterparty buys BTC/USDT, trading
                    fees are generated in BTC as he/she receives BTC and sells USDT (vice versa for the seller).
                </li>
                <li>For OTC transactions, we currently do not offer the option to settle transaction fees in
                    AENS.
                </li>
                <li>For a match-maker (“Broker”) using the Matched Orders functionality, his compensation will
                    be derived from the ‘broker spread’ arising between the indications of two willing
                    counterparties in a buy/sell transaction (i.e. market mis-pricing). Thus, the broker spread
                    is denominated in the digital currencies as associated to the matched trade in question.
                    Only matched orders with a minimum of ‘break even’ to positive spread will be enabled to be
                    executed (i.e. trades with negative spreads shall be restricted). AENX shall charge a
                    pre-determined % rate from the broker spread (on a success basis of the matched trade) as
                    communicated to users and amended from time to time.
                </li>
                <li>AENX reserves the right to amend all fee rates (standard transaction fees and haircut rates
                    to the broker spread) without prior notice from time to time and/or as required by business
                    needs. Such changes and amendments will be communicated to users in a timely manner through
                    the AENX platform.
                </li>
                <li>Both Direct Orders and Matched Orders are subjected to a validity period (or “Duration”) as
                    determined by the Maker of the trade, in which the open order remains available to be taken
                    by the opposite counterparty. The duration is measured in units of 24 hour periods as
                    commenced from the time of creation of any such order.
                </li>
                <li>All verified user accounts shall be associated to a single “Counterparty code” for the
                    purpose of engaging in AENX OTC transactions.
                </li>
                <li>AENX reserves the right in adopting final decisions and/or taking remedial actions as
                    necessary in the event of disputes between Users, or between Users and the platform, or as
                    required by regulatory and/or legal authorities, with the interest in maintaining a fair and
                    orderly operating OTC platform.
                </li>
            </ol>
        </div>
    )
}