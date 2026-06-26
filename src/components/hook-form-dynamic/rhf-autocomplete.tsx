import { useState, useEffect } from 'react';

import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';

import { useLocales } from 'src/locales';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { useCheckShirtBalanceMutation } from 'src/api/order.api';
import { selectRegister, setGetShirtStock } from 'src/slices/register.slices';
// import { BaseOption } from 'src/api/base/types';

import { InputFieldModel } from 'src/types/input-column.model';

import { Block } from '../block/block';

// ----------------------------------------------------------------------

interface Props<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  name?: string;
  label?: string;
  labelEn?: string;
  placeholder?: string;
  type?: 'country' | string;
  helperText?: React.ReactNode;
  value?: any;
  options: any[];
  required?: boolean;
  viewType?: string;
  onChangeInput?: any;
  field?: any;
  error?: any;
  rest?: any;
}

export default function RHFAutocompleteDynamic<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>({
  name,
  label,
  labelEn,
  type,
  helperText,
  placeholder,
  value,
  options = [],
  required,
  viewType,
  onChangeInput,
  size = 'medium',
  field,
  error,
  rest,
  ...other
}: Omit<Props<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'>) {

  const { currentLang } = useLocales();
  const dispatch = useAppDispatch();
  const { listRegisterForm, listTicketOptionDefault } = useAppSelector(selectRegister);

  const [checkShirtBalance] = useCheckShirtBalanceMutation();

  const [optionValue, setOptionValue] = useState<any>(options?.find((x) => x.key === value) || null);

  const [inputValue, setInputValue] = useState<any>('');

  const requiredFiled: boolean = !!rest?.rules?.required;

  const errorMessage: string = currentLang.value === 'th' ? `กรุณาระบุ` : `Please specify`;

  useEffect(() => {
    let item = null;
    if (value) {
      item = options.find((x: any) => x.id === value);
    }

    if (item) {
      setOptionValue(item);
    } else {
      setOptionValue(null);
    }
    
  }, [value, options]);

  const disableAutocomplete = () => {
    document.querySelectorAll("input").forEach((input) => {
      input.setAttribute("autocomplete", "off");
    });
  };

  useEffect(() => {
    disableAutocomplete();
  }, []);

  return (
    <Block label={currentLang.value === 'th' ? label : labelEn} required={requiredFiled}>
      <Autocomplete
        sx={{ width: '100%' }}
        size={size}
        {...field}
        id={`autocomplete-${name}`}
        value={optionValue}
        getOptionDisabled={(option: any) => (option?.disabled)}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        options={options}
        placeholder={currentLang.value === 'th' ? label : labelEn}
        renderOption={(props, option: any) => {
          const { ...optionProps } = props;
          return (
            <Box
              key={option.key}
              component="li"
              sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
              {...optionProps}
            >
              {currentLang.value === 'en' ? option?.labelEn : option?.labelTh}
            </Box>
          );
        }}
        getOptionLabel={(option: any) => (currentLang.value === 'en' ? option?.labelEn : option?.labelTh) || ''}
        isOptionEqualToValue={(option: any, values: any) =>
          option?.id === values?.id
        }
        onChange={async (event, newValue: any) => {
          setOptionValue(newValue);
          if (rest && rest?.htmlInputKey === "SHIRT" && rest?.name && rest?.stock === 'ACTIVE') {
            let shirtStockField: InputFieldModel = {};
            shirtStockField = listRegisterForm?.find((res: InputFieldModel) => res.key === rest?.name) || {};
            shirtStockField = listTicketOptionDefault?.find((res: InputFieldModel) => res.key === rest?.name) || {};
            if (shirtStockField) {
              await checkShirtBalance(shirtStockField).unwrap().then((res) => {
                if (res) {
                  dispatch(setGetShirtStock(res));
                  const itemSelect = res?.listOption?.find((x: any) => x?.key === newValue?.id);
                  if (itemSelect && itemSelect?.stockAvailable && itemSelect.stockAvailable > 0) {
                    field.onChange(newValue?.id);
                  }
                }
              })
            }
          } else {
            field.onChange(newValue?.id);
            if (onChangeInput) {
              onChangeInput({
                target: {
                  name,
                  value: newValue?.id,
                },
              })
            }
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            // label={label}
            hiddenLabel
            variant='filled'
            required={requiredFiled}
            placeholder={currentLang.value === 'th' ? label : labelEn}
            error={!!error}
            helperText={error ? errorMessage : helperText}
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password',
            }}
          />
        )}
        {...other}
      />
    </Block>
  );
}
