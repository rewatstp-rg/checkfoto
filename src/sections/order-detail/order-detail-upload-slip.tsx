import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useMemo, useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Grid, Paper, Stack, Avatar, Typography, FormHelperText } from "@mui/material";

import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import ISOToDate from 'src/utils/ISOToDate';
import { fCurrency } from 'src/utils/format-number';
import { compressImage } from 'src/utils/compress-image';
import { dateEnFormat, dateThFormat } from 'src/utils/format-time';
import { ERROR_MESSAGE, ERROR_MESSAGE_EN } from 'src/utils/constants';
import { checkServiceResponse, PropsCheckServiceResponse } from 'src/utils/check-service-response';
import { enqueueSnackbarErrorComponent, enqueueSnackbarSuccessComponent } from 'src/utils/enqueueSnackbarComponent';

import { selectOrder } from 'src/slices/order.slices';
import { useLocales, useTranslate } from 'src/locales';
import { useUploadPaymentSlipMutation } from 'src/api/order.api';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { setLoadingState, setDialogMessage, closeDialogMessage } from 'src/slices/error-message.slices';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { RHFUploadBox } from 'src/components/hook-form';
import FormProvider from "src/components/hook-form/form-provider";
import { RHFMobileDate2TimePicker } from 'src/components/hook-form/rhf-date-picker-mobile';

import { OrderPhotoModel } from 'src/types/order-photo.type';

import RegisterOrderComplete from './register-order-complete';

type FileUpload = File & { key?: string };

const ENV_URL = `${import.meta.env.VITE_HOST_API}`;

