import * as Yup from 'yup';
import { useMemo } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useTheme } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog, { dialogClasses } from '@mui/material/Dialog';
import { Box, Stack, DialogActions, DialogContent } from "@mui/material";

import Logo from "src/components/logo";
import FormProvider, { RHFTextField } from 'src/components/hook-form';

type Props = {
    open: boolean;
    onClose: VoidFunction;
    onSubmitPassword: ({ password }: { password: string }) => void;
    loading: boolean;
}
const DialogSendBoothPassword = ({ open, onClose, onSubmitPassword, loading }: Props) => {

    const theme = useTheme();

    const authenSchema = Yup.object().shape({
        password: Yup.string().required('กรุณาระบุรหัสผ่าน'),
    });

    const defaultValues = useMemo(
        () => ({
            password: ''
        }),
        []
    );

    const methods = useForm({
        resolver: yupResolver(authenSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (dataForm) => {
        onSubmitPassword(dataForm);
    });

    return (
        <Dialog
            fullWidth
            maxWidth="xs"
            open={open}
            transitionDuration={{
                enter: theme.transitions.duration.shortest,
                exit: 0,
            }}
            PaperProps={{
                sx: {
                    mt: 1,
                    overflow: 'unset'
                },
            }}
            sx={{
                [`& .${dialogClasses.container}`]: {
                    alignItems: 'center',
                },
            }}
            scroll="body"
        >
            <FormProvider methods={methods} onSubmit={onSubmit}>
                <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Logo />
                </Box>
                <DialogContent dividers>
                    <Box sx={{ px: 3, pb: 0 }}>
                        <Box
                            gap={5}
                            display="grid"
                            gridTemplateColumns={{
                                sm: 'repeat(1, 1fr)',
                            }}
                        >
                            <Stack spacing={2}>
                                <RHFTextField name="password" label='รหัสผ่าน' size="small" required sx={{ mt: 1 }} />
                            </Stack>
                        </Box>
                    </Box>
                </DialogContent>

                <DialogActions sx={{ justifyContent: 'center' }}>
                    <LoadingButton
                        fullWidth
                        color="primary"
                        size="medium"
                        type="submit"
                        variant="contained"
                        loading={isSubmitting || loading}
                    >
                        ยืนยัน
                    </LoadingButton>
                </DialogActions>

            </FormProvider>
        </Dialog>
    )
}

export default DialogSendBoothPassword;