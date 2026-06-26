import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { getStorage } from 'src/hooks/use-local-storage';

import { STORAGE_KEYS, ERROR_MESSAGE, ERROR_MESSAGE_EN } from 'src/utils/constants';
import { checkServiceResponse, PropsCheckServiceResponse } from 'src/utils/check-service-response';
import { enqueueSnackbarErrorComponent, enqueueSnackbarSuccessComponent } from 'src/utils/enqueueSnackbarComponent';

import { BaseOption } from 'src/api/base/types';
import { jwtDecode } from 'src/auth/context/jwt/utils';
import { useLocales, useTranslate } from 'src/locales';
import { useSaveUserAddressMutation } from 'src/api/user.api';
import { setShippingAddress } from 'src/slices/register.slices';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { selectMasterData } from 'src/slices/master-data.slices';
import { setSelectAddress, setListUserAddressByUserId } from 'src/slices/user.slices';
import { setDialogMessage, closeDialogMessage, setIsLoadingDailog } from 'src/slices/error-message.slices';

import FormProvider, {
  RHFTextField,
  RHFAutocomplete
} from 'src/components/hook-form';

import { IAddressItem } from 'src/types/address';
import { UserAddressModel } from 'src/types/user';
import { MasterDistrictModel, MasterSubDistrictModel, MasterProvinceSearchResponse } from 'src/types/master-config';

import DistrictSelect from '../district-select/district-select';
import SubDistrictSelect from '../sub-district-select/sub-district-select';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  onCreate?: (address: IAddressItem) => void;
};

