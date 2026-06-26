import axios from 'axios';
import { useRef, useState, useEffect, useCallback } from "react";

import { Box, Grid, Stack, Button, Divider, Backdrop, Typography, CircularProgress } from "@mui/material";

import { useBoolean } from "src/hooks/use-boolean";

import { compressImageWithResize } from "src/utils/compress-image";
import { base64ToBlob, fileToBase64, checkImageOrientationFromUrl } from "src/utils/getPathImageByfile64";
import { enqueueSnackbarErrorComponent, enqueueSnackbarSuccessComponent } from "src/utils/enqueueSnackbarComponent";

import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { useGetEventPhotoFrameByCodeMutation, useListEventPhotoFrameByEventCodeMutation } from "src/api/event-photo-frame";
import { setLoadingState, selectErrorMessage, setIsLoadingDailog, closeDialogMessage } from "src/slices/error-message.slices";
import { useCheckEventByBoothPassMutation, useUploadFileSuccessForPhotoboothMutation, useGeneratePresignedUrlForPhotoboothMutation, } from "src/api/event-photo-booth.api";

import Iconify from "src/components/iconify";
import AlertDialog from "src/components/dialog/alert-dialog";
import ListFrameImage from 'src/components/photo/list-frame-image';
import UploadBoxNative from "src/components/upload/upload-box-native";

import { EventModel } from "src/types/event-config.model";
import { EventPhotoType } from 'src/types/event-photo.type';
import { EventPhotoFrameModel } from "src/types/event-photo-frame.type";

import SearchImageFile from "../search-image-file";
import DialogSendBoothPassword from "../dialog-send-booth-password";

// const FRAME_IMAGE = '/assets/frame-mockup/S__225927171.png';
const DEFAULT_IMAGE = '/assets/frame-mockup/400x600.svg';

