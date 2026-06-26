import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';

import { Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { useTranslate } from 'src/locales';

import Iconify from '../iconify';

interface GoogleLoginComponentProps {
    onLoginSuccess: (token: string) => void;
    onLoginError?: () => void;
}

// const CustomButton = styled('button')(({ theme }) => ({
//     backgroundColor: 'transparent',
//     color: theme.palette.primary.main,
//     padding: '7.5px 16px',
//     borderRadius: 8,
//     fontWeight: 'bold',
//     cursor: 'pointer',
//     fontFamily: 'line-seedsans-regular',
//     border: `1px solid ${theme.palette.primary.main}`,
//     '&:hover': {
//         backgroundColor: theme.palette.primary.main,
//         color: theme.palette.background.paper,
//     },
// }));

const GoogleLoginComponent: React.FC<GoogleLoginComponentProps> = ({
    onLoginSuccess,
    onLoginError,
}) => {

    const { t } = useTranslate();

    const login = useGoogleLogin({
        scope: 'openid profile email',
        onSuccess: tokenResponse => {
            if (tokenResponse?.access_token) {
                onLoginSuccess(tokenResponse.access_token);
            }
        },
        onError: () => {
            onLoginError?.();
            console.log('Login Failed');
        },
    });

    return (
        // <CustomButton type="button" onClick={() => login()}>
        //     {t('googleLogin')}
        // </CustomButton>
        <LoadingButton
            fullWidth
            color='primary'
            sx={{
                position: "relative",
                justifyContent: "center",
                p: 0.8,
            }}
            size="medium"
            type="button"
            onClick={() => login()}
            variant="outlined"
        >
            <Box
                sx={{
                    position: "absolute",
                    left: 16,
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Iconify icon="flat-color-icons:google" width={28} />
            </Box>
            {t('googleLogin')}
        </LoadingButton>
    );
};

export default GoogleLoginComponent;
