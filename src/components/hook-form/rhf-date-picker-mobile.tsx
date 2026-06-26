import { Controller, useFormContext } from 'react-hook-form';

import { Box, Theme, SxProps, useTheme, Typography } from '@mui/material';
import { MobileDateTimePicker, MobileDateTimePickerProps } from '@mui/x-date-pickers';

import ISOToDate from 'src/utils/ISOToDate';

import { Block } from '../block/block';


// ----------------------------------------------------------------------

type RHFMobileDateTimePickerProps = MobileDateTimePickerProps<any> & {
    name: string;
    viewType?: string;
    helperText?: string;
    label?: string;
    required?: boolean;
    disabled?: boolean;
    sx?: SxProps<Theme>
};

export function RHFMobileDate2TimePicker({
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
                    <MobileDateTimePicker
                        orientation="portrait"
                        // label="For mobile"
                        format="dd/MM/yyyy hh:mm a"
                        value={field.value ? new Date(field.value) : null}
                        onChange={(newValue: any | Date | null) => field.onChange(newValue)}
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
