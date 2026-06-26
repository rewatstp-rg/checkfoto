import { useState, useEffect } from 'react';

import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';

import { useLocales } from 'src/locales';
// import { BaseOption } from 'src/api/base/types';

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
  stockOnChange: (e: any) => void;
}

export default function RHFAutocompleteStockDynamic<
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
  stockOnChange,
  ...other
}: Omit<Props<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'>) {

  const { currentLang } = useLocales();

  const [optionValue, setOptionValue] = useState<any>(options?.find((x) => x.key === field?.value) || null);
  const [inputValue, setInputValue] = useState<any>('');

  const requiredFiled: boolean = !!rest?.rules?.required;

  const errorMessage: string = currentLang.value === 'th' ? `กรุณาระบุ` : `Please specify`;

  // useEffect(() => {
  //   let item = null;
  //   if (value) {
  //     item = options.find((x: BaseOption) => x.id === value);
  //   }
  //   if (item) {
  //     setOptionValue(item);
  //   } else {
  //     setOptionValue(null);
  //   }

  //   // }, [options]);
  // }, [value, options]);

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
        getOptionDisabled={(option : any) => (option?.disabled)}
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
        onChange={(event, newValue: any) => {
          setOptionValue(newValue);
          stockOnChange(newValue);
          if (onChangeInput) {
            onChangeInput({
              target: {
                name,
                value: newValue?.id,
              },
            })
          }
          field.onChange(newValue?.id);
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
