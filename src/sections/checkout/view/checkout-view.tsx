// import { enqueueSnackbar } from "notistack";
import { useMemo, useState, useEffect, useCallback } from "react";

import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Card, Grid, Button, Container, CardHeader, Typography } from "@mui/material";

import { useParams, useRouter } from "src/routes/hooks";

import { getStorage } from "src/hooks/use-local-storage";
import { useResponsive } from "src/hooks/use-responsive";

import { base64ToBlob } from "src/utils/getPathImageByfile64";
import { checkServiceResponse, PropsCheckServiceResponse } from "src/utils/check-service-response";
import { PRICE_TYPE, STORAGE_KEYS, ORDER_PACKAGE_TYPE, PAYMENT_GATEWAY_TYPE } from "src/utils/constants";
import { enqueueSnackbarErrorComponent, enqueueSnackbarSuccessComponent } from "src/utils/enqueueSnackbarComponent";

import { selectEvent } from "src/slices/event.slices";
import { jwtDecode } from "src/auth/context/jwt/utils";
import { useLocales, useTranslate } from "src/locales";
import { useSaveOrderMutation } from "src/api/order.api";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { seleceFileModel, setResultSearchMyFace } from "src/slices/file.slices";
import { setLoadingState, setDialogMessage, closeDialogMessage } from "src/slices/error-message.slices";
import { PhotoCart, selectOrder, clearPhotoCart, setUseDiscount, deletePhotoCart, setPaymentModel, setUsePackageLimitPhotoToCart } from "src/slices/order.slices";

import { OrderPhotoModel } from "src/types/order-photo.type";
import { DiscountCodeModel } from "src/types/discount.model";

import PaymentMethod from "../payment-method";
import PaymentSummary from "../payment-summary";
import { PaymentCouponCode } from "../payemnt-coupon-code";
import CheckoutCartPhotoList from "../checkout-cart-photo-list";

