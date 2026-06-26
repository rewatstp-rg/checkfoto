import { memo, useState, useEffect } from "react";

import { Box, Theme, useTheme, Typography } from "@mui/material"

import { useRouter } from "src/routes/hooks";

import { useBoolean } from "src/hooks/use-boolean";

import { PRICE_TYPE, STORAGE_KEYS } from 'src/utils/constants';

import { useLocales } from "src/locales";
import { useAppDispatch } from "src/store/hooks";
import CartIcon from "src/layouts/common/cart-icon"
import { setLoadingState } from "src/slices/error-message.slices";
import { PhotoCart, clearPhotoCart, setUsePackagePhotoToCart } from "src/slices/order.slices";

import ConfirmPhotoPackageDialog from "src/components/dialog/confirm-photo-package-dialog";
import CancelPhotoLimitPackageDialog from "src/components/dialog/cancel-photo-limit-package-dialog";
import ConfirmPhotoLimitPackageDialog from "src/components/dialog/confirm-photo-limit-package-dialog";

import { PhotoType, EventPhoto, PhotoPriceModel } from "src/types/photo.type";

export default function PhotoPromotion({
    eventItem,
    photoList,
    // toggleValue,
    videoCount,
    videoArrayList,
    photoCount,
    videoFinishLineArrayList
}: {
    eventItem: EventPhoto,
    photoList: PhotoType[],
    // toggleValue: string,
    videoCount: number,
    videoArrayList: PhotoType[],
    photoCount: number,
    videoFinishLineArrayList: PhotoType[]
}) {

    const router = useRouter();
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const isOpenDialog = useBoolean(false);
    const isOpenLimitphotoDialog = useBoolean(false);
    const isOpenLimitCancelphotoDialog = useBoolean(false);

    // const { photoCart } = useAppSelector(selectOrder);

    const [listPromotion, setListPromotion] = useState<PhotoPriceModel[]>([]);
    const [packagePhotoItem, setPackagePhotoItem] = useState<PhotoPriceModel | null>(null);
    const [selectPackageLimit, setSelectPackageLimit] = useState<PhotoPriceModel | null>(null);
    const [listPromotionLimitPhoto, setListPromotionLimitPhoto] = useState<PhotoPriceModel[]>([]);

    const handleAddToPromotion = (packagePhoto: PhotoPriceModel) => {
        if (selectPackageLimit?.photoPriceCode === packagePhoto?.photoPriceCode) {
            isOpenLimitCancelphotoDialog.onTrue();
            return;
        }

        // console.log("2");

        setPackagePhotoItem(packagePhoto);
        if (packagePhoto?.priceType === PRICE_TYPE.LIMIT_LENGTH_PHOTO) {
            isOpenLimitphotoDialog.onTrue();
        } else {
            isOpenDialog.onTrue();
        }
    }

    const createPhotoCart = (item: PhotoType, index: number): PhotoCart => ({
        id: item?.imageId?.toString() || `${Date.now()}-${index}`,
        url: item?.imageThumbnailUrl,
        photoTypeDescTh: packagePhotoItem?.photoPriceDescTh || '',
        photoTypeDescEn: packagePhotoItem?.photoPriceDescEn || '',
        type: packagePhotoItem?.priceType || '',
        photoPrice: 0,
        photoPriceCode: packagePhotoItem?.photoPriceCode || '',
        uid: item?.uid || '',
        imageType: item?.imageType || '',
    });

    const getPackagePhotos = (): PhotoCart[] => {
        const priceType = packagePhotoItem?.priceType;

        const videoPhotos = [
            ...(videoArrayList || []),
            ...(videoFinishLineArrayList || []),
        ];

        if (priceType === PRICE_TYPE.ALL_VIDEO_AND_PHOTO) {
            return [...videoPhotos, ...(photoList || [])].map(createPhotoCart);
        }

        if (priceType === PRICE_TYPE.ALL_VIDEO) {
            return videoPhotos.map(createPhotoCart);
        }

        if (priceType === PRICE_TYPE.ALL) {
            return (photoList || []).map(createPhotoCart);
        }

        return [];
    };

    const onAccept = () => {
        setPackagePhotoItem(null);
        setSelectPackageLimit(null);
        dispatch(clearPhotoCart());
        localStorage.removeItem(`${STORAGE_KEYS.PACKAGE_PHOTO}-${eventItem?.eventCode}`);
        dispatch(setLoadingState(true));
        if (packagePhotoItem?.priceType === PRICE_TYPE.LIMIT_LENGTH_PHOTO) {
            localStorage.setItem(`${STORAGE_KEYS.PACKAGE_PHOTO}-${eventItem?.eventCode}`, JSON.stringify(packagePhotoItem));
            setSelectPackageLimit(packagePhotoItem);
            dispatch(setLoadingState(false));
            isOpenLimitphotoDialog.onFalse();
            return;
        }

        const listPhoto = getPackagePhotos();

        dispatch(
            setUsePackagePhotoToCart({
                listPhoto,
                pricetModel: packagePhotoItem,
            })
        );

        isOpenDialog.onFalse();

        setTimeout(() => {
            router.push('/checkout');
            dispatch(setLoadingState(false));
        }, 500);

    }

    // const onPayNow = () => {
    //     if (packagePhotoItem?.priceType === PRICE_TYPE.LIMIT_LENGTH_PHOTO) {
    //         localStorage.setItem(`${STORAGE_KEYS.PACKAGE_PHOTO}-${eventItem?.eventCode}`, JSON.stringify(packagePhotoItem));
    //         setSelectPackageLimit(packagePhotoItem);
    //         dispatch(setLoadingState(true));
    //         const updatedCart = photoCart.listPhoto.map((x) => ({
    //             ...x,
    //             photoTypeDescTh: packagePhotoItem?.photoPriceDescTh || '',
    //             photoTypeDescEn: packagePhotoItem?.photoPriceDescEn || '',
    //             type: packagePhotoItem?.priceType || '',
    //             photoPrice: 0,
    //             photoPriceCode: packagePhotoItem?.photoPriceCode || '',
    //         }));

    //         dispatch(setUsePackageLimitPhotoToCart({
    //             listPhoto: updatedCart,
    //             pricetModel: packagePhotoItem
    //         }));

    //         isOpenLimitphotoDialog.onFalse();

    //         setTimeout(() => {
    //             router.push('/checkout');
    //             dispatch(setLoadingState(false));
    //         }, 1200);
    //     } else {
    //         window.location.reload();
    //     }

    // }

    const onNotAccept = () => {
        isOpenDialog.onFalse();
        isOpenLimitphotoDialog.onFalse();

        setTimeout(() => {
            setPackagePhotoItem(null);
        }, 300)
    }

    const onAcceptCancelPackageLimit = () => {
        dispatch(setLoadingState(true));
        setPackagePhotoItem(null);
        setSelectPackageLimit(null);
        dispatch(clearPhotoCart());

        localStorage.removeItem(`${STORAGE_KEYS.PACKAGE_PHOTO}-${eventItem?.eventCode}`);
        isOpenLimitCancelphotoDialog.onFalse();
        // console.log("3",`${STORAGE_KEYS.PACKAGE_PHOTO}-${eventItem?.eventCode}`);
        setTimeout(() => {
            dispatch(setLoadingState(false));

        }, 800);

    }

    const onNotAcceptCancel = () => {
        isOpenLimitCancelphotoDialog.onFalse();
    }

    const getPromotionPriceByToggle = () => {
        const promotions = eventItem?.listPhotoPrice?.filter((x) => x.priceType === PRICE_TYPE.ALL_VIDEO_AND_PHOTO || x.priceType === PRICE_TYPE.ALL_VIDEO || x.priceType === PRICE_TYPE.ALL) || [];
        const listLimitPhoto = eventItem?.listPhotoPrice?.filter((x) => x.priceType === PRICE_TYPE.LIMIT_LENGTH_PHOTO) || [];
        setListPromotion(promotions);
        setListPromotionLimitPhoto(listLimitPhoto);
    }

    useEffect(() => {
        getPromotionPriceByToggle();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventItem?.listPhotoPrice]);

    return (
        <>
            {
                listPromotion?.map((item: PhotoPriceModel) => (
                    <PricePromotionItem
                        // toggleValue={toggleValue}
                        photoCount={photoCount}
                        videoCount={videoCount + Number(videoFinishLineArrayList?.length) || 0}
                        key={item.id}
                        item={item}
                        theme={theme}
                        handleAddToPromotion={handleAddToPromotion}
                    />
                ))
            }

            {
                listPromotionLimitPhoto?.map((item: PhotoPriceModel) => (
                    <PricePromotionLimitPhotoItem
                        key={item.id}
                        packageLimit={selectPackageLimit}
                        item={item}
                        theme={theme}
                        handleAddToPromotion={handleAddToPromotion}
                    />
                ))
            }

            <ConfirmPhotoPackageDialog
                open={isOpenDialog.value}
                toggleValue={packagePhotoItem?.priceType || ''}
                onAccept={() => onAccept()}
                onNotAccept={() => onNotAccept()}
                packagePhoto={packagePhotoItem}
                photoCount={photoCount}
                videoCount={videoCount + Number(videoFinishLineArrayList?.length) || 0}
            />

            <ConfirmPhotoLimitPackageDialog
                // onPayNow={() => onPayNow()}
                open={isOpenLimitphotoDialog.value}
                onAccept={() => onAccept()}
                onNotAccept={() => onNotAccept()}
                packagePhoto={packagePhotoItem}
            />

            <CancelPhotoLimitPackageDialog
                open={isOpenLimitCancelphotoDialog.value}
                onAccept={() => onAcceptCancelPackageLimit()}
                onNotAccept={() => onNotAcceptCancel()}
            />
        </>
    )
}

