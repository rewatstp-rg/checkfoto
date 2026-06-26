import { Controller, useFormContext } from 'react-hook-form';

import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import TextField, { TextFieldProps } from '@mui/material/TextField';

import { Block } from '../block/block';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  viewType?: string;
  inputType?: string;
  placeholder?: string;
  label?: string;
};

export default function RHFTextField({ name, helperText, type, viewType, label, inputProps, placeholder, inputType, size = 'medium', ...other }: Props) {
  const { control } = useFormContext();
  const isDetail = () => viewType === 'inquiry';
  const theme = useTheme();

  const onlyNumbersRegex = /^[0-9]*$/;

  return (
    <Controller
      name={name}
      control={control}
      render={
        ({ field, fieldState: { error } }) => (
          isDetail() ? (
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                {label}
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.primary.main, fontFamily: 'line-seedsans-bold' }}>
                {field.value || '-'}
              </Typography>
            </Box>
          ) : (
            <>
              {
                label ? (
                  <Block label={label} required={other?.required}>
                    <TextField
                      {...field}
                      hiddenLabel
                      variant='filled'
                      placeholder={label}
                      fullWidth
                      size={size}
                      type={type}
                      value={type === 'number' && field.value === 0 ? '' : field.value}
                      onChange={(event) => {
                        if (type === 'number') {
                          field.onChange(Number(event.target.value));
                        } else if (type === 'text' && inputType === 'numberChar') {
                          if (onlyNumbersRegex.test(event.target.value[event.target.value.length - 1])) {
                            field.onChange(event.target.value);
                          } else {
                            field.onChange(event.target.value.replace(event.target.value[event.target.value.length - 1], ''));
                          }
                        } else {
                          field.onChange(event.target.value);
                        }
                      }}
                      error={!!error}
                      helperText={error ? error?.message : helperText}
                      inputProps={inputProps}
                      required={false}
                      {...other}
                    />
                  </Block>
                ) : (
                  <TextField
                    {...field}
                    hiddenLabel
                    variant='filled'
                    placeholder={placeholder}
                    fullWidth
                    size={size}
                    type={type}
                    value={type === 'number' && field.value === 0 ? '' : field.value}
                    onChange={(event) => {
                      if (type === 'number') {
                        field.onChange(Number(event.target.value));
                      } else if (type === 'text' && inputType === 'numberChar') {
                        if (onlyNumbersRegex.test(event.target.value[event.target.value.length - 1])) {
                          field.onChange(event.target.value);
                        } else {
                          field.onChange(event.target.value.replace(event.target.value[event.target.value.length - 1], ''));
                        }
                      } else {
                        field.onChange(event.target.value);
                      }
                    }}
                    error={!!error}
                    helperText={error ? error?.message : helperText}
                    inputProps={inputProps}
                    required={false}
                    {...other}
                  />
                )
              }
            </>
          )
        )}
    />
  )
}
