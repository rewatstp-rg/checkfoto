import { Controller, useFormContext } from 'react-hook-form';

import { useTheme } from '@mui/material/styles';
import { Box, Theme, SxProps, Typography } from '@mui/material';
import { MobileDateTimePicker, DatePickerSlotsComponentsProps} from '@mui/x-date-pickers';

import { ICalendarDate } from 'src/types/calendar';

// ----------------------------------------------------------------------

type Props = DatePickerSlotsComponentsProps<any> & {
  name: string;
  viewType?: string;
  helperText?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  sx?: SxProps<Theme>
};

export default function RHFDateTimeField({ name, viewType, label, helperText, required, sx, disabled, ...other }: Props) {
  const { control } = useFormContext();
  const isDetail = () => viewType === 'inquiry';
  const theme = useTheme();

  const confirmLabel: string = 'ตกลง';
  const cancelLabel: string = 'ยกเลิก';

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
            <MobileDateTimePicker
              sx={sx}
              loading={disabled}
              {...field}
              value={new Date(field.value as ICalendarDate)}
              onChange={(newValue) => {
                if (newValue) {
                  field.onChange(newValue);
                }
              }}
              label={label}
              format="dd/MM/yyyy hh:mm a"
              slotProps={{
                textField: {
                  size: "small",
                  fullWidth: true,
                  error: !!error,
                  helperText: error ? error?.message : helperText,
                  required,
                  disabled
                },
                actionBar: {
                  hidden: true,
                  lang: 'th'
                }
              }}
              closeOnSelect={false}
              localeText={{
                okButtonLabel: confirmLabel,
                cancelButtonLabel: cancelLabel,
                toolbarTitle: label
              }}
              {...other}
            />
          )
        )}
    />
  )
}