const PricePromotionItem = memo((
    {
        item,
        theme,
        handleAddToPromotion,
        photoCount = 0,
        videoCount = 0,
        // toggleValue
    }: {
        item: PhotoPriceModel;
        theme: Theme;
        handleAddToPromotion: (e: PhotoPriceModel) => void;
        photoCount: number;
        videoCount: number;
        // toggleValue: string;
    }) => {

    const { currentLang } = useLocales();

    return (
        <Box
            sx={{
                width: { xs: '100%', sm: 'auto' },
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                backgroundColor: 'transparent',
                border: `1px solid ${theme.palette.primary.main}`,
                color: theme.palette.primary.main,
                borderRadius: 1,
                cursor: 'pointer',
                p: 1,
                ml: '0px !important',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                    color: theme.palette.primary.contrastText,
                    transform: 'translateY(-2px) scale(1.01)',
                    boxShadow: 6,
                },
            }}
            onClick={() => handleAddToPromotion(item)}
        >
            <CartIcon iconSize={32} iconColor={theme.palette.primary.main} />
            <Typography variant="h6" color={theme.palette.primary.main}>

                {
                    item.priceType === PRICE_TYPE.ALL_VIDEO_AND_PHOTO &&
                    `${currentLang.value === 'en' ? item.photoPriceDescEn : item.photoPriceDescTh} 
                     (${videoCount} ${currentLang.value === 'en' ? 'videos' : 'วีดีโอ'} , ${photoCount} ${currentLang.value === 'en' ? 'photos' : 'รูป'} ) : ${item.price} ${currentLang.value === 'en' ? 'THB' : 'บาท'}`
                }

                {
                    item.priceType === PRICE_TYPE.ALL_VIDEO &&
                    `${currentLang.value === 'en' ? item.photoPriceDescEn : item.photoPriceDescTh} 
                (${videoCount} ${currentLang.value === 'en' ? 'videos' : 'วีดีโอ'}) : ${item.price} ${currentLang.value === 'en' ? 'THB' : 'บาท'}`
                }

                {
                    item.priceType === PRICE_TYPE.ALL &&
                    `${currentLang.value === 'en' ? item.photoPriceDescEn : item.photoPriceDescTh} 
                (${photoCount} ${currentLang.value === 'en' ? 'photos' : 'รูป'}) : ${item.price} ${currentLang.value === 'en' ? 'THB' : 'บาท'}`
                }
            </Typography>
        </Box>
    )
});

