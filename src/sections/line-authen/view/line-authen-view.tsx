import liff from '@line/liff';
// import VConsole from 'vconsole';
import { useEffect } from 'react';

import { Box } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';

import { useRouter, useSearchParams } from 'src/routes/hooks';

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

// ----------------------------------------------------------------------

const LINE_LIFF_ID = import.meta.env.VITE_LINE_LIFF_ID;
const LINE_CLIENT_REDIRECT_URL = import.meta.env.VITE_LINE_CLIENT_REDIRECT_URL;

export default function LineAuthen() {
    // const vConsole = new VConsole({ theme: 'dark' });
    const router = useRouter();
    const { t } = useTranslate();
    const dispatch = useAppDispatch();
    const { currentLang } = useLocales();
    const searchParams = useSearchParams();
    const { enqueueSnackbar } = useSnackbar();
    const returnTo = searchParams.get('redirect');
    console.log("🚀 ~ LineAuthen ~ returnTo:", returnTo)
    // const [errorLine, setErrorLine] = useState('');

    const getProfileLine = async () => {
        try {
            // await liff.ready;
            // console.log("🚀 ~ get profile pending");
            const profile = await liff.getProfile();
            const idToken = liff.getDecodedIDToken();
            // console.log("🚀 ~ get profile success");
            if (profile && idToken) {
                // console.log("🚀 ~ have profile");
                const lineUserModel: UserProfileModel = {
                    userId: 0,
                    adminUserId: 0,
                    username: '',
                    email: idToken?.email || 'none_email',
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
                    imageProfile: idToken?.picture || '',
                    imageProfileUrl: '',
                    idpsNumber: '',
                    remark: '',
                    userProviderId: 0,
                    providerName: 'LINE',
                    providerId: profile.userId,
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

                if (idToken?.picture) {
                    localStorage.setItem('userImage', idToken?.picture || '');
                    dispatch(setUserImageUrl(idToken?.picture));
                }

                const checkUrl = endpoints.auth.root + endpoints.auth.verifyUserProvider;
                const checkUserResponse = await axios.post(checkUrl, lineUserModel);
                // console.log("🚀 ~ verifyUserProvider");
                if (checkUserResponse?.data?.data) {
                    // console.log("🚀 ~ verifyUserProvider response");
                    const { invalidUser } = checkUserResponse.data.data;
                    if (invalidUser && !idToken?.email) {
                        // console.log("🚀 ~ not have email ");
                        dispatch(closeDialogLogin());
                        dispatch(setLoadingState(false));
                        dispatch(setNoneEmailDialog(lineUserModel));
                    } else {
                        // console.log("🚀 ~ have email and line authen ");
                        const url = endpoints.auth.root + endpoints.auth.lineAuthentication;

                        const res = await axios.post(url, lineUserModel);
                        const { data, status } = res.data;

                        if (status.description === "SUCCESS" && data.accessToken) {
                            // console.log("🚀 ~ line authen success ");
                            // const key = STORAGE_KEYS.USER_INFO;

                            setSession(data?.accessToken);
                            // setStorage(key, data?.accessToken);
                            dispatch(setUserAuthen(data));

                            axios.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;

                            const photoCartStr = localStorage.getItem('photoCart');
                            const eventDetailStr = localStorage.getItem('eventDetail');

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

                            setTimeout(() => {

                                router.push(returnTo || '/');

                                enqueueSnackbar(t('welcomeLogin'), {
                                    variant: 'success',
                                });
                                dispatch(setUserAuthen(data));
                            }, 1000);

                        } else {
                            // console.log("🚀 ~ line authen un success ");
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
            } else {
                // setErrorLine('error no line token');
                console.log("🚀 ~ error no line token")
            }
        } catch (error) {
            // setErrorLine('error get profile line');
            console.log("🚀 ~ file: line-authen-view.tsx:16 ~ getProfileLine ~ error:", error)
        }
    }

    useEffect(() => {
        liff.init({
            liffId: LINE_LIFF_ID,
        })
            .then(() => {
                // console.log("🚀 ~ liff init")
                if (!liff.isLoggedIn()) {
                    // console.log("🚀 ~ liff login")
                    liff.login({ redirectUri: `${LINE_CLIENT_REDIRECT_URL}line?${searchParams}` });
                } else {
                    getProfileLine();
                }
            })
            .catch((err) => {
                // setErrorLine('error no line init');
                dispatch(setLoadingState(false));

                console.log(err.code, err.message);
            });
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
            <Backdrop open sx={{ zIndex: 1, flexDirection: 'column' }}>
                <CircularProgress color="primary" />
                <Box sx={{ textAlign: 'center', color: '#ffffff', mt: 2 }}>
                    ระบบกำลังเชื่อมต่อกับ Line ของท่านกรุณารอสักครู่ ...
                </Box>
            </Backdrop>
        </Container>

    );

}