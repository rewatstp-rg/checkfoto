import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { CircularProgress } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { DAILOG_TITLE, DAILOG_TITLE_EN } from 'src/utils/constants';

import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

type Props = {
    model?: {
        open?: boolean;
        onOk?: () => void;
        onCancelInner?: () => void;
        message?: string;
        labelCancel?: string;
        labelOk?: string;
        title?: string;
        type?: string;
        showSave?: boolean
        showCancel?: boolean
    }
    onCancel?: () => void
    loading?: boolean
};

export default function AlertDialog({
    model = {
        open: false,
        message: '',
        onOk: () => { },
        onCancelInner: () => { },
        labelCancel: 'ยกเลิก',
        labelOk: 'ตกลง',
        title: '',
        type: 'alert',
        showSave: false,
        showCancel: false
    },
    onCancel,
    loading
}: Props) {
    const {
        open = false,
        message,
        onOk,
        labelCancel,
        labelOk,
        type = 'alert',
        showSave,
        showCancel,
        onCancelInner
    } = model;

    const { currentLang } = useLocales();

    const defaultTitle: any = currentLang.value === 'en' ? DAILOG_TITLE_EN : DAILOG_TITLE;

    const maxWidth = 'xs';

    return (
        <>
            {
                open && (
                    <Dialog open={open} onClose={onCancel} maxWidth={maxWidth} fullWidth>
                        <DialogTitle>{defaultTitle[type]}</DialogTitle>
                        <DialogContent sx={{ color: 'text.secondary' , overflow:'hidden' }}>
                            {message}
                        </DialogContent>

                        <DialogActions>

                            {
                                showCancel && (
                                    <Button
                                        sx={{ minWidth: 100 }}
                                        disabled={loading}
                                        startIcon={
                                            loading && <CircularProgress color="inherit" size={24} />
                                        }
                                        variant="outlined"
                                        onClick={onCancelInner || onCancel}>
                                        {labelCancel}
                                    </Button>
                                )
                            }

                            
                            {
                                showSave && (
                                    <Button
                                        color="primary"
                                        sx={{ minWidth: 100 }}
                                        disabled={loading}
                                        startIcon={
                                            loading && <CircularProgress color="inherit" size={24} />
                                        }
                                        variant="contained"
                                        onClick={onOk}
                                        autoFocus>
                                        {labelOk}
                                    </Button>
                                )
                            }

                        </DialogActions>
                    </Dialog>
                )
            }
        </>
    );
}
