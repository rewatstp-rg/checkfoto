import { useMemo, useState, useEffect, useCallback } from "react";

import LoadingButton from "@mui/lab/LoadingButton";
import {
    Box,
    Grid,
    Card,
    Stack,
    Container,
    CardHeader,
    Typography
} from "@mui/material";

import { paths } from "src/routes/paths";
import { useRouter } from "src/routes/hooks";

import { getStorage } from "src/hooks/use-local-storage";
import { useResponsive } from "src/hooks/use-responsive";

import { dateEnFormat, dateThFormat } from "src/utils/format-time";
import { STORAGE_KEYS, ORDER_PACKAGE_TYPE, PAYMENT_GATEWAY_TYPE } from "src/utils/constants";
import { checkServiceResponse, PropsCheckServiceResponse } from "src/utils/check-service-response";
import { enqueueSnackbarErrorComponent, enqueueSnackbarSuccessComponent } from "src/utils/enqueueSnackbarComponent";

import { useLocales, useTranslate } from "src/locales";
import { jwtDecode } from "src/auth/context/jwt/utils";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { useGetOrderDetailMutation, useChangePaymentGatewayMutation } from "src/api/order.api";
import { PhotoCart, selectOrder, setOrderModel, clearPhotoCart, setListPaymentGateway, } from "src/slices/order.slices";
import { setLoadingState, setDialogMessage, closeDialogMessage, selectErrorMessage } from "src/slices/error-message.slices";

import Label from "src/components/label";
import { BackToTop } from "src/components/animate/back-to-top";
import { ButtonSubmitForm } from "src/components/button-forom";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs/custom-breadcrumbs";

import PaymentMethod from "src/sections/checkout/payment-method";
import PaymentSummary from "src/sections/checkout/payment-summary";
import CheckoutCartPhotoList from "src/sections/checkout/checkout-cart-photo-list";

import { OrderPhotoModel, OrderPhotoModelResponse } from "src/types/order-photo.type";

import { OrderDetailQr } from "../order-detail-qr";
import { OrderDetailUploadSlip } from "../order-detail-upload-slip";
import RegisterPaymentKbankInline from "../register-payment-kbank-inline";
import RegisterPaymentKbankInlineBtn from "../register-payment-kbank-inline-btn";

const { DIR, TQR, CDC, KC } = PAYMENT_GATEWAY_TYPE;

type Props = {
    orderPhotoNumber: string;
};

