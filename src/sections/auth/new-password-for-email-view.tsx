import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { Alert, Container } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import axios, { endpoints } from 'src/utils/axios';
import { ERROR_MESSAGE, RESPONSE_STATUS, ERROR_MESSAGE_EN } from 'src/utils/constants';

import { useAppDispatch } from 'src/store/hooks';
import { useLocales, useTranslate } from 'src/locales';
import { setUrlRedirct } from 'src/slices/dialog-login.slices';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

// const ENV = import.meta.env.VITE_HOST_NAME;

interface ForgotPasswordCodeModel {
  id: number;
  codeType: string;
  codeValue: string;
  expiryDate: string;
  actionBy: string;
  status: string;
  lastUpdateDtm: string;
  email: string;
}

interface ResetPasswordRequestModel {
  newPassword: string;
  email: string;
  codeType: string;
}

export default function NewPasswordForEmailView() {

  const router = useRouter();

  const { t } = useTranslate();
  const { currentLang } = useLocales();

  const searchParams = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();

  const keyToken = searchParams.get('key');
  const typeToken = searchParams.get('type');

  const password = useBoolean();
  const dispatch = useAppDispatch();
  const confirmPassword = useBoolean();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [payload, setPayload] = useState<ForgotPasswordCodeModel>({
    id: 0,
    codeType: '',
    codeValue: '',
    expiryDate: '',
    actionBy: '',
    status: '',
    lastUpdateDtm: '',
    email: '',
  });

  const VerifySchema = Yup.object().shape({
    code: Yup.string(),
    key: Yup.string(),
    password: Yup.string()
      .min(6, currentLang.value === 'en' ? 'Password must be at least 6 characters.' : 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร')
      .required(currentLang?.value === 'en' ? ERROR_MESSAGE_EN.REQUIRED : ERROR_MESSAGE.REQUIRED),
    confirmPassword: Yup.string()
      .required(currentLang?.value === 'en' ? ERROR_MESSAGE_EN.REQUIRED : ERROR_MESSAGE.REQUIRED)
      .oneOf([Yup.ref('password')], currentLang?.value === 'en' ? 'Passwords must match' : 'รหัสผ่านไม่ตรงกัน'),
  });

  const defaultValues = {
    code: '',
    key: keyToken || '',
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(VerifySchema),
    defaultValues,
  });

  const {
    handleSubmit,
  } = methods;

  const onSubmit = handleSubmit(async (value: any) => {

    try {

      setLoading(true);

      const formValue: ResetPasswordRequestModel = {
        codeType: payload.codeType,
        email: payload.actionBy,
        newPassword: value.password
      };

      const urlChangePassword = endpoints.auth.resetForgotPassword;
      const resChangePassword: any = await axios.post(urlChangePassword, formValue);

      const { status } = resChangePassword.data;

      if (status.description === RESPONSE_STATUS.SUCCESS) {
        setTimeout(() => {
          enqueueSnackbar(currentLang?.value === 'en' ? 'Change password success' : "เปลี่ยนรหัสผ่านสําเร็จ", {
            variant: 'success',
          });
          router.push('/');
          setLoading(false);
        }, 1500);
      } else {
        setErrorMsg(currentLang?.value === 'en' ? 'System error' : "ระบบเกิดการผิดพลาด");
        enqueueSnackbar(currentLang?.value === 'en' ? 'System error' : "ระบบเกิดการผิดพลาด", {
          variant: 'error',
        });
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      enqueueSnackbar(currentLang?.value === 'en' ? 'System error' : "ระบบเกิดการผิดพลาด", {
        variant: 'error',
      });
    }
  });

  const getValueByKey = async () => {
    if (typeToken && keyToken) {
      const getValueUrl = endpoints.auth.forgotPasswordVerif;
      const body: ForgotPasswordCodeModel = {
        id: 0,
        codeType: typeToken || '',
        codeValue: keyToken || '',
        expiryDate: '',
        actionBy: '',
        status: '',
        lastUpdateDtm: '',
        email: ''
      };
      const resGetValue: any = await axios.post(getValueUrl, body);
      if (resGetValue && resGetValue?.data && resGetValue.data.data) {
        const { status } = resGetValue.data.data;
        if (!status) {
          enqueueSnackbar(currentLang?.value === 'en' ? 'System error' : "ระบบเกิดการผิดพลาด", {
            variant: 'error',
          });
          router.push('/');
        } else {
          dispatch(setUrlRedirct('/'));
          setPayload(resGetValue.data.data);
        }
      } else {
        enqueueSnackbar(currentLang?.value === 'en' ? 'System error' : "ระบบเกิดการผิดพลาด", {
          variant: 'error',
        });
        router.push('/');
      }
    } else {
      router.push('/');
    }
  }

  useEffect(() => {
    getValueByKey();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderForm = (
    <Stack spacing={3} alignItems="center">

      <RHFTextField
        name="password"
        label={t('password')}
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <RHFTextField
        name="confirmPassword"
        label={currentLang?.value === 'en' ? 'Confirm password' : "รหัสผ่านยืนยัน"}
        type={confirmPassword.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={confirmPassword.onToggle} edge="end">
                <Iconify icon={confirmPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={loading}
      >
        {currentLang?.value === 'en' ? 'Change password' : "เปลี่ยนรหัสผ่าน"}
      </LoadingButton>

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
    <Stack spacing={1} sx={{ mt: 3, mb: 5 }}>
      <Typography variant="h3"> {currentLang?.value === 'en' ? 'Change password' : "เปลี่ยนรหัสผ่าน"}</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        <br />
        {currentLang?.value === 'en' ? "Please enter the code in the field below to change your password." : "กรุณากรอกรหัสในช่องด้านล่างเพื่อเปลี่ยนรหัสผ่าน"}
      </Typography>
    </Stack>
  );

  return (
    <Container
      maxWidth='xs'
      sx={{
        mt: 10,
        mb: 15,
      }}
    >
      {
        typeToken && keyToken && (
          <>
            {renderHead}

            {!!errorMsg && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {errorMsg}
              </Alert>
            )}

            <FormProvider methods={methods} onSubmit={onSubmit}>
              {renderForm}
            </FormProvider>
          </>
        )
      }
    </Container>
  );
}
