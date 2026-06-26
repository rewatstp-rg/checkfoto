import { useRef } from 'react';

import { alpha } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

import { useTranslate } from 'src/locales';

import Iconify from '../iconify';

export default function UploadBoxButtons({ error, disabled, onChange, sx }: {
    error?: boolean;
    disabled?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    sx?: any;
}) {

    const { t } = useTranslate();

    const inputRefCamera = useRef<HTMLInputElement>(null);
    const inputRefGallery = useRef<HTMLInputElement>(null);

    const baseStyle = {
        width: 100,
        height: 64,
        flexShrink: 0,
        display: 'flex',
        borderRadius: 1,
        cursor: 'pointer',
        alignItems: 'center',
        color: 'text.disabled',
        justifyContent: 'center',
        bgcolor: (theme: any) => alpha(theme.palette.grey[500], 0.08),
        border: (theme: any) => `dashed 1px ${alpha(theme.palette.grey[500], 0.16)}`,
        '&:hover': {
            opacity: 0.72,
        },
        ...(disabled && {
            opacity: 0.48,
            pointerEvents: 'none',
        }),
        ...(error && {
            color: 'error.main',
            borderColor: 'error.main',
            bgcolor: (theme: any) => alpha(theme.palette.error.main, 0.08),
        }),
    };

    return (
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
            {/* ปุ่มถ่ายรูป */}
            <Box sx={{ textAlign: 'center' }}>
                <Box
                    sx={{ ...baseStyle, ...sx }}
                    onClick={() => inputRefCamera.current?.click()}
                >
                    <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        ref={inputRefCamera}
                        onChange={onChange}
                        style={{ display: 'none' }}
                    />
                    <Iconify icon="material-symbols:photo-camera" width={28} />
                </Box>
                <Typography variant="body2" sx={{ mt: 1 }}>{t('photo.selectCamera')}</Typography>
            </Box>

            {/* ปุ่มเลือกรูป */}
            <Box sx={{ textAlign: 'center' }}>
                <Box
                    sx={{ ...baseStyle, ...sx }}
                    onClick={() => inputRefGallery.current?.click()}
                >
                    <input
                        type="file"
                        accept="image/*"
                        ref={inputRefGallery}
                        onChange={onChange}
                        style={{ display: 'none' }}
                    />
                    <Iconify icon="material-symbols:photo-library" width={28} />
                </Box>
                <Typography variant="body2" sx={{ mt: 1 }}>{t('photo.selectGallery')}</Typography>
            </Box>

        </Box>
    );
}