const PricePromotionLimitPhotoItem = memo((
    {
        item,
        theme,
        handleAddToPromotion,
        packageLimit
    }: {
        item: PhotoPriceModel;
        theme: Theme;
        handleAddToPromotion: (e: PhotoPriceModel) => void;
        packageLimit: PhotoPriceModel | null;
    }) => {

    const packagePhotoPriceCode = packageLimit?.photoPriceCode;

    const { currentLang } = useLocales();

    return (
        <Box
            sx={{
                width: { xs: '100%', sm: 'auto' },
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                backgroundColor: packagePhotoPriceCode === item.photoPriceCode ? theme.palette.primary.main : 'transparent',
                border: `1px solid ${theme.palette.primary.main}`,
                color: theme.palette.primary.main,
                borderRadius: 1,
                cursor: 'pointer',
                p: 1,
                ml: '0px !important',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                    color: theme.palette.primary.contrastText,
                    transform: 'translateY(-2px) scale(1.01)',
                    boxShadow: 6,
                },
            }}
            onClick={() => handleAddToPromotion(item)}
        >
            <CartIcon iconSize={32} iconColor={packagePhotoPriceCode === item.photoPriceCode ? theme.palette.primary.contrastText : theme.palette.primary.main} />
            <Typography variant="h6" color={packagePhotoPriceCode === item.photoPriceCode ? theme.palette.primary.contrastText : theme.palette.primary.main}>

                {currentLang.value === 'en' ? item.photoPriceDescEn : item.photoPriceDescTh}
            </Typography>
        </Box>
    )
});

