
import { useForm } from 'react-hook-form';
import { useState, useEffect } from "react";

import {
    Box,
    Grid
} from "@mui/material";

import { useRouter } from 'src/routes/hooks';

import { getStorage } from "src/hooks/use-local-storage";

import { STORAGE_KEYS } from "src/utils/constants";
import { checkServiceResponse } from 'src/utils/check-service-response';
import { enqueueSnackbarErrorComponent, enqueueSnackbarSuccessComponent } from 'src/utils/enqueueSnackbarComponent';

import { useTranslate } from 'src/locales';
import { selectAuthMenu } from 'src/slices/menu.slices';
import { setUserAuthen } from 'src/slices/authen.slices';
import { useSaveUserProfileMutation } from 'src/api/user.api';
import { setUrlRedirct } from 'src/slices/dialog-login.slices';
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { jwtDecode, setSession } from "src/auth/context/jwt/utils";
import { setLoadingState, setDialogMessage, closeDialogMessage } from 'src/slices/error-message.slices';

import TitleLable from 'src/components/title-lable';
import CardCustom from 'src/components/card/card-custom';
import { ButtonSubmitForm } from 'src/components/button-forom';
import FormProvider from 'src/components/hook-form/form-provider';
import FormInputController from 'src/components/hook-form-dynamic/form-input-controller';

import { IUserAccount } from 'src/types/user';
import { DynamicFormType } from 'src/types/input-column.model';

// ----------------------------------------------------------------------

export const HOST_API = import.meta.env.VITE_HOST_URL_FOR_RUN;

const UserProfileForm = () => {

    const router = useRouter();
    const { t } = useTranslate();
    const dispatch = useAppDispatch();

    const key = STORAGE_KEYS.USER_INFO;
    const userProfile = getStorage(key);

    const { menuType } = useAppSelector(selectAuthMenu);

    const [menuTypeForm, setMenuTypeForm] = useState('');

    const [saveUserProfile] = useSaveUserProfileMutation();

    const [userForm, setUserForm] = useState<DynamicFormType[]>([]);

    const methods = useForm({
        mode: "all",
    });

    const {
        handleSubmit,
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {

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

                    const userModel: IUserAccount = {
                        ...data
                    }

                    dispatch(setLoadingState(true));
                    await saveUserProfile(userModel).unwrap().then((response) => {
                        setTimeout(() => {
                            if (checkServiceResponse(response)) {
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
                    });
                }
            }));
        } catch (error) {
            dispatch(setLoadingState(false));
            dispatch(closeDialogMessage());
            enqueueSnackbarErrorComponent();
            console.error(error);
        }
    });
    // form submit

    const onBack = async () => {
        const urlVr = HOST_API;
        if (menuTypeForm === 'VR') {
            window.location.href = urlVr;
        } else {
            router.back();
        }
    }

    useEffect(() => {
        if (userProfile) {
            const form = dataFrom.map((item) => ({
                ...item,
                defaultValue: jwtDecode(userProfile)?.userDetail[item.key] || item.defaultValue,
            }));
            setUserForm(form);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userProfile]);

    useEffect(() => {
        setMenuTypeForm(menuType);
    }, [menuType])

    return (
        <FormProvider methods={methods} onSubmit={onSubmit}>
            <CardCustom>
                <TitleLable title={t('profile.editProfile')} />
                <Grid container spacing={3} >
                    <Grid item xs={12} md={12}>
                        <Grid container spacing={3} >
                            {
                                userForm && userForm?.length > 0 && (
                                    <FormInputController dynamicForm={userForm || []} />
                                )
                            }
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
        </FormProvider>
    );
}

export default UserProfileForm;

