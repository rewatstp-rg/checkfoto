import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';

import { useTranslate } from 'src/locales';

type EventPrivacyPolicyDialogProps = {
    open: boolean;
    onAccept: () => void;
    handleNotAccept: () => void;
    policyMessage: string;
}

const EventPrivacyPolicyDialog = ({ open, onAccept, policyMessage, handleNotAccept }: EventPrivacyPolicyDialogProps) => {

    const { t } = useTranslate();

    const handleAccept = () => {
        onAccept();
    };

    const renderContentHtml = (message: string) => (
        <Box
            dangerouslySetInnerHTML={{ __html: message }}
            sx={{
                mb: 0.5,
                '& p': { typography: 'body2', m: 0, fontSize: '1rem', lineHeight: '30px' },
                '& a': { color: 'inherit', textDecoration: 'none' },
                '& strong': { typography: 'subtitle2', fontSize: '1.2rem' },
            }}
        />
    )

    return (
        <Dialog open={open} maxWidth="md" fullWidth>
            <DialogTitle>{t('photoPolicyTitle')}</DialogTitle>
            <DialogContent dividers>
                {renderContentHtml(policyMessage)}
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Button onClick={handleAccept} variant="contained" color="primary">
                    {t('policyAgreement')}
                </Button>
                <Button onClick={handleNotAccept} variant="outlined" color="primary">
                    {t('policyNotAgreement')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EventPrivacyPolicyDialog;


