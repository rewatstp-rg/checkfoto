import { useState, useEffect } from "react";

import { Divider, Typography } from "@mui/material";

// import { PRICE_TYPE } from 'src/utils/constants';

import { useTranslate } from "src/locales"
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { seleceFileModel, setOpenDialogSelectImage } from "src/slices/file.slices";

import VirtualMasonryGallery from "src/components/photo/virtual-masonry-gallery";

import { PhotoType } from "src/types/photo.type";
import { EventPhotoFrameModel } from "src/types/event-photo-frame.type";

import ImageDialog from "./image-dialog";
import ImageFreeDownloadDialog from "./image-free-download-dialog";

type Props = {
    photoCount: number;
    arrayList: PhotoType[];
    openDialogSelectImage: boolean;
    videoCount: number;
    videoArrayList: PhotoType[];
    // toggleValue: string;
    eventFreeStatus: string;
    frames: EventPhotoFrameModel[];
    videoFinishLineArrayList: PhotoType[];
    videoFinishLineCount: number;
}
export default function ResultListPhotoBySearch({
    photoCount,
    arrayList,
    openDialogSelectImage,
    videoCount,
    videoArrayList,
    // toggleValue,
    eventFreeStatus,
    frames,
    videoFinishLineArrayList,
    videoFinishLineCount
}: Props) {

    const { searchErrorStatus } = useAppSelector(seleceFileModel);

    const dispatch = useAppDispatch();
    const { t } = useTranslate();

    // const [countItem, setCountItem] = useState(0);
    const [listPhoto, setListPhoto] = useState<PhotoType[]>([]);

    useEffect(() => {

         setListPhoto([...arrayList, ...videoArrayList]);

        // if (toggleValue === PRICE_TYPE.ALL_VIDEO_AND_PHOTO) {
        //     // const count = photoCount + videoCount;
        //     // setCountItem(count);
        //     setListPhoto([...arrayList, ...videoArrayList]);
        // } else if (toggleValue === PRICE_TYPE.ALL) {
        //     // setCountItem(photoCount);
        //     setListPhoto(arrayList);
        // } else if (toggleValue === PRICE_TYPE.ALL_VIDEO) {
        //     // setCountItem(videoCount);
        //     setListPhoto(videoArrayList);
        // }

    }, [videoCount, photoCount, arrayList, videoArrayList]);

    return (
        <>
            {listPhoto.length === 0 && (searchErrorStatus === 'ACTIVE' || searchErrorStatus === 'NO_FACE') && <Typography variant="h4" mb={2}>{t('photo.searchByFaceResultNotFound')}</Typography>}

            {
                eventFreeStatus === 'ACTIVE' && (
                    <>

                        {
                            videoFinishLineArrayList?.length > 0 && (
                                <>
                                    <Typography variant="h4" mb={2}>{t('photo.videoFinishLineTitle')} {videoFinishLineCount} {t('photo.video')}</Typography>
                                    <VirtualMasonryGallery images={videoFinishLineArrayList || []} pageType="PHOTO" eventFreeStatus={eventFreeStatus} />
                                    <Divider sx={{ my: 3, borderStyle: 'dashed' }} />
                                </>
                            )
                        }
                        {
                            videoArrayList.length > 0 && (
                                <>
                                    <Typography variant="h4" mb={2}>{t('photo.searchByFaceResultTitle')} {videoArrayList.length} {t('photo.video')}</Typography>
                                    <VirtualMasonryGallery images={videoArrayList} pageType="PHOTO" eventFreeStatus={eventFreeStatus} />
                                    <Divider sx={{ my: 3, borderStyle: 'dashed' }} />
                                </>
                            )
                        }
                        {
                            arrayList.length > 0 && (
                                <>
                                    <Typography variant="h4" mb={2}>{t('photo.searchByFaceResultTitle')} {arrayList.length} {t('photo.photo')}</Typography>
                                    <VirtualMasonryGallery images={arrayList} pageType="PHOTO" eventFreeStatus={eventFreeStatus} />
                                </>
                            )
                        }
                    </>
                )
            }

            {
                eventFreeStatus === 'INACTIVE' && (
                    <>
                        {
                            videoFinishLineArrayList?.length > 0  && (
                                <>
                                    <Typography variant="h4" mb={2}>{t('photo.videoFinishLineTitle')} {videoFinishLineCount} {t('photo.video')}</Typography>
                                    <VirtualMasonryGallery images={videoFinishLineArrayList || []} pageType="PHOTO" eventFreeStatus={eventFreeStatus} />
                                    <Divider sx={{ my: 3, borderStyle: 'dashed' }} />
                                </>
                            )
                        }
                        {
                            videoArrayList.length > 0 && (
                                <>
                                    <Typography variant="h4" mb={2}>{t('photo.searchByFaceResultTitle')} {videoArrayList.length} {t('photo.video')}</Typography>
                                    <VirtualMasonryGallery images={videoArrayList} pageType="PHOTO" eventFreeStatus={eventFreeStatus} />
                                    <Divider sx={{ my: 3, borderStyle: 'dashed' }} />
                                </>
                            )
                        }

                        {
                            arrayList.length > 0 && (
                                <>
                                    <Typography variant="h4" mb={2}>{t('photo.searchByFaceResultTitle')} {arrayList.length} {t('photo.photo')}</Typography>
                                    <VirtualMasonryGallery images={arrayList} pageType="PHOTO" eventFreeStatus={eventFreeStatus} />
                                </>
                            )
                        }
                    </>
                )
            }

            {openDialogSelectImage && eventFreeStatus === 'INACTIVE' && <ImageDialog
                open={openDialogSelectImage || false}
                onClose={() => dispatch(setOpenDialogSelectImage(false))}
            />}

            {openDialogSelectImage && eventFreeStatus === 'ACTIVE' && <ImageFreeDownloadDialog
                frames={frames}
                open={openDialogSelectImage || false}
                onClose={() => dispatch(setOpenDialogSelectImage(false))}
                eventFree={eventFreeStatus}
            />}
        </>
    )
}