import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { useLocales, useTranslate } from 'src/locales';

type CancelPhotoLimitPackageDialogProps = {
  open: boolean;
  onAccept: () => void;
  onNotAccept: () => void;
};

const CancelPhotoLimitPackageDialog = ({
  open,
  onAccept,
  onNotAccept
}: CancelPhotoLimitPackageDialogProps) => {
  const { t } = useTranslate();
  const { currentLang } = useLocales();

  const isEnglish = currentLang.value === 'en';

  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <DialogTitle>{isEnglish ? 'System Confirm' : 'การยืนยันการยกเลิก'}</DialogTitle>

      <DialogContent dividers>
        {isEnglish
          ? `Do you want to cancel the package or not?`
          : `คุณต้องการยกเลิกแพ็กเกจหรือไม่?`}
      </DialogContent>

      <DialogActions>
        <Button onClick={onAccept} variant="contained" color="primary">
          {isEnglish ? 'Confirm' : 'ยืนยัน'}
        </Button>

        <Button onClick={onNotAccept} variant="outlined" color="primary">
          {t('cancelPackageBtn')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CancelPhotoLimitPackageDialog;