export default function UploadCommonImageFrameView({ eventUrl }: { eventUrl: string }) {

    const isSendPassword = useBoolean();
    const dispatch = useAppDispatch();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { alertDialogModel, isLoadingDailog, loadingState } = useAppSelector(selectErrorMessage);

    const [generatePresignedUrlForPhotobooth] = useGeneratePresignedUrlForPhotoboothMutation();
    const [getEventPhotoFrameByCode] = useGetEventPhotoFrameByCodeMutation();
    const [listEventPhotoFrameByEventCodeApi] = useListEventPhotoFrameByEventCodeMutation();
    const [uploadFileSuccess] = useUploadFileSuccessForPhotoboothMutation();
    const [checkEventByBoothPass, { isLoading: isLoadingCheckEventByBoothPass }] = useCheckEventByBoothPassMutation();

    const [isLoading, setIsLoading] = useState(false);
    const [isPassEvent, setIsPassEvent] = useState(false);
    const [isUploadSuccess, setIsUploadSuccess] = useState(false);
    const [fileUpload, setFileUpload] = useState<File | null>(null);
    const [imageUrlSelected, setImageUrlSelected] = useState<string>('');
    const [imageOrientation, setImageOrientation] = useState<string>('');
    const [frames, setFrames] = useState<EventPhotoFrameModel[]>([]);
    const [imageFrameUrlSelected, setImageFrameUrlSelected] = useState<string>('');
    const [eventPhotoDetail, setEventPhotoDetail] = useState<EventPhotoType | null>(null);

    const handleChange = async (event: File) => {
        const file = event;
        try {
            if (file) {

                dispatch(setLoadingState(true));

                const fileItem = file;

                // ตรวจสอบขนาดไฟล์ไม่เกิน 5MB
                const maxSizeInBytes = 5 * 1024 * 1024;
                if (fileItem.size > maxSizeInBytes) {
                    dispatch(setLoadingState(false));
                    enqueueSnackbarErrorComponent("ขนาดไฟล์ไม่เกิน 5MB");
                    return;
                }

                const base64Data = await fileToBase64(file);
                checkImageOrientationFromUrl(base64Data)
                    .then(async orientation => {
                        setImageOrientation(orientation.orientation);
                        setImageUrlSelected(base64Data);
                    }).catch(err => {
                        console.error('โหลดรูปไม่ได้:', err);
                        dispatch(setLoadingState(false));
                    })

                setFileUpload(fileItem);
            }
        } catch (err) {
            console.log("🚀 ~ handleChange ~ err:", err)
        }
    };

    const handleDownload = useCallback((): File | null => {
        const originalCanvas = canvasRef.current;
        if (!originalCanvas) return null;

        const maxExportWidth = Number(originalCanvas.width);
        const scale = maxExportWidth / originalCanvas.width;
        const exportWidth = originalCanvas.width * scale;
        const exportHeight = originalCanvas.height * scale;

        const exportCanvas = document.createElement('canvas');
        exportCanvas.width = exportWidth;
        exportCanvas.height = exportHeight;

        const exportCtx = exportCanvas.getContext('2d');
        if (!exportCtx) return null;

        exportCtx.drawImage(originalCanvas, 0, 0, exportWidth, exportHeight);

        const dataUrl = exportCanvas.toDataURL('image/jpeg', 0.93);
        const base64 = dataUrl.split(',')[1];
        const fileName = new Date().getTime().toString();

        const blob = base64ToBlob(base64, 'image/jpeg');
        return new File([blob], `frame_${fileName}.jpg`, { type: 'image/jpeg' });
    }, []);

    const onSubmit = async () => {
        if (fileUpload && fileUpload.type.startsWith("image/")) {
            const fileToSave = handleDownload();
            if (fileToSave) {
                dispatch(setLoadingState(true));
                setIsUploadSuccess(false);

                const originalFile = fileUpload;
                const frameFile = fileToSave;

                 const blobUrl = URL.createObjectURL(originalFile);
                 console.log("🚀 ~ onSubmit ~ blobUrl:", blobUrl)

                const model = {
                    eventCode: eventPhotoDetail?.eventCode,
                    folderCode: eventPhotoDetail?.folderCode,
                    imageName: originalFile.name,
                    imageType: 'NORMAL',
                    imageWithFrameName: fileToSave.name,
                };

                const fileOriginalCompress = await compressImageWithResize(originalFile, { quality: 0.5, resizeRatio: 0.2 });
                const fileFrameCompress = await compressImageWithResize(frameFile, { quality: 0.5, resizeRatio: 0.2 });

                const presign = await generatePresignedUrlForPhotobooth(model).unwrap();

                if (presign.status?.description !== 'SUCCESS') {
                    throw new Error('Presign failed');
                }

                await axios.put(presign.data.uploadUrl, originalFile, {
                    headers: {
                        'Content-Type': originalFile.type
                    },
                    timeout: 30000,
                });

                await axios.put(presign.data.uploadThumbnailUrl, fileOriginalCompress, {
                    headers: {
                        'Content-Type': fileOriginalCompress.type
                    },
                    timeout: 30000,
                });

                await axios.put(presign.data.uploadFrameUrl, frameFile, {
                    headers: {
                        'Content-Type': frameFile.type
                    },
                    timeout: 30000,
                });

                await axios.put(presign.data.uploadFrameThumbnailUrl, fileFrameCompress, {
                    headers: {
                        'Content-Type': fileFrameCompress.type
                    },
                    timeout: 30000,
                });

                const res = await uploadFileSuccess(presign.data).unwrap();
                if (res.status?.description === 'SUCCESS') {
                    dispatch(setLoadingState(false));
                    setIsUploadSuccess(true);
                    enqueueSnackbarSuccessComponent();
                } else {
                    dispatch(setLoadingState(false));
                    enqueueSnackbarErrorComponent("อัพโหลดรูปภาพไม่สําเร็จ");
                    throw new Error('uploadFileSuccess failed');
                }
            } else {
                enqueueSnackbarErrorComponent("อัพโหลดรูปภาพไม่สําเร็จ");
            }
        } else {
            enqueueSnackbarErrorComponent("กรุณาเลือกรูปภาพ");
        }
    }

    const onReset = () => {
        setFileUpload(null);
        setImageUrlSelected('');
        setImageOrientation('');
        setIsUploadSuccess(false);
        dispatch(setLoadingState(false));
    }

    const onCloseDialogAlert = () => {
        dispatch(setIsLoadingDailog(false));
        dispatch(closeDialogMessage());
    }

    const onSelectedFrameUrl = async (frameUrl?: EventPhotoFrameModel | null) => {
        dispatch(setLoadingState(true));
        if (frameUrl) {
            await getEventPhotoFrameByCode(frameUrl).unwrap().then(res => {
                const { data } = res;
                if (data?.fileResponse && data?.fileResponse?.file) {
                    const fileType = 'image/jpeg';
                    const base64DataFrame = `data:${fileType};base64,${data.fileResponse.file}`;
                    setImageFrameUrlSelected(base64DataFrame);
                }

            });
        } else {
            setTimeout(() => {
                setImageFrameUrlSelected('');
                dispatch(setLoadingState(false));
            }, 1000);
        }
    }

    const loadFrame = async (eventCode: string, password: string) => {
        await listEventPhotoFrameByEventCodeApi({ eventCode }).unwrap().then((res) => {
            const { data } = res;
            setFrames(data);
            setIsPassEvent(true);
            isSendPassword.onFalse();
            sessionStorage.setItem("isOpenPasswordDialog", password);
        }).catch(err => {
            console.error('โหลดรูปไม่ได้:', err);
        });
    }

    const onSubmitBoothPassword = async ({ password }: { password: string }) => {
        const eventModel: EventModel = {
            eventUrl,
            boothUploadPassword: password,
            registerStep: { listStep: [] }
        };
        await checkEventByBoothPass(eventModel).unwrap().then(res => {
            if (res && res.status === 'ACTIVE' && res.eventCode) {
                setEventPhotoDetail(res);
                loadFrame(res.eventCode, password);
            } else {
                sessionStorage.removeItem("isOpenPasswordDialog");
                enqueueSnackbarErrorComponent("รหัสผ่านไม่ถูกต้อง");
                isSendPassword.onTrue();
            }
        });
    }

    useEffect(() => {
        const isOpenPasswordDialog = sessionStorage.getItem("isOpenPasswordDialog");
        if (!isOpenPasswordDialog) {
            isSendPassword.onTrue();
        } else {
            onSubmitBoothPassword({ password: isOpenPasswordDialog });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Box
            component="main"
            sx={{
                minHeight: '100vh',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            {
                isPassEvent && (
                    <Stack
                        sx={{
                            width: 1,
                            mx: 'auto',
                            // paddingRight: 16,
                            justifyContent: 'flex-start',
                            px: { xs: 2, md: 2 },
                            pt: { xs: 0, md: 10 },
                            pb: { xs: 15, md: 0 },
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <Box sx={{
                                    maxWidth: imageOrientation === 'landscape' ? '700px' : '400px',
                                    margin: 'auto'
                                }}>
                                    {
                                        !isLoading && (
                                            <ConfigFrame
                                                useImageUrl={imageUrlSelected || DEFAULT_IMAGE}
                                                selectedFrameUrl={imageFrameUrlSelected || ''}
                                                setIsLoadingInFrame={setIsLoading}
                                                canvasRef={canvasRef} />
                                        )
                                    }
                                    {
                                        imageUrlSelected && (
                                            <>
                                                <Divider sx={{ borderStyle: 'dashed', mt: 1, mb: 1 }} />
                                                <Box sx={{ marginBottom: -2.5 }}>
                                                    <ListFrameImage isDisplayName={false} frames={frames?.filter((frame) => frame.imageOrientation?.toLocaleLowerCase() === imageOrientation)} imageOrientation={imageOrientation} onSelectedFrameUrl={(e) => onSelectedFrameUrl(e)} />
                                                </Box>
                                            </>
                                        )
                                    }

                                    <Divider sx={{ borderStyle: 'dashed', mt: 1, mb: 1 }} />
                                    <UploadBoxNative
                                        onChange={(file) => handleChange(file)}
                                        placeholder={
                                            <Stack spacing={0.5} alignItems="center">
                                                <Iconify icon="line-md:upload-loop" width={40} />
                                                <Typography variant="body2">เลือกรูปภาพ</Typography>
                                            </Stack>
                                        }
                                        sx={{ mb: 3, py: 2.5, flexGrow: 1, height: 'auto', width: 1 }}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                                    <Button variant="outlined" onClick={onReset}>คืนค่า</Button>
                                    <Button variant="contained" onClick={onSubmit}>อัพโหลด</Button>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Typography variant="h4" sx={{ mb: 3 }}>รูปภาพที่อัพโหลด (15 รูปล่าสุด)</Typography>
                                <SearchImageFile isUploadSuccess={isUploadSuccess} eventUrl={eventUrl} />
                            </Grid>
                        </Grid>
                    </Stack>
                )
            }

            <AlertDialog model={alertDialogModel} onCancel={onCloseDialogAlert} loading={isLoadingDailog} />
            {(loadingState) && (
                <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
                    <CircularProgress color="primary" />
                </Backdrop>
            )}
            <DialogSendBoothPassword loading={isLoadingCheckEventByBoothPass} open={isSendPassword.value} onClose={isSendPassword.onFalse} onSubmitPassword={onSubmitBoothPassword} />
        </Box>
    );
}

const ConfigFrame = ({
    useImageUrl,
    selectedFrameUrl,
    setIsLoadingInFrame,
    canvasRef,
}: {
    useImageUrl: string;
    selectedFrameUrl: string;
    setIsLoadingInFrame: React.Dispatch<React.SetStateAction<boolean>>;
    canvasRef: React.RefObject<HTMLCanvasElement>;
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

                // ✅ Export base64 ที่ย่อไฟล์แล้ว (ถ้าต้องการใช้งานต่อ)
                const compressedBase64 = canvas.toDataURL("image/jpeg", 0.93);
                // console.log("✅ Compressed Base64:", compressedBase64);
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