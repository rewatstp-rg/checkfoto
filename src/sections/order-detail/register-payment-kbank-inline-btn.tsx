import { useState, useEffect } from "react";

import LoadingButton from "@mui/lab/LoadingButton";

import { useTranslate } from "src/locales";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { selectErrorMessage, setKInlineCheckoutMessageError } from "src/slices/error-message.slices";

import { StepPaymentGatewayModel } from "src/types/order-photo.type";

const ENV_URL = `${import.meta.env.VITE_HOST_API}/api/app/paymentController/kbankCardCheckout?referenceOrder=`;
const VITE_KBANK_INLINE_API = `${import.meta.env.VITE_KBANK_INLINE_API}`;
const VITE_KBANK_INLINE_API_KEY = `${import.meta.env.VITE_KBANK_INLINE_API_KEY}`;

export default function RegisterPaymentKbankInlineBtn({ disabled, paymentGatewayModel }: { disabled: boolean, paymentGatewayModel?: StepPaymentGatewayModel }) {

    const { t } = useTranslate();

    const dispatch = useAppDispatch();
    const { KInlineCheckout }: any = useScript(`${VITE_KBANK_INLINE_API}`, 'KInlineCheckout');

    const { kInlineCheckoutMessageError } = useAppSelector(selectErrorMessage);
    // const [validName, setValidName] = useState({});

    useEffect(() => {
        if (KInlineCheckout) {
            KInlineCheckout.init();

            const fontSetting = {
                fontFamily: "Arial, Arial Black, Helvetica, sans-serif",
                fontColor: "#637381",
                fontSize: "0.875rem",
            }

            KInlineCheckout.setFontStyle('card-name', fontSetting);
            KInlineCheckout.setFontStyle('card-number', fontSetting);
            KInlineCheckout.setFontStyle('card-expiry', fontSetting);
            KInlineCheckout.setFontStyle('card-cvv', fontSetting);

            KInlineCheckout.onInputValidation((elementName: string, result: string) => {
                // console.log(elementName);
                // console.log(result);
                const ele = document.getElementById(elementName);
                if (result === 'valid') {
                    ele?.classList.remove('is-invalid');

                } else {
                    ele?.classList.add('is-invalid');
                }
            });

            KInlineCheckout.onGetTokenFailed((text: any) => {
                // console.log("🚀 ~ KInlineCheckout.onGetTokenFailed ~ text:", text)
                // console.log(text);
                // console.log(text.message);
                // console.log(text.failure_code);
                // document?.getElementById('error-summary').classList.add('show');
                dispatch(setKInlineCheckoutMessageError(text.message));
            });

            KInlineCheckout.onClientError((data: any) => {
                console.log("onClientError > ", data)
            });

            KInlineCheckout.onFormSubmit((data: any) => {
                // console.log("🚀 ~ KInlineCheckout.onFormSubmit ~ data:", data);
                
                // const ele = document.getElementById('card-name');
                // console.log("🚀 ~ KInlineCheckout.onFormSubmit ~ ele:", ele)
                // console.log("onFormSubmit > ", data);
                // // console.log("validName > ", validName);

                // window.alert("onFormSubmit > ");
            });

            KInlineCheckout.configure((data: any) => {
                // console.log("🚀 ~ KInlineCheckout.configure ~ data:", data)
            })

            // console.log("🚀 ~ KInlineCheckout:", KInlineCheckout)

        }
        // KInlineCheckout.init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [KInlineCheckout, kInlineCheckoutMessageError])

    return (
        <form method="POST" action={`${ENV_URL}${paymentGatewayModel?.referenceOrder}`}>
            <script src={`${VITE_KBANK_INLINE_API}`}
                data-apikey={`${VITE_KBANK_INLINE_API_KEY}`} data-lang='EN'
                data-write-log="false" />
            <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                sx={{ mt: 2 }}
                disabled={disabled}
            >
                {t('registerForm.payment.confirmPay')}
            </LoadingButton>
        </form>
    )
}

export const useScript = (url: string, name: any) => {

    const [lib, setLib] = useState({});

    useEffect(() => {

        const script = document.createElement('script');
        script.src = `${VITE_KBANK_INLINE_API}`; // Replace with the correct URL
        script.setAttribute('data-apikey', VITE_KBANK_INLINE_API_KEY);
        script.setAttribute('data-write-log', 'false');
        script.setAttribute('data-lang', 'EN');
        script.async = true;

        script.onload = () => setLib({ [name]: window[name] })
        document.body.appendChild(script);

        return () => { document.body.removeChild(script); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    return lib
};
