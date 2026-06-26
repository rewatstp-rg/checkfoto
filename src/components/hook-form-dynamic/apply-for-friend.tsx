import { useState } from 'react';
import { useWatch, useFormContext } from 'react-hook-form';

import { Box, Radio, TextField, RadioGroup, Typography, FormControl, Autocomplete, FormHelperText, FormControlLabel } from '@mui/material';

import { HTML_KEY } from 'src/utils/constants';

import { useTranslate } from 'src/locales';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { selectRegister, filterTicketByAge } from 'src/slices/register.slices';

import Iconify from 'src/components/iconify';
import ComponentBlock from 'src/components/block/component-block';

import { Block } from '../block/block';

const { BIRTH, TICKET_NAME_TH, TICKET_NAME_EN, TICKET_PRICE, PRICE_CODE, TICKET_CODE } = HTML_KEY;

type Props = {
    label: string;
    labelEn: string;
    rest?: any;
    field?: any;
    error?: any;
};

export function ApplyForFriend({ rest, label = '', labelEn, field, error }: Props) {
    // console.log("🚀 ~ file: apply-for-friend.tsx:24 ~ ApplyForFriend ~ rest:", rest)

    const dispatch = useAppDispatch();
    const { t } = useTranslate();
    const { control, setValue, unregister } = useFormContext();
    const { listFriend, listRegisterForm, listTicketOptionInputField } = useAppSelector(selectRegister);
    const userType = useWatch({ control, name: 'USER_TYPE' });
    // console.log("🚀 ~ ApplyForFriend ~ userType:", userType)
    const [optionValue, setOptionValue] = useState<any>(null);

    return (
        <FormControl component="fieldset" fullWidth>
            <Box sx={{ mb: 4 }}>
                <ComponentBlock
                    minHeight={80}
                    sx={{ justifyContent: 'flex-start', flexDirection: 'column', alignItems: 'flex-start', gap: 0 }}>
                    <Box sx={{ mb: 1, mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Iconify icon="mdi:auto-fix" color="red" width={20} />
                        <Typography variant="body2" sx={{ color: 'text.secondary', ml: 1, fontSize: 16, fontWeight: 'bold' }}>
                            {t('autofill')} {rest?.rules ? <Box component='span' color="#FF0000">*</Box> : ''}
                        </Typography>
                    </Box>
                    <RadioGroup  {...field} onChange={(e) => {
                        setValue('USER_TYPE', e.target.value);
                        setOptionValue(null);
                        if (e.target.value === 'MAIN') {
                            const meItem: any = listFriend?.find(x => x.userType === 'MAIN');
                            if (meItem && meItem?.listObject) {

                                listRegisterForm?.forEach((item) => {
                                    if (item?.key && item?.htmlInputKey) {
                                        setValue(item.key, '');
                                        setValue(item?.htmlInputKey, '');
                                    }
                                });

                                Object.keys(meItem?.listObject).forEach((key: any) => {
                                    const itemMe = listRegisterForm?.find((itemFilter: any) => itemFilter?.htmlInputKey === key);
                                    if (key && key !== 'SHIRT') {
                                        if (itemMe && itemMe?.key && meItem?.listObject) {
                                            if (itemMe?.option) {
                                                if (meItem?.listObject && meItem.listObject[key]) {
                                                    const findOption = itemMe?.listOption?.find((findItem) => findItem.key === meItem.listObject[key]);
                                                    if (findOption) {
                                                        setValue(itemMe.key, findOption.key);
                                                        setValue(key, findOption.key);
                                                    } else {
                                                        const findOptionKey = itemMe?.listOption?.find((findItem) => findItem?.value1 === meItem.listObject[key]);
                                                        if (findOptionKey) {
                                                            setValue(itemMe.key, findOptionKey.key);
                                                            setValue(key, findOptionKey.key);
                                                        } else {
                                                            setValue(itemMe.key, '');
                                                            setValue(key, '');
                                                        }
                                                    }
                                                } else {
                                                    setValue(itemMe.key, '');
                                                    setValue(key, '');
                                                }
                                            } else {
                                                if (key === BIRTH) {
                                                    const words: any = meItem?.listObject[key]?.split('-');
                                                    if (words?.length > 0) {
                                                        const year = new Date().getFullYear();
                                                        const age = year - words[0];
                                                        if (listTicketOptionInputField && listTicketOptionInputField?.length > 0) {
                                                            listTicketOptionInputField.map((ticketOptionInputField) => (
                                                                unregister(ticketOptionInputField.key)
                                                            ));
                                                        }
                                                        dispatch(filterTicketByAge(age));
                                                        setValue(TICKET_CODE, '');
                                                        setValue(TICKET_NAME_TH, '');
                                                        setValue(TICKET_NAME_EN, '');
                                                        setValue(TICKET_PRICE, 0);
                                                        setValue(PRICE_CODE, '');
                                                    }
                                                }
                                                setValue(itemMe.key, meItem.listObject[key] || '');
                                                setValue(key, meItem.listObject[key] || '');
                                            }
                                        }
                                    }
                                })
                            }
                        }
                    }}>
                        <FormControlLabel value="MAIN" control={<Radio size="medium" />} label={t('me')} />
                        <FormControlLabel value="FRIEND" control={<Radio size="medium" />} label={t('forFriends')} />
                    </RadioGroup>
                    {
                        userType === 'FRIEND' && <Block label={t('selectFriend')} sx={{ mt: 1 }}>
                            <Autocomplete
                                fullWidth
                                options={listFriend?.filter(x => x.userType !== 'MAIN')}
                                value={optionValue}
                                getOptionLabel={(option) => option?.fullName?.toString() || ''}
                                renderInput={(params) => <TextField {...params} hiddenLabel placeholder={t('selectFriend')} />}
                                onChange={(event, newValue: any) => {
                                    setOptionValue(newValue);

                                    listRegisterForm?.forEach((item) => {
                                        if (item?.key && item?.htmlInputKey) {
                                            setValue(item.key, '');
                                            setValue(item?.htmlInputKey, '');
                                        }
                                    });

                                    Object.keys(newValue?.listObject).forEach(key => {
                                        const item = listRegisterForm?.find((itemFilter: any) => itemFilter?.htmlInputKey === key);
                                        if (item?.key) {
                                            if (key && key !== 'SHIRT') {
                                                if (item && item?.key) {
                                                    if (item?.option) {
                                                        if (newValue?.listObject && newValue.listObject[key]) {
                                                            const findOption = item?.listOption?.find((findItem) => findItem.key === newValue.listObject[key]);
                                                            if (findOption) {
                                                                setValue(item.key, findOption.key);
                                                                setValue(key, findOption.key);
                                                            } else {
                                                                const findOptionKey = item?.listOption?.find((findItem) => findItem?.value1 === newValue.listObject[key]);
                                                                if (findOptionKey) {
                                                                    setValue(item.key, findOptionKey.key);
                                                                    setValue(key, findOptionKey.key);
                                                                } else {
                                                                    setValue(item.key, '');
                                                                    setValue(key, '');
                                                                }
                                                            }
                                                        } else {
                                                            setValue(item.key, '');
                                                            setValue(key, '');
                                                        }
                                                    } else {
                                                        if (key === BIRTH) {
                                                            const words: any = newValue?.listObject[key]?.split('-');
                                                            if (words?.length > 0) {
                                                                const year = new Date().getFullYear();
                                                                const age = year - words[0];
                                                                if (listTicketOptionInputField && listTicketOptionInputField?.length > 0) {
                                                                    listTicketOptionInputField.map((ticketOptionInputField) => (
                                                                        unregister(ticketOptionInputField.key)
                                                                    ));
                                                                }
                                                                dispatch(filterTicketByAge(age));
                                                                setValue(TICKET_CODE, '');
                                                                setValue(TICKET_NAME_TH, '');
                                                                setValue(TICKET_NAME_EN, '');
                                                                setValue(TICKET_PRICE, 0);
                                                                setValue(PRICE_CODE, '');
                                                            }
                                                        }
                                                        setValue(item.key, newValue.listObject[key] || '');
                                                        setValue(key, newValue.listObject[key] || '');
                                                    }
                                                }
                                            }
                                        }
                                    })

                                }}
                                renderOption={(props, option) => (
                                    <li {...props} key={option.fullName}>
                                        {option.fullName}
                                    </li>
                                )}
                            />
                        </Block>
                    }
                    {!!error && (
                        <FormHelperText error sx={{ px: 2, textAlign: 'left' }}>
                            {error.message}
                        </FormHelperText>
                    )}
                </ComponentBlock>
            </Box>
        </FormControl>
    );
}