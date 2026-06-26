import { enqueueSnackbar } from 'notistack';

import { useTokenExpiration } from 'src/hooks/use-token-expiration';
import { getStorage, setStorage } from 'src/hooks/use-local-storage';

import axios, { endpoints } from 'src/utils/axios';
import { STORAGE_KEYS, AUTH_INVALID_MESSAGE, AUTH_INVALID_MESSAGE_EN } from 'src/utils/constants';

import { useLocales } from 'src/locales';
import { useAppDispatch } from 'src/store/hooks';
import { setUserAuthen } from 'src/slices/authen.slices';
import { setLoadingState } from 'src/slices/error-message.slices';
import { setUrlRedirct, showDialogLogin } from 'src/slices/dialog-login.slices';

import { jwtDecode, setSession } from '../context/jwt/utils';

type Props = {
    children: React.ReactNode;
};

const AuthGuardRoot = ({ children }: Props) => {

    const url = endpoints.auth.root + endpoints.auth.refreshToken;

    const { currentLang } = useLocales();
    const dispatch = useAppDispatch();
    const token = getStorage(STORAGE_KEYS.USER_INFO);
    const decoded = token ? jwtDecode(token) : null;
    window.localStorage.setItem('Expired', '0');

    useTokenExpiration(decoded?.exp ?? null, async () => {
        try {

            if (decoded?.userDetail?.refreshToken) {
                window.localStorage.setItem('Expired', '0');
                const model = {
                    "refreshToken": decoded.userDetail.refreshToken,
                }

                delete axios.defaults.headers.common.Authorization;

                const res = await axios.post(url, model);
                const { data, status } = res.data;

                if (status.description === "SUCCESS" && data.accessToken) {
                    axios.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
                    setSession(data?.accessToken);
                    setStorage(STORAGE_KEYS.USER_INFO, data?.accessToken);
                    dispatch(setUserAuthen(data));

                    dispatch(setLoadingState(false));
                } else {
                    setTimeout(() => {
                        dispatch(setLoadingState(false));
                        if (currentLang?.value === 'en') {
                            enqueueSnackbar(AUTH_INVALID_MESSAGE_EN[status.description], {
                                variant: 'warning',
                            });
                        } else {
                            enqueueSnackbar(AUTH_INVALID_MESSAGE[status.description], {
                                variant: 'warning',
                            });
                        }
                    }, 1000);
                }
            } else {
                Object.keys(localStorage).forEach((keyItem) => {
                    if (!keyItem.includes("accepted-policy") && keyItem !== "version" && keyItem !== "settings" && keyItem !== "i18nextLng" && keyItem !== "FFDN_" && keyItem !== "FFD_") {
                        delete localStorage[keyItem];
                    }
                });
                dispatch(setUserAuthen(null));
                dispatch(setUrlRedirct(''));
                setSession(null);
                setTimeout(() => {
                    const redirectTo = `${window.location.pathname}${window.location.search}`;
                    window.localStorage.setItem('Expired', '1');
                    dispatch(showDialogLogin(redirectTo));
                }, 500);
            }

            //  const res = await axios.post(url, authenModel);

        } catch (err) {
            console.error('Refresh token failed:', err);
            const redirectTo = `${window.location.pathname}${window.location.search}`;
            dispatch(showDialogLogin(redirectTo));
        }
    });

    return <>{children}</>;
};

export default AuthGuardRoot;