import { useState, useEffect } from "react";

import {
    Box,
    Grid,
    Card,
    Stack,
    Button,
    CardHeader,
    IconButton
} from "@mui/material";

import { useBoolean } from 'src/hooks/use-boolean';
import { getStorage } from "src/hooks/use-local-storage";

import { STORAGE_KEYS } from "src/utils/constants";
import { checkServiceResponse, PropsCheckServiceResponse } from 'src/utils/check-service-response';
import { enqueueSnackbarErrorComponent, enqueueSnackbarSuccessComponent } from 'src/utils/enqueueSnackbarComponent';

import { useTranslate } from 'src/locales';
import { jwtDecode } from "src/auth/context/jwt/utils";
import { selectAuthenSlice } from 'src/slices/authen.slices';
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { useListProvinceMutation } from "src/api/master-data.api";
import { selectUser, setListUserAddressByUserId } from 'src/slices/user.slices';
import { useSaveUserAddressMutation, useListUserAddressByUserIdMutation } from 'src/api/user.api';
import { setDialogMessage, closeDialogMessage, setIsLoadingDailog } from 'src/slices/error-message.slices';

import Iconify from 'src/components/iconify';
import TitleLable from 'src/components/title-lable';
import { AddressItem, AddressNewForm } from 'src/components/address';

import { UserAddressModel } from 'src/types/user';

// ----------------------------------------------------------------------

const UserProfileAddressForm = () => {

    const { t } = useTranslate();
    const dispatch = useAppDispatch();
    const addressForm = useBoolean();

    const key = STORAGE_KEYS.USER_INFO;
    const userProfile = getStorage(key);

    const [getProvinceOption] = useListProvinceMutation();
    const [saveUserAddress] = useSaveUserAddressMutation();
    const [getlistUserAddressByUserId] = useListUserAddressByUserIdMutation();

    const { userAuthen } = useAppSelector(selectAuthenSlice);
    const { listUserAddressByUserId } = useAppSelector(selectUser);

    const [listAddress, setListAddress] = useState<UserAddressModel[]>([]);

    const handleDeleteAddress = (address: UserAddressModel) => {
        try {
            dispatch(setDialogMessage({
                title: '',
                message: t('confirmDeleteAddress'),
                open: true,
                showSave: true,
                showCancel: true,
                labelOk: t('saveBtn'),
                labelCancel: t('cancelBtn'),
                type: 'alert',
                onOk: async () => {

                    const formData = { ...address, status: 'DELETED' }

                    dispatch(setIsLoadingDailog(true));

                    let dataResponse: PropsCheckServiceResponse = {} as PropsCheckServiceResponse;

                    dataResponse = await saveUserAddress(formData).unwrap();

                    if (checkServiceResponse(dataResponse)) {
                        const { data } = dataResponse;
                        if (data && data?.length > 0) {
                            dispatch(setListUserAddressByUserId(data));
                            setTimeout(() => {
                                enqueueSnackbarSuccessComponent();
                                dispatch(closeDialogMessage());
                                dispatch(setIsLoadingDailog(false));
                            }, 500);
                        } else {
                            enqueueSnackbarErrorComponent();
                        }
                    } else {
                        dispatch(setIsLoadingDailog(false));
                        enqueueSnackbarErrorComponent();
                    }
                },
            }));
        } catch (error) {
            console.error(error);
        }
    }

    const selectAddress = (address: UserAddressModel) => {
        dispatch(setDialogMessage({
            title: '',
            message: t('confirmAddAddress'),
            open: true,
            showSave: true,
            showCancel: true,
            labelOk: t('saveBtn'),
            labelCancel: t('cancelBtn'),
            type: 'alert',
            onOk: async () => {

                dispatch(setIsLoadingDailog(true));

                let dataResponse: PropsCheckServiceResponse = {} as PropsCheckServiceResponse;
                let dataResponseOldAddess: PropsCheckServiceResponse = {} as PropsCheckServiceResponse;
                const useAddress = listAddress.find((x: UserAddressModel) => x.status === 'USED');
                dataResponseOldAddess = await saveUserAddress({ ...useAddress, status: 'ACTIVE' }).unwrap();
                if (checkServiceResponse(dataResponseOldAddess)) {
                    dataResponse = await saveUserAddress({ ...address, status: 'USED' }).unwrap();
                    if (checkServiceResponse(dataResponse)) {
                        const { data } = dataResponse;
                        if (data && data?.length > 0) {
                            dispatch(setListUserAddressByUserId(data));
                            setTimeout(() => {
                                enqueueSnackbarSuccessComponent();
                                dispatch(closeDialogMessage());
                                dispatch(setIsLoadingDailog(false));
                            }, 500);
                        } else {
                            enqueueSnackbarErrorComponent();
                        }
                    } else {
                        dispatch(setIsLoadingDailog(false));
                        enqueueSnackbarErrorComponent();
                    }
                } else {
                    dispatch(setIsLoadingDailog(false));
                    enqueueSnackbarErrorComponent();
                }


            },
        }));
    }
    // form submit

    useEffect(() => {
        const getUserInfo = async (userId: number) => {
            if (userId) {
                await getProvinceOption().unwrap();
                await getlistUserAddressByUserId({ userId }).unwrap();
            }
        }

        const token = userProfile;
        if (token) {
            const user = jwtDecode(token);
            const { userDetail } = user;
            getUserInfo(userDetail.userId);
        }

        if (userAuthen && userAuthen?.accessToken) {
            const user = jwtDecode(userAuthen.accessToken);
            const { userDetail } = user;
            getUserInfo(userDetail.userId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userProfile, userAuthen]);

    useEffect(() => {
        setListAddress(listUserAddressByUserId || []);
    }, [listUserAddressByUserId]);

    return (
        <Card>
            <CardHeader
                sx={{ mb: 3 }}
                title={<TitleLable title={t('profile.editAddress')} />}
                action={
                    <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={addressForm.onTrue}
                        startIcon={<Iconify icon="mingcute:add-line" />}
                    >
                        {`${t('registerForm.shipping.addAddress')}`}
                    </Button>
                }
            />
            <Grid container spacing={3} >
                <Grid item xs={12} md={12}>
                    <Box sx={{ px: 2 }}>
                        {listAddress?.slice(0, 4).map((address) => (
                            <AddressItem
                                key={address.id}
                                selectShipping='ACTIVE'
                                address={address}
                                action={
                                    <Stack flexDirection="row" flexWrap="wrap" flexShrink={0} alignItems="center">
                                        {address.status !== 'USED' && (
                                            <>
                                                <IconButton onClick={() => handleDeleteAddress(address)}>
                                                    <Iconify icon="fluent:delete-16-filled" color='red' />
                                                </IconButton>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    onClick={() => selectAddress(address)}
                                                >
                                                    {`${t('registerForm.shipping.selectAddress')}`}
                                                </Button>
                                            </>
                                        )}
                                    </Stack>
                                }
                                sx={{
                                    p: 3,
                                    mb: 3,
                                    borderRadius: 2
                                }}
                            />
                        ))}
                    </Box>
                </Grid>
            </Grid>
            <AddressNewForm
                open={addressForm.value}
                onClose={addressForm.onFalse}
            />
        </Card>
    );
}

export default UserProfileAddressForm;
