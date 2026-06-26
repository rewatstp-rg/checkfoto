import React, { memo } from "react";

import { Box, Button, CircularProgress } from "@mui/material";

import Iconify from "../iconify";

type Props = {
    onCancel?: () => void;
    onSubmit?: () => void;
    loading?: boolean;
    submitIcon?: React.ReactNode,
    cancelIcon?: React.ReactNode
};

const ButtonSubmitShort = memo((props: Props) => {
    const { onCancel, onSubmit, loading = false, submitIcon = <Iconify icon="ic:outline-save" width={24} />, cancelIcon = <Iconify icon="ic:round-refresh" width={24} /> } = props;
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

                            {cancelIcon}
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
                    type="submit"
                    onClick={() => onSubmit?.()}
                >
                    {/* {submitLabel} */}
                    {submitIcon}
                </Button>
            </Box>
        </Box>
    )
});

export default ButtonSubmitShort;