import React from 'react';

import { Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { useTranslate } from 'src/locales';

import Iconify from '../iconify';

interface GoogleLoginComponentProps {
    onClick: () => void;
    loading?: boolean;
}

const FacebookLoginComponent: React.FC<GoogleLoginComponentProps> = ({
    onClick,
    loading,
}) => {

    const { t } = useTranslate();

    return (
        <LoadingButton
            fullWidth
            sx={{
                backgroundColor: "#1877F2",
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
                <Iconify icon="mingcute:facebook-fill" width={28} />
            </Box>
            {t('feacbookLogin')}
        </LoadingButton>
    );
};

export default FacebookLoginComponent;
