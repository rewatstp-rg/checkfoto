import { useParams } from "react-router";
import { useState, useEffect } from "react";

import { Box, Grid, Divider } from "@mui/material";

import { useResponsive } from "src/hooks/use-responsive";

import { PRICE_TYPE } from 'src/utils/constants';
import { isBetweenDateTime } from "src/utils/format-time";

import { useAppSelector } from "src/store/hooks";
import { useLocales, useTranslate } from "src/locales";
import { seleceFileModel } from "src/slices/file.slices";
import { selectErrorMessage } from "src/slices/error-message.slices";

import Image from "src/components/image";
import Iconify from "src/components/iconify";
import { BackToTop } from "src/components/animate/back-to-top";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
import { FadeCircularLoading } from "src/components/loading-screen";
// import { ToggleSteps } from "src/components/toggle-steps/toggle-steps";

import { EventPhotoFrameModel } from "src/types/event-photo-frame.type";
import { PhotoType, EventPhoto, PhotoPriceModel } from "src/types/photo.type";

import SearchByFace from "./search-by-face";
import PhotoPromotion from "./photo-promotion";
import ResultlistHighlights from "./result-listHighlights";
import EventPhotoDetailInfo from "./event-photo-details-info";
import ResultListPhotoBySearch from "./result-list-photo-by-search";

