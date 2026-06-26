import { Box } from "@mui/material";

import { useAppSelector } from "src/store/hooks";
import { selectErrorMessage } from "src/slices/error-message.slices";

import './kbank-inline-css.css';

declare global {
    interface Window {
        A: any;
        KInlineCheckout: any
    }
}

export default function RegisterPaymentKbankInline() {

    const { kInlineCheckoutMessageError } = useAppSelector(selectErrorMessage);

    return (
        <div className="content">
            <div className="payment-block">
                {/* <h1>K-Inline Payment</h1> */}

                {kInlineCheckoutMessageError && <p style={{ margin: '0 0 15px', fontSize: '0.875rem', color: 'red' }}> Oops! something went wrong, please try again. </p>}

                <div className="flied">
                    <Box component="label" className="label">
                        Cardholder Name
                        <span className="requered">*</span>
                    </Box>
                    <DivOnpage divId="card-name" key={Math.random()} />
                    <Box component="label">Card Name is invalid.</Box>

                    {/* <label  htmlFor="card-name-requered" id="card-name-2" className="label" >
                            Cardholder Name
                            <span  htmlFor="card-name-requered" className="requered">*</span>
                        </label> */}
                    {/* <div id="card-name"></div> */}
                    {/* <label >Card Name is invalid.</label> */}

                </div>
                <div className="flied">
                    {/* <label className="label" htmlFor="card-number">Card Number <span className="requered">*</span></label>
                        <div id="card-number"></div>
                        <label>Card Number is invalid.</label> */}
                    <Box component="label" className="label">
                        Card Number
                        <span className="requered">*</span>
                    </Box>
                    <DivOnpage divId="card-number" key={Math.random()} />
                    <Box component="label">Card Number is invalid.</Box>
                </div>
                <div className="card-detail">
                    <div className="flied">
                        {/* <label className="label" htmlFor="card-expiry">Card Expiry <span className="requered">*</span></label>
                            <div id="card-expiry"></div>
                            <label>Card Expiry is invalid.</label> */}
                        <Box component="label" className="label">
                            Card Expiry
                            <span className="requered">*</span>
                        </Box>
                        <DivOnpage divId="card-expiry" key={Math.random()} />
                        <Box component="label">Card Expiry is invalid.</Box>
                    </div>
                    <div className="flied">
                        {/* <label className="label" htmlFor="card-cvv">Security Code <span className="requered">*</span></label>
                            <div id="card-cvv"></div>
                            <label>Card CVV is invalid.</label> */}
                        <Box component="label" className="label">
                            Security Code
                            <span className="requered">*</span>
                        </Box>
                        <DivOnpage divId="card-cvv" key={Math.random()} />
                        <Box component="label">Card CVV is invalid.</Box>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DivOnpage({ divId }: { divId: string }) {
    return <Box component="div" id={divId} />
}