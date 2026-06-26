import { useState, useEffect } from 'react';

import { Box } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';

import { useRouter } from 'src/routes/hooks';

// import { setStorage } from 'src/hooks/use-local-storage';

import axios, { endpoints } from 'src/utils/axios';
import { AUTH_INVALID_MESSAGE, AUTH_INVALID_MESSAGE_EN } from 'src/utils/constants';

import { useAppDispatch } from 'src/store/hooks';
import { useLocales, useTranslate } from 'src/locales';
import { setSession } from 'src/auth/context/jwt/utils';
import { setEventDetail } from 'src/slices/event.slices';
import { setLoadingState } from 'src/slices/error-message.slices';
import { setUserAuthen, setUserImageUrl } from 'src/slices/authen.slices';
import { closeDialogLogin, setNoneEmailDialog } from 'src/slices/dialog-login.slices';
import { setListPaymentGateway, setPhotoCartLocalStorage } from 'src/slices/order.slices';

import { useSnackbar } from 'src/components/snackbar';

import { UserProfileModel } from 'src/types/authen.model';

const ENV_URL = `${import.meta.env.VITE_HOST_API}`;

// ----------------------------------------------------------------------

const hostName = window.location.pathname;

export default function FacebookAuthen() {

    const router = useRouter();
    const { t } = useTranslate();
    const dispatch = useAppDispatch();
    const { currentLang } = useLocales();
    const { enqueueSnackbar } = useSnackbar();
    // const { urlRedirct } = useAppSelector(selectDialogLogin);
    const [loading, setLoading] = useState(false);

    const loadContent = async (code: string, state?: string) => {

        // console.log("🚀 ~ file: facebook-authen-view.tsx:42 ~ loadContent ~ state1:", state)
        // console.log("🚀 ~ file: login-content.tsx:65 ~ LoginContent ~ code:", code);

        const url = `https://graph.facebook.com/v20.0/oauth/access_token?client_id=2625583094248090&redirect_uri=${ENV_URL}/facebook&client_secret=854a8542a98188bf82b82bb39dcef36c&code=`
        const res = await axios.post(url + code);
        // console.log("🚀 ~ file: facebook-authen-view.tsx:43 ~ loadContent ~ res:", res)
        // console.log("🚀 ~ file: facebook-authen-view.tsx:160 ~ loadContent ~ hostName:", hostName);
        // console.log("🚀 ~ file: facebook-authen-view.tsx:146 ~ setTimeout ~ urlRedirct:", urlRedirct);
        if (res?.data?.access_token) {
            const getProfileUrl = `https://graph.facebook.com/v20.0/me?access_token=${res.data.access_token}&debug=all&fields=id%2Cname%2Cemail%2Cpicture&format=json&method=get&origin_graph_explorer=1&pretty=0&suppress_http_code=1&transport=cors`
            const resGetProfile = await axios.post(getProfileUrl);
            // console.log("🚀 ~ file: facebook-authen-view.tsx:49 ~ loadContent ~ resGetProfile:", resGetProfile)
            if (resGetProfile && resGetProfile?.data) {
                const { email, id, picture } = resGetProfile.data;
                const facebookUserModel: UserProfileModel = {
                    userId: 0,
                    adminUserId: 0,
                    username: '',
                    email: email || 'none_email',
                    firstName: '',
                    middleName: '',
                    lastName: '',
                    password: '',
                    newPassword: '',
                    oldPassword: '',
                    tel: '',
                    birthDate: '',
                    gender: '',
                    address: '',
                    province: '',
                    district: '',
                    subDistrict: '',
                    zipcode: '',
                    imageProfile: picture?.data?.url || '',
                    imageProfileUrl: '',
                    idpsNumber: '',
                    remark: '',
                    userProviderId: 0,
                    providerName: 'FACEBOOK',
                    providerId: id,
                    roleId: '',
                    roleName: '',
                    roleType: '',
                    invalidUser: false,
                    userStatus: '',
                    status: '',
                    actionBy: '',
                    refreshToken: '',
                    photoUrl: '',
                    authenType: '',
                    policyAccept: true,
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
                }

                if (picture?.data?.url) {
                    localStorage.setItem('userImage', picture?.data?.url || '');
                    dispatch(setUserImageUrl(picture?.data?.url));
                }

                const checkUrl = endpoints.auth.root + endpoints.auth.verifyUserProvider;
                const checkUserResponse = await axios.post(checkUrl, facebookUserModel);
                if (checkUserResponse?.data?.data) {
                    const { invalidUser } = checkUserResponse.data.data;
                    if (invalidUser && !email) {
                        setLoading(false);
                        dispatch(closeDialogLogin());
                        dispatch(setLoadingState(false));
                        dispatch(setNoneEmailDialog(facebookUserModel));
                    } else {
                        const urlFacebook = endpoints.auth.root + endpoints.auth.facebookAuthentication;
                        const resFacebook = await axios.post(urlFacebook, facebookUserModel);
                        if (resFacebook?.data) {
                            const { data, status } = resFacebook.data;
                            if (status.description === "SUCCESS" && data.accessToken) {

                                // const key = STORAGE_KEYS.USER_INFO;

                                setSession(data?.accessToken);
                                // setStorage(key, data?.accessToken);
                                dispatch(setUserAuthen(data));

                                axios.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;

                                // console.log("🚀 ~ file: line-authen-view.tsx:134 ~ getProfileLine ~ returnTo:", returnTo);
                                // router.push(returnTo || '/');
                                // console.log("🚀 ~ file: facebook-authen-view.tsx:42 ~ loadContent ~ state2:", state)
                                // console.log("🚀 ~ file: facebook-authen-view.tsx:160 ~ loadContent ~ hostName:", hostName);
                                // console.log("🚀 ~ file: facebook-authen-view.tsx:146 ~ loadContent ~ urlRedirct :", urlRedirct);
                                const photoCartStr = localStorage.getItem('photoCart');
                                const eventDetailStr = localStorage.getItem('eventDetail');

                                setTimeout(() => {
                                    enqueueSnackbar(t('welcomeLogin'), {
                                        variant: 'success',
                                    });
                                    setLoading(false);
                                    dispatch(closeDialogLogin());
                                    dispatch(setLoadingState(false));
                                    dispatch(setUserAuthen(data));

                                    let eventDetail = null;
                                    let photoCart = null;

                                    if (eventDetailStr && eventDetailStr !== 'undefined') {
                                        eventDetail = JSON.parse(eventDetailStr);
                                        dispatch(setEventDetail(eventDetail));
                                        dispatch(setListPaymentGateway(eventDetail.listPhotoPaymentGateway));
                                    }

                                    if (photoCartStr && photoCartStr !== 'undefined') {
                                        photoCart = JSON.parse(photoCartStr);
                                        dispatch(setPhotoCartLocalStorage(photoCart));
                                    }

                                    if (state && state !== '/facebook') {
                                        router.push((state && state === '/line' ? '/' : state) || hostName);
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
                    }
                }
            }
        }
    }

    useEffect(() => {
        const { search } = window.location;
        const params = new URLSearchParams(search);
        const code = params.get('code');
        const state = params.get('state');
        console.log("🚀 ~ useEffect ~ state:", state)
        setLoading(true);
        if (code) {
            loadContent(code, state || '');
        } else {
            router.push('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container
            maxWidth='lg'
            sx={{
                mt: 10,
                mb: 15,
            }}
        >
            {
                loading && <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.modal + 1, flexDirection: 'column' }}>
                    <CircularProgress color="primary" />
                    <Box sx={{ textAlign: 'center', color: '#ffffff', mt: 2 }}>
                        ระบบกำลังเชื่อมต่อกับ Facebook ของท่านกรุณารอสักครู่ ...
                    </Box>
                </Backdrop>
            }
        </Container>

    );

}