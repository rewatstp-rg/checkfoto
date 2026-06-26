import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';

import { getStorage } from "src/hooks/use-local-storage";
import { useResponsive } from 'src/hooks/use-responsive';

import { STORAGE_KEYS } from "src/utils/constants";

import { useTranslate } from 'src/locales';
import { jwtDecode } from 'src/auth/context/jwt/utils';
import { selectAuthenSlice } from 'src/slices/authen.slices';
import { showDialogLogin } from 'src/slices/dialog-login.slices';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import { StyledNavItem } from '../main/nav/desktop/nav-item';

export default function ProfileName() {

    const key = STORAGE_KEYS.USER_INFO;
    const userProfile = getStorage(key);

    const { t } = useTranslate();
    const dispatch = useAppDispatch();
    const lgUp = useResponsive('up', 'lg');

    const { userAuthen } = useAppSelector(selectAuthenSlice);

    const [userProfileState, setUserProfileState] = useState<any>();

    const renderContent = (
        <StyledNavItem
            disableRipple
            disableTouchRipple
        >
            {
                lgUp ? (
                    <>
                        {`${t('titleLogin')} / ${t('titleRegister')}`}
                    </>
                ) : (
                    <>
                        {`${t('titleLogin')}`}
                    </>
                )
            }
        </StyledNavItem>
    );

    const handleLogin = () => {
        dispatch(showDialogLogin(''));
    }

    useEffect(() => {
        const token = userProfile;
        if (token) {
            setUserProfileState(jwtDecode(token));
        }

        if (userAuthen && userAuthen?.accessToken) {
            setUserProfileState(jwtDecode(userAuthen.accessToken));
        }

        if (!token && !userAuthen) {
            setUserProfileState(null);
        }

    }, [userProfile, userAuthen]);

    return (
        <Box sx={{ pt: 2, pb: 1.5, width: lgUp ? 'auto' : '65px' }}>
            {
                userProfileState ? (
                    <>
                        {
                            lgUp && <>
                                <Typography variant="subtitle2" noWrap>
                                    {userProfileState?.sub}
                                </Typography>
                                {
                                    userProfileState?.userDetail?.firstName && userProfileState?.userDetail?.lastName ?
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                                            {`${userProfileState?.userDetail?.firstName} ${userProfileState?.userDetail?.lastName}`}
                                        </Typography>
                                        : null
                                }
                            </>
                        }
                    </>
                ) : (
                    <Button variant="text" color="inherit" onClick={handleLogin}>
                        {renderContent}
                    </Button>
                )
            }
        </Box>
    )
}