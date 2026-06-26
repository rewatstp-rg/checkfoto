import * as Yup from 'yup';
import liff from '@line/liff';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Stack, Divider } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';

import { useRouter } from 'src/routes/hooks';

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
import { closeDialogLogin, selectDialogLogin } from 'src/slices/dialog-login.slices';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import LineLoginComponent from 'src/components/line-login/line-login';
import GoogleLoginComponent from 'src/components/google-login/google-login';
import FacebookLoginComponent from 'src/components/facebook-login/facebook-login';

import { UserProfileModel } from 'src/types/authen.model';

// ----------------------------------------------------------------------

const ENV_URL = `${import.meta.env.VITE_HOST_API}`;
const LINE_CLIENT_REDIRECT_URL = import.meta.env.VITE_LINE_CLIENT_REDIRECT_URL;
const hostName = window.location.pathname;
const RegisterContent = () => {

    const router = useRouter();
    const { t } = useTranslate();
    const password = useBoolean();
    const dispatch = useAppDispatch();
    const passwordConfirm = useBoolean();
    const { currentLang } = useLocales();
    const { enqueueSnackbar } = useSnackbar();

    const { photoCart } = useAppSelector(selectOrder);
    const { eventDetail } = useAppSelector(selectEvent);

    const { urlRedirct } = useAppSelector(selectDialogLogin);

    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const NewUserSchema = Yup.object().shape({
        username: Yup.string().required(t('messageError.requiredUsername')).email(t('messageError.validEmail')),
        password: Yup.string()
            .required(t('messageError.requiredPassword'))
            .min(6, t('messageError.validPassword')),
        confirmPassword: Yup.string()
            .required('Confirm password is required')
            .oneOf([Yup.ref('password')], t('messageError.matchPassword')),
        termOfUseStatus: Yup.boolean()
    });

    const defaultValues = useMemo(
        () => ({
            username: '',
            password: '',
            confirmPassword: '',
            termOfUseStatus: false,
        }),
        []
    );

    const methods = useForm({
        resolver: yupResolver(NewUserSchema),
        defaultValues,
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (dataForm) => {
        try {

            setLoading(true);
            dispatch(setLoadingState(true));
            setErrorMsg('');

            const authenModel: UserProfileModel = {
                username: dataForm.username,
                password: dataForm.password,
                userId: 0,
                firstName: '',
                lastName: '',
                email: dataForm.username,
                tel: '',
                adminUserId: 0,
                middleName: '',
                newPassword: '',
                oldPassword: '',
                birthDate: '',
                gender: '',
                address: '',
                province: '',
                district: '',
                subDistrict: '',
                zipcode: '',
                imageProfile: '',
                imageProfileUrl: '',
                idpsNumber: '',
                remark: '',
                userProviderId: 0,
                providerName: 'SYSTEM',
                providerId: '',
                roleId: '',
                roleName: '',
                roleType: '',
                invalidUser: false,
                userStatus: '',
                status: 'ACTIVE',
                actionBy: '',
                refreshToken: '',
                photoUrl: '',
                authenType: '',
                policyAccept: false,
                listProvider: [],
                synProvider: {
                    userProviderId: 0,
                    userId: 0,
                    providerName: '',
                    providerId: '',
                    email: '',
                    password: '',
                    imageProfile: '',
                    systemProviderKey: '',
                    status: '',
                    createDtm: undefined,
                    createBy: '',
                    lastUpdateDtm: undefined,
                    lastUpdateBy: '',
                    actionBy: ''
                }
            };

            const url = endpoints.auth.root + endpoints.auth.register;

            const res = await axios.post(url, authenModel);
            const { data, status } = res.data;

            if (status.description === "SUCCESS" && data.accessToken) {
                dispatch(closeDialogLogin());
                const key = STORAGE_KEYS.USER_INFO;

                setSession(data?.accessToken);
                setStorage(key, data?.accessToken);
                dispatch(setUserAuthen(data));

                axios.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;

                setTimeout(() => {
                    enqueueSnackbar(t('successfullyApplied'), {
                        variant: 'success',
                    });
                    reset();
                    setLoading(false);
                    dispatch(setLoadingState(false));
                    dispatch(setUserAuthen(data));
                    router.push(urlRedirct || hostName);
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
        await liff.ready;
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

    const componentClicked = async () => {
        // const reUrl = urlRedirct ? urlRedirct : hostName;
        localStorage.setItem('photoCart', JSON.stringify(photoCart));
        localStorage.setItem('eventDetail', JSON.stringify(eventDetail));
        const url = `https://www.facebook.com/v20.0/dialog/oauth?client_id=2625583094248090&scope=email%20public_profile&redirect_uri=${ENV_URL}/facebook&state=${urlRedirct || hostName}`;
        window.location.href = url;
    }

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

    return (
        <>
            {!!errorMsg && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {errorMsg}
                </Alert>
            )}

            {(isSubmitting || loading) && (
                <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
                    <CircularProgress color="primary" />
                </Backdrop>
            )}

            <FormProvider methods={methods} onSubmit={onSubmit}>
                <Box
                    gap={5}
                    display="grid"
                    gridTemplateColumns={{
                        sm: 'repeat(1, 1fr)',
                    }}
                    sx={{ mb: 2 }}
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

                        <RHFTextField
                            name="confirmPassword"
                            size="small"
                            label={t('password')}
                            type={passwordConfirm.value ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={passwordConfirm.onToggle} edge="end">
                                            <Iconify
                                                icon={passwordConfirm.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                                            />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {/* <RHFCheckbox name="termOfUseStatus" label={renderTermOfUseStatus()} /> */}

                        <LoadingButton
                            fullWidth
                            color="primary"
                            size="medium"
                            type="submit"
                            variant="contained"
                            loading={isSubmitting}
                            sx={{
                                p: 0.8,
                            }}
                        >
                            {t('register')}
                        </LoadingButton>

                    </Stack>

                </Box>
            </FormProvider>
        </>
    )
};

export default RegisterContent;