// const mockupPhotoOrder = [
//     {
//         "id": "58295",
//         "url": "https://checkrace-image-sg-thumbnail.s3.ap-southeast-1.amazonaws.com/thumbnail-852219ee-37f6-4260-bc0d-82240323b4d5-KMN_00578.JPG?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20260626T031555Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAYK46U7VIB7HDRCOU%2F20260626%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Expires=10800&X-Amz-Signature=db7fcb9517efa8bf5c2994ea77dd9b5f517fc54540e645bceb5b95a7961ff23a",
//         "photoTypeDescTh": "ซื้อรูป 3 รูปในราคาเพียง 250 บาท",
//         "photoTypeDescEn": "Buy Photo 3 For 250 THB",
//         "type": "SMALL",
//         "photoPrice": 100,
//         "photoPriceCode": "PP00009",
//         "uid": "852219ee-37f6-4260-bc0d-82240323b4d5",
//         "imageType": "NORMAL"
//     },
//     {
//         "id": "59456",
//         "url": "https://checkrace-image-sg-thumbnail.s3.ap-southeast-1.amazonaws.com/thumbnail-695eb7b1-99f1-4813-9693-c1c7018df487-KMN_00931.JPG?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20260626T031555Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAYK46U7VIB7HDRCOU%2F20260626%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Expires=10800&X-Amz-Signature=c194e9a9f964fe1f74f12b1921305d6777f1ea7d64df059ee9caa8ffa282019b",
//         "photoTypeDescTh": "ซื้อรูป 3 รูปในราคาเพียง 250 บาท",
//         "photoTypeDescEn": "Buy Photo 3 For 250 THB",
//         "type": "SMALL",
//         "photoPrice": 100,
//         "photoPriceCode": "PP00009",
//         "uid": "695eb7b1-99f1-4813-9693-c1c7018df487",
//         "imageType": "NORMAL"
//     },
//     {
//         "id": "170226",
//         "url": "https://checkrace-image-sg-thumbnail.s3.ap-southeast-1.amazonaws.com/thumbnail-55ef6bd9-5ea5-42fe-8763-7183e3634c65-ADD01099.JPG?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20260626T031555Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAYK46U7VIB7HDRCOU%2F20260626%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Expires=10800&X-Amz-Signature=b4ef8871f66499e987af81ea7b7c8b1c91e5e442b3cb96026af810ec3940b536",
//         "photoTypeDescTh": "ซื้อรูป 3 รูปในราคาเพียง 250 บาท",
//         "photoTypeDescEn": "Buy Photo 3 For 250 THB",
//          "type": "SMALL",
//         "photoPrice": 100,
//         "photoPriceCode": "PP00009",
//         "uid": "55ef6bd9-5ea5-42fe-8763-7183e3634c65",
//         "imageType": "NORMAL"
//     },
//     {
//         "id": "202645",
//         "url": "https://checkrace-image-sg-thumbnail.s3.ap-southeast-1.amazonaws.com/thumbnail-98348ebb-f431-4264-987c-51c3917d8bfa-ADD03073.JPG?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20260626T031635Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAYK46U7VIB7HDRCOU%2F20260626%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Expires=10800&X-Amz-Signature=a8aaa3a798ec1ccc8a7d66ac61de127cb4df448051fc026797aa011b35289bd9",
//         "photoTypeDescTh": "รูปขนาดเล็ก 2250x1500  pixels",
//         "photoTypeDescEn": "Small image size 2250x1500 pixels",
//         "type": "SMALL",
//         "photoPrice": 100,
//         "photoPriceCode": "PP00009",
//         "uid": "98348ebb-f431-4264-987c-51c3917d8bfa",
//         "imageType": "NORMAL"
//     },
//     {
//         "id": "58229",
//         "url": "https://checkrace-image-sg-thumbnail.s3.ap-southeast-1.amazonaws.com/thumbnail-852219ee-37f6-4260-bc0d-82240323b4d5-KMN_00578.JPG?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20260626T032407Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAYK46U7VIB7HDRCOU%2F20260626%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Expires=10800&X-Amz-Signature=07441346bfad409511afd3ac783affece0d4dc189b986dd5a737d5356accc013",
//         "photoTypeDescTh": "ซื้อตามจำนวนรูป",
//         "photoTypeDescEn": "Buy For Photo Limit",
//         "type": "LIMIT_LENGTH_PHOTO",
//         "photoPrice": 300,
//         "photoPriceCode": "PP00097",
//         "uid": "852219ee-37f6-4260-bc0d-82240323b4d5",
//         "imageType": "NORMAL"
//     },
// ];

