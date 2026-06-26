import { useState, useEffect } from "react";

import { useLocales } from "src/locales";
import { BaseOption } from "src/api/base/types";
import { useAppDispatch } from "src/store/hooks";
import { setClientListDistrict } from "src/slices/master-data.slices";
import { useListDistrictByProvinceCodeMutation } from "src/api/master-data.api";

import { MasterDistrictModel } from "src/types/master-config";

import { RHFAutocomplete } from "../hook-form";

type PropsType = {
    name: string;
    type: string;
    label: string;
    provinceCode: string;
    values: any;
    onChangeInput: (value: string) => void;
    required?: boolean;
    disabled?: boolean;
}

type GetListDistrictByCodeBody = {
    provinceCode: string
}
const DistrictSelect = ({
    name,
    type,
    values,
    label,
    provinceCode,
    onChangeInput,
    required,
    disabled
}: PropsType) => {

    const dispatch = useAppDispatch();
    const { currentLang } = useLocales();

    const [getListDistrictByCode] = useListDistrictByProvinceCodeMutation();

    const [listDistrict, setListDistrict] = useState<MasterDistrictModel[]>([]);

    const getListDistrictByProvinceCode = async () => {
        const model: GetListDistrictByCodeBody = { provinceCode };
        const { data } = await getListDistrictByCode(model).unwrap();
        setListDistrict(data);
        dispatch(setClientListDistrict(data));
    }

    useEffect(() => {
        if (provinceCode) {
            getListDistrictByProvinceCode();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [provinceCode]);

    return (
        <RHFAutocomplete
            disabled={disabled}
            viewType={type}
            required={required}
            name={name}
            label={label}
            value={values}
            options={listDistrict && listDistrict?.length && listDistrict?.map((res: MasterDistrictModel) => ({
                id: res.districtCode,
                name: currentLang?.value === 'en' ? res.districtNameEng || '' : res.districtNameTh || '',
            })) || []}
            getOptionLabel={(option: BaseOption['name']) => option.name || ''}
            isOptionEqualToValue={(option: BaseOption, value: BaseOption) => option?.name === value?.name}
            renderOption={(props, option) => (
                <li {...props} key={option.id}>
                    {option.name}
                </li>
            )}
            onChangeInput={onChangeInput}
        />
    )
}

export default DistrictSelect;
