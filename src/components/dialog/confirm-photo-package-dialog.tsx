import { useState, useEffect } from 'react';

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';

import { PRICE_TYPE } from 'src/utils/constants';

import { useLocales, useTranslate } from 'src/locales';

import { PhotoPriceModel } from 'src/types/photo.type';

type SelectPhotoAgainDialogProps = {
    open: boolean;
    onAccept: () => void;
    onNotAccept: () => void;
    packagePhoto: PhotoPriceModel | null;
    photoCount: number;
    videoCount: number;
    toggleValue: string;
}

const ConfirmPhotoPackageDialog = ({ open, onAccept, onNotAccept, packagePhoto, photoCount, videoCount, toggleValue }: SelectPhotoAgainDialogProps) => {

    const { t } = useTranslate();
    const { currentLang } = useLocales();
    const [countItem, setCountItem] = useState(0);
    const [testPhotoUnit, setTestPhotoUnit] = useState(currentLang.value === 'en' ? 'photos' : 'รูป');

    const handleAccept = () => {
        onAccept();
    };

    const handleNotAccept = () => {
        onNotAccept();
    };

    useEffect(() => {

        if (toggleValue === PRICE_TYPE.ALL_VIDEO_AND_PHOTO) {
            const count = photoCount + videoCount;
            setCountItem(count);
            setTestPhotoUnit(currentLang.value === 'en' ? 'photos / videos' : 'รูป / วิดีโอ');
        } else if (toggleValue === PRICE_TYPE.ALL) {
            setCountItem(photoCount);
            setTestPhotoUnit(currentLang.value === 'en' ? 'photos' : 'รูป');
        } else if (toggleValue === PRICE_TYPE.ALL_VIDEO) {
            setTestPhotoUnit(currentLang.value === 'en' ? 'videos' : 'วิดีโอ');
            setCountItem(videoCount);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoCount, photoCount, toggleValue]);

    return (
        <Dialog open={open} maxWidth="xs" fullWidth>
            <DialogTitle>{t('confirmPackageTitle')}</DialogTitle>
            <DialogContent dividers>
                {`${t('confirmPackageDesc')} : ${currentLang.value === "en" ? packagePhoto?.photoPriceDescEn : packagePhoto?.photoPriceDescTh} (${countItem} ${testPhotoUnit})`}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleAccept} variant="contained" color="primary">
                    {t('confirmPackageBtn')}
                </Button>
                <Button onClick={handleNotAccept} variant="outlined" color="primary">
                    {t('cancelPackageBtn')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmPhotoPackageDialog;


