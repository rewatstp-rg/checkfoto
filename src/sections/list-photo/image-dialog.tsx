import { m } from 'framer-motion';
import { memo, useMemo, useState, useEffect } from "react";

import LoadingButton from "@mui/lab/LoadingButton";
import {
    Box,
    Grid,
    Stack,
    Button,
    Dialog,
    Typography,
    IconButton,
    DialogContent,
} from "@mui/material";

import { useRouter } from "src/routes/hooks";

import { useBoolean } from "src/hooks/use-boolean";
import { useResponsive } from "src/hooks/use-responsive";

import { fCurrency } from "src/utils/format-number";
import { PRICE_TYPE, STORAGE_KEYS } from 'src/utils/constants';
import { downloadImageFromBase64, checkImageOrientationFromUrl } from "src/utils/getPathImageByfile64";

import CartIcon from "src/layouts/common/cart-icon";
import { selectEvent } from "src/slices/event.slices";
import { useLocales, useTranslate } from "src/locales";
import { seleceFileModel } from "src/slices/file.slices";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { setLoadingState } from "src/slices/error-message.slices";
import { useDownloadFileMutation } from "src/api/upload-file.api";
import { PhotoCart, selectOrder, setPhotoCart, deletePhotoCart, setUsePackageLimitPhotoToCart } from "src/slices/order.slices";

import Iconify from "src/components/iconify";
import { varFade, MotionContainer } from "src/components/animate";
import VideoPlayer from 'src/components/video-player/video-player';
import SelectPhotoAgainDialog from "src/components/dialog/select-photo-again-dialog";
import WatermarkedImageMutipleV3 from 'src/components/water-marked-Image/water-marked-image-mutiple-v3';

import { PhotoType, PhotoPriceModel } from "src/types/photo.type";
// import WatermarkedVideo from 'src/components/water-marked-Image/water-marked-video';

interface ImageDialogProps {
    open: boolean;
    onClose: () => void;
    pageType?: string
}

