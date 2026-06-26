import { useMemo } from "react";

import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";

// import { useRouter } from "src/routes/hooks";

// import { getStorage } from "src/hooks/use-local-storage";

// import { STORAGE_KEYS } from "src/utils/constants";
import { fCurrency } from "src/utils/format-number";
import { getPathImage64 } from "src/utils/getPathImageByfile64";

import { useTranslate } from "src/locales";
import { selectOrder } from "src/slices/order.slices";
// import { jwtDecode } from "src/auth/context/jwt/utils";
// import { useInquiryThaiQrMutation } from "src/api/order.api";
// import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { useAppSelector } from "src/store/hooks";
// import { setRegisterFormDetail } from "src/slices/register.slices";

import Image from 'src/components/image';

// import { OrderModel, OrderModelResponse } from "src/types/order.model";

import { CountDownDateExpire } from "./countdown-date-expire";

export function OrderDetailQr({ onRefresh }: { onRefresh?: () => void }) {

    // const router = useRouter();
    const { t } = useTranslate();
    // const dispatch = useAppDispatch();

    const { orderModel } = useAppSelector(selectOrder);

    // const [inquiryThaiQr, { isLoading }] = useInquiryThaiQrMutation();

    const paymentGatewayModel = useMemo((() => {
        if (orderModel && orderModel?.paymentModel) {
            return orderModel?.paymentModel
        }
        return null;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [orderModel]);

    const handleInquiryThaiQr = async () => {
        if (orderModel && orderModel?.orderPhotoNumber) {
            window.location.reload();
            // const orderModelPayload: OrderModel = {
            //     orderNumber: orderModel.orderPhotoNumber,
            //     registerStep: {
            //         listStep: []
            //     }
            // };
            // await inquiryThaiQr(orderModelPayload).unwrap().then((
            //     response: OrderModelResponse
            // ) => {
            //     const { data } = response;
            //     const key = STORAGE_KEYS.USER_INFO;
            //     const userProfile = getStorage(key);
            //     const token = userProfile;
            //     const user = jwtDecode(token);
            //     const { userDetail } = user;
            //     if (data && data?.registerStep && data?.registerStep?.listStep && data.registerStep.listStep?.length > 0) {
            //         if (userDetail.userCode === data?.userCode) {
            //             dispatch(setRegisterFormDetail(data));
            //             onRefresh?.();
            //         } else {
            //             router.push('/')
            //         }
            //     }
            // });
        } else {
            console.error('ไม่พบหมายเลขใบสั่งซื้อ');
        }
    }

    return (
        <Box
            columnGap={2}
            rowGap={2.5}
            display="grid"
            gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(1, 1fr)',
            }}
        >

            <Paper
                variant="outlined"
                sx={{
                    p: 2,
                    color: 'text.primary',
                    borderStyle: 'dashed', borderWidth: 1, borderColor: 'grey.300', borderRadius: 1, width: '100%'
                }}
            >
                <Stack direction="column" spacing={2} justifyContent='center' alignItems='center' display='flex'>
                    <Typography variant="subtitle1" sx={{ fontSize: 20 }}>
                        {t('registerForm.payment.qrPaymentTitle')}
                    </Typography>
                    <Image paddingTop={0} alt='รูป' src={getPathImage64(paymentGatewayModel?.qrImage, `QR_${paymentGatewayModel?.paymentExpiredDate}`)} sx={{ borderRadius: 2 }} maxWidth={310} />
                    <Stack direction="column" spacing={2} justifyContent='center' alignItems='center'>
                        <Typography variant="subtitle2" sx={{ fontSize: 14 }}>
                            {t('registerForm.payment.validateQrTimeOut')}
                        </Typography>
                        <Typography variant="subtitle2" sx={{ fontSize: 14, color: 'red', mt: -2 }}>
                            {
                                paymentGatewayModel?.paymentExpiredDate && <CountDownDateExpire paymentExpiredDate={paymentGatewayModel.paymentExpiredDate} />
                            }
                            {/* {currentLang.value === 'en' ? dateEnFormat(registerFormDetail?.paymentExpiredDate, 'LONG-TIME') : dateThFormat(registerFormDetail?.qrPaymentExpiredDate, 'LONG-TIME')} */}
                        </Typography>
                    </Stack>
                    <Stack direction="column" spacing={2} justifyContent='center' alignItems='center'>
                        <Typography variant="subtitle2" sx={{ fontSize: 20 }}>
                            {t('registerForm.payment.netAmount')}
                        </Typography>
                        <Typography variant="subtitle2" sx={{ fontSize: 20, color: 'red', mt: -1 }}>
                            {fCurrency(orderModel?.netAmount || 0)} ฿
                        </Typography>
                    </Stack>
                </Stack>
            </Paper>
            <Grid container spacing={2} justifyContent="center" >
                <Grid item xs={12} md={6}>
                    <LoadingButton
                        fullWidth
                        color="primary"
                        size="large"
                        type="button"
                        variant="contained"
                        target="_blank"
                        loading={false}
                        disabled={false}
                        href=""
                        onClick={() => handleInquiryThaiQr()}
                    >
                        {t('registerForm.payment.checkPayment')}
                    </LoadingButton>
                </Grid>
                <Grid item xs={12} md={6}>
                    <LoadingButton
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        href={getPathImage64(paymentGatewayModel?.qrImage, `QR_${paymentGatewayModel?.paymentExpiredDate}`)}
                        target="_blank"
                        download
                        onClick={() => {
                            if (paymentGatewayModel?.qrImage) {
                                window.open(
                                    getPathImage64(paymentGatewayModel.qrImage, `QR_${paymentGatewayModel.paymentExpiredDate}`)
                                );
                            }
                        }}
                    >
                        {t('registerForm.payment.qrDownload')}
                    </LoadingButton>
                </Grid>
            </Grid>

        </Box>
    );
}