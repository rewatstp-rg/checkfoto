import { Stack, Typography } from '@mui/material';

import { STORAGE_KEYS } from 'src/utils/constants';
import { fileToBase64 } from 'src/utils/getPathImageByfile64';
import { compressImageToJpg } from 'src/utils/compress-image';
import { enqueueSnackbarErrorComponent } from 'src/utils/enqueueSnackbarComponent';

import { useTranslate } from 'src/locales';
import { useAppDispatch } from 'src/store/hooks';
import { useSearchImageByFaceMutation } from "src/api/photo.api";
import { setLoadingUploadState } from 'src/slices/error-message.slices';
import { setIsSearchMyFace, setSearchErrorStatus, setResultSearchMyFace, setFileForsearchMyFace } from "src/slices/file.slices";

import Iconify from 'src/components/iconify';
// import { UploadBox } from 'src/components/upload';
import UploadBoxNative from 'src/components/upload/upload-box-native';
import UploadBoxButtons from 'src/components/upload/upload-box-buttons';

import { EventPhoto } from 'src/types/photo.type';

// ตรวจ platform
const getMobilePlatform = (): 'android' | 'ios' | 'other' => {
    const ua = navigator.userAgent || navigator.vendor;
    if (/android/i.test(ua)) return 'android';
    if (/iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream) return 'ios';
    return 'other';
};

export default function SearchByFace({
    eventItem
}: { eventItem: EventPhoto }) {

    const [searchImageByFace] = useSearchImageByFaceMutation();

    const { t } = useTranslate();
    const dispatch = useAppDispatch();
    const platform = getMobilePlatform();

    const getCompressionQuality = (fileSizeInBytes: number): number => {
        // แปลง Bytes เป็น Megabytes (MB)
        const fileSizeInMB = fileSizeInBytes / (1024 * 1024);

        if (fileSizeInMB >= 5) {
            // ไฟล์ 5MB ขึ้นไป 
            return 0.3;
        }

        if (fileSizeInMB >= 4) {
            // ไฟล์ 4MB ถึง < 5MB 
            return 0.35;
        }

        if (fileSizeInMB >= 3) {
            // ไฟล์ 3MB ถึง < 4MB 
            return 0.4;
        }

        if (fileSizeInMB >= 2) {
            // ไฟล์ 2MB ถึง < 3MB 
            return 0.45;
        }

        if (fileSizeInMB >= 1) {
            // ไฟล์ 1MB ถึง < 2MB 
            return 0.47;
        }

        return 0.5;
    };

    const handleChange = async (event: File) => {
        const file = event;
        try {
            if (file) {
                const fileItem = file;

                // ตรวจสอบขนาดไฟล์ไม่เกิน 5MB
                const maxSizeInBytes = 5 * 1024 * 1024;

                if (fileItem.size > maxSizeInBytes) {
                    enqueueSnackbarErrorComponent(t('messageError.fileTooLarge'));
                    return;
                }

                dispatch(setLoadingUploadState(true));

                if (fileItem && fileItem.type.startsWith("image/")) {

                    const dynamicQuality = getCompressionQuality(fileItem.size);
                    // console.log("🚀 ~ handleChange ~ dynamicQuality:", dynamicQuality)

                    const compressedFile = await compressImageToJpg(fileItem, {
                        quality: dynamicQuality,
                        type: 'image/jpeg',
                    });

                    // console.log("🚀 ~ handleChange ~ compressedFile:", compressedFile);

                    const payload = {
                        eventCode: eventItem?.eventCode,
                        eventUrl: eventItem?.eventUrl,
                        faceImageName: compressedFile.name,
                        threshold: 8
                    };

                    const formData = new FormData();
                    formData.append('file', compressedFile);
                    formData.append('data', JSON.stringify(payload));
                    localStorage.removeItem('FFD_');
                    localStorage.removeItem('FFDN_');

                    await searchImageByFace(formData).unwrap().then(async res => {
                        if (res?.status?.description === "SUCCESS" && res?.data) {
                            const { data } = res;
                            dispatch(setResultSearchMyFace(data));
                            dispatch(setLoadingUploadState(false));
                            dispatch(setIsSearchMyFace(true));
                            dispatch(setSearchErrorStatus(data?.status));
                            dispatch(setFileForsearchMyFace(compressedFile));

                            //                             const whereIn = data?.map((item: any) => `'${item?.imageS3Key}'`);

                            //                             const query = `
                            //   image_s3_key IN (${whereIn.join(",")})
                            // `;
                            //                             console.log(query);

                            // console.log("🚀 ~ handleChange ~ compressedFile:", compressedFile);
                            const base64Data = await fileToBase64(compressedFile);
                            // console.log("🚀 ~ handleChange ~ compressedFile:", compressedFile?.name)
                            // downloadFromUrl(base64Data, fileItem.name);
                            localStorage.setItem('FFD_', base64Data);
                            localStorage.setItem('FFDN_', compressedFile.name);
                             localStorage.removeItem(`${STORAGE_KEYS.PACKAGE_PHOTO}-${eventItem?.eventCode}`);
                        }
                    }).catch(_err => {
                        dispatch(setResultSearchMyFace([]));
                        dispatch(setLoadingUploadState(false));
                        dispatch(setIsSearchMyFace(true));
                        dispatch(setSearchErrorStatus('NO_FACE'));
                        dispatch(setFileForsearchMyFace(null));
                        localStorage.removeItem('FFD_');
                        localStorage.removeItem('FFDN_');
                    });
                } else {
                    dispatch(setResultSearchMyFace([]));
                    dispatch(setLoadingUploadState(false));
                    dispatch(setIsSearchMyFace(true));
                    enqueueSnackbarErrorComponent(t('messageError.notImageType'));
                    dispatch(setFileForsearchMyFace(null));
                    localStorage.removeItem('FFD_');
                    localStorage.removeItem('FFDN_');
                }
            }
        } catch (err) {
            handleClear();
        }
    };

    const handleClear = () => {
        dispatch(setResultSearchMyFace([]));
        dispatch(setLoadingUploadState(false));
        dispatch(setIsSearchMyFace(false));
        dispatch(setSearchErrorStatus(''));
        dispatch(setFileForsearchMyFace(null));
        localStorage.removeItem('FFD_');
        localStorage.removeItem('FFDN_');
    }

    return (
        <>
            {
                platform === 'ios' || platform === 'other' ? (
                    <UploadBoxNative
                        onChange={(file) => handleChange(file)}
                        placeholder={
                            <Stack spacing={0.5} alignItems="center">
                                <Iconify icon="line-md:upload-loop" width={40} />
                                <Typography variant="body2">{t('photo.searchByFaceTitle')}</Typography>
                            </Stack>
                        }
                        sx={{ mb: 3, py: 2.5, flexGrow: 1, height: 'auto', width: 1 }}
                    />
                ) : (
                    <UploadBoxButtons
                        error={false}
                        disabled={false}
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                handleChange(file);
                            }
                        }}
                    />
                )
            }
        </>

    )
};