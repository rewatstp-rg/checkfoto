import { useState, useEffect, FormEvent, ChangeEvent } from "react";

import {
    Box,
    Grid,
    TextField,
    IconButton,
    InputAdornment
} from "@mui/material";

import { useRouter } from 'src/routes/hooks';

import { getStorage } from "src/hooks/use-local-storage";

import { STORAGE_KEYS } from "src/utils/constants";
import { checkServiceResponse } from 'src/utils/check-service-response';
import { generateIv, encryptWithSalt } from 'src/utils/decrypt-password';
import { enqueueSnackbarErrorComponent, enqueueSnackbarSuccessComponent } from 'src/utils/enqueueSnackbarComponent';

import { useTranslate } from 'src/locales';
import { selectAuthMenu } from "src/slices/menu.slices";
import { setUserAuthen } from "src/slices/authen.slices";
import { useResetPasswordMutation } from 'src/api/user.api';
import { setUrlRedirct } from "src/slices/dialog-login.slices";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { jwtDecode, setSession } from 'src/auth/context/jwt/utils';
import { setLoadingState, setDialogMessage, closeDialogMessage } from 'src/slices/error-message.slices';

import Iconify from 'src/components/iconify';
import { Block } from 'src/components/block/block';
import TitleLable from "src/components/title-lable";
import CardCustom from 'src/components/card/card-custom';
import { ButtonSubmitForm } from 'src/components/button-forom';

import { IUserAccount } from 'src/types/user';

// ----------------------------------------------------------------------

export const HOST_API = import.meta.env.VITE_HOST_URL_FOR_RUN;

interface PasswordState {
    value: string;
    visible: boolean;
    toggleVisibility: () => void;
}

