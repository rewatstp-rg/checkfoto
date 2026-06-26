import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

// import { useAppSelector } from 'src/store/hooks';
// import { selectOrder } from 'src/slices/order.slices';
import { useLocales, useTranslate } from 'src/locales';

import { PhotoPriceModel } from 'src/types/photo.type';

// import Label from '../label';

type ConfirmPhotoLimitPackageDialogProps = {
  open: boolean;
  onAccept: () => void;
  onNotAccept: () => void;
  // onPayNow: () => void;
  packagePhoto: PhotoPriceModel | null;
};

const ConfirmPhotoLimitPackageDialog = ({
  open,
  onAccept,
  onNotAccept,
  // onPayNow,
  packagePhoto,
}: ConfirmPhotoLimitPackageDialogProps) => {
  const { t } = useTranslate();
  const { currentLang } = useLocales();

  // const { photoCart } = useAppSelector(selectOrder);

  // const photoLength = photoCart?.listPhoto?.length || 0;
  // const limitPack = packagePhoto?.limitPack || 0;

  const isEnglish = currentLang.value === 'en';

  const packageName = isEnglish
    ? packagePhoto?.photoPriceDescEn
    : packagePhoto?.photoPriceDescTh;

  // const isEmptyCart = photoLength === 0;
  // const isOverLimit = photoLength > limitPack;
  // const isUnderLimit = photoLength > 0 && photoLength < limitPack;
  // const isReadyToPay = photoLength > 0 && photoLength === limitPack;

  // const canSelectMore = isEmptyCart || isUnderLimit;

  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <DialogTitle>{t('confirmPackageTitle')}</DialogTitle>

      <DialogContent dividers>
        {`${t('confirmPackageDesc')} : ${packageName || '-'}`}

        {/* {isOverLimit && (
          <>
            <br />
            {t('connotConfirmPackageDesc')}
          </>
        )} */}

        {/* {canSelectMore && (
          <>
            <br />
            {t('confirmLimitPackageDesc')}
          </>
        )} */}

        {/* {isReadyToPay && (
          <>
            <br />
            <Label color="error" sx={{ fontSize: '0.85rem', mt: 0.5 }}>
              {isEnglish
                ? `You have ${photoLength} photos in the cart. Do you want to pay now?`
                : `คุณมี ${photoLength} รูปในตะกร้า ต้องการชำระเงินเลยหรือไม่`}
            </Label>
          </>
        )} */}
      </DialogContent>

      <DialogActions>
        <Button onClick={onAccept} variant="contained" color="primary">
          {t('confirmLimitPackageBtn')}
        </Button>

        {/* {isReadyToPay && (
          <Button onClick={onPayNow} variant="contained" color="primary">
            {t('imageToPayNow')}
          </Button>
        )} */}

        <Button onClick={onNotAccept} variant="outlined" color="primary">
          {t('cancelPackageBtn')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmPhotoLimitPackageDialog;