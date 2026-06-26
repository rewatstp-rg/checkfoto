import { useState, useEffect, ChangeEvent } from "react";

import { Stack, TextField, InputAdornment } from "@mui/material";

import { useDebounce } from "src/hooks/use-debounce";

import Iconify from "../iconify";
// import { ButtonSearchCriteriaShort } from "../button-search";

type Props = {
    onSearchByName: (e: string) => void
}

const SearchTemp = ({ onSearchByName }: Props) => {

    const [searchKey, setSearchKey] = useState('');
    const debouncedQuery = useDebounce(searchKey, 1500);

    const handleFilterName = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.target;
        setSearchKey(value);
    }

    useEffect(() => {
        onSearchByName(debouncedQuery);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedQuery])

    return (
        <Stack
            spacing={2}
            alignItems={{ xs: 'flex-end', md: 'center' }}
            direction={{
                xs: 'column',
                md: 'row',
            }}
            sx={{
                pb: 2.5
            }}
        >
            <TextField
                fullWidth
                value={searchKey}
                onChange={handleFilterName}
                placeholder="ระบุคําค้นหา . . . "
                size="small"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                        </InputAdornment>
                    ),
                }}
            />
        </Stack>
    )
}

export default SearchTemp;
