import { useState } from 'react';

import {
  Box,
  Button,
  Dialog,
  Checkbox,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
} from '@mui/material';

import { useTranslate } from 'src/locales';
import { useAppSelector } from 'src/store/hooks';
import { selectOrder } from 'src/slices/order.slices';

import { PhotoPriceModel } from 'src/types/photo.type';

type SelectPhotoAgainDialogProps = {
  open: boolean;
  onAccept: () => void;
  onNotAccept: () => void;
  packageLimit?: PhotoPriceModel;
};

const HIDE_SELECT_PHOTO_DIALOG_KEY = 'hideSelectPhotoDialog';

const buttonSx = {
  width: {
    xs: '100%',
    sm: 'auto',
  },
};

const SelectPhotoAgainDialog = ({
  open,
  onAccept,
  onNotAccept,
  packageLimit,
}: SelectPhotoAgainDialogProps) => {
  const { t } = useTranslate();
  const { photoCart } = useAppSelector(selectOrder);

  const [doNotShowAgain, setDoNotShowAgain] = useState(false);

  const photoLength = photoCart?.listPhoto?.length || 0;
  const limitPack = packageLimit?.limitPack || 0;

  const hasLimitPackage = Boolean(packageLimit);
  const isLimitReached = hasLimitPackage && photoLength === limitPack;

  const canSelectMorePhoto =
    !hasLimitPackage || (photoLength > 0 && photoLength !== limitPack);

  const canPayNow = !hasLimitPackage || isLimitReached;
  const canEditCart = isLimitReached;

  const dialogTitle = isLimitReached
    ? t('titlePayNow')
    : t('titleAddImageToCart');

  const saveDoNotShowAgain = () => {
    if (doNotShowAgain) {
      localStorage.setItem(HIDE_SELECT_PHOTO_DIALOG_KEY, 'true');
    }
  };

  const handlePayNow = () => {
    onAccept();
    saveDoNotShowAgain();
  };

  const handleSelectMorePhoto = () => {
    onNotAccept();
    saveDoNotShowAgain();
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>{dialogTitle}</DialogTitle>

      <DialogContent dividers sx={{ pb: 1 }}>
        {t('contentAddImageToCart')}
      </DialogContent>

      <DialogActions
        sx={{
          p: '16px 24px',
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          gap: '8px',
        }}
      >
        {canSelectMorePhoto && (
          <Button
            onClick={handleSelectMorePhoto}
            variant="outlined"
            color="primary"
            sx={buttonSx}
          >
            {t('addImageToCart')}
          </Button>
        )}

        {canPayNow && (
          <Button
            onClick={handlePayNow}
            variant="contained"
            color="primary"
            sx={buttonSx}
          >
            {t('imageToPayNow')}
          </Button>
        )}

        {canEditCart && (
          <Button
            onClick={handleSelectMorePhoto}
            variant="outlined"
            color="primary"
            sx={buttonSx}
          >
            {t('editImageToCart')}
          </Button>
        )}
      </DialogActions>

      <Box
        sx={{
          p: '8px 24px',
          display: 'flex',
          justifyContent: {
            xs: 'center',
            sm: 'flex-end',
          },
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={doNotShowAgain}
              onChange={(event) => setDoNotShowAgain(event.target.checked)}
              color="primary"
            />
          }
          label={t('doNotShowThisAgain')}
        />
      </Box>
    </Dialog>
  );
};

export default SelectPhotoAgainDialog;