export default function CheckoutView() {

    const params = useParams();
    const router = useRouter();
    const { t } = useTranslate();
    const dispatch = useAppDispatch();
    const { currentLang } = useLocales();
    const lgUp = useResponsive('up', 'lg');

    const [saveOrderPhoto] = useSaveOrderMutation();

    const { eventDetail } = useAppSelector(selectEvent);
    const { photoCart, listPaymentGateway, } = useAppSelector(selectOrder);
    const { fileForSearchMyFace } = useAppSelector(seleceFileModel);

    const packageLimit = useMemo(() => {
        const raw = localStorage.getItem(`${STORAGE_KEYS.PACKAGE_PHOTO}-${eventDetail?.eventCode}`);
        return raw ? JSON.parse(raw) : null;
    }, [eventDetail?.eventCode]);

    const [registerEmail, setRegisterEmail] = useState('');
    const [validateEmail, setValidateEmail] = useState(false);
    const [disabledEmail, setDisabledEmail] = useState(false);

    const myCart = useMemo(() => photoCart, [photoCart]);

    const onApplyPaymment = useCallback(() => {

        try {
            if (
                eventDetail?.eventCode &&
                eventDetail?.eventUrl &&
                myCart &&
                myCart.paymentModel?.paymentMethod &&
                myCart.paymentModel?.paymentGatewayFeeUnit
            ) {
                if (validateEmail) {
                    dispatch(
                        setDialogMessage({
                            title: '',
                            message:
                                myCart.netAmount === 0
                                    ? t('confirmOrderFree')
                                    : t('confirmOrder'),
                            open: true,
                            showSave: true,
                            showCancel: true,
                            labelOk:
                                myCart.netAmount === 0
                                    ? t('registerForm.payment.createFree')
                                    : t('registerForm.payment.createPay'),
                            labelCancel: t('cancelBtn'),
                            type: 'alert',
                            onOk: async () => {
                                try {
                                    dispatch(setLoadingState(true));
                                    const key = STORAGE_KEYS.USER_INFO;
                                    const tokenUser = getStorage(key);

                                    if (!tokenUser || typeof tokenUser !== 'string') {
                                        enqueueSnackbarErrorComponent('Invalid user token');
                                        return;
                                    }

                                    const decoded = jwtDecode(tokenUser);

                                    const userDetail = decoded?.userDetail;
                                    if (!userDetail || !userDetail.userId || !userDetail.userCode) {
                                        enqueueSnackbarErrorComponent('Invalid user profile');
                                        return;
                                    }

                                    const { token } = params;

                                    const fileName = fileForSearchMyFace?.name || localStorage.getItem('FFDN_');
                                    const base64 = localStorage.getItem('FFD_');

                                    let fileMyFace = fileForSearchMyFace;

                                    if (base64 && fileName) {
                                        const base64Split = base64.split(",")[1];
                                        const blob = base64ToBlob(base64Split, 'image/jpeg');
                                        fileMyFace = new File([blob], `${fileName}`, { type: 'image/jpeg' });
                                    }

                                    const orderModel: OrderPhotoModel = {
                                        userId: userDetail.userId,
                                        userCode: userDetail.userCode,
                                        eventCode: eventDetail.eventCode ?? 'NONE',
                                        eventUrl: eventDetail.eventUrl ?? 'NONE',
                                        orderSubmit: token ? 'TEST' : 'SUBMIT',
                                        totalOrder: myCart.totalOrder ?? 0,
                                        totalAmount: myCart.totalAmount ?? 0,
                                        paymentMethod: myCart.paymentModel?.paymentMethod ?? 'NONE',
                                        paymentGatewayFee: myCart.paymentGatewayAmount ?? 0,
                                        netAmount: myCart.netAmount ?? 0,
                                        paymentGatewayFeeUnit:
                                            myCart.paymentModel?.paymentGatewayFeeUnit ?? 'NONE',
                                        discountAmount: myCart.discountAmount ?? 0,
                                        couponCode: myCart.discountModel?.couponCode ?? '',
                                        listOrderPhotoObject:
                                            myCart.listPhoto?.map((item: PhotoCart) => ({
                                                photoPriceCode: item.photoPriceCode,
                                                photoPrice: item.photoPrice,
                                                photoType: item.type,
                                                uid: item.uid,
                                                imageType: item.imageType
                                            })) ?? [],
                                        searchImageFileName: fileName || '',
                                        registerEmail,
                                        providerName: userDetail?.providerName || 'NONE',
                                    };

                                    const formData = new FormData();

                                    if (fileMyFace && fileName) {
                                        formData.append(fileName, fileMyFace);
                                    }


                                    formData.append('data', JSON.stringify(orderModel));

                                    // console.log("🚀 ~ onOk: ~ orderModel:", orderModel);

                                    const dataResponse: PropsCheckServiceResponse = await saveOrderPhoto(formData).unwrap();

                                    if (checkServiceResponse(dataResponse)) {
                                        enqueueSnackbarSuccessComponent();
                                        dispatch(closeDialogMessage());
                                        dispatch(setLoadingState(false));
                                        localStorage.removeItem('FFD_');
                                        localStorage.removeItem('FFDN_');
                                        if (dataResponse?.data?.status === 'PAID') {
                                            router.push(`/download-photo/${dataResponse?.data?.orderPhotoNumber}`);
                                        } else {
                                            navigateToStep(dataResponse.data);
                                        }
                                    } else {
                                        enqueueSnackbarErrorComponent();
                                        dispatch(setLoadingState(false));
                                    }
                                } catch (error) {
                                    console.error('Error creating orderModel:', error);
                                    enqueueSnackbarErrorComponent(
                                        currentLang.value === 'th'
                                            ? 'เกิดข้อผิดพลาดระหว่างสร้างคำสั่งซื้อ'
                                            : 'Error creating order'
                                    );
                                }
                            },
                        })
                    );
                } else {
                    const errorMessage =
                        currentLang.value === 'th' ? 'โปรดตรวจสอบและยืนยันอีเมลก่อนชำระเงิน' : 'Please confirm your email before payment';
                    // enqueueSnackbar(errorMessage, {
                    //     variant: 'warning',
                    // });
                    dispatch(
                        setDialogMessage({
                            title: '',
                            message: errorMessage,
                            open: true,
                            showSave: false,
                            showCancel: true,
                            labelCancel: t('ok'),
                            type: 'alert',
                        }));
                }
            } else {
                console.log("eventCode :", eventDetail?.eventCode);
                console.log("eventUrl :", eventDetail?.eventUrl);
                console.log("myCart :", myCart);
                console.log("paymentMethod :", myCart.paymentModel?.paymentMethod);
                console.log("paymentGatewayFeeUnit :", myCart.paymentModel?.paymentGatewayFeeUnit);

                const errorMessage =
                    currentLang.value === 'th' ? 'ข้อมูลไม่ครบถ้วน' : 'Missing required data';
                enqueueSnackbarErrorComponent(errorMessage);
            }

        } catch (error) {
            console.error(error);
            if (error?.message) {
                enqueueSnackbarErrorComponent(error.message);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventDetail, myCart, dispatch, enqueueSnackbarErrorComponent, currentLang, registerEmail, validateEmail]);

    const onDelete = useCallback((photoItem: PhotoCart) => {
        if (myCart.listPhoto?.length === 1) {
            dispatch(
                setDialogMessage({
                    title: '',
                    message: t('alertListPhotoLengthMin'),
                    open: true,
                    showSave: true,
                    showCancel: true,
                    labelOk: t('addImageToCart'),
                    labelCancel: t('cancelBtn'),
                    type: 'alert',
                    onOk: async () => {
                        dispatch(closeDialogMessage());
                        backToSelectPhoto();
                    },
                    onCancelInner: async () => {
                        dispatch(closeDialogMessage());
                        router.push('/');
                    }
                })
            )
        }
        dispatch(deletePhotoCart(photoItem));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, myCart])

    const backToSelectPhoto = () => {
        dispatch(setPaymentModel(undefined));

        localStorage.removeItem(`${STORAGE_KEYS.PACKAGE_PHOTO}-${eventDetail?.eventCode}`);
        router.push(`/event/${eventDetail?.eventUrl}?isAgain=1`);
    }

    const onApplyDiscount = useCallback((discount: DiscountCodeModel) => {
        if (discount.discountMode === 'FREE_PHOTO' || discount.discountMode === 'DISCOUNT') {
            dispatch(setUseDiscount(discount));
        } else {
            enqueueSnackbarErrorComponent(currentLang.value === 'th' ? '"รูปแบบส่วนลดไม่ถูกต้อง"' : 'Invalid code');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
            router.push(`/order/${data?.orderPhotoNumber}`);
        } else if (data?.paymentMethod === PAYMENT_GATEWAY_TYPE.DIR) {
            // direct
            router.push(`/order/${data?.orderPhotoNumber}`);
        } else if (data?.paymentMethod === PAYMENT_GATEWAY_TYPE.KC) {
            // direct
            router.push(`/order/${data?.orderPhotoNumber}`);
        }
        if (data?.paymentMethod) {
            localStorage.removeItem('photoCart');
            localStorage.removeItem('eventDetail');
            localStorage.removeItem(`${STORAGE_KEYS.PACKAGE_PHOTO}-${eventDetail?.eventCode}`);
            dispatch(clearPhotoCart());
            dispatch(setResultSearchMyFace(undefined));
        }
    }

    const listPrice = useMemo(() => eventDetail?.listPhotoPrice.filter(
        (x) =>
            x.priceType !== PRICE_TYPE.ALL &&
            x.priceType !== PRICE_TYPE.ALL_VIDEO &&
            x.priceType !== PRICE_TYPE.ALL_VIDEO_AND_PHOTO &&
            x.priceType !== PRICE_TYPE.LIMIT_LENGTH_PHOTO
    ), [eventDetail?.listPhotoPrice]);

    const validPhotoPriceType = () => {

        const listPhotoInCart = photoCart?.listPhoto ?? [];
            // const listPhotoInCart = mockupPhotoOrder || [];

        if (!listPhotoInCart?.length) return;
    

        const cartCodes = new Set(
            listPhotoInCart.map(x => x.photoPriceCode)
        );

        const normalCodes = new Set(
            listPrice?.map(x => x.photoPriceCode)
        );

        const limitPrices =
            eventDetail?.listPhotoPrice?.filter(
                x => x.priceType === PRICE_TYPE.LIMIT_LENGTH_PHOTO
            ) ?? [];

        const limitCodes =
            new Set(limitPrices.map(x => x.photoPriceCode));

        // const listNormalPrice = listPrice?.map((x) => x.photoPriceCode) || [];
        // const listLimitPhoto = eventDetail?.listPhotoPrice?.filter((x) => x.priceType === PRICE_TYPE.LIMIT_LENGTH_PHOTO)?.map((x) => x.photoPriceCode) || [];
        // const hasPriceTypePackage = listPhotoInCart?.some((item) => listLimitPhoto.includes(item.photoPriceCode));
        // const hasPriceTypeNormal = listPhotoInCart?.some((item) => listNormalPrice.includes(item.photoPriceCode));

        const hasPriceTypePackage =
            listPhotoInCart.some(x =>
                limitCodes.has(x.photoPriceCode)
            );

        const hasPriceTypeNormal =
            listPhotoInCart.some(x =>
                normalCodes.has(x.photoPriceCode)
            );

        const matchedPhotoPrice =
            limitPrices.filter(x =>
                cartCodes.has(x.photoPriceCode)
            );

        const totalOrder = listPhotoInCart?.length || 0;

        // const matchedPhotoPrice = eventDetail?.listPhotoPrice?.filter(
        //     (price) =>
        //         price.priceType === PRICE_TYPE.LIMIT_LENGTH_PHOTO &&
        //         listPhotoInCart?.some(
        //             (item) => item.photoPriceCode === price.photoPriceCode
        //         )
        // );

        if (hasPriceTypePackage && hasPriceTypeNormal) {

            if (matchedPhotoPrice?.length === 1) {
                const matched = matchedPhotoPrice[0];

                if (totalOrder <= matched.limitPack) {
                    const updatedCart = listPhotoInCart.map((x) => ({
                        ...x,
                        photoTypeDescTh: matched?.photoPriceDescTh || '',
                        photoTypeDescEn: matched?.photoPriceDescEn || '',
                        type: matched?.priceType || '',
                        photoPrice: 0,
                        photoPriceCode: matched?.photoPriceCode || '',
                    }));

                    dispatch(setUsePackageLimitPhotoToCart({
                        listPhoto: updatedCart,
                        pricetModel: matched
                    }));
                } else {
                    // window.location.reload();
                    router.replace(`/event/${eventDetail?.eventUrl}`);
                    // console.log("<= matched.limitPack");
                }
            } else {
                // window.location.reload();
                router.replace(`/event/${eventDetail?.eventUrl}`);
                //   console.log("matchedPhotoPrice" , matchedPhotoPrice);
            }
        };
    };

    const loadDataPackageLimit = () => {
        dispatch(setLoadingState(true));
        const updatedCart = photoCart.listPhoto.map((x) => ({
            ...x,
            photoTypeDescTh: packageLimit?.photoPriceDescTh || '',
            photoTypeDescEn: packageLimit?.photoPriceDescEn || '',
            type: packageLimit?.priceType || '',
            photoPrice: 0,
            photoPriceCode: packageLimit?.photoPriceCode || '',
        }));

        dispatch(setUsePackageLimitPhotoToCart({
            listPhoto: updatedCart,
            pricetModel: packageLimit
        }));

        setTimeout(() => {
            dispatch(setLoadingState(false));
        }, 500);
    }

    useEffect(() => {

        const getProfile = async () => {
            const key = STORAGE_KEYS.USER_INFO;
            const tokenUser = getStorage(key);
            if (tokenUser) {
                const decoded = jwtDecode(tokenUser);
                if (decoded?.userDetail?.email) {
                    setRegisterEmail(decoded.userDetail.email);
                    setValidateEmail(true);
                    setDisabledEmail(true);
                }
            } else {
                setRegisterEmail('');
            }
        }

        getProfile();
        validPhotoPriceType();

        if (packageLimit) {
            loadDataPackageLimit();
        }

        // console.log("🚀 ~ CheckoutView ~ photoCart?.listPhoto:", photoCart?.listPhoto)


        if (photoCart?.listPhoto?.length === 0) {
            backToSelectPhoto();
        }


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <Container
            maxWidth="lg"
            sx={{
                my: { xs: 3, md: 3 },
            }}
        >
            <Typography variant="h4" mb={2} sx={{ color: 'text.main' }}>
                {t('registerForm.payment.paymentTitle')}
            </Typography>
            <Grid container spacing={3} justifyContent='center'>
                {
                    lgUp ? (
                        <Grid item xs={12} md={8} >
                            {
                                myCart.netAmount > 0 && listPaymentGateway?.length > 0 && (
                                    <Card sx={{ pb: '12px', mb: 3 }}>
                                        <CardHeader
                                            sx={{ mb: '10px' }}
                                            title={`${t('registerForm.payment.title')}`}
                                        />
                                        <Box sx={{ p: 3, pt: 0 }}>
                                            <PaymentMethod />
                                        </Box>
                                        <Box sx={{ p: '10px', pt: 0, color: 'red' }}>{t('registerForm.payment.validatePaymentMedthod')}</Box>
                                    </Card>
                                )
                            }
                            <Card sx={{ mb: 3 }}>
                                <CardHeader
                                    title={
                                        <Typography variant="h6">
                                            {t('registerForm.merchandise.title')}
                                            <Typography component="span" sx={{ color: 'text.secondary' }}>
                                                &nbsp; ({myCart.totalOrder} {t('registerForm.merchandise.item')})
                                            </Typography>
                                        </Typography>
                                    }
                                    action={
                                        <>
                                            {
                                                eventDetail && (myCart.orderPackageType !== ORDER_PACKAGE_TYPE.ALL && myCart.orderPackageType !== ORDER_PACKAGE_TYPE.LIMIT_LENGTH_PHOTO) && (
                                                    <Box display='flex' justifyContent='center' mt={2} mb={2}>
                                                        <Button
                                                            sx={{ minWidth: 100 }}
                                                            size='medium'
                                                            type="button"
                                                            variant="outlined" onClick={() => backToSelectPhoto()}>
                                                            เลือกรูปอีกครั้ง
                                                        </Button>
                                                    </Box>
                                                )
                                            }
                                        </>
                                    }
                                    sx={{ mb: 3 }}
                                />
                                <CheckoutCartPhotoList
                                    products={myCart.listPhoto}
                                    onDelete={onDelete}
                                />
                                {
                                    eventDetail && (myCart.orderPackageType !== ORDER_PACKAGE_TYPE.ALL && myCart.orderPackageType !== ORDER_PACKAGE_TYPE.LIMIT_LENGTH_PHOTO) && (
                                        <Box display='flex' justifyContent='center' mt={2} mb={2}>
                                            <Button
                                                sx={{ minWidth: 100 }}
                                                size='medium'
                                                type="button"
                                                variant="outlined" onClick={() => backToSelectPhoto()}>
                                                เลือกรูปอีกครั้ง
                                            </Button>
                                        </Box>
                                    )
                                }
                            </Card>
                        </Grid>
                    ) : (
                        <Grid item xs={12} md={8} >
                            <Card sx={{ mb: 3 }}>
                                <CardHeader
                                    title={
                                        <Typography variant="h6">
                                            {t('registerForm.merchandise.title')}
                                            <Typography component="span" sx={{ color: 'text.secondary' }}>
                                                &nbsp; ({myCart.totalOrder} {t('registerForm.merchandise.item')})
                                            </Typography>
                                        </Typography>
                                    }
                                    action={
                                        <>
                                            {
                                                eventDetail && myCart.orderPackageType !== ORDER_PACKAGE_TYPE.ALL && (
                                                    <Box display='flex' justifyContent='center' mt={2} mb={2}>
                                                        <Button
                                                            sx={{ minWidth: 100 }}
                                                            size='medium'
                                                            type="button"
                                                            variant="outlined" onClick={() => backToSelectPhoto()}>
                                                            เลือกรูปอีกครั้ง
                                                        </Button>
                                                    </Box>
                                                )
                                            }
                                        </>
                                    }
                                    sx={{ mb: 3 }}
                                />
                                <CheckoutCartPhotoList
                                    products={myCart.listPhoto}
                                    onDelete={onDelete}
                                />
                                {
                                    eventDetail && myCart.orderPackageType !== ORDER_PACKAGE_TYPE.ALL && (
                                        <Box display='flex' justifyContent='center' mt={2} mb={2}>
                                            <Button
                                                sx={{ minWidth: 100 }}
                                                size='medium'
                                                type="button"
                                                variant="outlined" onClick={() => backToSelectPhoto()}>
                                                เลือกรูปอีกครั้ง
                                            </Button>
                                        </Box>
                                    )
                                }
                            </Card>

                            {
                                myCart.netAmount > 0 && listPaymentGateway?.length > 0 && (
                                    <Card sx={{ pb: '12px', mb: 3 }}>
                                        <CardHeader
                                            sx={{ mb: '10px' }}
                                            title={`${t('registerForm.payment.title')}`}
                                        />
                                        <Box sx={{ p: 3, pt: 0 }}>
                                            <PaymentMethod />
                                        </Box>
                                        <Box sx={{ p: '10px', pt: 0, color: 'red' }}>{t('registerForm.payment.validatePaymentMedthod')}</Box>
                                    </Card>
                                )
                            }
                        </Grid>
                    )
                }
                <Grid item xs={12} md={4} sx={{ ...(!lgUp && { paddingTop: '0px !important' }) }}>
                    {
                        (eventDetail?.discountStauts === 'ACTIVE') && (
                            <Card sx={{ mb: 3 }}>
                                <PaymentCouponCode onApplyDiscount={(discount) => onApplyDiscount(discount)} />
                            </Card>
                        )
                    }
                    <Card sx={{ mb: 3 }}>
                        <PaymentSummary
                            setEmailToOrder={setRegisterEmail}
                            setValidateEmail={setValidateEmail}
                            validateEmail={validateEmail}
                            oldEmail={registerEmail}
                            disabledEmail={disabledEmail}
                        />
                        {
                            myCart?.listPhoto?.length > 0 && (
                                <Box sx={{ p: 3, pt: 0 }}>
                                    <LoadingButton
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        disabled={myCart?.netAmount !== 0 && !myCart?.paymentModel?.paymentMethod}
                                        onClick={() => onApplyPaymment()}
                                    >
                                        {
                                            myCart?.netAmount === 0 ? t('registerForm.payment.createFree') : t('registerForm.payment.createPay')
                                        }
                                    </LoadingButton>
                                </Box>
                            )
                        }
                    </Card>
                </Grid>
            </Grid >
        </Container >
    )
}