import { useState, useCallback } from "react";

import {
    Grid,
    Button,
    TextField,
    CardHeader,
    CardContent,
    InputAdornment,
    FormHelperText
} from "@mui/material";

import { useBoolean } from "src/hooks/use-boolean";

import { ERROR_MESSAGE, ERROR_MESSAGE_EN } from "src/utils/constants";

import { selectEvent } from "src/slices/event.slices";
import { useLocales, useTranslate } from "src/locales";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { useCheckDiscountCodeMutation } from "src/api/discount.api";
import { setLoadingState, setDialogMessage, closeDialogMessage } from "src/slices/error-message.slices";

import { DiscountCodeModel, DiscountCodeModelResponse } from "src/types/discount.model";

type Props = {
    onApplyDiscount: (e: DiscountCodeModel) => void;
    disabled?: boolean;
}

export function PaymentCouponCode({ onApplyDiscount, disabled }: Props) {

    const { t } = useTranslate();
    const isSubmit = useBoolean();
    const dispatch = useAppDispatch();
    const { currentLang } = useLocales();

    const { eventDetail } = useAppSelector(selectEvent);

    const [checkDiscount] = useCheckDiscountCodeMutation();

    const [discountCode, setDiscountCode] = useState('');
    const [validateCoupon, setValidateCoupon] = useState('');

    const handleApplyDiscount = useCallback(async () => {
        setValidateCoupon('');
        if (discountCode && eventDetail?.eventCode) {
            isSubmit.onTrue();
            const discountModel: DiscountCodeModel = {
                eventCode: eventDetail.eventCode,
                couponCode: discountCode,
                discountModule: 'PHOTO'
            };
            dispatch(setLoadingState(true));
            await checkDiscount(discountModel).unwrap().then((res: DiscountCodeModelResponse) => {
                const { data } = res;
                if (data.status === 'ACTIVE') {
                    setTimeout(() => {
                        dispatch(setLoadingState(false));
                        onApplyDiscount(data);
                        isSubmit.onFalse();
                        setValidateCoupon('');
                        dispatch(closeDialogMessage());
                    }, 500);
                } else {
                    setTimeout(() => {
                        dispatch(setLoadingState(false));
                        setValidateCoupon((currentLang.value === 'en' ? data?.statusDescEn : data?.statusDesc) || '');
                        dispatch(setDialogMessage({
                            title: '',
                            message: currentLang.value === 'en' ? data?.statusDescEn : data?.statusDesc,
                            open: true,
                            showSave: false,
                            showCancel: true,
                            labelOk: '',
                            labelCancel: t('close'),
                            type: 'alert'
                        }));
                    }, 500);
                }

            }).catch((err) => {
                isSubmit.onFalse();
                setValidateCoupon(err.data.message);
            });
        } else {
            setValidateCoupon(currentLang.value === 'en' ? ERROR_MESSAGE_EN.REQUIRED : ERROR_MESSAGE.REQUIRED);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [discountCode, validateCoupon, discountCode]);

    return (
        <>
            <CardHeader
                title={`${t('registerForm.payment.useDiscountTitle')}`}
            />
            <CardContent>
                <Grid container spacing={3} justifyContent="flex-start" mb={2}>
                    <Grid item xs={12} md={12}>
                        <TextField
                            fullWidth
                            disabled={disabled}
                            placeholder={t('registerForm.payment.discountCouponTitle')}
                            value={discountCode}
                            onChange={(e) => setDiscountCode(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Button color="primary" disabled={disabled} onClick={() => handleApplyDiscount()} sx={{ mr: -0.5 }}>
                                            {t('registerForm.payment.discountBtn')}
                                        </Button>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {(validateCoupon) && (
                            <FormHelperText error>{validateCoupon}</FormHelperText>
                        )}
                    </Grid>
                </Grid>
            </CardContent>
        </>
    )
}

