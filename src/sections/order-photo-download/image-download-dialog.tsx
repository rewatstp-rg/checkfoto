import { m } from 'framer-motion';
import { useRef, useState, useEffect } from "react";

import {
    Box,
    Grid,
    Dialog,
    IconButton,
    DialogContent
} from "@mui/material";

import { useResponsive } from "src/hooks/use-responsive";

import { checkImageOrientationFromUrl } from "src/utils/getPathImageByfile64";

import { seleceFileModel } from "src/slices/file.slices";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { setLoadingState } from "src/slices/error-message.slices";
import { useDownloadImageFileMutation } from "src/api/upload-file.api";
import { useGetEventPhotoFrameByCodeMutation } from 'src/api/event-photo-frame';

import Iconify from "src/components/iconify";
import { varFade, MotionContainer } from "src/components/animate";
import VideoPlayer from 'src/components/video-player/video-player';
import ListFrameImage from 'src/components/photo/list-frame-image';
import DownloadContent from 'src/components/photo/download-content';

import { PhotoType } from "src/types/photo.type";
import { EventPhotoFrameModel } from 'src/types/event-photo-frame.type';

interface ImageDialogProps {
    open: boolean;
    onClose: () => void;
    orderPhotoNumber: string;
    frames: EventPhotoFrameModel[]
}