const ImageDialog = ({ open, onClose, pageType }: ImageDialogProps) => {

    const router = useRouter();
    const isOpen = useBoolean(false);
    const dispatch = useAppDispatch();
    const lgUp = useResponsive('up', 'lg');

    const { t } = useTranslate();
    const { photoCart } = useAppSelector(selectOrder);
    const { eventDetail } = useAppSelector(selectEvent);

    const photoLenght = photoCart?.listPhoto?.length || 0;

    const packageLimit = useMemo(() => {
        const raw = localStorage.getItem(`${STORAGE_KEYS.PACKAGE_PHOTO}-${eventDetail?.eventCode}`);
        return raw ? JSON.parse(raw) : null;
    }, [eventDetail?.eventCode]);

    const limitPack = packageLimit?.limitPack || 0;
    // console.log("🚀 ~ ImageDialog ~ limitPack:", limitPack)

    const { selectImagePhoto } = useAppSelector(seleceFileModel);
    const publishedStatus = useMemo(() => eventDetail?.publishedStatus || pageType === 'ORDER', [pageType, eventDetail]);;
    const listPrice = useMemo(() => {

        const imageType = selectImagePhoto?.imageType;

        const prices = selectImagePhoto?.listPhotoPrice?.filter((x) => x.status === 'ACTIVE') ?? [];

        if (imageType === 'VIDEO' || imageType === 'VIDEO_FINISH_LINE') {
            return prices.filter(
                (x) => x.priceType === PRICE_TYPE.VIDEO_ORIGINAL
            );
        }

        return prices.filter(
            (x) =>
                x.priceType !== PRICE_TYPE.ALL &&
                x.priceType !== PRICE_TYPE.ALL_VIDEO &&
                x.priceType !== PRICE_TYPE.ALL_VIDEO_AND_PHOTO &&
                x.priceType !== PRICE_TYPE.VIDEO_ORIGINAL &&
                x.priceType !== PRICE_TYPE.LIMIT_LENGTH_PHOTO
        );

    }, [selectImagePhoto]);

    const [downloadFile] = useDownloadFileMutation();

    const [isLoading, setIsLoading] = useState(false);
    const [imageOrientation, setImageOrientation] = useState<string>('');
    const [imageUrlSelected, setImageUrlSelected] = useState<string>('');

    const handleAddToCart = (photoPriceCode: string) => {
        if (selectImagePhoto) {

            const priceModel = selectImagePhoto?.listPhotoPrice.find((item) => item.photoPriceCode === photoPriceCode);

            if (priceModel?.priceType === PRICE_TYPE.LIMIT_LENGTH_PHOTO
                && photoLenght > 0
                && photoLenght >= limitPack) {
                isOpen.onTrue();
                return;
            }

            const addCart: PhotoCart = {
                id: selectImagePhoto?.imageId?.toString() || '',
                url: selectImagePhoto?.imageThumbnailUrl,
                photoTypeDescTh: priceModel?.photoPriceTypeDescTh || '',
                photoTypeDescEn: priceModel?.photoPriceTypeDescEn || '',
                type: priceModel?.priceType || '',
                photoPrice: priceModel?.price || 0,
                photoPriceCode: priceModel?.photoPriceCode || '',
                uid: selectImagePhoto?.uid || '',
                imageType: selectImagePhoto?.imageType || ''
            };

            dispatch(setPhotoCart(addCart));
            // console.log("🚀 ~ handleAddToCart ~ addCart:", addCart)

            if (priceModel?.priceType === PRICE_TYPE.LIMIT_LENGTH_PHOTO
                && photoLenght > 0
                && photoLenght >= (limitPack - 1)) {
                isOpen.onTrue();
                return;
            }

            const hideSelectPhotoDialogValue = localStorage.getItem('hideSelectPhotoDialog');
            if (hideSelectPhotoDialogValue !== 'true') {
                isOpen.onTrue();
            } else {
                onClose();
            }
        }
    };

    const downloadImage = async () => {
        if (selectImagePhoto) {
            setIsLoading(true);
            try {
                const { data } = await downloadFile({
                    key: selectImagePhoto.imageS3Key,
                    bucket: selectImagePhoto.imageS3Bucket
                }).unwrap();
                downloadImageFromBase64(data);
                setIsLoading(false);
            } catch (err) {
                console.error('Thumbnail error:', err);
                setIsLoading(false);
            }
        }
    };

    const canvasFrame = () => {
        router.push(`/custom-photo`);
    };

    const checkImage = async (imageItem: PhotoType) => {
        dispatch(setLoadingState(true));
        if (imageItem?.imageType === "VIDEO" || imageItem?.imageType === "VIDEO_FINISH_LINE") {
            setImageOrientation('portrait');
            setImageUrlSelected(imageItem?.videoThumbnailUrl || '');
            dispatch(setLoadingState(false));
        } else {
            await downloadFile({
                key: pageType === 'ORDER' ? imageItem.imageS3Key : imageItem.imageS3ThumbnailKey,
                bucket: pageType === 'ORDER' ? imageItem.imageS3Bucket : imageItem.imageS3ThumbnailBucket
            }).unwrap().then(res => {
                const { data } = res;
                const fileType = 'image/png';
                const base64Data = `data:${fileType};base64,${data.file}`;
                checkImageOrientationFromUrl(base64Data)
                    .then(orientation => {
                        setTimeout(() => {
                            setImageOrientation(orientation.orientation);
                            setImageUrlSelected(base64Data);
                            dispatch(setLoadingState(false));
                        }, 300);

                    }).catch(err => {
                        console.error('โหลดรูปไม่ได้:', err);
                        dispatch(setLoadingState(false));
                    })
            }).catch(err => {
                console.error('โหลดรูปไม่ได้:', err);
                dispatch(setLoadingState(false));
            });
        }
    };

    const handleSelectPhoto = () => {
        isOpen.onFalse();
        onClose();
    };

    const handleDeleteImageToCart = () => {
        const photoItem = photoCart?.listPhoto?.find((item) => item.uid === selectImagePhoto?.uid);
        dispatch(deletePhotoCart(photoItem));
    };

    const handlePayNow = () => {
        if (packageLimit) {
            dispatch(setLoadingState(true));
            const updatedCart = photoCart.listPhoto.map((x) => ({
                ...x,
                photoTypeDescTh: packageLimit?.photoPriceDescTh || '',
                photoTypeDescEn: packageLimit?.photoPriceDescEn || '',
                type: packageLimit?.priceType || '',
                photoPrice: 0,
                photoPriceCode: packageLimit?.photoPriceCode || '',
            }));

            dispatch(setUsePackageLimitPhotoToCart({
                listPhoto: updatedCart,
                pricetModel: packageLimit
            }));

            setTimeout(() => {
                router.push('/checkout');
                dispatch(setLoadingState(false));
            }, 500);
        } else {
            isOpen.onFalse();
            onClose();
            router.push('/checkout');
        }
    };

    useEffect(() => {
        if (selectImagePhoto) {
            checkImage(selectImagePhoto);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectImagePhoto]);

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                maxWidth="lg"
                fullWidth
                scroll="body"
                slotProps={{
                    backdrop: {
                        style: {
                            backgroundColor: "rgba(0, 0, 0, 0.48)",
                            backdropFilter: "blur(2rem)",
                        },
                    },
                }}
                PaperProps={{
                    sx: {
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        overflow: "hidden",
                        margin: 0
                    },
                }}
            >
                <DialogContent
                    sx={{
                        p: lgUp ? "50px 24px 10px 24px" : "50px 0px 10px 0px",
                        position: "relative",
                        textAlign: "center",
                        overflow: "hidden",
                    }}
                >
                    <IconButton
                        onClick={onClose}
                        sx={{
                            position: "absolute",
                            top: 0,
                            right: 8,
                            color: "white",
                            zIndex: 1,
                            backgroundColor: "rgba(0,0,0,0.4)",
                            "&:hover": {
                                backgroundColor: "rgba(0,0,0,0.6)",
                            },
                        }}
                    >
                        <Iconify icon="eva:close-fill" width={24} />
                    </IconButton>
                    <Grid container spacing={2} component={MotionContainer}>
                        <Grid item xs={12} md={(publishedStatus || pageType === 'HIGHLIGHT' || !listPrice || listPrice?.length === 0) ? 12 : 6}>
                            {
                                imageUrlSelected && imageOrientation && (selectImagePhoto?.imageType !== 'VIDEO' && selectImagePhoto?.imageType !== 'VIDEO_FINISH_LINE') && (
                                    <m.div variants={varFade().inUp}>
                                        <WatermarkedImageMutipleV3
                                            pageType={pageType}
                                            imageOrientation={imageOrientation}
                                            imageUrl={imageUrlSelected}
                                            watermarkHorizontalUrl='/assets/watermark/Checkfoto-Watermark-horizontal.png'
                                            watermarkVerticalUrl='/assets/watermark/Checkfoto-Watermark-vertical.png'
                                        />
                                        {/* <WatermarkedVideo
                                            videoOrientation={imageOrientation as 'portrait' | 'landscape'}
                                            videoUrl={imageUrlSelected}
                                            watermarkHorizontalUrl='/assets/watermark/Checkfoto-Watermark-horizontal.png'
                                            watermarkVerticalUrl='/assets/watermark/Checkfoto-Watermark-vertical.png'
                                        /> */}
                                    </m.div>
                                )
                            }

                            {
                                imageUrlSelected && imageOrientation && (selectImagePhoto?.imageType === 'VIDEO' || selectImagePhoto?.imageType === 'VIDEO_FINISH_LINE') && selectImagePhoto?.videoThumbnailUrl && (
                                    <m.div variants={varFade().inUp}>
                                        <Box
                                            sx={{
                                                width: '100%',
                                                maxWidth: imageOrientation === 'portrait' ? 360 : 640,
                                                aspectRatio:
                                                    imageOrientation === 'portrait' ? '9 / 16' : '16 / 9',
                                                borderRadius: 2,
                                                overflow: 'hidden',
                                                margin: 'auto'
                                            }}
                                        >
                                            <VideoPlayer
                                                imageThumbnailUrl={selectImagePhoto.imageThumbnailUrl}
                                                src={selectImagePhoto.videoThumbnailUrl}
                                                width={imageOrientation === 'portrait' ? 360 : 640} />
                                        </Box>
                                    </m.div>
                                )
                            }

                            {
                                imageUrlSelected && publishedStatus && pageType !== 'HIGHLIGHT' && (
                                    <Box mb={3}>
                                        <LoadingButton
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            sx={{ maxWidth: '700px' }}
                                            disabled={isLoading}
                                            onClick={() => downloadImage()}
                                        >
                                            Download
                                        </LoadingButton>
                                    </Box>
                                )
                            }

                            {
                                imageUrlSelected && publishedStatus && pageType !== 'HIGHLIGHT' && (
                                    <Box mb={3}>
                                        <LoadingButton
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="outlined"
                                            color="primary"
                                            sx={{ maxWidth: '700px' }}
                                            disabled={isLoading}
                                            onClick={() => canvasFrame()}
                                        >
                                            ใส่กรอบ
                                        </LoadingButton>
                                    </Box>
                                )
                            }
                        </Grid>
                        {
                            !publishedStatus && pageType !== 'HIGHLIGHT' && listPrice?.length > 0 && (
                                <Grid item xs={12} md={6}>
                                    {selectImagePhoto && imageUrlSelected && (
                                        <m.div variants={varFade().inUp}>
                                            <Stack
                                                direction='column'
                                                spacing={2}
                                                justifyContent="center"
                                                alignItems="center"
                                            >
                                                {listPrice.map((item, index) => (
                                                    <PriceItem
                                                        imageType={selectImagePhoto?.imageType}
                                                        packageLimitItem={packageLimit}
                                                        key={`price-${index}`}
                                                        item={item}
                                                        onClick={() => handleAddToCart(item.photoPriceCode)}
                                                    />
                                                ))}

                                                {
                                                    packageLimit && (selectImagePhoto?.imageType === 'NORMAL' || selectImagePhoto?.imageType === 'HIGHLIGHT') && (
                                                        <PriceLimitItem
                                                            item={packageLimit}
                                                            onClick={() => handleAddToCart(packageLimit.photoPriceCode)}
                                                        />
                                                    )
                                                }

                                                {
                                                    (photoLenght > 0 && photoCart?.listPhoto?.find((item) => item.uid === selectImagePhoto?.uid)) && (
                                                        <Button
                                                            variant="contained"
                                                            color="inherit"
                                                            onClick={() => handleDeleteImageToCart()}
                                                            size="large"
                                                            sx={{ width: '100%' }}
                                                            startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                                                        >
                                                            {t('deleteImageToCart')}
                                                        </Button>
                                                    )
                                                }
                                            </Stack>
                                        </m.div>
                                    )}
                                </Grid>
                            )
                        }
                    </Grid>
                </DialogContent>
            </Dialog>
            <SelectPhotoAgainDialog open={isOpen.value} onAccept={handlePayNow} onNotAccept={handleSelectPhoto} packageLimit={packageLimit} />
        </>
    );
};

