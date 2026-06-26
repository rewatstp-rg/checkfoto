import { memo } from "react";

import { Box, Button, CircularProgress } from "@mui/material";

import Iconify from "../iconify";

type Props = {
    onCancel?: () => void;
    onSubmit?: () => void;
    actionType?: any;
    loading?: boolean;

};

const ButtonSearchCriteriaShort = memo((props: Props) => {
    const { onCancel, onSubmit, loading = false, actionType = 'submit' } = props;
    return (
        <Box
            rowGap={1}
            columnGap={6}
            display="grid"
            alignItems="center"
            gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(1, 1fr)',
                lg: 'repeat(1, 1fr)',
            }}
        >
            <Box display="flex" justifyContent="center" columnGap={2}>
                {
                    onCancel && (
                        <Button
                            disabled={loading}
                            startIcon={
                                loading && <CircularProgress color="inherit" size={24} />
                            }
                            sx={{ width: '100%' }}
                            size='large'
                            type="button"
                            variant="outlined" onClick={() => onCancel?.()}>
                            {/* {cancelLabel} */}

                            <Iconify icon="ic:round-refresh" width={24} />
                        </Button>
                    )
                }

                <Button
                    disabled={loading}
                    startIcon={
                        loading && <CircularProgress color="inherit" size={24} />
                    }
                    sx={{ width: '100%' }}
                    color="primary"
                    size='large'
                    variant="contained"
                    type={actionType}
                    onClick={() => onSubmit?.()}
                >
                    {/* {submitLabel} */}
                    <Iconify icon="ic:outline-search" width={24} />
                </Button>
            </Box>
        </Box>
    )
});

export default ButtonSearchCriteriaShort;