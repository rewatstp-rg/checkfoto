import { useState, useCallback } from "react";

import { Box, Button } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from "src/routes/hooks";

import { useTranslate } from "src/locales";
import { useAppDispatch } from "src/store/hooks";
import { setLoadingState } from 'src/slices/error-message.slices';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const SeachContent = () => {

    const theme = useTheme();
    const rounter = useRouter();
    const { t } = useTranslate();
    const dispatch = useAppDispatch();

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSearchQuery(event.target.value);
    }, []);

    const onSearch = () => {
        dispatch(setLoadingState(true));
        setTimeout(() => {
            dispatch(setLoadingState(false));
            rounter.push(`?name=${searchQuery}`);
        }, 1000);
    }

    return (
        <Box sx={{
            ml: 3,
            p: 1,
            minWidth: `340px`,
            borderBottom: `solid 1px ${theme.palette.divider}`,
        }}>
            <InputBase
                fullWidth
                autoFocus
                id="search"
                name="search"
                placeholder={t('search')}
                value={searchQuery}
                onChange={handleSearch}
                startAdornment={
                    <InputAdornment position="start">
                        <Iconify icon="eva:search-fill" width={24} sx={{ color: 'text.disabled' }} />
                    </InputAdornment>
                }
                endAdornment={
                    <Button size="small" color="primary" variant="contained" onClick={() => onSearch()}>
                        {t('searchBtn')}
                    </Button>
                }
            />
        </Box>
    )
};

export default SeachContent;