const dataFrom: DynamicFormType[] = [
    {
        "label": "ชื่อจริง (ภาษาอังกฤษ)",
        "labelEn": "First Name",
        "name": "firstName",
        "key": "firstname",
        "type": "input",
        "placeholder": "ชื่อจริง (ภาษาอังกฤษ)",
        "placeholderEn": "First Name",
        "defaultValue": "",
        "stock": "INACTIVE",
        "disabled": false,
        "rules": {
            "required": "กรุณาระบุ",
            "limitChar": 255,
            "maxLength": 0,
            "minLength": null
        },
        "colLayout": "",
        "col": "6",
        "inputType": "EN",
        "maxLength": 255,
        "option": [],
        "htmlInputKey": "FNAME",
        "descriptionTh": "",
        "descriptionEn": ""
    },
    {
        "label": "นามสกุล (ภาษาอังกฤษ)",
        "labelEn": "Last Name",
        "name": "lastName",
        "key": "lastname",
        "type": "input",
        "placeholder": "นามสกุล (ภาษาอังกฤษ)",
        "placeholderEn": "Last Name",
        "defaultValue": "",
        "stock": "INACTIVE",
        "disabled": false,
        "rules": {
            "required": "กรุณาระบุ",
            "limitChar": 255,
            "maxLength": 0,
            "minLength": null
        },
        "colLayout": "",
        "col": "6",
        "inputType": "EN",
        "maxLength": 255,
        "option": [],
        "htmlInputKey": "LNAME",
        "descriptionTh": "",
        "descriptionEn": ""
    },
    {
        "label": "เพศ",
        "labelEn": "Gender",
        "name": "gender",
        "key": "gender",
        "type": "radioGroupBtnRow",
        "placeholder": "เพศ",
        "placeholderEn": "Gender",
        "defaultValue": "",
        "stock": "INACTIVE",
        "disabled": false,
        "rules": {
            "required": "กรุณาระบุ",
            "limitChar": 255,
            "maxLength": 0,
            "minLength": null
        },
        "colLayout": "",
        "col": "12",
        "inputType": "ALL",
        "maxLength": 255,
        "option": [
            {
                "id": "MALE",
                "value": "MALE",
                "key": "MALE",
                "labelTh": "ชาย",
                "labelEn": "Male"
            },
            {
                "id": "FEMALE",
                "value": "FEMALE",
                "key": "FEMALE",
                "labelTh": "หญิง",
                "labelEn": "Female"
            }
        ],
        "htmlInputKey": "GENDER",
        "descriptionTh": "",
        "descriptionEn": ""
    },
    {
        "label": "วัน/เดือน/ปี (เกิด)",
        "labelEn": "Date of Birth",
        "name": "birthDate",
        "key": "birthDate",
        "type": "datepicker",
        "placeholder": "วัน/เดือน/ปี (เกิด)",
        "placeholderEn": "Date of Birth",
        "defaultValue": "",
        "stock": "INACTIVE",
        "disabled": false,
        "rules": {
            "required": "กรุณาระบุ",
            "minDate": "1945-10-02T17:00:00.000+00:00",
            "maxDate": "2024-10-02T17:00:00.000+00:00",
            "limitChar": 255,
            "maxLength": 0,
            "minLength": null
        },
        "colLayout": "",
        "col": "6",
        "inputType": "",
        "minDate": "1945-10-02T17:00:00.000+00:00",
        "maxDate": "2024-10-02T17:00:00.000+00:00",
        "maxLength": 255,
        "option": [],
        "htmlInputKey": "BIRTH",
        "descriptionTh": "",
        "descriptionEn": ""
    },
    {
        "label": "อีเมล",
        "labelEn": "E-mail",
        "name": "email",
        "key": "email",
        "type": "input",
        "placeholder": "อีเมล",
        "placeholderEn": "E-mail",
        "defaultValue": "",
        "stock": "INACTIVE",
        "disabled": true,
        "rules": {
            "required": "กรุณาระบุ",
            "limitChar": 255,
            "maxLength": 0,
            "minLength": null,
            "pattern": {
                "value": {},
                "message": "invalid email address"
            }
        },
        "colLayout": "",
        "col": "6",
        "inputType": "EMAIL",
        "maxLength": 255,
        "option": [],
        "htmlInputKey": "EMAIL",
        "descriptionTh": "",
        "descriptionEn": ""
    },
    {
        "label": "เบอร์โทรศัพท์",
        "labelEn": "Phone number",
        "name": "tel",
        "key": "tel",
        "type": "input",
        "placeholder": "เบอร์โทรศัพท์",
        "placeholderEn": "Phone number",
        "defaultValue": "",
        "stock": "INACTIVE",
        "disabled": false,
        "rules": {
            "required": "กรุณาระบุ",
            "limitChar": 10,
            "maxLength": 10,
            "minLength": 10
        },
        "colLayout": "",
        "col": "6",
        "inputType": "TEL",
        "maxLength": 10,
        "option": [],
        "htmlInputKey": "TEL",
        "descriptionTh": "",
        "descriptionEn": ""
    },
    {
        "label": "เลขบัตรประชาชน",
        "labelEn": "ID Card",
        "name": "idCard",
        "key": "idCard",
        "type": "input",
        "placeholder": "เลขบัตรประชาชน",
        "placeholderEn": "ID Card",
        "defaultValue": "",
        "stock": "INACTIVE",
        "disabled": false,
        "rules": {
            "required": "กรุณาระบุ",
            "limitChar": 13,
            "maxLength": 13,
            "minLength": 13
        },
        "colLayout": "",
        "col": "6",
        "inputType": "NUMBER",
        "maxLength": 13,
        "option": [],
        "htmlInputKey": "ID_CARD",
        "descriptionTh": "",
        "descriptionEn": ""
    },
    {
        "label": "หมู่เลือด",
        "labelEn": "Blood tpye",
        "name": "bloodGroup",
        "key": "bloodGroup",
        "type": "dropdown",
        "placeholder": "หมู่เลือด",
        "placeholderEn": "Blood tpye",
        "defaultValue": "",
        "stock": "INACTIVE",
        "disabled": false,
        "rules": {
            "required": "กรุณาระบุ",
            "limitChar": 255,
            "maxLength": 0,
            "minLength": null
        },
        "colLayout": "",
        "col": "6",
        "inputType": "",
        "maxLength": 255,
        "option": [
            {
                "id": "A",
                "value": "A",
                "key": "A",
                "labelTh": "A",
                "labelEn": "A"
            },
            {
                "id": "AB",
                "value": "AB",
                "key": "AB",
                "labelTh": "AB",
                "labelEn": "AB"
            },
            {
                "id": "B",
                "value": "B",
                "key": "B",
                "labelTh": "B",
                "labelEn": "B"
            },
            {
                "id": "O",
                "value": "O",
                "key": "O",
                "labelTh": "O",
                "labelEn": "O"
            },
            {
                "id": "UNKNOW",
                "value": "UNKNOW",
                "key": "UNKNOW",
                "labelTh": "ไม่ทราบ",
                "labelEn": "Unknow"
            }
        ],
        "htmlInputKey": "BLOOD_GROUP",
        "descriptionTh": "",
        "descriptionEn": ""
    }
];