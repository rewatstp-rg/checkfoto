import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';

import { useTranslate } from 'src/locales';

type SelectPhotoAgainDialogProps = {
    open: boolean;
    onAccept: () => void;
}

const ConfirmGotoChromeDialog = ({ open, onAccept }: SelectPhotoAgainDialogProps) => {

    const { t } = useTranslate();

    const handleAccept = () => {
        onAccept();
    };

    // const handleNotAccept = () => {
    //     onNotAccept();
    // }

    return (
        <Dialog open={open} maxWidth="xs" fullWidth>
            <DialogTitle>{t('gotoChrome.title')}</DialogTitle>
            <DialogContent dividers>
                <Box>
                    {t('gotoChrome.desc1')}
                </Box>
                <Box>
                    {t('gotoChrome.desc2')}
                </Box>
                <Box>
                    {t('gotoChrome.desc3')}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleAccept} variant="contained" color="primary">
                    {t('gotoChrome.btnAccept')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmGotoChromeDialog;