export default ImageDialog;


type PriceItemProps = {
    item: PhotoPriceModel;
    onClick?: () => void;
    packageLimitItem?: PhotoPriceModel;
    imageType?: string;
};

type SelectItemProps = {
    item: PhotoPriceModel;
    onClick?: () => void;
};

const PriceItemComponent = ({ item, onClick, packageLimitItem, imageType }: PriceItemProps) => {

    const { t } = useTranslate();
    const { currentLang } = useLocales();
    const lgUp = useResponsive('up', 'lg');

    const priceLabel = useMemo(() => (currentLang.value === "en" ? item.photoPriceTypeDescEn || item.photoTypeDescEn : item.photoPriceTypeDescTh || item.photoTypeDesc),
        [currentLang.value, item.photoPriceTypeDescTh, item.photoPriceTypeDescEn, item.photoTypeDescEn, item.photoTypeDesc]);

    if ((imageType === 'NORMAL' || imageType === 'HIGHLIGHT') && packageLimitItem) {
        return null
    }

    return (
        <>
            {
                packageLimitItem ? (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#e8e8e8",
                            borderRadius: 2,
                            px: 1.5,
                            py: 1.5,
                            boxShadow: 3,
                            gap: 1.5,
                            width: "100%",
                            cursor: "pointer",
                            transition: "all 0.2s ease-in-out",
                            ...(lgUp && {
                                "&:hover": {
                                    transform: "translateY(-2px) scale(1.03)",
                                    boxShadow: 6,
                                },
                            })
                        }}
                    >
                        <Typography variant="subtitle1" fontWeight="bold" noWrap sx={{
                            fontSize: {
                                xs: '14px',
                                sm: '16px',
                            },
                            color: 'text.secondary'
                        }}>
                            {currentLang?.value === 'th' ? 'คุณเลือกแพ็คเกจแบบรูปอยู่ไม่สามารถซื้อประเภทวิดีโอได้' : 'You have selected a package with a photo, you cannot buy a video type'}
                        </Typography>
                    </Box >
                ) : (
                    <Box
                        onClick={onClick}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            backgroundColor: "white",
                            borderRadius: 2,
                            px: 1.5,
                            py: 1.5,
                            boxShadow: 3,
                            gap: 1.5,
                            width: "100%",
                            cursor: "pointer",
                            transition: "all 0.2s ease-in-out",
                            ...(lgUp && {
                                "&:hover": {
                                    transform: "translateY(-2px) scale(1.03)",
                                    boxShadow: 6,
                                },
                            })
                        }}
                    >
                        {
                            lgUp && (
                                <CartIcon iconSize={28} iconColor="primary.main" />
                            )
                        }

                        <Box sx={{
                            color: "primary",
                            fontWeight: "bold",
                            backgroundColor: "primary.main",
                            borderRadius: 2,
                            padding: '5px 10px',
                            width: '100px'
                        }}>
                            <Typography variant="subtitle1" color="white" fontWeight="bold" noWrap sx={{
                                fontSize: {
                                    xs: '14px',
                                    sm: '16px',
                                }
                            }}>
                                {item.price === 0 ? `Free` : `${fCurrency(item.price)} ${t('registerForm.shipping.bath')}`}
                            </Typography>
                        </Box>
                        <Typography variant="subtitle1" color="primary" fontWeight="bold" noWrap sx={{
                            fontSize: {
                                xs: '14px',
                                sm: '16px',
                            }
                        }}>
                            {priceLabel}
                        </Typography>
                    </Box >
                )
            }
        </>

    );
};

