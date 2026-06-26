import { Controller, useFormContext } from 'react-hook-form';

import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';

import ISOToDate from 'src/utils/ISOToDate';

// ----------------------------------------------------------------------

type Props = DatePickerProps<any> & {
  name: string;
  viewType?: string;
  helperText?: string;
  size?: 'small' | 'medium';
  required?: boolean;
};

export default function RHFDateField({ name, viewType, label, helperText, size = 'medium', required, ...other }: Props) {
  const { control } = useFormContext();
  const isDetail = () => viewType === 'inquiry';
  const theme = useTheme();

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
                {(field?.value && field?.value !== 'Invalid Date' && !!field?.value) ? ((ISOToDate(field.value) !== 'Invalid date' ? ISOToDate(field.value) : '-') || '-') : '-'}
              </Typography>
            </Box>
          ) : (
            <DatePicker
              {...field}
              sx={{ mb: 0, mt: 0 }}
              label={label}
              onChange={(newValue) => {
                field.onChange(newValue);
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!error,
                  required,
                  helperText: error ? error?.message : helperText,
                  placeholder: 'วัน / เดือน / ปี',
                  margin: 'normal',
                  size
                },
              }}
              {...other}
            />
          )
        )
      }
    />
  )
}
