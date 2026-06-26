import { memo } from "react";

import { Box, Button, CircularProgress } from "@mui/material";

type Props = {
    isSubmit?: boolean;
    isAction?: boolean;
    isCancel?: boolean;
    actionLabel?: string;
    submitLabel?: string;
    cancelLabel?: string;
    onCancel?: () => void;
    onSubmit?: () => void;
    onAction?: () => void;
    loading?: boolean;
    disabledCancel?: boolean;
    disabledSubmit?: boolean;
    justifyContent?: string;
};

const ButtonSubmitForm = memo((props: Props) => {
    const { disabledCancel = false, disabledSubmit = false, justifyContent = "center", submitLabel = 'ค้นหา', cancelLabel = 'คืนค่า', onCancel, onSubmit, loading = false, isSubmit = true, isAction = false, onAction, actionLabel = 'ปิด', isCancel = true } = props;
    return (
        <Box
            rowGap={1}
            columnGap={6}
            mt={2}
            display="grid"
            gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(1, 1fr)',
                lg: 'repeat(1, 1fr)',
            }}
        >
            <Box display="flex" justifyContent={justifyContent} columnGap={2} sx={{ py: 1, px: 2 }}>
                {
                    isCancel && (
                        <Button
                            disabled={loading || disabledCancel}
                            startIcon={
                                loading && <CircularProgress color="inherit" size={24} />
                            }
                            sx={{ minWidth: 100 }}
                            size='medium'
                            type="button"
                            variant="outlined" onClick={() => onCancel?.()}>
                            {cancelLabel}
                        </Button>
                    )
                }


                {
                    isSubmit && (
                        <Button
                            disabled={loading || disabledSubmit}
                            startIcon={
                                loading && <CircularProgress color="inherit" size={24} />
                            }
                            sx={{ minWidth: 100 }}
                            color="primary"
                            size='medium'
                            variant="contained"
                            type="submit"
                            onClick={() => onSubmit?.()}
                        >
                            {submitLabel}
                        </Button>
                    )
                }

                {
                    isAction && (
                        <Button
                            disabled={loading}
                            startIcon={
                                loading && <CircularProgress color="inherit" size={24} />
                            }
                            sx={{ minWidth: 100 }}
                            color="success"
                            size='medium'
                            type="button"
                            variant="contained" onClick={() => onAction?.()}>
                            {actionLabel}
                        </Button>
                    )
                }

            </Box>
        </Box>
    )
});

export default ButtonSubmitForm;