export default function AddressNewForm({ open, onClose, onCreate }: Props) {

  const key = STORAGE_KEYS.USER_INFO;
  const userProfile = getStorage(key);

  const { t } = useTranslate();
  const { currentLang } = useLocales();

  const dispatch = useAppDispatch();

  const [saveUserAddress] = useSaveUserAddressMutation();
  const { listProvinceOption, clientListDistrict, clientListSubDistrict } = useAppSelector(selectMasterData);

  const NewAddressSchema = Yup.object().shape({
    id: Yup.number(),
    userCode: Yup.string(),
    userId: Yup.number(),
    userAddressCode: Yup.string(),
    fullName: Yup.string().required(currentLang?.value === 'en' ? ERROR_MESSAGE_EN.REQUIRED : ERROR_MESSAGE.REQUIRED),
    tel: Yup.string().required(currentLang?.value === 'en' ? ERROR_MESSAGE_EN.REQUIRED : ERROR_MESSAGE.REQUIRED),
    address: Yup.string().required(currentLang?.value === 'en' ? ERROR_MESSAGE_EN.REQUIRED : ERROR_MESSAGE.REQUIRED),

    provinceCode: Yup.string().required(currentLang?.value === 'en' ? ERROR_MESSAGE_EN.REQUIRED : ERROR_MESSAGE.REQUIRED),
    provinceDesc: Yup.string(),
    provinceNameTh: Yup.string(),
    provinceNameEng: Yup.string(),

    districtCode: Yup.string().required(currentLang?.value === 'en' ? ERROR_MESSAGE_EN.REQUIRED : ERROR_MESSAGE.REQUIRED),
    districtDesc: Yup.string(),
    districtNameTh: Yup.string(),
    districtNameEng: Yup.string(),

    subDistrictCode: Yup.string().required(currentLang?.value === 'en' ? ERROR_MESSAGE_EN.REQUIRED : ERROR_MESSAGE.REQUIRED),
    subDistrictDesc: Yup.string(),
    subDistrictNameTh: Yup.string(),
    subDistrictNameEng: Yup.string(),

    zipcode: Yup.string().required(currentLang?.value === 'en' ? ERROR_MESSAGE_EN.REQUIRED : ERROR_MESSAGE.REQUIRED),
    status: Yup.string(),
    statusDesc: Yup.string(),
    createDtm: Yup.string(),
    fullAddress: Yup.string()
  });

  const defaultValues = {
    id: 0,
    userCode: '',
    userId: 0,
    userAddressCode: '',
    fullName: '',
    tel: '',
    address: '',
    provinceCode: '',
    provinceDesc: '',
    provinceNameTh: '',
    provinceNameEng: '',

    districtCode: '',
    districtDesc: '',
    districtNameTh: '',
    districtNameEng: '',

    subDistrictCode: '',
    subDistrictDesc: '',
    subDistrictNameTh: '',
    subDistrictNameEng: '',

    zipcode: '',
    status: '',
    statusDesc: '',
    createDtm: '',
    fullAddress: ''
  };

  const methods = useForm({
    resolver: yupResolver(NewAddressSchema),
    defaultValues,
  });

  const {
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (dataForm) => {

    try {

      const token = userProfile;
      const user = jwtDecode(token as string);
      const { userDetail } = user;

      const subDistrict = clientListSubDistrict?.find((x: MasterSubDistrictModel) => x?.subDistrictCode === dataForm?.subDistrictCode);
      const district = clientListDistrict?.find((x: MasterDistrictModel) => x.districtCode === dataForm?.districtCode);
      const provice = listProvinceOption?.find((x: MasterProvinceSearchResponse) => x.provinceCode === dataForm?.provinceCode);
      const fullAddressTh = `${dataForm.address} ${t('subDistrict')} ${subDistrict?.subDistrictNameTh} ${t('district')} ${district?.districtNameTh} ${t('province')} ${provice?.provinceNameTh} ${t('postcode')} ${dataForm.zipcode}`;
      const fullAddressEn = `${dataForm.address} ${t('subDistrict')} ${subDistrict?.subDistrictNameEng} ${t('district')} ${district?.districtNameEng} ${t('province')} ${provice?.provinceNameEng} ${t('postcode')} ${dataForm.zipcode}`;
      dataForm = {
        ...dataForm,
        userId: userDetail?.userId || 0,
        provinceNameTh: provice?.provinceNameTh,
        provinceNameEng: provice?.provinceNameEng,
        districtNameTh: district?.districtNameTh,
        districtNameEng: district?.districtNameEng,
        subDistrictNameTh: subDistrict?.subDistrictNameTh,
        subDistrictNameEng: subDistrict?.subDistrictNameEng,
        fullAddress: currentLang?.value === 'en' ? fullAddressEn : fullAddressTh
      }

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

          dataResponse = await saveUserAddress(dataForm).unwrap();

          if (checkServiceResponse(dataResponse)) {
            const { data } = dataResponse;
            if (data && data?.length > 0) {
              const useAddress = data.find((x: UserAddressModel) => x.status === 'USED');
              dispatch(setListUserAddressByUserId(data));
              setTimeout(() => {
                dispatch(setSelectAddress(useAddress));
                dispatch(setShippingAddress(useAddress));
                enqueueSnackbarSuccessComponent();
                handleClose();
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
  });

  const handleClose = () => {
    reset({
      id: 0,
      userCode: '',
      userId: 0,
      userAddressCode: '',
      fullName: '',
      tel: '',
      address: '',
      provinceCode: '',
      provinceDesc: '',
      provinceNameTh: '',
      provinceNameEng: '',

      districtCode: '',
      districtDesc: '',
      districtNameTh: '',
      districtNameEng: '',

      subDistrictCode: '',
      subDistrictDesc: '',
      subDistrictNameTh: '',
      subDistrictNameEng: '',

      zipcode: '',
      status: '',
      statusDesc: '',
      createDtm: '',
      fullAddress: ''
    });
    onClose();
  }

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>{t('registerForm.shipping.addressInfo')}</DialogTitle>

        <DialogContent dividers>
          <Stack spacing={3}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="fullName" label={t('shippingFullName')} required inputProps={{ maxLength: 100 }} />

              <RHFTextField name="tel" label={t('shippingTel')} required inputProps={{ maxLength: 100 }} />
            </Box>

            <RHFTextField name="address" label={t('addressDesc')} required inputProps={{ maxLength: 200 }} />

            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)'
              }}
            >
              <RHFAutocomplete
                required
                name="provinceCode"
                label={t('province')}
                value={values?.provinceCode}
                options={listProvinceOption && listProvinceOption?.length && listProvinceOption?.map((res: MasterProvinceSearchResponse) => ({
                  id: res.provinceCode || '',
                  name: currentLang?.value === 'en' ? res.provinceNameEng || '' : res.provinceNameTh || '',
                })) || []}
                getOptionLabel={(option: BaseOption['name']) => option.name || ''}
                isOptionEqualToValue={(option: BaseOption, value: BaseOption) => option?.name === value?.name}
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChangeInput={() => {
                  setValue('districtCode', '');
                  setValue('districtCode', '');
                  setValue('subDistrictCode', '');
                  setValue('zipcode', '');
                }}
              />

              <DistrictSelect
                required
                provinceCode={values?.provinceCode || ''}
                name="districtCode"
                type=''
                label={t('district')}
                values={values?.districtCode}
                onChangeInput={(y) => {
                  setValue('subDistrictCode', '');
                  setValue('zipcode', '');
                }}
              />

              <SubDistrictSelect
                required
                districtCode={values?.districtCode || ''}
                name="subDistrictCode"
                type=''
                label={t('subDistrict')}
                values={values?.subDistrictCode}
                onChangeInput={(postcode) => {
                  if (postcode) {
                    setValue('zipcode', postcode);
                  } else {
                    setValue('zipcode', '');
                  }
                }}
              />


              <RHFTextField name="zipcode" label={t('postcode')} type='text' inputType="numberChar" inputProps={{ maxLength: 5 }} required />
            </Box>

            {/* <RHFCheckbox name="primary" label={t('registerForm.shipping.useDefault')} /> */}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button color="inherit" variant="outlined" onClick={handleClose}>
            {t('close')}
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {t('saveBtn')}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
