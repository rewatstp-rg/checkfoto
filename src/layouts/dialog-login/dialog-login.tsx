import { useState, useEffect, useCallback } from "react";

import { useTheme } from '@mui/material/styles';
import Dialog, { dialogClasses } from '@mui/material/Dialog';
import { Box, IconButton, DialogTitle, ToggleButton, DialogContent, ToggleButtonGroup } from "@mui/material";

import { useRouter } from "src/routes/hooks";

import { useResponsive } from "src/hooks/use-responsive";

import { useTranslate } from "src/locales";
import { setSession } from "src/auth/context/jwt/utils";
import { setUserAuthen } from "src/slices/authen.slices";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { setLoadingState } from "src/slices/error-message.slices";
import { setUrlRedirct, closeDialogLogin, selectDialogLogin } from "src/slices/dialog-login.slices";

import Logo from "src/components/logo";
import Iconify from "src/components/iconify";

import LoginContent from "./login-content";
import RegisterContent from "./register-content";

const DialogLogin = () => {

    const theme = useTheme();
    const router = useRouter();
    const { t } = useTranslate();
    const dispatch = useAppDispatch();
    const lgUp = useResponsive('up', 'lg');

    const { open } = useAppSelector(selectDialogLogin);

    const [isOpen, setIsOpen] = useState(false);
    const [feature, setFeature] = useState('login');

    const handleChangeRole = useCallback(
        (_event: React.MouseEvent<HTMLElement>, newRole: string | null) => {
            if (newRole !== null) {
                setFeature(newRole);
            }
        },
        []
    );

    const handleClose = useCallback(() => {
        const expired = window.localStorage.getItem('Expired');
        if (expired === '1') {
            dispatch(setLoadingState(true));
            dispatch(closeDialogLogin());
            setTimeout(() => {
                Object.keys(localStorage).forEach((keyItem) => {
                    if (!keyItem.includes("accepted-policy") && keyItem !== "version" && keyItem !== "settings" && keyItem !== "i18nextLng" && keyItem !== "FFDN_" && keyItem !== "FFD_") {
                        delete localStorage[keyItem];
                    }
                });
                dispatch(setUserAuthen(null));
                dispatch(setUrlRedirct(''));
                setSession(null);
                router.replace('/');
                dispatch(setLoadingState(false));
            }, 1000);
        }
        router.push('/');
        dispatch(closeDialogLogin());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, router, isOpen]);

    useEffect(() => {
        setIsOpen(open);
    }, [open])

    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            open={isOpen}
            onClose={handleClose}
            transitionDuration={{
                enter: theme.transitions.duration.shortest,
                exit: 0,
            }}
            PaperProps={{
                sx: {
                    mt: 1,
                    overflow: 'unset',
                    // minHeight: '80%',
                    // maxHeight: '80%'
                },
            }}
            sx={{
                [`& .${dialogClasses.container}`]: {
                    alignItems: 'center',
                },
            }}
            scroll="body"
        >
            <DialogTitle sx={{ m: 0, p: 2 }}>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: () => theme.palette.grey[500],
                    }}
                >
                    <Iconify icon="iconamoon:close-duotone" width={24} />
                </IconButton>
            </DialogTitle>
            <Box sx={{ p: 2, textAlign: 'center' }}>
                <Logo />
            </Box>

            <DialogContent dividers>
                <Box sx={{ px: lgUp ? 3 : 0, pb: 5 }}>
                    <ToggleButtonGroup
                        exclusive
                        fullWidth
                        value={feature}
                        size="small"
                        onChange={handleChangeRole}
                        sx={{ mb: 5 }}
                    >
                        <ToggleButton value="login" aria-label="admin role">
                            {t('titleLogin')}
                        </ToggleButton>

                        <ToggleButton value="register" aria-label="user role">
                            {t('titleRegister')}
                        </ToggleButton>
                    </ToggleButtonGroup>

                    {
                        feature === 'login' && <LoginContent />
                    }
                    {
                        feature === 'register' && <RegisterContent />
                    }
                </Box>
            </DialogContent>

            {/* <DialogActions sx={{ justifyContent: 'center' }}>
              
            </DialogActions> */}

        </Dialog>
    )
}

export default DialogLogin;