import { useCallback } from "react";

import { Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { urlToBase64, shareVideoUrl, shareImageFromBase64, downloadVideoFromUrl, downloadImageFromBase64New } from "src/utils/getPathImageByfile64";

import { seleceFileModel } from "src/slices/file.slices";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { setLoadingState } from "src/slices/error-message.slices";
import { useSaveOrderPhotoForFreeMutation } from "src/api/order.api";
import { useDownloadFileMutation, useDownloadImageFileMutation } from "src/api/upload-file.api";

import Iconify from "src/components/iconify";

import { PhotoType } from "src/types/photo.type";
import { EventPhotoFrameModel } from "src/types/event-photo-frame.type";

type Props = {
    frameSelected?: EventPhotoFrameModel | null;
    canvasRef: any;
    orderPhotoNumber?: string;
    isLoading?: boolean;
    imageToDownload?: string;
    eventCode?: string;
}
export default function DownloadContent({ frameSelected, canvasRef, orderPhotoNumber, isLoading, imageToDownload, eventCode }: Props) {

    const dispatch = useAppDispatch();
    const { selectImagePhoto } = useAppSelector(seleceFileModel);

    const [downloadFile] = useDownloadImageFileMutation();
    const [downloadFileFree] = useDownloadFileMutation();
    const [saveOrderPhotoFree] = useSaveOrderPhotoForFreeMutation();

    const isMobile = (): boolean => /android|iphone|ipad|ipod/i.test(navigator.userAgent);
    const canShare = typeof navigator !== 'undefined' && navigator.canShare && navigator.canShare({ files: [new File([], 'dummy.png')] });
    const isPaid = Boolean(orderPhotoNumber);

    const handleDownload = useCallback((type: string) => {
        const originalCanvas = canvasRef.current;
        if (!originalCanvas) return;

        // กำหนดขนาดใหม่ที่ต้องการ export (เช่น 1000px)
        const maxExportWidth = Number(originalCanvas.width);
        const scale = maxExportWidth / originalCanvas.width;
        const exportWidth = originalCanvas.width * scale;
        const exportHeight = originalCanvas.height * scale;

        // สร้าง canvas ใหม่เพื่อ export
        const exportCanvas = document.createElement('canvas');
        exportCanvas.width = exportWidth;
        exportCanvas.height = exportHeight;

        const exportCtx = exportCanvas.getContext('2d');
        if (!exportCtx) return;

        exportCtx.drawImage(originalCanvas, 0, 0, exportWidth, exportHeight);

        const dataUrl = exportCanvas.toDataURL('image/jpeg', 0.93); // ใช้ JPEG + quality 90%
        const base64 = dataUrl.split(',')[1]; // เอาเฉพาะส่วนที่เป็น base64
        const fileName = new Date().getTime().toString();
        const fileModel = { name: `frame_${fileName}.jpg`, file: base64 };

        if (type === 'DOWNLOAD') {
            downloadImageFromBase64New(fileModel);
        }

        if (type === 'SHARE') {
            shareImageFromBase64(fileModel);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function removeDataPrefix(base64String: string) {
        // แยก string ที่ตำแหน่ง ',' และคืนค่าส่วนที่สอง
        const parts = base64String.split(',');
        return parts.length > 1 ? parts[1] : base64String;
    };

    // const convertVideoToFile = async (videoUrl: string) => {

    //     const response = await fetch(videoUrl);

    //     if (!response.ok) throw new Error('Network response was not ok');

    //     const blob = await response.blob();
    //     const filename = `video-${Date.now()}.mp4`;
    //     const mimeType = 'video/mp4';

    //     const file = new File([blob], filename, { type: mimeType });

    //     if (file) {
    //         dispatch(setLoadingState(false));
    //         downloadVideoFromUrl(file, filename, isMobile);
    //     }
    // };

    const convertVideoToFile = async (videoUrl: string) => {
        try {
            dispatch(setLoadingState(true));

            const noCacheUrl = `${videoUrl}?t=${Date.now()}`;

            const response = await fetch(noCacheUrl, {
                method: 'GET',
                mode: 'cors',
                cache: 'no-store',
                credentials: 'omit',
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }

            const blob = await response.blob();

            const filename = `video-${Date.now()}.mp4`;
            const file = new File([blob], filename, {
                type: blob.type || 'video/mp4',
            });

            downloadVideoFromUrl(file, filename, isMobile);
        } catch (error) {
            console.error('Download video failed:', error);
        } finally {
            dispatch(setLoadingState(false));
        }
    };

    const downloadToBase64 = (itemForDownload: any) => {
        if (isPaid) {
            downloadForPaidToBase64(itemForDownload);
        } else {
            downloadForFreeToBase64(itemForDownload);
        }
    };

    const shareToBase64 = async (itemForDownload: any) => {
        if (itemForDownload?.imageType === "VIDEO" || itemForDownload?.imageType === "VIDEO_FINISH_LINE") {
            shareVideoUrl(selectImagePhoto?.videoUrl || '');
            dispatch(setLoadingState(false));
        } else {
            try {
                const { data } = await downloadFile({
                    key: itemForDownload.imageS3Key,
                    bucket: itemForDownload.imageS3Bucket,
                    orderPhotoNumber
                }).unwrap();
                shareImageFromBase64(data);
                dispatch(setLoadingState(false));
            } catch (err) {
                console.error('Thumbnail error:', err);
                dispatch(setLoadingState(false));
            }
        }
    };

    const shareToBase64Free = async (itemForDownload: any) => {
        if (itemForDownload?.imageType === "VIDEO" || itemForDownload?.imageType === "VIDEO_FINISH_LINE") {
            shareVideoUrl(itemForDownload?.downloadVideoUrl || '');
            if (!isPaid) {
                callSaveOrderPhotoFreeApi(itemForDownload);
            }
            dispatch(setLoadingState(false));
        } else {

            if (itemForDownload?.downloadImageUrl && !isPaid) {
                const base64 = await urlToBase64(itemForDownload.downloadImageUrl);
                const file = { file: removeDataPrefix(base64), name: '', typeFomat: 'NOT_CHNAGE' };
                await downloadImageFromBase64New(file);
                callSaveOrderPhotoFreeApi(itemForDownload);
                dispatch(setLoadingState(false));
                return;
            }

            const { data } = await downloadFile({
                key: itemForDownload.imageS3Key,
                bucket: itemForDownload.imageS3Bucket,
                orderPhotoNumber
            }).unwrap();
            shareImageFromBase64(data);
            dispatch(setLoadingState(false));

        }
    };

    const shareImage = async () => {
        if (selectImagePhoto) {
            dispatch(setLoadingState(true));
            if (frameSelected) {
                handleDownload('SHARE');
                if (!isPaid) {
                    callSaveOrderPhotoFreeApi(selectImagePhoto);
                }
                dispatch(setLoadingState(false));
            } else {
                if (!isPaid) {
                    shareToBase64Free(selectImagePhoto);
                }
                shareToBase64(selectImagePhoto);
            }
        }
    };

    const downloadForPaidToBase64 = async (itemForDownload: PhotoType) => {
        if (itemForDownload?.imageType === "VIDEO" || itemForDownload?.imageType === "VIDEO_FINISH_LINE") {
            convertVideoToFile(selectImagePhoto?.videoUrl || '');
        } else {
            const { data } = await downloadFile({
                key: itemForDownload.imageS3Key,
                bucket: itemForDownload.imageS3Bucket,
                orderPhotoNumber
            }).unwrap();
            downloadImageFromBase64New(data);
            dispatch(setLoadingState(false));
        }
    };

    const callSaveOrderPhotoFreeApi = async (itemForDownload: PhotoType) => {
        await saveOrderPhotoFree(itemForDownload).unwrap();
    }

    const downloadForFreeToBase64 = async (itemForDownload: PhotoType) => {
        if (itemForDownload?.imageType === "VIDEO" || itemForDownload?.imageType === "VIDEO_FINISH_LINE") {
            await convertVideoToFile(itemForDownload?.downloadVideoUrl || selectImagePhoto?.videoUrl || '');
            callSaveOrderPhotoFreeApi(itemForDownload);
        } else {
            if (itemForDownload?.downloadImageUrl) {
                const base64 = await urlToBase64(itemForDownload.downloadImageUrl);
                const file = { file: removeDataPrefix(base64), name: '', typeFomat: 'NOT_CHNAGE' };
                await downloadImageFromBase64New(file);
                callSaveOrderPhotoFreeApi(itemForDownload);
                dispatch(setLoadingState(false));
                return;
            }

            const { data } = await downloadFileFree({
                key: itemForDownload.imageS3Key,
                bucket: itemForDownload.imageS3Bucket
            }).unwrap();
            await downloadImageFromBase64New(data);
            callSaveOrderPhotoFreeApi(itemForDownload);
            dispatch(setLoadingState(false));
        }
    };

    const downloadImage = async () => {
        if (selectImagePhoto) {
            dispatch(setLoadingState(true));
            if (frameSelected) {
                handleDownload('DOWNLOAD');
                if (!isPaid) {
                    callSaveOrderPhotoFreeApi(selectImagePhoto);
                }
                dispatch(setLoadingState(false));
            } else {
                try {
                    if (imageToDownload) {
                        const file = { file: removeDataPrefix(imageToDownload), name: '', typeFomat: 'NOT_CHNAGE' };
                        downloadImageFromBase64New(file);
                        if (!isPaid) {
                            callSaveOrderPhotoFreeApi(selectImagePhoto);
                        }
                        dispatch(setLoadingState(false));
                    } else {
                        downloadToBase64(selectImagePhoto);
                    }
                } catch (err) {
                    console.error('Thumbnail error:', err);
                    dispatch(setLoadingState(false));
                }
            }
        }
    };

    const checkEventAmino = () => {
        if (eventCode === 'EP40' && !frameSelected) {
            return true;
        }
        return false;
    }

    return (
        <Box mb={3}>
            <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="primary"
                sx={{ maxWidth: '700px' }}
                loading={isLoading}
                onClick={() => downloadImage()}
                disabled={checkEventAmino()}
                startIcon={<Iconify icon="mingcute:download-line" />}
            >
                Download
            </LoadingButton>

            {
                canShare && (isMobile()) && (
                    <LoadingButton
                        fullWidth
                        size="large"
                        type="submit"
                        variant="outlined"
                        color="primary"
                        sx={{ maxWidth: '700px', mt: 2, background: 'white' }}
                        loading={isLoading}
                        startIcon={<Iconify icon="mingcute:share-forward-line" />}
                        onClick={() => shareImage()}
                    >
                        Share
                    </LoadingButton>
                )
            }
        </Box>
    );
}