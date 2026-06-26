import { m } from 'framer-motion';
import { enqueueSnackbar } from "notistack";
import { useState, useCallback } from "react";

import { Box, alpha, Stack, Avatar, Dialog, Button, Divider, IconButton, Typography, DialogTitle, DialogContent, DialogActions, CircularProgress } from "@mui/material";

import { getStorage } from 'src/hooks/use-local-storage';

import { fData } from "src/utils/format-number";
import { STORAGE_KEYS } from 'src/utils/constants';
import { compressImage } from "src/utils/compress-image";
import { checkServiceResponse } from 'src/utils/check-service-response';
import { enqueueSnackbarErrorComponent } from 'src/utils/enqueueSnackbarComponent';

import { _mock } from "src/_mock";
import { useTranslate } from "src/locales";
import { useAppDispatch } from 'src/store/hooks';
import { jwtDecode } from 'src/auth/context/jwt/utils';
import { setUserImageUrl } from 'src/slices/authen.slices';
import { useSaveUserProfileImageMutation } from 'src/api/user.api';
import { setLoadingState, setDialogMessage, closeDialogMessage, } from 'src/slices/error-message.slices';

import Iconify from 'src/components/iconify';
import { varHover } from 'src/components/animate';
import { UploadBox } from "src/components/upload";

import { IUserAccount } from 'src/types/user';

type Props = {
    open: boolean;
    onClose: VoidFunction;
    onSuccess: VoidFunction;
};

export default function UserProfileDialogEditImageProfile({ open, onClose, onSuccess }: Props) {

    const { t } = useTranslate();
    const key = STORAGE_KEYS.USER_INFO;
    const userProfile = getStorage(key);

    const dispatch = useAppDispatch();

    const [saveUserProfileImage, { isLoading }] = useSaveUserProfileImageMutation();

    const [imageProfileFile, setImageProfileFile] = useState<File & { preview?: string } | null>(null);

    const handleDropMultiFile = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles && acceptedFiles?.length > 0) {

            if (acceptedFiles[0].size > 3145728) {
                enqueueSnackbar(`${t('validation.fileSize')} ${fData(3145728)}`, {
                    variant: 'warning',
                });
            } else {

                const compressedFile = await compressImage(acceptedFiles[0], {
                    quality: 0.5,
                    type: acceptedFiles[0].type,
                });

                const newFiles = Object.assign(compressedFile, {
                    preview: URL.createObjectURL(compressedFile),
                });

                setImageProfileFile(newFiles);
            }
        }
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [setImageProfileFile, imageProfileFile]
    );


    const handleRemoveFile = useCallback(() => {
        setImageProfileFile(null);
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [setImageProfileFile, imageProfileFile]
    );

    const onSubmit = () => {
        const user = jwtDecode(userProfile as string)?.userDetail;
        if (imageProfileFile && user) {
            dispatch(setDialogMessage({
                title: '',
                message: t('confirmEditProfile'),
                open: true,
                showSave: true,
                showCancel: true,
                labelOk: t('confirmBtn'),
                labelCancel: t('cancelBtn'),
                type: 'alert',
                onOk: async () => {

                    dispatch(setLoadingState(true));

                    const userModel: IUserAccount = {
                        ...user,
                        imageProfile: imageProfileFile.name
                    }

                    const formData = new FormData();

                    formData.append("data", JSON.stringify(userModel));
                    formData.append(imageProfileFile.name, imageProfileFile);

                    saveUserProfileImage(formData).unwrap().then((response) => {
                        if (checkServiceResponse(response)) {
                            const { data } = response;

                            if (data?.imageProfileUrl) {
                                localStorage.setItem('userImage', data.imageProfileUrl);
                                  dispatch(setUserImageUrl(data.imageProfileUrl));
                            }

                            setTimeout(() => {
                                enqueueSnackbar(t('profile.editProfileImageSuccess'), {
                                    variant: 'success',
                                });
                                dispatch(setLoadingState(false));
                                dispatch(closeDialogMessage());
                                onSuccess();
                                closeDialog();
                            }, 500);
                        } else {
                            dispatch(setLoadingState(false));
                            dispatch(closeDialogMessage());
                            enqueueSnackbarErrorComponent();
                        }

                    }).catch((error: any) => {
                        dispatch(setLoadingState(false));
                        dispatch(closeDialogMessage());
                        enqueueSnackbarErrorComponent();
                        console.log("🚀 ~ saveUserProfileImage ~ error:", error);
                    })
                }
            }));


        }
    }

    const closeDialog = () => {
        onClose();
        setImageProfileFile(null);
    }

    return (
        <Dialog
            fullWidth
            maxWidth={false}
            open={open}
            PaperProps={{
                sx: { maxWidth: 400 },
            }}
        >

            <DialogTitle>
                <Typography variant="h4" sx={{ mb: 1 }} color='primary'>
                    {t('profile.editProfileImage')}
                </Typography>
                <Divider sx={{ borderStyle: 'dashed', mb: 2 }} />
            </DialogTitle>
            <DialogContent>
                <Box
                    rowGap={3}
                    columnGap={2}
                    display="grid"
                    gridTemplateColumns={{
                        xs: 'repeat(1, 1fr)',
                        sm: 'repeat(1, 1fr)',
                    }}
                >
                    <Stack direction="row" spacing={2} justifyContent='center'>
                        <IconButton
                            component={m.button}
                            whileTap="tap"
                            whileHover="hover"
                            variants={varHover(1.05)}
                            sx={{
                                position: 'relative',
                                background: (theme) => alpha(theme.palette.grey[500], 0.08),
                                border: '1px dashed rgba(145, 158, 171, 0.2)'
                            }}
                        >
                            <Avatar
                                src={imageProfileFile?.preview || _mock.image.avatar(24)}
                                alt="user-profile"
                                sx={{
                                    width: 120,
                                    height: 120,
                                    border: (theme) => `solid 2px ${theme.palette.background.default}`,
                                }}
                            />
                        </IconButton>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <UploadBox
                            file={imageProfileFile}
                            onDrop={handleDropMultiFile}
                            onRemove={handleRemoveFile}
                            placeholder={
                                <Stack spacing={0.5} alignItems="center">
                                    <Iconify icon="eva:cloud-upload-fill" width={40} />
                                    <Typography variant="body2">{t('profile.uploadProfileImage')}</Typography>
                                </Stack>
                            }
                            sx={{ width: '100%', height: '90px' }}
                            accept={{ 'image/*': [] }}
                        />
                    </Stack>
                </Box>
            </DialogContent>
            <DialogActions sx={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <Box display="flex" columnGap={2} sx={{
                    justifyContent: 'center'
                }}>
                    <Button
                        disabled={isLoading}
                        startIcon={isLoading && <CircularProgress color="inherit" size={24} />}
                        sx={{ minWidth: 100 }}
                        size='medium'
                        type="button"
                        variant="outlined" onClick={() => closeDialog()}>
                        {t('close')}
                    </Button>
                    <Button
                        disabled={Boolean(!imageProfileFile)}
                        startIcon={isLoading && <CircularProgress color="inherit" size={24} />}
                        sx={{ minWidth: 100 }}
                        color="primary"
                        size='medium'
                        variant="contained"
                        type="submit"
                        onClick={() => onSubmit()}
                    >
                        {t('saveBtn')}
                    </Button>
                </Box>

            </DialogActions>
        </Dialog>
    )
}