
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import Paper, { PaperProps } from '@mui/material/Paper';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const APPROVE_OPTIONS = [
    {
        value: 'APPROVED',
        label: 'อนุมัติ',
    },
    {
        value: 'REJECTED',
        label: 'ไม่อนุมัติ',
    },
];

// ----------------------------------------------------------------------

export default function ApproveOption() {

    const [method, setMethod] = useState('');

    const handleChangeMethod = useCallback((newValue: string) => {
        setMethod(newValue);
    }, []);

    return (
        <Stack spacing={5} sx={{ mb: 3 }}>
            <Typography variant="h6">ผลการอนุมัติ</Typography>
            <Stack spacing={3} direction='row'>
                {APPROVE_OPTIONS.map((option) => (
                    <OptionItem
                        key={option.label}
                        option={option}
                        selected={method === option.value}
                        onClick={() => handleChangeMethod(option.value)}
                    />
                ))}
            </Stack>
        </Stack>
    );
}

type OptionItemProps = PaperProps & {
    option: {
        value: string;
        label: string;
    };
    selected: boolean;
};

function OptionItem({ option, selected, ...other }: OptionItemProps) {
    const { value, label } = option;

    return (
        <Paper
            variant="outlined"
            key={value}
            sx={{
                p: 1.5,
                pr: 2,
                pl: 2,
                cursor: 'pointer',
                ...(selected && {
                    boxShadow: (theme) => `0 0 0 2px ${theme.palette.text.primary}`,
                }),
            }}
            {...other}
        >
            <ListItemText
                primary={
                    <Stack direction="row" alignItems="center">
                        <Iconify
                            icon={selected ? 'eva:checkmark-circle-2-fill' : 'eva:radio-button-off-fill'}
                            width={24}
                            sx={{
                                mr: 2,
                                color: selected ? 'primary.main' : 'text.secondary',
                            }}
                        />

                        <Box component="span" sx={{ flexGrow: 1 }}>
                            {label}
                        </Box>

                        <Stack spacing={1} direction="row" alignItems="center">
                            {value === 'credit' && (
                                <>
                                    <Iconify icon="logos:mastercard" width={24} />,
                                    <Iconify icon="logos:visa" width={24} />
                                </>
                            )}
                            {value === 'paypal' && <Iconify icon="logos:paypal" width={24} />}
                            {value === 'cash' && <Iconify icon="solar:wad-of-money-bold" width={24} />}
                        </Stack>
                    </Stack>
                }
                primaryTypographyProps={{ typography: 'subtitle2' }}
            />

        </Paper>
    );
}
