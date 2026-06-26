import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { Alert, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { RouterLink } from 'src/routes/components';

import axios, { endpoints } from 'src/utils/axios';
import {
  AUTH_TYPE,
  ERROR_MESSAGE,
  RESPONSE_STATUS,
  ERROR_MESSAGE_EN,
} from 'src/utils/constants';

import { useLocales } from 'src/locales';
import { PasswordIcon } from 'src/assets/icons';
import { useAppDispatch } from 'src/store/hooks';
import { closeDialogLogin } from 'src/slices/dialog-login.slices';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';


// ----------------------------------------------------------------------

export default function ForgotPasswordView() {

  const dispatch = useAppDispatch();
  const { currentLang } = useLocales();

  const urlForgotPassword = endpoints.auth.forgotPassword;
  const { enqueueSnackbar } = useSnackbar();

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().required(currentLang?.value === 'en' ? ERROR_MESSAGE_EN.REQUIRED : ERROR_MESSAGE.REQUIRED).email(currentLang?.value === 'en' ? "The email format is incorrect." : "รูปแบบของอีเมลไม่ถูกต้อง"),
  });

  const defaultValues = {
    email: '',
  };

  const methods = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {

      setLoading(true);

      const userModel = {
        email: data.email,
      }

      const resForgotPassword: any = await axios.post(urlForgotPassword, userModel);

      // console.log("🚀 ~ file: forgot-password-view.tsx:66 ~ onSubmit ~ resForgotPassword:", resForgotPassword)

      if (resForgotPassword?.data?.data?.status === RESPONSE_STATUS.SUCCESS) {
        setTimeout(() => {
          enqueueSnackbar(currentLang?.value === 'en' ? "Please check your email and confirm." : "โปรดตรวจสอบอีเมลของท่านและทำการยืนยัน", {
            variant: 'success',
          });

          setSuccessMsg(currentLang?.value === 'en' ? "Please check your email and confirm." : "โปรดตรวจสอบอีเมลของท่านและทำการยืนยัน");
          // router.push(paths.auth.jwt.login);
          setLoading(false);
        }, 1500);
      } else {
        if (resForgotPassword?.data?.data?.status === AUTH_TYPE.VALIDATION_FAILED) {
          setErrorMsg(currentLang?.value === 'en' ? "Your email address was not found in the system." : "อีเมลของท่านไม่พบในระบบ");
          setSuccessMsg("");
        } else {
          setErrorMsg(currentLang?.value === 'en' ? "Your email address was not found in the system." : "อีเมลของท่านไม่พบในระบบ");
          setSuccessMsg("");
        }
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  });

  const renderForm = (
    <Stack spacing={3} alignItems="center">

      {
        successMsg ? <Alert severity="success">{successMsg}</Alert> : (
          <>
            <RHFTextField
              name="email"
              label={currentLang?.value === 'en' ? "Email." : "อีเมล"}
              placeholder="example@gmail.com"
              InputLabelProps={{ shrink: true }} />

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting || loading}
            >
              {currentLang?.value === 'en' ? "Send" : "ส่ง"}
            </LoadingButton>
          </>
        )
      }

      <Link
        component={RouterLink}
        href='/'
        color="inherit"
        variant="subtitle2"
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:arrow-ios-back-fill" width={16} />

        {currentLang?.value === 'en' ? "Go to Home." : "กลับสู่หน้าหลัก"}
      </Link>
    </Stack>
  );

  const renderHead = (
    <>
      <PasswordIcon sx={{ height: 96 }} />

      <Stack spacing={1} sx={{ mt: 3, mb: 5 }}>
        <Typography variant="h3">{currentLang?.value === 'en' ? "Forgot your password?" : "ลืมรหัสผ่านหรือไม่ ?"}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {currentLang?.value === 'en' ? "Please enter the email address associated with your account and we will email you the link. to reset your password" : "โปรดป้อนที่อยู่อีเมลที่เชื่อมโยงกับบัญชีของคุณแล้วเราจะส่งลิงก์ให้คุณทางอีเมล เพื่อรีเซ็ตรหัสผ่านของคุณ"}
        </Typography>
      </Stack>
    </>
  );

  useEffect(() => {
    dispatch(closeDialogLogin());
  }, [dispatch]);

  return (
    <Container
      maxWidth='xs'
      sx={{
        mt: 10,
        mb: 15,
      }}
    >
      {renderHead}

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <FormProvider methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </FormProvider>
    </Container>
  );
}
