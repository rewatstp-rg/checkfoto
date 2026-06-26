import { Controller, useFormContext } from 'react-hook-form';

import Radio from '@mui/material/Radio';
import { Box, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';

import SvgColor from '../svg-color';

// ----------------------------------------------------------------------

type Props = RadioGroupProps & {
  name: string;
  options: { label: string; value: any }[];
  label?: string;
  spacing?: number;
  helperText?: React.ReactNode;
  required?: any;
  isIcon?: boolean;
};

export default function RHFRadioGroup({
  row,
  name,
  label,
  options,
  spacing,
  helperText,
  required,
  isIcon = false,
  ...other
}: Props) {
  const { control } = useFormContext();

  const labelledby = label ? `${name}-${label}` : '';

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl component="fieldset">
          {label && (
            // <FormLabel component="legend" id={labelledby} sx={{ typography: 'body2' }}>
            //   {label}
            // </FormLabel>
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
              {label} {required && <span style={{ color: 'red' }}>*</span>}
            </Typography>
          )}

          <RadioGroup {...field} aria-labelledby={labelledby} row={row} {...other}  >
            {options.map((option) => (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {
                  isIcon && <SvgColor src='/assets/icons/navbar/ic_file.svg' sx={{ width: 30, height: 30, opacity: 0.48, mx: 2 }} />
                }
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                  sx={{
                    '&:not(:last-of-type)': {
                      mb: spacing || 0,
                    },
                    ...(row && {
                      mr: 2,
                      '&:not(:last-of-type)': {
                        mr: spacing || 2,
                      },
                    }),
                  }}
                />
              </Box>
            ))}
          </RadioGroup>

          {(!!error || helperText) && (
            <FormHelperText error={!!error} sx={{ mx: 0 }}>
              {error ? error?.message : helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
