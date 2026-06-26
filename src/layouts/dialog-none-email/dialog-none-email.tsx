import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState, useCallback } from "react";

import { useTheme } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog, { dialogClasses } from '@mui/material/Dialog';
import { Box, Alert, Stack, DialogActions, DialogContent } from "@mui/material";

import { useRouter } from "src/routes/hooks";

import { setStorage } from 'src/hooks/use-local-storage';

import axios, { endpoints } from 'src/utils/axios';
import { STORAGE_KEYS, AUTH_INVALID_MESSAGE, AUTH_INVALID_MESSAGE_EN } from 'src/utils/constants';

import { useLocales, useTranslate } from "src/locales";
import { setSession } from 'src/auth/context/jwt/utils';
import { setUserAuthen } from 'src/slices/authen.slices';
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { setLoadingState } from 'src/slices/error-message.slices';
import { setUrlRedirct, selectDialogLogin, setNoneEmailDialogClose } from "src/slices/dialog-login.slices";

import Logo from "src/components/logo";
import FormProvider, { RHFTextField } from 'src/components/hook-form';

import { UserProfileModel } from 'src/types/authen.model';

const hostName = window.location.pathname;
const DialogNoneEmail = () => {

    const theme = useTheme();
    const router = useRouter();
    const { t } = useTranslate();
    const dispatch = useAppDispatch();
    const { currentLang } = useLocales();

    const [errorMsg, setErrorMsg] = useState('');

    const { dialogNoneEmailOpen, userProfileNoneEmail } = useAppSelector(selectDialogLogin);

    const authenSchema = Yup.object().shape({
        username: Yup.string().required(t('messageError.requiredUsername')).email(t('messageError.validEmail'))
    });

    const defaultValues = useMemo(
        () => ({
            username: ''
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
        // console.log("🚀 ~ file: login-content.tsx:90 ~ onSubmit ~ host:", hostName)
        dispatch(setUrlRedirct(hostName));
        try {

            // setLoading(true);
            dispatch(setLoadingState(true));
            setErrorMsg('');

            const userModel: UserProfileModel = {
                ...userProfileNoneEmail,
                email: dataForm.username
            }

            const url = endpoints.auth.root + (userProfileNoneEmail?.providerName === 'FACEBOOK' ? endpoints.auth.facebookAuthentication : endpoints.auth.lineAuthentication);
            const res = await axios.post(url, userModel);

            const { data, status } = res.data;

            if (status.description === "SUCCESS" && data.accessToken) {

                const key = STORAGE_KEYS.USER_INFO;

                setSession(data?.accessToken);
                setStorage(key, data?.accessToken);
                dispatch(setUserAuthen(data));

                axios.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;

                setTimeout(async () => {
                    enqueueSnackbar(t('welcomeLogin'), {
                        variant: 'success',
                    });
                    reset();
                    // setLoading(false);
                    dispatch(setLoadingState(false));
                    dispatch(setUserAuthen(data));
                    dispatch(setNoneEmailDialogClose());
                    router.push('/');
                }, 1000);

            } else {
                setTimeout(() => {
                    dispatch(setNoneEmailDialogClose());
                    dispatch(setLoadingState(false));
                    if (currentLang?.value === 'en') {
                        setErrorMsg(AUTH_INVALID_MESSAGE_EN[status.description]);
                    } else {
                        setErrorMsg(AUTH_INVALID_MESSAGE[status.description]);
                    }
                }, 1000);
            }

        } catch (error) {
            dispatch(setNoneEmailDialogClose());
            dispatch(setLoadingState(false));
            if (currentLang?.value === 'en') {
                setErrorMsg(AUTH_INVALID_MESSAGE_EN.UNAUTHORIZED);
            } else {
                setErrorMsg(AUTH_INVALID_MESSAGE.UNAUTHORIZED);
            }
            console.error(error);
        }
    });

    const handleClose = useCallback(() => {
        dispatch(setNoneEmailDialogClose());
        router.push('/');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);


    return (
        <Dialog
            fullWidth
            maxWidth="xs"
            open={dialogNoneEmailOpen}
            onClose={handleClose}
            transitionDuration={{
                enter: theme.transitions.duration.shortest,
                exit: 0,
            }}
            PaperProps={{
                sx: {
                    mt: 1,
                    overflow: 'unset'
                },
            }}
            sx={{
                [`& .${dialogClasses.container}`]: {
                    alignItems: 'center',
                },
            }}
            scroll="body"
        >
            <FormProvider methods={methods} onSubmit={onSubmit}>
                <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Logo />
                </Box>

                <DialogContent dividers>
                    <Box sx={{ px: 3, pb: 0 }}>
                        {!!errorMsg && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {errorMsg}
                            </Alert>
                        )}


                        <Box
                            gap={5}
                            display="grid"
                            gridTemplateColumns={{
                                sm: 'repeat(1, 1fr)',
                            }}
                        >
                            <Stack spacing={2}>

                                <RHFTextField name="username" label={t('noneEmail')} size="small" required />

                            </Stack>

                        </Box>

                    </Box>
                </DialogContent>


                <DialogActions sx={{ justifyContent: 'center' }}>
                    <LoadingButton
                        fullWidth
                        color="primary"
                        size="medium"
                        type="submit"
                        variant="contained"
                        loading={isSubmitting}
                    >
                        {t('login')}
                    </LoadingButton>
                </DialogActions>

            </FormProvider>
        </Dialog>
    )
}

export default DialogNoneEmail;