export default function RenderListPhotoDetail({ eventItem, frames }: { eventItem: EventPhoto, frames: EventPhotoFrameModel[] }) {

    const params = useParams();
    const { t } = useTranslate();
    const { currentLang } = useLocales();
    const { loadingUploadState } = useAppSelector(selectErrorMessage);
    const { openDialogSelectImage, resultSearchMyFace, isSearchMyFace } = useAppSelector(seleceFileModel);

    const lgUp = useResponsive('up', 'lg');
    const mdOnly = useResponsive('only', 'md');


    // const [toggleValue, setToggleValue] = useState<string>(PRICE_TYPE.ALL);
    // const [listToggleByPrice, setListToggleByPrice] = useState<{ value: string, label: string, icon: JSX.Element }[]>([]);

    const { token } = params;

    const { photoSaleDate = '', photoSaleEndDate = '', listPhotoPrice = [] } = eventItem || {};

    const isBetweenDate = isBetweenDateTime(new Date(), photoSaleDate, photoSaleEndDate);

    const [arrayList, setArrayList] = useState<PhotoType[]>([]);
    const [videoArrayList, setVideoArrayList] = useState<PhotoType[]>([]);
    const [videoFinishLineArrayList, setVideoFinishLineArrayList] = useState<PhotoType[]>([]);
    const [photoCount, setPhotoCount] = useState<number>(0);
    const [videoCount, setVideoCount] = useState<number>(0);
    const [videoFinishLineCount, setVideoFinishLineCount] = useState<number>(0);

    useEffect(() => {
        if (resultSearchMyFace?.length > 0) {

            const arrPhoto = resultSearchMyFace?.filter((item: PhotoType) => item?.imageType !== 'VIDEO' && item?.imageType !== 'VIDEO_FINISH_LINE') || [];
            const arrVideo = resultSearchMyFace?.filter((item: PhotoType) => item?.imageType === 'VIDEO') || [];
            const arrVideoFinishLine = resultSearchMyFace?.filter((item: PhotoType) => item?.imageType === 'VIDEO_FINISH_LINE') || [];

            setPhotoCount(arrPhoto?.length);
            setArrayList(arrPhoto);

            setVideoCount(arrVideo?.length);

            setVideoArrayList(arrVideo);

            setVideoFinishLineCount(arrVideoFinishLine?.length);
            setVideoFinishLineArrayList(arrVideoFinishLine);

        } else {
            setPhotoCount(0);
            setArrayList([]);

            setVideoCount(0);
            setVideoArrayList([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resultSearchMyFace]);

    // const onChangeToggleSteps = (e: string) => {
    //     setToggleValue(e);
    // };

    const renderByPriceType = (listPrice: PhotoPriceModel[]) => {
        const prices = listPrice?.filter((x) => x.status === 'ACTIVE') ?? [];
        const list: { value: string, label: string, icon: JSX.Element }[] = [];
        prices?.forEach((price) => {
            if (price.priceType === PRICE_TYPE.ALL) {
                list.push({ value: PRICE_TYPE.ALL, label: 'PHOTOS', icon: <Iconify icon="f7:photo" /> });
            } else if (price.priceType === PRICE_TYPE.ALL_VIDEO) {
                list.push({ value: PRICE_TYPE.ALL_VIDEO, label: 'VIDEO', icon: <Iconify icon="solar:video-library-line-duotone" /> });
            } else if (price.priceType === PRICE_TYPE.ALL_VIDEO_AND_PHOTO) {
                list.push({ value: PRICE_TYPE.ALL_VIDEO_AND_PHOTO, label: 'PHOTOS + VIDEO', icon: <Iconify icon="fa7-solid:photo-video" /> });
            }
        });

        // setListToggleByPrice(list);
    };

    useEffect(() => {
        if (listPhotoPrice?.length > 0) {
            // if (eventItem?.videoStatus === 'ACTIVE') {
            //     setToggleValue(PRICE_TYPE.ALL_VIDEO_AND_PHOTO);
            // }
            renderByPriceType(listPhotoPrice);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventItem?.videoStatus, listPhotoPrice]);

    return (
        <>
            {
                lgUp && (
                    <CustomBreadcrumbs
                        links={[
                            { name: t('common.home'), href: '/' },
                            { name: currentLang?.value === 'en' ? eventItem?.eventNameEn : eventItem?.eventNameTh },
                        ]}
                        sx={{ mb: 3 }}
                    />
                )
            }

            <BackToTop />

            <Grid container spacing={3}>
                <Grid item xs={12} md={4} lg={4}>
                    <Box sx={{ textAlign: 'center' }} >
                        <Image
                            disabledEffect
                            borderRadius={2}
                            alt={eventItem?.eventNameEn}
                            src={eventItem?.bannerFileUrl}
                            paddingTop={0} />
                    </Box>
                    {
                        !lgUp && !mdOnly && (
                            <Grid item xs={12} md={8} sx={{ position: 'relative', mt: lgUp ? 3 : 1 }}>
                                {
                                    eventItem && <EventPhotoDetailInfo
                                        eventDetail={eventItem}
                                    />
                                }
                            </Grid>
                        )
                    }

                </Grid>
                {
                    (lgUp || mdOnly) && (
                        <Grid item xs={12} md={8} lg={8} sx={{ position: 'relative' }}>
                            {
                                eventItem && <EventPhotoDetailInfo
                                    eventDetail={eventItem}
                                />
                            }
                        </Grid>
                    )
                }
            </Grid>

            <Divider sx={{ borderStyle: 'dashed', mt: 3, mb: 3 }} />

            {
                (isBetweenDate || token) && (
                    <>

                        {
                            !loadingUploadState && <Box>
                                <SearchByFace eventItem={eventItem} />
                                <Divider sx={{ borderStyle: 'dashed', mt: 3, mb: 3 }} />
                            </Box>
                        }

                        {loadingUploadState && (
                            <FadeCircularLoading loading={loadingUploadState} />
                        )}

                        {
                            !loadingUploadState && (arrayList.length > 0 || videoArrayList.length > 0) && (
                                <>
                                    <Box
                                        display='grid'
                                        gap={1}
                                        gridTemplateColumns={{
                                            xs: '1fr',
                                            sm: '1fr',
                                            md: 'repeat(2, 1fr)',
                                            lg: 'repeat(3, 1fr)',
                                        }}
                                        mb={2}
                                    >
                                        <PhotoPromotion
                                            eventItem={eventItem}
                                            photoList={arrayList}
                                            // toggleValue={toggleValue}
                                            videoCount={videoCount}
                                            videoArrayList={videoArrayList}
                                            photoCount={photoCount}
                                            videoFinishLineArrayList={videoFinishLineArrayList}
                                        />

                                    </Box>

                                    {/* {
                                        eventItem?.videoStatus === 'ACTIVE' && (
                                            <ToggleSteps
                                                value={toggleValue}
                                                onChange={onChangeToggleSteps}
                                                steps={listToggleByPrice}
                                            />
                                        )
                                    } */}

                                    {/* {
                                        listToggleByPrice?.length > 1 && (
                                            <ToggleSteps
                                                value={toggleValue}
                                                onChange={onChangeToggleSteps}
                                                steps={listToggleByPrice}
                                            />

                                        )
                                    } */}
                                </>
                            )
                        }

                        {
                            !loadingUploadState && isSearchMyFace && (
                                <ResultListPhotoBySearch
                                    // toggleValue={toggleValue}
                                    openDialogSelectImage={openDialogSelectImage || false}
                                    photoCount={photoCount}
                                    arrayList={arrayList}
                                    videoCount={videoCount}
                                    videoArrayList={videoArrayList}
                                    eventFreeStatus={eventItem?.eventFree || 'INACTIVE'}
                                    frames={frames || []}
                                    videoFinishLineArrayList={videoFinishLineArrayList}
                                    videoFinishLineCount={videoFinishLineCount}
                                />
                            )
                        }

                    </>
                )
            }

            {
                !loadingUploadState && !isSearchMyFace && eventItem?.listHighlights && eventItem.listHighlights?.length > 0 && (
                    <ResultlistHighlights arrayList={eventItem.listHighlights} openDialogSelectImage={openDialogSelectImage || false} />
                )
            }

        </>
    );
}