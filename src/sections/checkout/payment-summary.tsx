import { enqueueSnackbar } from 'notistack';
import { useState, Dispatch, useEffect, SetStateAction } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { Grid, FormLabel, TextField, InputAdornment, FormHelperText } from '@mui/material';

import { getStorage } from 'src/hooks/use-local-storage';

import { STORAGE_KEYS } from 'src/utils/constants';
import { fCurrency } from 'src/utils/format-number';

import { useAppSelector } from 'src/store/hooks';
import { useLocales, useTranslate } from 'src/locales';
import { jwtDecode } from 'src/auth/context/jwt/utils';
import { selectOrder, PhotoCartDetailModel } from 'src/slices/order.slices';

import Iconify from 'src/components/iconify';

import { OrderPhotoModel } from 'src/types/order-photo.type';

// ----------------------------------------------------------------------

type Props = {
  onEdit?: VoidFunction;
  pageType?: string;
  orderPhotoModel?: OrderPhotoModel;
  setEmailToOrder?: Dispatch<SetStateAction<string>>;
  setValidateEmail?: Dispatch<SetStateAction<boolean>>;
  validateEmail?: boolean;
  oldEmail?: string;
  disabledEmail?: boolean
};

export default function PaymentSummary({
  onEdit,
  pageType,
  orderPhotoModel,
  setEmailToOrder,
  setValidateEmail,
  validateEmail,
  oldEmail,
  disabledEmail
}: Props) {

  const { t } = useTranslate();
  const { currentLang } = useLocales();
  const key = STORAGE_KEYS.USER_INFO;
  const tokenUser = getStorage(key);
  const decoded = jwtDecode(tokenUser || '');

  const [isDisabled, setIsDisabled] = useState(disabledEmail || false);
  const { photoCart, orderModel } = useAppSelector(selectOrder);
  const [registerEmail, setRegisterEmail] = useState(decoded?.sub);

  const [summaryModelDisplay, setSummaryModelDetailDisplay] = useState<PhotoCartDetailModel>();

  const handleApplyEmail = () => {
    setEmailToOrder?.(registerEmail);
    setValidateEmail?.(true);
    const errorMessage =
      currentLang.value === 'th' ? 'ยืนยันสำเร็จ' : 'Successfully confirmed';
    enqueueSnackbar(errorMessage, {
      variant: 'success',
    });
  }

  const handleKeyEmail = (e: string) => {
    setRegisterEmail(e);
  }



  const handleChange = (value: string) => {
    handleKeyEmail(value);
  };

  const handleValidateClick = () => {
    handleApplyEmail();
    setValidateEmail?.(true);
    setIsDisabled(true); // กดยืนยันแล้วให้ disable ช่อง
  };

  const handleEditClick = () => {
    setIsDisabled(false); // ปลดล็อกให้พิมพ์ได้อีกครั้ง
    setValidateEmail?.(false);
  };

  const isEmailValidated = validateEmail && registerEmail === oldEmail;

  useEffect(() => {
    if (pageType === 'ORDER_DETAIL') {
      const paymentModel = orderModel?.paymentModel ? { ...orderModel.paymentModel, paymentGatewayFee: String(orderModel.paymentModel.paymentGatewayFee) } : undefined;
      setSummaryModelDetailDisplay({
        totalOrder: orderModel?.totalOrder || 0,
        paymentModel,
        totalAmount: orderModel?.totalAmount || 0,
        beforeNetAmount: orderModel?.beforeNetAmount || 0,
        netAmount: orderModel?.netAmount || 0,
        paymentGatewayAmount: orderModel?.paymentGatewayFee || 0,
        discountAmount: orderModel?.discountAmount || 0,
        listPhoto: [],
        realDiscounts: 0,
        discountModel: orderModel?.discountModel,
        orderPackageType: ''
      })
    } else {
      setSummaryModelDetailDisplay(photoCart);
    }

  }, [photoCart, orderModel, pageType, orderPhotoModel]);

  useEffect(() => {
    if (disabledEmail) {
      setIsDisabled(true);
    }
  }, [disabledEmail]);

  return (
    summaryModelDisplay && <>
      <CardHeader
        title={`${t('registerForm.payment.titleSummary')}`}
        action={
          onEdit && (
            <Button size="small" onClick={onEdit} startIcon={<Iconify icon="solar:pen-bold" />}>
              Edit
            </Button>
          )
        }
      />
      <CardContent>
        <Stack spacing={2}>

          {
            summaryModelDisplay?.totalOrder ? (
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {t('registerForm.payment.amount')}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {summaryModelDisplay?.totalOrder} {t('registerForm.payment.runnerUnit')}
                </Typography>
                <Typography variant="subtitle2">{fCurrency(summaryModelDisplay?.totalAmount || 0) || '0.00'}</Typography>
              </Stack>
            ) : null
          }

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'red' }}>
              {`${t('registerForm.payment.discount')} ${(summaryModelDisplay?.discountModel !== undefined && summaryModelDisplay?.discountModel?.couponCode) ? `(${summaryModelDisplay?.discountModel?.couponCode})` : ''} `}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: 'red' }}>{
              !(summaryModelDisplay?.realDiscounts) ? `- ${fCurrency(summaryModelDisplay?.discountAmount || 0)}` : '0.00'}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {t('registerForm.payment.discountDeducted')}
            </Typography>
            <Typography variant="subtitle2">
              {fCurrency(
                (summaryModelDisplay?.beforeNetAmount || 0) < 0 ?
                  0 :
                  (summaryModelDisplay?.beforeNetAmount || 0) || '0.00'
              )}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {t('registerForm.payment.fee')}
            </Typography>
            <Typography variant="subtitle2">
              {summaryModelDisplay?.paymentGatewayAmount && fCurrency(Number(summaryModelDisplay.paymentGatewayAmount) || 0) || "0.00"}
            </Typography>
          </Stack>

          <Divider sx={{ borderStyle: 'dashed' }} />

          {
            pageType !== 'ORDER_DETAIL' ? (
              <Grid container spacing={3} justifyContent="flex-start" mb={2}>
                <Grid item xs={12} md={12}>
                  <FormLabel sx={{ color: 'text.primary', fontWeight: 'bold' }}>
                    {currentLang?.value === 'th' ? 'อีเมล ที่ใช้ในการสั่งซื้อ' : 'Email used for the purchase'} <span style={{ color: 'red' }}>*</span>
                  </FormLabel>
                  <TextField
                    fullWidth
                    disabled={isDisabled}
                    placeholder={t('registerForm.payment.email')}
                    value={registerEmail}
                    onChange={(e) => handleChange(e.target.value)}
                    onBlur={() => {
                      if (registerEmail !== oldEmail) {
                        setValidateEmail?.(false);
                      } else {
                        setValidateEmail?.(true);
                      }
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {isDisabled ? (
                            <Button
                              color="primary"
                              onClick={handleEditClick}
                              sx={{ mr: -0.5 }}
                            >
                              {t('registerForm.payment.emailEdit') || 'แก้ไข'}
                            </Button>
                          ) : (
                            <Button
                              color={isEmailValidated ? 'success' : 'primary'}
                              onClick={handleValidateClick}
                              sx={{ mr: -0.5 }}
                            >
                              {t('registerForm.payment.emailValidate')}
                            </Button>
                          )}
                        </InputAdornment>
                      ),
                    }}
                    error={!validateEmail || registerEmail !== oldEmail}
                  />
                  {
                    !validateEmail || registerEmail !== oldEmail ? (
                      <FormHelperText error sx={{ textAlign: 'left' }}>
                        {currentLang.value === 'th' ? 'โปรดตรวจสอบและยืนยันอีเมลก่อนชำระเงิน' : 'Please confirm your email before payment'}
                      </FormHelperText>
                    ) : null
                  }
                </Grid>

              </Grid>
            ) : (
              null
            )
          }

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1">  {t('registerForm.payment.netAmount')}</Typography>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="subtitle1" color='red'>
                {fCurrency(summaryModelDisplay?.netAmount || 0) || '0.00'}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </>
  );
}

