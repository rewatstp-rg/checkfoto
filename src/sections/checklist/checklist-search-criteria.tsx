import * as Yup from 'yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box, Stack } from '@mui/material';

import { useTranslate } from 'src/locales';
import { BaseOption } from 'src/api/base/types';
import { useAppSelector } from 'src/store/hooks';
import { selectCommonSlice } from 'src/slices/common.slices';

import { ButtonSearchCriteriaShort } from 'src/components/button-search';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

import { Config } from 'src/types/master-config';

export default function CheckListSearchCriteria({ isLoading, onSearch, onReset }: any) {

    const { t } = useTranslate();

    const { listEventCheckRegister } = useAppSelector(selectCommonSlice);
    const listMemo = useMemo(() => listEventCheckRegister?.filter((item: Config) => item?.value4 !== 'VIRTUAL_RUN'), [listEventCheckRegister]);

    const searchCriteriaSchema = Yup.object().shape({
        eventCode: Yup.string().required(t('common.required')),
        keyword: Yup.string()
    });

    const defaultValues = {
        eventCode: '',
        keyword: ''
    };

    const methods = useForm({
        resolver: yupResolver(searchCriteriaSchema),
        defaultValues,
    });

    const {
        reset,
        watch,
        handleSubmit
    } = methods;

    const values = watch();

    const onSubmitForm = handleSubmit(async (dataValue: any) => {
        try {
            onSearch(dataValue);
        } catch (err) {
            console.log("🚀 ~ file: checklist-search-criteria.tsx:32 ~ onSubmitForm ~ err:", err)
        }
    })

    const onResetForm = () => {
        reset(defaultValues);
        onReset();
    }

    return (
        <FormProvider methods={methods} onSubmit={onSubmitForm}>
            <Stack
                spacing={2}
                alignItems={{ xs: 'flex-end', md: 'center' }}
                direction={{
                    xs: 'column',
                    md: 'row',
                }}
                sx={{
                    pb: 2.5
                }}
            >

                <RHFAutocomplete
                    name="eventCode"
                    required
                    value={values.eventCode}
                    label={t('orders.eventName')}
                    options={listMemo && listMemo?.length && listMemo?.map((res: Config) => ({
                        id: res.value1 || '',
                        name: res.name || '',
                    })) || []}
                    getOptionLabel={(option: BaseOption['name']) => option.name || ''}
                    isOptionEqualToValue={(option: BaseOption, value: BaseOption) => option?.name === value?.name}
                    renderOption={(props, option) => (
                        <li {...props} key={option.id}>
                            {option.name}
                        </li>
                    )}
                />


                <RHFTextField name="keyword" label={t('orders.keyword')} size="medium" />

                <Box sx={{ mt: '30px !important' }}>
                    <ButtonSearchCriteriaShort
                        loading={isLoading}
                        onCancel={() => onResetForm()}
                    />
                </Box>

            </Stack>
        </FormProvider>
    );
}