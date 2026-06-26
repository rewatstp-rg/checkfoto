import * as Yup from 'yup';
import liff from '@line/liff';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Box, Link, Stack, Divider } from '@mui/material';

import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';
import { setStorage } from 'src/hooks/use-local-storage';

import axios, { endpoints } from 'src/utils/axios';
import { STORAGE_KEYS, AUTH_INVALID_MESSAGE, AUTH_INVALID_MESSAGE_EN } from 'src/utils/constants';

import { selectOrder } from 'src/slices/order.slices';
import { selectEvent } from 'src/slices/event.slices';
import { useLocales, useTranslate } from 'src/locales';
import { setSession } from 'src/auth/context/jwt/utils';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { setLoadingState } from 'src/slices/error-message.slices';
import { setUserAuthen, setUserImageUrl } from 'src/slices/authen.slices';
import { setUrlRedirct, closeDialogLogin, selectDialogLogin } from 'src/slices/dialog-login.slices';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import LineLoginComponent from 'src/components/line-login/line-login';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import GoogleLoginComponent from 'src/components/google-login/google-login';
import FacebookLoginComponent from 'src/components/facebook-login/facebook-login';

import { AuthenUserModel } from 'src/types/authen.model';

// ----------------------------------------------------------------------
const ENV_URL = `${import.meta.env.VITE_HOST_API}`;
const LINE_LIFF_ID = import.meta.env.VITE_LINE_LIFF_ID;
const LINE_CLIENT_REDIRECT_URL = import.meta.env.VITE_LINE_CLIENT_REDIRECT_URL;

