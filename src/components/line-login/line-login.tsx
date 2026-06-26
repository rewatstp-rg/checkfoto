import React from 'react';

import { Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { useTranslate } from 'src/locales';

import Iconify from '../iconify';

interface GoogleLoginComponentProps {
    onClick: () => void;
    loading?: boolean;
}

const LineLoginComponent: React.FC<GoogleLoginComponentProps> = ({
    onClick,
    loading,
}) => {

    const { t } = useTranslate();

    return (
        <LoadingButton
            fullWidth
            color='success'
            sx={{
                position: "relative",
                justifyContent: "center",
                p: 0.8,
            }}
            size="medium"
            type="button"
            onClick={() => onClick()}
            variant="contained"
            loading={loading}
        >
            <Box
                sx={{
                    position: "absolute",
                    left: 16,
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Iconify icon="bi:line" width={28} />
            </Box>
            {t('lineLogin')}
        </LoadingButton>
    );
};

export default LineLoginComponent;