const UserProfileChengePasswordForm = () => {

    const router = useRouter();
    const { t } = useTranslate();
    const dispatch = useAppDispatch();
    const key = STORAGE_KEYS.USER_INFO;
    const userProfile = getStorage(key);

    const [resetPassword] = useResetPasswordMutation();

    const { menuType } = useAppSelector(selectAuthMenu);

    const [menuTypeForm, setMenuTypeForm] = useState('');

    const [currentPassword, setCurrentPassword] = useState<PasswordState>({
        value: '',
        visible: false,
        toggleVisibility: () => setCurrentPassword((prev) => ({ ...prev, visible: !prev.visible })),
    });

    const [newPassword, setNewPassword] = useState<PasswordState>({
        value: '',
        visible: false,
        toggleVisibility: () => setNewPassword((prev) => ({ ...prev, visible: !prev.visible })),
    });

    const [confirmNewPassword, setConfirmNewPassword] = useState<PasswordState>({
        value: '',
        visible: false,
        toggleVisibility: () => setConfirmNewPassword((prev) => ({ ...prev, visible: !prev.visible })),
    });

    const [errorOldPassword, setErrorOldPassword] = useState<string>('');
    const [errorPassword, setErrorPassword] = useState<string>('');
    const [errorNewPassword, setErrorNewPassword] = useState<string>('');

    const handleChange = (
        setter: React.Dispatch<React.SetStateAction<PasswordState>>,
        field: 'value' | 'visible',
        setError: React.Dispatch<React.SetStateAction<string>>,
    ) => (e: ChangeEvent<HTMLInputElement>) => {
        // Reset error state when user starts typing
        setError('');
        // Update the field value or visibility
        setter((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const validatePasswords = (): boolean => {
        let isValid = true;

        // Reset errors first
        setErrorOldPassword('');
        setErrorPassword('');
        setErrorNewPassword('');

        // Check if any of the fields are empty
        if (!currentPassword.value || !newPassword.value || !confirmNewPassword.value) {
            if (!currentPassword.value) setErrorOldPassword(t('validation.pleaseSpecify'));
            if (!newPassword.value) setErrorPassword(t('validation.pleaseSpecify'));
            if (!confirmNewPassword.value) setErrorNewPassword(t('validation.pleaseSpecify'));
            return false;
        }

        // Check if old password is the same as new password
        if (currentPassword.value === newPassword.value) {
            setErrorOldPassword(t('validation.passwordNotCurrentMatch'));
            isValid = false;
        }

        // Check if the new password and confirm password match
        if (newPassword.value !== confirmNewPassword.value) {
            setErrorPassword(t('validation.passwordNotMatch'));
            setErrorNewPassword(t('validation.passwordNotMatch'));
            isValid = false;
        }

        // Check if the new password meets the minimum length requirement
        if (newPassword.value.length < 8) {
            setErrorPassword(t('validation.passwordMinLength'));
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (validatePasswords()) {
            try {
                const user = jwtDecode(userProfile as string)?.userDetail;
                if (user && user?.username) {
                    dispatch(setDialogMessage({
                        title: '',
                        message: t('confirmChangePassword'),
                        open: true,
                        showSave: true,
                        showCancel: true,
                        labelOk: t('confirmBtn'),
                        labelCancel: t('cancelBtn'),
                        type: 'alert',
                        onOk: async () => {

                            dispatch(setLoadingState(true));
                            const userModel: IUserAccount = {};
                            userModel.email = user.username;
                            const iv = generateIv();
                            const oldPasswordEncrypted = await encryptWithSalt(currentPassword.value, iv);
                            const passwordEncrypted = await encryptWithSalt(confirmNewPassword.value, iv);

                            userModel.oldPassword = oldPasswordEncrypted.encryptedData;
                            userModel.password = passwordEncrypted.iv;
                            userModel.newPassword = passwordEncrypted.encryptedData;

                            await resetPassword(userModel).unwrap().then((response) => {
                                setTimeout(() => {
                                    if (checkServiceResponse(response)) {

                                        setCurrentPassword({ value: '', visible: false, toggleVisibility: () => { } });
                                        setNewPassword({ value: '', visible: false, toggleVisibility: () => { } });
                                        setConfirmNewPassword({ value: '', visible: false, toggleVisibility: () => { } });

                                        dispatch(setUserAuthen(null));
                                        dispatch(setUrlRedirct(''));
                                        setSession(null);
                                        Object.keys(localStorage).forEach((keyItem) => {
                                            if (keyItem !== "version")
                                                delete localStorage[keyItem];
                                        })

                                        const urlVr = HOST_API;

                                        if (menuTypeForm === 'VR') {
                                            window.location.href = urlVr;
                                        } else {
                                            router.replace('/');
                                        }

                                        enqueueSnackbarSuccessComponent();
                                    } else {
                                        enqueueSnackbarErrorComponent();
                                    }
                                    dispatch(setLoadingState(false));
                                    dispatch(closeDialogMessage());
                                }, 500);
                            })

                        }
                    }));
                } else {
                    dispatch(setLoadingState(false));
                    dispatch(closeDialogMessage());
                    enqueueSnackbarErrorComponent();
                }
            } catch (error) {
                dispatch(setLoadingState(false));
                dispatch(closeDialogMessage());
                enqueueSnackbarErrorComponent();
                console.error(error);
            }
        }
    };

    const onBack = () => {
        const urlVr = HOST_API;
        if (menuTypeForm === 'VR') {
            window.location.href = urlVr;
        } else {
            router.back();
        }
    }

    useEffect(() => {
        setMenuTypeForm(menuType);
    }, [menuType])

    return (
        <form onSubmit={handleSubmit}>
            <CardCustom>
                <TitleLable title={t('profile.changePassword')} />
                <Grid container spacing={3} justifyContent='center'>
                    <Grid item xs={12} md={8}>
                        <Grid container spacing={2} >

                            <Grid item xs={12} md={12}>
                                <Block label={t('profile.currentPassword')} required>
                                    <TextField
                                        hiddenLabel
                                        type={currentPassword.visible ? 'text' : 'password'}
                                        onChange={handleChange(setCurrentPassword, 'value', setErrorOldPassword)}
                                        fullWidth
                                        error={!!errorOldPassword}
                                        placeholder={t('profile.currentPassword')}
                                        helperText={errorOldPassword ?? errorOldPassword}
                                        variant="outlined"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={currentPassword.toggleVisibility} edge="end">
                                                        <Iconify icon={currentPassword.visible ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Block>
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <Block label={t('profile.password')} required>
                                    <TextField
                                        hiddenLabel
                                        type={newPassword.visible ? 'text' : 'password'}
                                        onChange={handleChange(setNewPassword, 'value', setErrorPassword)}
                                        fullWidth
                                        variant="outlined"
                                        placeholder={t('profile.password')}
                                        error={!!errorPassword}
                                        helperText={errorPassword ?? errorPassword}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={newPassword.toggleVisibility} edge="end">
                                                        <Iconify icon={newPassword.visible ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Block>
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <Block label={t('profile.confirmPassword')} required>
                                    <TextField
                                        hiddenLabel
                                        type={confirmNewPassword.visible ? 'text' : 'password'}
                                        onChange={handleChange(setConfirmNewPassword, 'value', setErrorNewPassword)}
                                        fullWidth
                                        variant="outlined"
                                        placeholder={t('profile.confirmPassword')}
                                        error={!!errorNewPassword}
                                        helperText={errorNewPassword ?? errorNewPassword}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={confirmNewPassword.toggleVisibility} edge="end">
                                                        <Iconify icon={confirmNewPassword.visible ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Block>
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <Box
                                    rowGap={1}
                                    columnGap={6}
                                    mt={2}
                                    display="grid"
                                    gridTemplateColumns={{
                                        xs: 'repeat(1, 1fr)',
                                        sm: 'repeat(1, 1fr)',
                                        lg: 'repeat(1, 1fr)',
                                    }}
                                >
                                    <ButtonSubmitForm
                                        isSubmit
                                        cancelLabel='กลับ'
                                        submitLabel='บันทึก'
                                        loading={false}
                                        onCancel={() => onBack()}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardCustom>
        </form>
    );
}

export default UserProfileChengePasswordForm;