export function OrderDetailUploadSlip() {

    const router = useRouter();
    const { t } = useTranslate();
    const isUploadSlip = useBoolean();
    const completed = useBoolean(false);
    const { currentLang } = useLocales();

    const dispatch = useAppDispatch();

    const { orderModel } = useAppSelector(selectOrder);

    const [uploadSlip] = useUploadPaymentSlipMutation();

    const paymentModel = useMemo(() => (orderModel?.paymentModel), [orderModel]);

    const uploadSlipSchema = Yup.object().shape({
        id: Yup.number(),
        directTransNetAmount: Yup.number(),
        remark: Yup.string(),
        directTransDate: Yup.date()
            .required(currentLang.value === 'en' ? ERROR_MESSAGE_EN.REQUIRED : ERROR_MESSAGE.REQUIRED)
            .default(null)
            .nullable()
            .transform((curr, orig) => orig === undefined ? null : curr)
            .typeError(currentLang.value === 'en' ? ERROR_MESSAGE_EN.PATTERN_DATE : ERROR_MESSAGE.PATTERN_DATE)
            .test('Invalid Date', currentLang.value === 'en' ? ERROR_MESSAGE_EN.PATTERN_DATE : ERROR_MESSAGE.PATTERN_DATE, (value: any) => value !== 'Invalid Date')
            .test('Invalid Date', currentLang.value === 'en' ? ERROR_MESSAGE_EN.REQUIRED : ERROR_MESSAGE.REQUIRED, (value: any) => {
                if (!value) {
                    return value === '';
                }
                return value !== 'Invalid Date';
            }),
        orderNumber: Yup.string(),
        fileUpload: Yup.mixed<any>().transform((v) => (!v ? undefined : v)).required(currentLang.value === 'en' ? ERROR_MESSAGE_EN.REQUIRED : ERROR_MESSAGE.REQUIRED)
    });

    const defaultValues = useMemo(
        () => ({
            id: 0,
            directTransNetAmount: 0,
            remark: '',
            directTransDate: null,
            orderNumber: '',
            fileUpload: undefined
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const methods = useForm({
        resolver: yupResolver(uploadSlipSchema),
        defaultValues
    });

    const {
        // reset,
        handleSubmit,
        watch,
        setValue,
        formState: { isSubmitting }
    } = methods;

    const values = watch();

    const onSubmit = handleSubmit(async (dataForm) => {
        dispatch(setDialogMessage({
            title: '',
            message: t('registerForm.payment.confirmUploadSlip'),
            open: true,
            showSave: true,
            showCancel: true,
            labelOk: t('confirmBtn'),
            labelCancel: t('cancelBtn'),
            type: 'alert',
            onOk: async () => {

                const formData = new FormData();

                dispatch(setLoadingState(true));

                let dataResponse: PropsCheckServiceResponse = {} as PropsCheckServiceResponse;
                const orderModelPayload: OrderPhotoModel = {
                    eventCode: orderModel?.eventCode,
                    eventUrl: orderModel?.eventUrl,
                    orderPhotoNumber: orderModel?.orderPhotoNumber,
                    imagePaymentSlipFileName: dataForm.fileUpload?.name,
                    directTransDate: ISOToDate(new Date(dataForm?.directTransDate || ''), 'dateTimeRequest'),
                    totalOrder: 0,
                    totalAmount: null,
                    paymentGatewayFee: null,
                    paymentGatewayFeeUnit: '',
                    paymentMethod: '',
                    discountAmount: null,
                    netAmount: null
                }

                console.log("🚀 ~ file: order-detail-upload-slip.tsx:74 ~ onSubmit ~ orderModel:", orderModel)

                if (dataForm?.fileUpload) {
                    formData.append(dataForm.fileUpload.name, dataForm.fileUpload);
                }

                formData.append('data', JSON.stringify(orderModelPayload));

                dataResponse = await uploadSlip(formData).unwrap();

                if (checkServiceResponse(dataResponse)) {
                    setTimeout(() => {
                        dispatch(closeDialogMessage());
                        dispatch(setLoadingState(false));
                        enqueueSnackbarSuccessComponent();
                        completed.onTrue();
                    }, 500);
                } else {
                    dispatch(setLoadingState(false));
                    enqueueSnackbarErrorComponent();
                }

            },
        }));

    })

    const handleDropMultiFile = useCallback(async (acceptedFiles: File[]) => {

        if (acceptedFiles && acceptedFiles?.length > 0) {

            const compressedFile = await compressImage(acceptedFiles[0], {
                quality: 0.3,
                type: 'image/jpeg',
            });

            const newFiles: FileUpload = Object.assign(compressedFile, {
                preview: URL.createObjectURL(compressedFile),
            });

            isUploadSlip.onTrue();
            setValue('fileUpload', newFiles, {
                shouldValidate: true,
            });
        }
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [setValue, values.fileUpload]
    );

    const handleRemoveFile = useCallback(() => {
        isUploadSlip.onFalse();
        setValue('fileUpload', undefined);
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [setValue, values.fileUpload]
    );

    const renderFileImage = (
        <Avatar
            alt='back-image'
            src={`${ENV_URL}/shared-image/bank-image/icon_bank_kbank.png`}
            sx={{ width: 58, height: 58, mt: 2, mb: 2 }}
        />
    )

    const noGoback = () => {
        router.push('/');
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

            {
                completed.value ? (
                    <RegisterOrderComplete
                        imageUrl={orderModel?.imageEventBannerUrl}
                        orderNumber={orderModel?.orderPhotoNumber}
                        open={completed.value}
                        onReset={() => noGoback()}
                        onNextStep={() => { }}
                    />
                ) : (
                    <>
                        <Paper
                            variant="outlined"
                            sx={{
                                p: 2,
                                color: 'text.primary',
                                borderStyle: 'dashed', borderWidth: 1, borderColor: 'grey.300', borderRadius: 1, width: '100%'
                            }}
                        >
                            <Grid container spacing={2} justifyContent="center" >
                                <Grid item xs={12} md={3} justifyContent="center" alignItems="center" display="flex">
                                    {renderFileImage}
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <Stack direction="column" mb={1}>
                                        <Stack spacing={2} alignItems="flex-start" direction="row" sx={{ typography: 'body2' }}>
                                            <Typography variant="subtitle2" sx={{ fontSize: 16 }}>
                                                {currentLang.value === 'th' ? 'ธนาคาร :' : 'Bank :'}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 16 }}>
                                                {currentLang.value === 'th' ? 'กสิกรไทย' : 'KASIKORNBANK PUBLIC. COMPANY LIMITED'}
                                            </Typography>
                                        </Stack>
                                        <Stack spacing={2} alignItems="flex-start" direction="row" sx={{ typography: 'body2' }}>
                                            <Typography variant="subtitle2" sx={{ fontSize: 16 }}>
                                                {currentLang.value === 'th' ? 'ชื่อบัญชี :' : 'Account Name :'}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 16 }}>
                                                {currentLang.value === 'th' ? 'บริษัท เช็กเรซ จำกัด' : 'CHEKRACE COMPANY LIMITED'}
                                            </Typography>
                                        </Stack>
                                        <Stack spacing={2} alignItems="flex-start" direction="row" sx={{ typography: 'body2' }}>
                                            <Typography variant="subtitle2" sx={{ fontSize: 16 }}>
                                                {currentLang.value === 'th' ? 'เลขที่บัญชี :' : 'Account Number :'}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 16 }}>
                                                098-8-16842-4
                                            </Typography>
                                        </Stack>
                                        <Stack spacing={2} alignItems="flex-start" direction="row" sx={{ typography: 'body2' }}>
                                            <Typography variant="subtitle2" sx={{ fontSize: 16 }}>
                                                {currentLang.value === 'th' ? 'จำนวนเงินที่ต้องชำระ :' : 'Amount :'}
                                            </Typography>
                                            <Typography variant="body2" fontWeight="bold" sx={{ color: 'red', fontSize: 16 }}>
                                                {fCurrency(paymentModel?.netAmount || 0)} ฿
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Paper>
                        <Grid container spacing={2} justifyContent="center" >
                            <Grid item xs={12} md={8}>
                                <Stack direction="column" spacing={2} justifyContent='center' alignItems='center'>
                                    <Typography variant="subtitle2" sx={{ fontSize: 14 }}>
                                        {t('registerForm.payment.validateQrTimeOut')}
                                    </Typography>
                                    <Typography variant="subtitle2" sx={{ fontSize: 14, color: 'red', mt: -2 }}>
                                        {currentLang.value === 'en' ? dateEnFormat(orderModel?.directPaymentExpiredDate, 'LONG-TIME') : dateThFormat(orderModel?.directPaymentExpiredDate, 'LONG-TIME')}
                                    </Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} justifyContent="center" >
                            <Grid item xs={12} md={12}>
                                <FormProvider methods={methods} onSubmit={onSubmit}>
                                    <Box
                                        rowGap={3}
                                        columnGap={3}
                                        marginBottom={3}
                                        display="grid"
                                        gridTemplateColumns={{
                                            xs: 'repeat(1, 1fr)',
                                            sm: 'repeat(1, 1fr)',
                                            lg: 'repeat(1, 1fr)',
                                        }}
                                    >
                                        <Stack direction="row" spacing={2} justifyContent='center'>
                                            {(values?.fileUpload?.preview || values?.fileUpload) && (<Image paddingTop={0} alt='รูป' src={values?.fileUpload?.preview} sx={{ borderRadius: 2 }} width={310} maxWidth={310} />)}
                                        </Stack>
                                        <Stack direction="row" spacing={2}>
                                            <RHFUploadBox
                                                accept={{ 'image/*': [] }}
                                                thumbnail
                                                name="fileUpload"
                                                maxSize={3145728}
                                                onRemove={handleRemoveFile}
                                                onDrop={handleDropMultiFile}
                                                placeholder={
                                                    <Stack spacing={0.5} alignItems="center">
                                                        <Iconify icon="line-md:upload-loop" width={40} />
                                                        <Typography variant="body2">{t('registerForm.payment.validateSlipUploadClike')}</Typography>
                                                    </Stack>
                                                }
                                                sx={{ mb: 3, py: 2.5, flexGrow: 1, height: 'auto' }}
                                            />
                                            {isSubmitting && !isUploadSlip.value && (
                                                <FormHelperText
                                                    error sx={{ px: 2, textAlign: 'left' }}>
                                                    {t('registerForm.payment.validateSlipUpload')}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                        <RHFMobileDate2TimePicker
                                            required
                                            name="directTransDate"
                                            label={currentLang.value === 'th' ? 'วันที่และเวลาที่ชำระเงิน' : 'Date and time of payment'}
                                        />
                                    </Box>
                                    <LoadingButton
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        disabled={isSubmitting}
                                    >
                                        {t('registerForm.payment.paymentProof')}
                                    </LoadingButton>
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </>
                )
            }

        </Box>
    );
}   