const LoginContent = () => {

    const hostName = window.location.pathname;

    const { t } = useTranslate();
    const router = useRouter();
    const password = useBoolean();
    const dispatch = useAppDispatch();
    const { currentLang } = useLocales();
    const { enqueueSnackbar } = useSnackbar();

    const { urlRedirct } = useAppSelector(selectDialogLogin);

    const { photoCart } = useAppSelector(selectOrder);
    const { eventDetail } = useAppSelector(selectEvent);

    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    // const [isLine, setIsLine] = useState(false);

    const authenSchema = Yup.object().shape({
        username: Yup
            .string()
            .trim()
            .required(t('messageError.requiredUsername'))
            .email(t('messageError.validEmail')),
        password: Yup
            .string()
            .trim()
            .required(t('messageError.requiredPassword'))
            .min(6, t('messageError.validPassword')),
        termOfUseStatus: Yup.boolean()
    });

    const defaultValues = useMemo(
        () => ({
            username: '',
            password: '',
            termOfUseStatus: false,
        }),
        []
    );

    const methods = useForm({
        resolver: yupResolver(authenSchema),
        defaultValues,
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (dataForm) => {

        if (hostName === '/change-password') {
            dispatch(setUrlRedirct(''));
        } else {
            dispatch(setUrlRedirct(hostName));
        }

        try {

            setLoading(true);
            dispatch(setLoadingState(true));
            setErrorMsg('');

            const authenModel: AuthenUserModel = {
                username: dataForm.username,
                password: dataForm.password,
                userId: 0,
                firstname: '',
                lastname: '',
                email: '',
                accessToken: '',
                imageProfile: ''
            };

            const url = endpoints.auth.root + endpoints.auth.authenticate;

            const res = await axios.post(url, authenModel);

            const { data, status } = res.data;

            if (status.description === "SUCCESS" && data.accessToken) {
                dispatch(closeDialogLogin());
                // const key = STORAGE_KEYS.USER_INFO;

                setSession(data?.accessToken);
                // setStorage(key, data?.accessToken);
                dispatch(setUserAuthen(data));

                //   console.log("🚀 ~ useEffect ~ jwtDecode(userAuthen.accessToken):", jwtDecode(userAuthen.accessToken).userDetail.imageProfile);

                axios.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;

                setTimeout(async () => {
                    enqueueSnackbar(t('welcomeLogin'), {
                        variant: 'success',
                    });
                    reset();
                    setLoading(false);
                    dispatch(setLoadingState(false));

                    if (data?.imageProfile) {
                        localStorage.setItem('userImage', data.imageProfile);
                        dispatch(setUserImageUrl(data.imageProfile));
                    }

                    dispatch(setUserAuthen(data));

                    if (hostName === '/change-password') {

                        router.push('');
                    } else {
                        router.push(urlRedirct || hostName);
                    }

                    // onLoginSuccess(hostName);
                }, 1000);

            } else {
                setTimeout(() => {
                    setLoading(false);
                    dispatch(setLoadingState(false));
                    if (currentLang?.value === 'en') {
                        setErrorMsg(AUTH_INVALID_MESSAGE_EN[status.description]);
                    } else {
                        setErrorMsg(AUTH_INVALID_MESSAGE[status.description]);
                    }
                }, 1000);
            }

        } catch (error) {
            setLoading(false);
            dispatch(setLoadingState(false));
            if (currentLang?.value === 'en') {
                setErrorMsg(AUTH_INVALID_MESSAGE_EN.UNAUTHORIZED);
            } else {
                setErrorMsg(AUTH_INVALID_MESSAGE.UNAUTHORIZED);
            }
            console.error(error);
        }
    });

    // const renderTermOfUseStatus = () => (
    //     <Stack spacing={2}>
    //         <Box component='span'>
    //             <span>{t('termOfUseStatus')}</span>

    //             <Link variant="subtitle2">
    //                 {t('termOfUseDesc')}
    //             </Link>
    //         </Box>
    //     </Stack>
    // )

    const onLoginLine = async () => {

        Object.keys(localStorage).forEach((keyItem) => {
            if (!keyItem.includes("accepted-policy-") && keyItem !== "version" && keyItem !== "settings" && keyItem !== "i18nextLng" && keyItem !== "FFDN_" && keyItem !== "FFD_") {
                delete localStorage[keyItem];
            }
        });

        localStorage.setItem('photoCart', JSON.stringify(photoCart));
        localStorage.setItem('eventDetail', JSON.stringify(eventDetail));

        setLoading(true);
        // await liff.ready;
        let searchParams: any = '';
        if (urlRedirct) {
            console.log("urlRedirct:", urlRedirct);
            searchParams = new URLSearchParams({
                redirect: urlRedirct,
            }).toString();
        } else {
            console.log("pathname:", window.location.pathname)
            searchParams = new URLSearchParams({
                redirect: window.location.pathname,
            }).toString();
        }

        // redirect=%2Fregister%2Ftest_001
        // redirect=%2Fevent%2Ftest_001
        // console.log("🚀 ~ file: login-content.tsx:202 ~ onLoginLine ~ searchParams:", searchParams);

        setTimeout(async () => {
            setLoading(false);
            // const liffUrl: any = await liff.permanentLink.createUrlBy(window.location.href);
            // window.location.href = liffUrl;
            liff.login({ redirectUri: `${LINE_CLIENT_REDIRECT_URL}line?${searchParams}` });
            // else {
            //     setIsLine(false);
            //     // const liffUrl: any = await liff.permanentLink.createUrlBy(`${LINE_CLIENT_REDIRECT_URL}line?${searchParams}`);
            //     // window.location = liffUrl;
            //     
            // }

        }, 500);
    }

    const componentClicked = useCallback(async () => {

        localStorage.setItem('photoCart', JSON.stringify(photoCart));
        localStorage.setItem('eventDetail', JSON.stringify(eventDetail));

        const redirect_url = encodeURIComponent(urlRedirct || hostName);
        // console.log("🚀 ~ componentClicked ~ urlRedirct:", urlRedirct)
        // console.log("🚀 ~ componentClicked ~ redirect_url:", redirect_url)
        const url = `https://www.facebook.com/v20.0/dialog/oauth?client_id=2625583094248090&scope=email%20public_profile&redirect_uri=${ENV_URL}/facebook&state=${redirect_url}`;
        window.location.href = url;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventDetail])


    const isFacebookApp = () => {
        const ua = navigator.userAgent || navigator.vendor;
        // console.log("🚀 ~ file: login-content.tsx:337 ~ isFacebookApp ~ ua:", ua)
        return (
            ua.indexOf('FBAN') > -1 ||
            ua.indexOf('FBAV') > -1 ||
            ua.indexOf('Instagram') > -1
        );
    };

    const handleGoogleLogin = async (token: string) => {

        dispatch(setLoadingState(true));
        const url = endpoints.auth.root + endpoints.auth.googleValidateToken;
        const res = await axios.post(url, { token }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res?.data) {
            const { data, status } = res.data;
            if (status.description === "SUCCESS" && data.accessToken) {

                const key = STORAGE_KEYS.USER_INFO;

                setSession(data?.accessToken);
                setStorage(key, data?.accessToken);
                dispatch(setUserAuthen(data));

                if (data?.imageProfile) {
                    localStorage.setItem('userImage', data.imageProfile || '');
                    dispatch(setUserImageUrl(data.imageProfile));
                }

                axios.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;

                setTimeout(() => {
                    enqueueSnackbar(t('welcomeLogin'), {
                        variant: 'success',
                    });
                    setLoading(false);
                    dispatch(closeDialogLogin());
                    dispatch(setLoadingState(false));
                    dispatch(setUserAuthen(data));
                    if (urlRedirct) {
                        router.push(urlRedirct);
                    } else {
                        router.push('/');
                    }

                }, 1000);


            } else {
                setLoading(false);
                dispatch(setLoadingState(false));
                setTimeout(() => {
                    if (currentLang?.value === 'en') {
                        enqueueSnackbar(AUTH_INVALID_MESSAGE_EN[status.description], {
                            variant: 'error',
                        });
                    } else {
                        enqueueSnackbar(AUTH_INVALID_MESSAGE[status.description], {
                            variant: 'error',
                        });
                    }
                }, 1000);
            }

        }
    };

    useEffect(() => {
        isFacebookApp();

        const mainFunc = async () => {
            await liff.init({ liffId: LINE_LIFF_ID });
            // const { userAgent } = navigator;
            // if (!liff.isInClient() && userAgent.includes('Line')) {
            //     setIsLine(true);
            // } else {
            //     setIsLine(false);
            // }
        }

        mainFunc();
    }, [])

    return (
        <>

            {!!errorMsg && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {errorMsg}
                </Alert>
            )}

            <FormProvider methods={methods} onSubmit={onSubmit}>
                <Box
                    gap={5}
                    display="grid"
                    gridTemplateColumns={{
                        sm: 'repeat(1, 1fr)',
                    }}
                >
                    <Stack spacing={2}>

                        <FacebookLoginComponent onClick={() => componentClicked()} loading={isSubmitting} />
                        <LineLoginComponent onClick={() => onLoginLine()} loading={isSubmitting} />
                        <GoogleLoginComponent onLoginSuccess={handleGoogleLogin} />

                        <Divider
                            sx={{
                                my: 2.5,
                                typography: 'overline',
                                color: 'text.disabled',
                                '&:before, :after': {
                                    borderTopStyle: 'dashed',
                                },
                            }}
                        >
                            {t('or')}
                        </Divider>
                        <RHFTextField name="username" label={t('email')} size="small" required />
                        <RHFTextField
                            name="password"
                            size="small"
                            label={t('password')}
                            type={password.value ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={password.onToggle} edge="end">
                                            <Iconify
                                                icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                                            />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Link
                            href="/forgot-password"
                            component={RouterLink}
                            variant="body2"
                            color="inherit"
                            underline="always"
                            sx={{ alignSelf: 'end' }}
                        >
                            {t('forgotPassword')}
                        </Link>

                        {/* <RHFCheckbox name="termOfUseStatus" label={renderTermOfUseStatus()} /> */}

                        <LoadingButton
                            fullWidth
                            color="primary"
                            size="medium"
                            type="submit"
                            variant="contained"
                            loading={isSubmitting || loading}
                            sx={{
                                p: 0.8,
                            }}
                        >
                            {t('login')}
                        </LoadingButton>

                    </Stack>

                </Box>
            </FormProvider>
        </>
    )
};

export default LoginContent;