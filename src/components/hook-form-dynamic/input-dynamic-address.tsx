import { useFormContext } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { useListDistrictByProvinceCodeMutation, useListSubDistrictByDistrictCodeMutation } from "src/api/master-data.api";
import { selectMasterData, setClientListDistrict, setClientListSubDistrict, setClientAddressProviceCode } from "src/slices/master-data.slices";

import { MasterDistrictModel, MasterSubDistrictModel, MasterProvinceSearchResponse } from "src/types/master-config";

import RHFTextFieldDynamic from "./rhf-text-field";
import RHFAutocompleteDynamic from "./rhf-autocomplete";


type GetListDistrictByCodeBody = {
    provinceCode: string
}
const InputDynamicAddress = ({ value, onChange, type, error, field, sx, listDynamicForm, ...rest }: any) => {

    const dispatch = useAppDispatch();
    const { setValue } = useFormContext();
    const { listProvinceOption } = useAppSelector(selectMasterData);

    const [getListDistrictByCode] = useListDistrictByProvinceCodeMutation();

    const getListDistrictByProvinceCode = async (provinceCode: string) => {
        const model: GetListDistrictByCodeBody = { provinceCode };
        const { data } = await getListDistrictByCode(model).unwrap();
        dispatch(setClientListDistrict(data));
    }

    switch (type) {
        case "CLIENT_PROVINCE_CODE":
            return (
                <RHFAutocompleteDynamic
                    field={field}
                    label={rest?.label}
                    value={field?.value}
                    error={error}
                    options={listProvinceOption && listProvinceOption?.length && listProvinceOption?.map((res: MasterProvinceSearchResponse) => ({
                        id: res.provinceCode || '',
                        label: res.provinceNameTh || '',
                    })) || []}
                    sx={sx}
                    rest={rest}
                    onChange={(_, newValue: any) => {
                        field.onChange(newValue?.id);

                        getListDistrictByProvinceCode(newValue?.id);
                        dispatch(setClientAddressProviceCode(newValue?.id));

                        setValue(rest?.reference, newValue?.label);
                        const districtCode = listDynamicForm?.find((res: any) => res?.type === 'CLIENT_DISTRICT_CODE');
                        const districtDesc = listDynamicForm?.find((res: any) => res?.type === 'CLIENT_DISTRICT_DESC');
                        const subDistrictCode = listDynamicForm?.find((res: any) => res?.type === 'CLIENT_SUBDISTRICT_CODE');
                        const subDistrictDesc = listDynamicForm?.find((res: any) => res?.type === 'CLIENT_SUBDISTRICT_DESC');
                        const zipCode = listDynamicForm?.find((res: any) => res?.type === 'CLIENT_ZIPCODE');
                        setValue(zipCode?.key, '');
                        setValue(districtDesc?.key, '');
                        setValue(districtCode?.key, '');
                        setValue(subDistrictCode?.key, '');
                        setValue(subDistrictDesc?.key, '');
                    }}
                />
            );
        case "CLIENT_ADDRESS1":
            return (
                <RHFTextFieldDynamic
                    field={field}
                    label={rest?.label}
                    error={error}
                    sx={sx}
                    rest={rest}
                />
            );
        case "CLIENT_ADDRESS2":
            return (
                <RHFTextFieldDynamic
                    field={field}
                    label={rest?.label}
                    error={error}
                    sx={sx}
                    rest={rest}
                />
            );
        case "CLIENT_DISTRICT_CODE":
            return (
                <DistrictSelect
                    field={field}
                    error={error}
                    sx={sx}
                    rest={rest}
                    listDynamicForm={listDynamicForm}
                />
            );

        case "CLIENT_SUBDISTRICT_CODE":
            return (
                <SubDistrictSelect
                    field={field}
                    error={error}
                    sx={sx}
                    rest={rest}
                    listDynamicForm={listDynamicForm}
                />
            );
        case "CLIENT_ZIPCODE":
            return (
                <RHFTextFieldDynamic
                    field={field}
                    label={rest?.label}
                    error={error}
                    sx={sx}
                    rest={rest}
                />
            );
        default:
            return null;
    }
};

export default InputDynamicAddress;


const DistrictSelect = ({
    field,
    error,
    sx,
    rest,
    listDynamicForm
}: any) => {

    const dispatch = useAppDispatch();
    const { setValue } = useFormContext();
    const { clientListDistrict } = useAppSelector(selectMasterData);

    const [getListSubDistrictByDistrictCode] = useListSubDistrictByDistrictCodeMutation();

    return (
        <RHFAutocompleteDynamic
            field={field}
            label={rest?.label}
            value={field?.value}
            error={error}
            options={clientListDistrict && clientListDistrict?.length && clientListDistrict?.map((res: MasterDistrictModel) => ({
                id: res.districtCode,
                label: res.districtNameTh,
            })) || []}
            sx={sx}
            rest={rest}
            onChange={async (_, newValue: any) => {
                field.onChange(newValue?.id);
                setValue(rest?.reference, newValue?.label);
                const model = { districtCode: newValue?.id };
                const { data } = await getListSubDistrictByDistrictCode(model).unwrap();
                dispatch(setClientListSubDistrict(data));
                const subDistrictCode = listDynamicForm?.find((res: any) => res?.type === 'CLIENT_SUBDISTRICT_CODE');
                const subDistrictDesc = listDynamicForm?.find((res: any) => res?.type === 'CLIENT_SUBDISTRICT_DESC');
                setValue(subDistrictCode?.key, '');
                setValue(subDistrictDesc?.key, '');
            }}
        />
    )
}

const SubDistrictSelect = ({
    field,
    error,
    sx,
    rest,
    listDynamicForm
}: any) => {

    const { setValue } = useFormContext();
    const { clientListSubDistrict } = useAppSelector(selectMasterData);

    return (
        <RHFAutocompleteDynamic
            field={field}
            label={rest?.label}
            value={field?.value}
            error={error}
            options={clientListSubDistrict && clientListSubDistrict?.length && clientListSubDistrict?.map((res: MasterSubDistrictModel) => ({
                id: res.subDistrictCode || '',
                label: res.subDistrictNameTh || '',
            })) || []}
            sx={sx}
            rest={rest}
            onChange={(_, newValue: any) => {
                field.onChange(newValue?.id);
                setValue(rest?.reference, newValue?.label);
                const zipCode = listDynamicForm?.find((res: any) => res?.type === 'CLIENT_ZIPCODE');
                setValue(zipCode?.key, '');
            }}
        />
    )
}