const PriceLimitItemComponent = ({ item, onClick }: SelectItemProps) => {

    const { currentLang } = useLocales();
    const lgUp = useResponsive('up', 'lg');

    const { photoCart } = useAppSelector(selectOrder);
    const listPhotoLength = photoCart?.listPhoto?.length || 0;
    const packageLimitItem = item?.limitPack || 0;

    const priceLabel = useMemo(() => (currentLang.value === "en" ? item.photoPriceTypeDescEn || item.photoTypeDescEn : item.photoPriceTypeDescTh || item.photoTypeDesc),
        [currentLang.value, item.photoPriceTypeDescTh, item.photoPriceTypeDescEn, item.photoTypeDescEn, item.photoTypeDesc]);

    return (
        <Box
            onClick={onClick}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                backgroundColor: "white",
                borderRadius: 2,
                px: 1.5,
                py: 1.5,
                boxShadow: 3,
                gap: 1.5,
                width: "100%",
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                ...(lgUp && {
                    "&:hover": {
                        transform: "translateY(-2px) scale(1.03)",
                        boxShadow: 6,
                    },
                })
            }}
        >
            {
                lgUp && (
                    <CartIcon iconSize={28} iconColor="primary.main" />
                )
            }

            <Box sx={{
                color: "primary",
                fontWeight: "bold",
                backgroundColor: "primary.main",
                borderRadius: 2,
                padding: '5px 10px',
                width: '100px'
            }}>
                <Typography variant="subtitle1" color="white" fontWeight="bold" noWrap sx={{
                    fontSize: {
                        xs: '14px',
                        sm: '16px',
                    }
                }}>
                    {`${currentLang.value === "en" ? 'Limited' : 'จํากัด'} ${listPhotoLength}/${packageLimitItem}` || '0/0'}
                </Typography>
            </Box>
            <Typography variant="subtitle1" color="primary" fontWeight="bold" noWrap sx={{
                fontSize: {
                    xs: '14px',
                    sm: '16px',
                }
            }}>
                {priceLabel}
            </Typography>
        </Box>
    );
};

const PriceItem = memo(PriceItemComponent);
const PriceLimitItem = memo(PriceLimitItemComponent);
