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
import { enqueueSnackbarErrorComponent } from 'src/utils/enqueueSnackbarComponent';

import { selectEvent } from 'src/slices/event.slices';
import { seleceFileModel } from "src/slices/file.slices";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { setLoadingState } from "src/slices/error-message.slices";
import { useDownloadFileMutation } from "src/api/upload-file.api";
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
    frames: EventPhotoFrameModel[];
    eventFree?: string;
}

const ImageFreeDownloadDialog = ({ open, onClose, frames, eventFree }: ImageDialogProps) => {

    const dispatch = useAppDispatch();
    const lgUp = useResponsive('up', 'lg');

    const { eventDetail } = useAppSelector(selectEvent);
    const { selectImagePhoto } = useAppSelector(seleceFileModel);

    const [downloadFile] = useDownloadFileMutation();
    const [getEventPhotoFrameByCode] = useGetEventPhotoFrameByCodeMutation();

    const [isLoading, setIsLoading] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [imageOrientation, setImageOrientation] = useState<string>('');
    const [imageUrlSelected, setImageUrlSelected] = useState<string>('');
    const [imageFrameUrlSelected, setImageFrameUrlSelected] = useState<string>('');
    const [frameSelected, setFrameSelected] = useState<EventPhotoFrameModel | null>(null);
    const [imageToDownload, setImageToDownload] = useState<string>('');

    const checkPhotoForDownloadImageUrl = async (imageItem: PhotoType) => {
        if (imageItem?.downloadImageUrl) {
            checkImageOrientationFromUrl(imageItem.downloadImageUrl)
                .then(async orientation => {
                    setImageOrientation(orientation.orientation);
                    setImageUrlSelected(imageItem.downloadImageUrl || '');
                    // dispatch(setLoadingState(false));
                    if (eventDetail?.autoFrame === 'ACTIVE') {
                        onSelectedFrameAmino(orientation.orientation);
                    } else {
                        dispatch(setLoadingState(false));
                    }
                }).catch(err => {
                    console.error('โหลดรูปไม่ได้:', err);
                    dispatch(setLoadingState(false));
                });
        } else {
            await downloadFile({
                key: imageItem.imageS3Key,
                bucket: imageItem.imageS3Bucket
            }).unwrap().then(res => {
                const { data } = res;
                const fileType = 'image/jpeg';
                const base64Data = data?.fileUrl ? data.fileUrl : `data:${fileType};base64,${data.file}`;
                checkImageOrientationFromUrl(base64Data)
                    .then(async orientation => {
                        setImageOrientation(orientation.orientation);
                        setImageUrlSelected(base64Data);
                        if (eventDetail?.autoFrame === 'ACTIVE') {
                            onSelectedFrameAmino(orientation.orientation);
                        } else {
                            dispatch(setLoadingState(false));
                        }

                    }).catch(err => {
                        console.error('โหลดรูปไม่ได้:', err);
                        dispatch(setLoadingState(false));
                    });
            }).catch(err => {
                console.error('โหลดรูปไม่ได้:', err);
                dispatch(setLoadingState(false));
            });
        }
    }

    const checkImageFree = async (imageItem: PhotoType) => {
        // console.log("🚀 ~ checkImageFree ~ imageItem:", imageItem)
        dispatch(setLoadingState(true));
        if (imageItem?.imageType === "VIDEO" || imageItem?.imageType === "VIDEO_FINISH_LINE") {
            setImageOrientation('portrait');
            setImageUrlSelected(imageItem?.downloadVideoUrl || imageItem?.videoThumbnailUrl || '');
            dispatch(setLoadingState(false));
        } else {
            checkPhotoForDownloadImageUrl(imageItem);
        }
    }

    const onSelectedFrameUrl = async (frameUrl?: EventPhotoFrameModel | null) => {
        dispatch(setLoadingState(true));
        if (frameUrl) {
            await getEventPhotoFrameByCode(frameUrl).unwrap().then(async res => {
                const { data } = res;
                if (data?.fileResponse && data?.fileResponse?.file) {
                    setFrameSelected(frameUrl);
                    const fileType = 'image/jpeg';
                    const base64DataFrame = `data:${fileType};base64,${data.fileResponse.file}`;
                    setImageFrameUrlSelected(base64DataFrame);
                } else {
                    console.error('โหลดรูปไม่ได้:');
                    dispatch(setLoadingState(false));
                }
            });
        } else {
            setTimeout(() => {
                setFrameSelected(null);
                setImageFrameUrlSelected('');
                dispatch(setLoadingState(false));
            }, 1000);
        }
    };

    const onSelectedFrameAmino = async (orientation?: string) => {
        const frameArr = frames?.filter((frame) => frame.imageOrientation?.toLocaleLowerCase() === orientation);
        if (frameArr?.length > 0) {
            onSelectedFrameUrl(frameArr[0]);
        }
    };

    useEffect(() => {

        if (selectImagePhoto && eventFree === 'ACTIVE') {
            checkImageFree(selectImagePhoto);
        } else {
            enqueueSnackbarErrorComponent();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectImagePhoto, frames]);

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
                                        {frames?.length > 0 && eventDetail?.autoFrame !== 'ACTIVE' &&
                                            (selectImagePhoto?.imageType !== 'VIDEO' && selectImagePhoto?.imageType !== 'VIDEO_FINISH_LINE') &&
                                            <ListFrameImage
                                                frames={frames?.filter((frame) => frame.imageOrientation?.toLocaleLowerCase() === imageOrientation)}
                                                imageOrientation={imageOrientation}
                                                onSelectedFrameUrl={(e) => onSelectedFrameUrl(e)}
                                                eventCode={eventDetail?.eventCode || ''}
                                            />
                                        }

                                        {
                                            imageUrlSelected && (selectImagePhoto?.imageType !== 'VIDEO' && selectImagePhoto?.imageType !== 'VIDEO_FINISH_LINE') && (
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
                                            imageUrlSelected && (selectImagePhoto?.imageType === 'VIDEO' || selectImagePhoto?.imageType === 'VIDEO_FINISH_LINE') && selectImagePhoto?.downloadVideoUrl && (
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
                                                            src={selectImagePhoto?.downloadVideoUrl || selectImagePhoto?.videoThumbnailUrl || ''}
                                                            width={imageOrientation === 'portrait' ? 360 : 640} />
                                                    </Box>
                                                </m.div>
                                            )
                                        }
                                        <DownloadContent
                                            frameSelected={frameSelected}
                                            canvasRef={canvasRef}
                                            isLoading={isLoading}
                                            imageToDownload={imageToDownload}
                                            eventCode={eventDetail?.eventCode || ''}
                                        />
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

export default ImageFreeDownloadDialog;

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