export default function OrderDetailView({ orderPhotoNumber }: Props) {

    const router = useRouter();
    const { t } = useTranslate();
    const dispatch = useAppDispatch();
    const { currentLang } = useLocales();
    const lgUp = useResponsive('up', 'lg');

    const { orderModel } = useAppSelector(selectOrder);
    const { kInlineCheckoutMessageError } = useAppSelector(selectErrorMessage);

    const [isRefresh, setIsRefresh] = useState<boolean>(false);
    const [isRefreshKbank, setIsRefreshKbank] = useState<boolean>(false);
    const [oldPaymentMedthod, setOldPaymentMedthod] = useState<string>('');
    const [listPhoto, setListPhoto] = useState([] as PhotoCart[]);
    // setPhotoCartDetail
    const paymentModel = useMemo(() => (orderModel?.paymentModel), [orderModel]);

    const [changePaymentGateway] = useChangePaymentGatewayMutation();
    const [getOrderPhotoDetail, { isLoading: isLoadingForm }] = useGetOrderDetailMutation();

    const loadEventContent = useCallback(async () => {
        dispatch(setListPaymentGateway([]));
        dispatch(clearPhotoCart());
        if (orderPhotoNumber) {
            const payloadModel: OrderPhotoModel = {
                orderPhotoNumber,
                totalOrder: 0,
                totalAmount: null,
                paymentGatewayFee: null,
                paymentGatewayFeeUnit: "",
                paymentMethod: "",
                discountAmount: null,
                netAmount: null
            }
            await getOrderPhotoDetail(payloadModel).unwrap().then((
                response: OrderPhotoModelResponse
            ) => {

                const { data } = response;
                const key = STORAGE_KEYS.USER_INFO;
                const userProfile = getStorage(key);
                const token = userProfile;
                const user = jwtDecode(token || '');
                const { userDetail } = user;

                const hasPhotos = data?.listOrderPhotoObject && data?.listOrderPhotoObject?.length > 0;
                const hasPayments = data?.listPaymentGateway && data?.listPaymentGateway?.length > 0;

                if (data?.status === 'PAID') {
                    router.push(`/download-photo/${orderPhotoNumber}`);
                }

                if (hasPhotos && hasPayments) {

                    data.listOrderPhotoObject?.forEach((item, _index) => {
                        const addCart: PhotoCart = {
                            id: item?.id?.toString() || '',
                            url: item?.imageThumbnailUrl || '',
                            photoTypeDescTh: item?.photoPriceDescTh || '',
                            photoTypeDescEn: item?.photoPriceDescEn || '',
                            type: item?.photoPriceType || '',
                            photoPrice: item?.photoPriceType === ORDER_PACKAGE_TYPE.ALL ? 0 : data?.totalAmount || 0,
                            photoPriceCode: item?.photoPriceCode || '',
                            uid: item?.uid || '',
                            imageType: item?.imageType || ''
                        };

                        setListPhoto((prev) => [...prev, addCart]);
                    });

                    setOldPaymentMedthod(data.paymentMethod);

                    if (userDetail.userCode === data?.userCode) {
                        dispatch(setOrderModel(data));
                    } else {
                        router.push('/')
                    }
                } else {
                    router.push('/order')
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderPhotoNumber]);

    const onApplyPaymment = useCallback(async () => {
        try {
            dispatch(setDialogMessage({
                title: '',
                message: t('confirmOrderChangePaymentGateway'),
                open: true,
                showSave: true,
                showCancel: true,
                labelOk: t('registerForm.payment.changePayment'),
                labelCancel: t('cancelBtn'),
                type: 'alert',
                onOk: async () => {
                    const key = STORAGE_KEYS.USER_INFO;
                    const userProfile = getStorage(key);
                    const token = userProfile;
                    if (token) {
                        dispatch(setLoadingState(true));
                        let dataResponse: PropsCheckServiceResponse = {} as PropsCheckServiceResponse;
                        const orderModelPayload: OrderPhotoModel = {
                            ...orderModel,
                            orderPhotoNumber: orderModel?.orderPhotoNumber,
                            totalOrder: orderModel?.totalOrder || 0,
                            totalAmount: orderModel?.totalAmount || 0,
                            paymentGatewayFee: orderModel?.paymentGatewayFee || 0,
                            paymentGatewayFeeUnit: orderModel?.paymentGatewayFeeUnit || '',
                            paymentMethod: orderModel?.paymentMethod || '',
                            discountAmount: orderModel?.discountAmount || 0,
                            netAmount: orderModel?.netAmount || 0,
                        }

                        // console.log("orderModelPayload", orderModelPayload);

                        dataResponse = await changePaymentGateway(orderModelPayload).unwrap();
                        if (checkServiceResponse(dataResponse)) {
                            const { data } = dataResponse;
                            setTimeout(() => {
                                enqueueSnackbarSuccessComponent();
                                dispatch(closeDialogMessage());
                                dispatch(setLoadingState(false));
                                navigateToStep(data);
                            }, 500);
                        } else {
                            dispatch(setLoadingState(false));
                            enqueueSnackbarErrorComponent();
                        }
                    } else {
                        dispatch(setLoadingState(false));
                        enqueueSnackbarErrorComponent();
                    }
                },
            }));
        } catch (error) {
            console.error(error);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderModel]);

    const navigateToStep = (data: OrderPhotoModel) => {
        if (data?.paymentMethod === PAYMENT_GATEWAY_TYPE.CDC) {
            // บัตรเครดิต
            if (data?.paymentModel?.paymentCreditCardRedirect) {
                window.location.href = data.paymentModel.paymentCreditCardRedirect;
            } else {
                console.log('ไม่ได้รับ URL')
            }
        } else if (data?.paymentMethod === PAYMENT_GATEWAY_TYPE.TQR) {
            // thia qr
            window.location.reload();
        } else if (data?.paymentMethod === PAYMENT_GATEWAY_TYPE.DIR) {
            // direct
            window.location.reload();
        } else if (data?.paymentMethod === PAYMENT_GATEWAY_TYPE.KC) {
            // direct
            window.location.reload();
        }
    }

    useEffect(() => {
        loadEventContent();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderPhotoNumber])

    const onRefresh = () => {
        setIsRefresh(true);
        setTimeout(() => {
            setIsRefresh(false);
        }, 400)
    }

    useEffect(() => {
        if (kInlineCheckoutMessageError) {
            setIsRefreshKbank(true)
            setTimeout(() => {
                setIsRefreshKbank(false);
            }, 400)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [kInlineCheckoutMessageError]);

    if (isLoadingForm) return null;

    return (
        <Container
            maxWidth="lg"
            sx={{
                my: { xs: 3, md: 3 },
            }}
        >

            <CustomBreadcrumbs
                links={[
                    { name: t('common.home'), href: '/' },
                    { name: t('orders.title'), href: paths.order.root },
                    { name: orderModel?.orderPhotoNumber || '' },
                ]}
                sx={{ mb: 2 }}
            />

            <Typography
                variant="h4"
                sx={{
                    my: { xs: 3, md: 3 },
                }}
            >
                {t('orders.orderDetailTitle')}
            </Typography>

            <BackToTop />

            {
                !isRefresh && (
                    <>
                        <Grid container justifyContent='center'>
                            <Grid item sm={12} sx={{ width: '100%' }}>
                                <Grid container spacing={3} justifyContent="center">
                                    <Grid item xs={12} md={8} >
                                        {
                                            orderModel?.status === 'PENDING_PAYMENT' && <Card sx={{ pb: 3, mb: 3 }}>
                                                <CardHeader
                                                    sx={{ mb: 3 }}
                                                    title={`${t('registerForm.payment.title')}`}
                                                />
                                                <Box sx={{ p: 3, pt: 0 }}>
                                                    <PaymentMethod pageType='ORDER_DETAIL' paymentMethod={orderModel?.paymentMethod} />
                                                </Box>
                                                {
                                                    paymentModel?.paymentMethod !== TQR && (
                                                        <Stack direction="column" spacing={2} justifyContent='center' alignItems='center' mt={2} mb={2}>
                                                            <Typography variant="subtitle2" sx={{ fontSize: 14 }}>
                                                                {t('registerForm.payment.validateQrTimeOut')}
                                                            </Typography>
                                                            <Typography variant="subtitle2" sx={{ fontSize: 14, color: 'red', mt: -2 }}>
                                                                {currentLang.value === 'en' ? dateEnFormat(paymentModel?.paymentExpiredDate, 'LONG-TIME') : dateThFormat(paymentModel?.paymentExpiredDate, 'LONG-TIME')}
                                                            </Typography>
                                                        </Stack>
                                                    )
                                                }
                                            </Card>
                                        }
                                        {
                                            oldPaymentMedthod === paymentModel?.paymentMethod && paymentModel?.paymentMethod !== CDC && orderModel?.status === 'PENDING_PAYMENT' && <Card sx={{ pb: 3, mb: 3 }}>
                                                <CardHeader
                                                    sx={{ mb: 3 }}
                                                    title={`${t('registerForm.payment.uploadSlipTitle')}`}
                                                    action={
                                                        <Label
                                                            variant="soft"
                                                            color='warning'
                                                            sx={{ fontSize: '0.875rem !important', padding: '18px' }}
                                                        >
                                                            {currentLang?.value === 'en' ? orderModel?.statusDescEn : orderModel?.statusDesc}
                                                        </Label>
                                                    }
                                                />
                                                <Box sx={{ p: 3, pt: 0, width: '100%' }}>
                                                    {paymentModel?.paymentMethod === TQR && <OrderDetailQr onRefresh={onRefresh} />}
                                                    {paymentModel?.paymentMethod === DIR && <OrderDetailUploadSlip />}
                                                    {paymentModel?.paymentMethod === KC && paymentModel?.referenceOrder && !isRefreshKbank && (
                                                        <>
                                                            <RegisterPaymentKbankInline />
                                                            <RegisterPaymentKbankInlineBtn disabled={false} paymentGatewayModel={paymentModel} />
                                                        </>
                                                    )}
                                                </Box>
                                            </Card>
                                        }

                                        <Card sx={{ mb: 3 }}>
                                            <CardHeader
                                                title={
                                                    <Typography variant="h6">
                                                        {t('registerForm.merchandise.title')}
                                                        <Typography component="span" sx={{ color: 'text.secondary' }}>
                                                            &nbsp; ({orderModel?.totalOrder || 0} {t('registerForm.merchandise.item')})
                                                        </Typography>
                                                    </Typography>
                                                }
                                                sx={{ mb: 3 }}
                                            />

                                            <CheckoutCartPhotoList
                                                products={listPhoto || []}
                                                isView
                                            />
                                        </Card>
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <Card sx={{ pb: 3, mb: 3 }}>
                                            {
                                                paymentModel && <PaymentSummary pageType='ORDER_DETAIL' orderPhotoModel={orderModel} />
                                            }
                                            {
                                                lgUp && (oldPaymentMedthod !== paymentModel?.paymentMethod || paymentModel?.paymentMethod === CDC) && <Box sx={{ p: 3, pt: 0 }}>
                                                    <LoadingButton
                                                        fullWidth
                                                        size="large"
                                                        type="submit"
                                                        variant="contained"
                                                        onClick={() => onApplyPaymment()}
                                                    >
                                                        {t('registerForm.payment.changePayment')}
                                                    </LoadingButton>
                                                </Box>
                                            }

                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {
                            !lgUp && (oldPaymentMedthod !== paymentModel?.paymentMethod || paymentModel?.paymentMethod === CDC) && <Box sx={{ p: 3, pt: 0 }}>
                                <LoadingButton
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        width: '90%',
                                        position: 'fixed',
                                        right: { xs: 24, md: 32 },
                                        bottom: { xs: 5, md: 5 },
                                        zIndex: (theme) => theme.zIndex.speedDial,
                                        transition: (theme) => theme.transitions.create(['transform'])
                                    }}
                                    onClick={() => onApplyPaymment()}
                                >
                                    {t('registerForm.payment.changePayment')}
                                </LoadingButton>
                            </Box>
                        }
                        <ButtonSubmitForm
                            justifyContent="center"
                            cancelLabel={t('backBtn')}
                            isSubmit={false}
                            onCancel={() => {
                                router.push(paths.order.root);
                            }}
                        />
                    </>
                )
            }
        </Container>
    )
}