const ImageDownloadDialog = ({ open, onClose, orderPhotoNumber, frames }: ImageDialogProps) => {

    const dispatch = useAppDispatch();
    const lgUp = useResponsive('up', 'lg');

    const { selectImagePhoto } = useAppSelector(seleceFileModel);

    const [downloadFile] = useDownloadImageFileMutation();
    const [getEventPhotoFrameByCode] = useGetEventPhotoFrameByCodeMutation();

    const [isLoading, setIsLoading] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [imageOrientation, setImageOrientation] = useState<string>('');
    const [imageUrlSelected, setImageUrlSelected] = useState<string>('');
    const [imageFrameUrlSelected, setImageFrameUrlSelected] = useState<string>('');
    const [frameSelected, setFrameSelected] = useState<EventPhotoFrameModel | null>(null);
    const [imageToDownload, setImageToDownload] = useState<string>('');

    const checkImage = async (imageItem: PhotoType) => {
        dispatch(setLoadingState(true));
        if (imageItem?.imageType === "VIDEO" || imageItem?.imageType === "VIDEO_FINISH_LINE") {
            setImageOrientation('portrait');
            // const compressedBase64 = await compressBase64Image(base64Data);
            setImageUrlSelected(imageItem?.videoUrl || '');
            dispatch(setLoadingState(false));
        } else {
            await downloadFile({
                key: imageItem.imageS3Key,
                bucket: imageItem.imageS3Bucket,
                orderPhotoNumber
            }).unwrap().then(res => {
                const { data } = res;
                const fileType = 'image/jpeg';
                const base64Data = data?.fileUrl ? data.fileUrl : `data:${fileType};base64,${data.file}`;
                // downloadImageFromBase64New(data);
                checkImageOrientationFromUrl(base64Data)
                    .then(async orientation => {
                        setImageOrientation(orientation.orientation);
                        // const compressedBase64 = await compressBase64Image(base64Data);
                        setImageUrlSelected(base64Data);
                        dispatch(setLoadingState(false));
                    }).catch(err => {
                        console.error('โหลดรูปไม่ได้:', err);
                        dispatch(setLoadingState(false));
                    })
            }).catch(err => {
                console.error('โหลดรูปไม่ได้:', err);
                dispatch(setLoadingState(false));
            });
        }
    }

    const onSelectedFrameUrl = async (frameUrl?: EventPhotoFrameModel | null) => {
        dispatch(setLoadingState(true));
        if (frameUrl) {
            await getEventPhotoFrameByCode(frameUrl).unwrap().then(res => {
                const { data } = res;
                if (data?.fileResponse && data?.fileResponse?.file) {
                    setFrameSelected(frameUrl);
                    const fileType = 'image/jpeg';
                    const base64DataFrame = `data:${fileType};base64,${data.fileResponse.file}`;
                    setImageFrameUrlSelected(base64DataFrame);
                }

            });
        } else {
            setTimeout(() => {
                setFrameSelected(null);
                setImageFrameUrlSelected('');
                dispatch(setLoadingState(false));
            }, 1000);
        }
    }

    useEffect(() => {
        if (selectImagePhoto && orderPhotoNumber) {
            checkImage(selectImagePhoto);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectImagePhoto, orderPhotoNumber]);

    return (
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
                {
                    imageUrlSelected && imageOrientation && (
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
                    )
                }

                <Grid container spacing={2} component={MotionContainer}>
                    <Grid item xs={12} md={12}>
                        {
                            imageUrlSelected && imageOrientation && (
                                <m.div variants={varFade().inUp}>
                                    <Box sx={{
                                        maxWidth: imageOrientation === 'landscape' ? '700px' : '400px',
                                        margin: 'auto'
                                    }}>
                                        {
                                            (selectImagePhoto?.imageType !== 'VIDEO' && selectImagePhoto?.imageType !== "VIDEO_FINISH_LINE") && <ListFrameImage frames={frames?.filter((frame) => frame.imageOrientation?.toLocaleLowerCase() === imageOrientation)} imageOrientation={imageOrientation} onSelectedFrameUrl={(e) => onSelectedFrameUrl(e)} />
                                        }

                                        {
                                            imageUrlSelected && (selectImagePhoto?.imageType !== 'VIDEO' && selectImagePhoto?.imageType !== "VIDEO_FINISH_LINE") && (
                                                <ConfigFrame
                                                    useImageUrl={imageUrlSelected}
                                                    selectedFrameUrl={imageFrameUrlSelected || ''}
                                                    setIsLoadingInFrame={setIsLoading}
                                                    canvasRef={canvasRef}
                                                    setImageToDownload={setImageToDownload}
                                                />
                                            )
                                        }

                                        {
                                            imageUrlSelected && (selectImagePhoto?.imageType === 'VIDEO' || selectImagePhoto?.imageType === "VIDEO_FINISH_LINE") && selectImagePhoto?.videoUrl && (
                                                <m.div variants={varFade().inUp}>
                                                    <Box
                                                        sx={{
                                                            width: '100%',
                                                            maxWidth: imageOrientation === 'portrait' ? 360 : 640,
                                                            aspectRatio:
                                                                imageOrientation === 'portrait' ? '9 / 16' : '16 / 9',
                                                            borderRadius: 2,
                                                            overflow: 'hidden',
                                                            margin: 'auto',
                                                            marginBottom: '20px'
                                                        }}
                                                    >
                                                        <VideoPlayer
                                                            imageThumbnailUrl={selectImagePhoto?.imageThumbnailUrl}
                                                            src={selectImagePhoto.videoUrl}
                                                            width={imageOrientation === 'portrait' ? 360 : 640} />
                                                    </Box>
                                                </m.div>
                                            )
                                        }
                                        <DownloadContent frameSelected={frameSelected} orderPhotoNumber={orderPhotoNumber} canvasRef={canvasRef} isLoading={isLoading} imageToDownload={imageToDownload} />
                                    </Box>
                                </m.div>
                            )
                        }
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default ImageDownloadDialog;

const ConfigFrame = ({
    useImageUrl,
    selectedFrameUrl,
    setIsLoadingInFrame,
    canvasRef,
    setImageToDownload,
}: {
    useImageUrl: string;
    selectedFrameUrl: string;
    setIsLoadingInFrame: React.Dispatch<React.SetStateAction<boolean>>;
    canvasRef: React.RefObject<HTMLCanvasElement>;
    setImageToDownload: React.Dispatch<React.SetStateAction<string>>;
}) => {
    const dispatch = useAppDispatch();

    const [urlPreview, setUrlPreview] = useState<string | null>(null);

    function base64ToImageUrl(base64: string, mimeType: string = "image/jpeg"): string {
        // Decode base64 string to raw binary data
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i += 1) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: mimeType });

        return URL.createObjectURL(blob);
    }

    useEffect(() => {
        if (!useImageUrl) return;

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        const loadImage = (src: string): Promise<HTMLImageElement> =>
            new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = "anonymous";
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = src;
            });

        const renderImages = async () => {
            try {
                const baseImage = await loadImage(useImageUrl);

                const scale = 1;
                const width = baseImage.width * scale;
                const height = baseImage.height * scale;

                canvas.width = width;
                canvas.height = height;

                ctx.clearRect(0, 0, width, height);
                ctx.drawImage(baseImage, 0, 0, width, height);

                if (selectedFrameUrl) {
                    const frameImage = await loadImage(selectedFrameUrl);
                    ctx.drawImage(frameImage, 0, 0, width, height);
                }

                // Export base64 ที่ย่อไฟล์แล้ว (ถ้าต้องการใช้งานต่อ)
                const compressedBase64 = canvas.toDataURL("image/jpeg", 0.93);
                // console.log(" Compressed Base64:", compressedBase64);
                setImageToDownload(compressedBase64);
                setUrlPreview(base64ToImageUrl(compressedBase64.replace("data:image/jpeg;base64,", "")));

            } catch (error) {
                console.error("Image loading error:", error);
            } finally {
                setIsLoadingInFrame(false);
                dispatch(setLoadingState(false));
            }
        };

        renderImages();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [useImageUrl, selectedFrameUrl]);

    return (
        <div style={{ maxWidth: "100%", marginBottom: "20px" }}>
            <canvas
                ref={canvasRef}
                style={{
                    maxWidth: "100%",
                    width: "100%",
                    display: "none",
                }}
            />
            {
                urlPreview && (
                    <img
                        src={urlPreview || ""}
                        style={{ maxWidth: "100%" }}
                        onLoad={() => setIsLoadingInFrame(false)}
                        alt=""
                    />
                )
            }
        </div>
    );
};