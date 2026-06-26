import { useState, useEffect } from "react";

import { useLocales } from "src/locales";
import { BaseOption } from "src/api/base/types";
import { useAppDispatch } from "src/store/hooks";
import { setClientListSubDistrict } from "src/slices/master-data.slices";
import { useListSubDistrictByDistrictCodeMutation } from "src/api/master-data.api";

import { MasterSubDistrictModel } from "src/types/master-config";

import { RHFAutocomplete } from "../hook-form";

type PropsType = {
    name: string;
    type: string;
    label: string;
    districtCode: string;
    values: any;
    onChangeInput: (value: string) => void;
    required?: boolean,
    disabled?: boolean,
}
const SubDistrictSelect = ({
    name,
    type,
    values,
    label,
    districtCode,
    onChangeInput,
    required,
    disabled
}: PropsType) => {

    const dispatch = useAppDispatch();
    const { currentLang } = useLocales();

    const [getListSubDistrictByDistrictCode] = useListSubDistrictByDistrictCodeMutation();

    const [listSubDistrict, setListSubDistrict] = useState<MasterSubDistrictModel[]>([]);

    const getListSubDistrictByDistrictCodeOption = async () => {
        const model = { districtCode };
        const { data } = await getListSubDistrictByDistrictCode(model).unwrap();
        setListSubDistrict(data);
        dispatch(setClientListSubDistrict(data));
    }

    useEffect(() => {
        if (districtCode) {
            getListSubDistrictByDistrictCodeOption();
        } else {
            setListSubDistrict([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [districtCode]);

    return (
        <RHFAutocomplete
            disabled={disabled}
            required={required}
            viewType={type}
            name={name}
            label={label}
            value={values}
            options={listSubDistrict && listSubDistrict?.length && listSubDistrict?.map((res: MasterSubDistrictModel) => ({
                id: res.subDistrictCode || '',
                name: currentLang?.value === 'en' ? res.subDistrictNameEng || '' : res.subDistrictNameTh || '',
            })) || []}
            getOptionLabel={(option: BaseOption['name']) => option.name || ''}
            isOptionEqualToValue={(option: BaseOption, value: BaseOption) => option?.name === value?.name}
            renderOption={(props, option) => (
                <li {...props} key={option.id}>
                    {option.name}
                </li>
            )}
            onChangeInput={(e: any) => {
                const { value } = e.target;
                const finItem = listSubDistrict.find((x => x.subDistrictCode === value));
                onChangeInput(finItem?.zipcode || '');
            }}
        />
    )
}

export default SubDistrictSelect;