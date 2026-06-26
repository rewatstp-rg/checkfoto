import type { Dayjs } from 'dayjs';
import { Controller, useFormContext } from 'react-hook-form';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { Box, Theme, SxProps, useTheme, Typography } from '@mui/material';
import { DesktopDateTimePicker, DesktopDateTimePickerProps } from '@mui/x-date-pickers';

import ISOToDate from 'src/utils/ISOToDate';

import { Block } from '../block/block';

// ----------------------------------------------------------------------

type RHFDatePickerProps = DatePickerProps<Dayjs> & {
  name: string;
  viewType?: string;
  helperText?: string;
  size?: 'small' | 'medium';
  required?: boolean;
};

export function RHFDatePicker({ name, viewType, label, helperText, size = 'medium', required, slotProps, ...other }: RHFDatePickerProps) {
  const { control } = useFormContext();
  const isDetail = () => viewType === 'inquiry';
  const theme = useTheme();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
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
            value={field.value ? new Date(field.value) as any : null}
            onChange={(newValue: any) => {
              console.log("🚀 ~ file: rhf-date-picker.tsx:45 ~ RHFDatePicker ~ newValue:", newValue)
              field.onChange(newValue);
            }}
            // format={formatStr.split.date}
            slotProps={{
              textField: {
                label,
                fullWidth: true,
                error: !!error,
                required,
                helperText: error ? error?.message : helperText,
                placeholder: 'วัน / เดือน / ปี',
                margin: 'normal',
                size,
                ...slotProps?.textField,
              },
              ...slotProps,
            }}
            {...other}
          />
        )

      )}
    />
  );
}

// ----------------------------------------------------------------------

type RHFMobileDateTimePickerProps = DesktopDateTimePickerProps<any> & {
  name: string;
  viewType?: string;
  helperText?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  sx?: SxProps<Theme>
};

export function RHFMobileDateTimePicker({
  name, viewType, label, helperText, required, sx, disabled, slotProps, ...other
}: RHFMobileDateTimePickerProps) {

  const isDetail = () => viewType === 'inquiry';
  const theme = useTheme();
  const { control } = useFormContext();

  const confirmLabel: string = 'ตกลง';
  const cancelLabel: string = 'ยกเลิก';

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => isDetail() ? (
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
            {label}
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.primary.main, fontFamily: 'line-seedsans-bold' }}>
            {(field?.value && field?.value !== 'Invalid Date' && !!field?.value) ? ((ISOToDate(field.value, 'dateRequestTime') !== 'Invalid date' ? ISOToDate(field.value, 'dateRequestTime') : '-') || '-') : '-'}
          </Typography>
        </Box>
      ) : (
        <Block label={label} required={required}>
          <DesktopDateTimePicker
            {...field}
            value={field.value ? new Date(field.value) : null}
            onChange={(newValue: any) => field.onChange(newValue)}
            format="dd/MM/yyyy hh:mm a"
            slotProps={{
              textField: {
                hiddenLabel: true,
                // label,
                size: "medium",
                fullWidth: true,
                error: !!error,
                helperText: error ? error?.message : helperText,
                required,
                disabled
              },
            }}
            localeText={{
              okButtonLabel: confirmLabel,
              cancelButtonLabel: cancelLabel,
              toolbarTitle: label
            }}
            {...other}
          />
        </Block>
      )
      }
    />
  );
}
