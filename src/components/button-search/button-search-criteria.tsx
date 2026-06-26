import { memo } from "react";

import { Box, Button, CircularProgress } from "@mui/material";

type Props = {
    submitLabel?: string;
    cancelLabel?: string;
    onCancel: () => void;
    onSubmit?: () => void;
    loading?: boolean;
};

const ButtonSearchCriteria = memo((props: Props) => {
    const { submitLabel = 'ค้นหา', cancelLabel = 'คืนค่า', onCancel, onSubmit, loading = false } = props;
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
                <Button
                    disabled={loading}
                    startIcon={
                        loading && <CircularProgress color="inherit" size={24} />
                    }
                    sx={{ minWidth: 100 }}
                    size='large'
                    type="button"
                    variant="outlined" onClick={() => onCancel()}>
                    {cancelLabel}
                </Button>

                <Button
                    disabled={loading}
                    startIcon={
                        loading && <CircularProgress color="inherit" size={24} />
                    }
                    sx={{ minWidth: 100 }}
                    color="primary"
                    size='large'
                    variant="contained"
                    type="submit"
                    onClick={() => onSubmit?.()}
                >
                    {submitLabel}
                </Button>
            </Box>
        </Box>
    )
});

export default ButtonSearchCriteria;