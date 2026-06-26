import { Helmet } from "react-helmet-async";
import { useMemo, useState, useEffect, useCallback } from "react";

import { Box, Button, Container } from "@mui/material";

import { RouterLink } from "src/routes/components";
import { useParams, useRouter, useSearchParams } from "src/routes/hooks";

import { useBoolean } from "src/hooks/use-boolean";
import { getStorage } from "src/hooks/use-local-storage";

import { STORAGE_KEYS } from "src/utils/constants";

import { useTranslate } from "src/locales";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { showDialogLogin } from "src/slices/dialog-login.slices";
import { selectEvent, setEventDetail } from "src/slices/event.slices";
import { clearPhotoCart, setListPaymentGateway } from "src/slices/order.slices";
import { useGetEventPhotoByEventUrlWebMutation } from "src/api/event-photo.api";
import { setIsSearchMyFace, setResultSearchMyFace } from "src/slices/file.slices";
import { useListEventPhotoFrameByEventCodeMutation } from "src/api/event-photo-frame";

import Iconify from "src/components/iconify";
import EmptyContent from "src/components/empty-content";
import EventPrivacyPolicyDialog from "src/components/dialog/event-privacy-policy-dialog";

import { EventDetailsSkeleton } from "src/sections/event-detail/event-detail-skeleton";

import { EventModel } from "src/types/event-config.model";
import { EventPhotoFrameModel } from "src/types/event-photo-frame.type";

import RenderListPhotoDetail from "../render-list-photo-detail";

type Props = {
    eventUrl: string;
};
export default function ListPhotoView({ eventUrl }: Props) {

    const key = STORAGE_KEYS.USER_INFO;
    const accessTokenOption = getStorage(key);

    const router = useRouter();
    const params = useParams();
    const { t } = useTranslate();
    const isOpenDialog = useBoolean();
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const isAgain = searchParams.get('isAgain');

    const [listEventPhotoFrameByEventCodeApi] = useListEventPhotoFrameByEventCodeMutation();
    const [getEventByUrl, { isLoading: eventLoading, error: eventError }] = useGetEventPhotoByEventUrlWebMutation();
    const { eventDetail } = useAppSelector(selectEvent);
    // console.log("🚀 ~ ListPhotoView ~ eventDetail:", eventDetail);

    const eventItem = useMemo(() => eventDetail, [eventDetail]);
    const oldCart = useMemo(() => localStorage.getItem('photoCart'), []);

    const [frames, setFrames] = useState<EventPhotoFrameModel[]>([]);

    const { token } = params;
    // console.log("🚀 ~ ListPhotoView ~ oldCart:", oldCart)

    const loadFrame = async (eventCode: string) => {
        await listEventPhotoFrameByEventCodeApi({ eventCode }).unwrap().then((res) => {
            const { data } = res;
            setFrames(data);
        }).catch(err => {
            console.error('โหลดรูปไม่ได้:', err);
        });
    }

    const loadContent = useCallback(async () => {

        try {
            

            if (!isAgain && !oldCart) {
                dispatch(clearPhotoCart());
            }

            if (!isAgain || !eventDetail) {

                dispatch(setResultSearchMyFace(undefined));
                dispatch(setIsSearchMyFace(false));

                localStorage.removeItem('FFD_');
                localStorage.removeItem('FFDN_');

                const eventModel: EventModel = {
                    eventUrl,
                    registerStep: { listStep: [] }
                };

                const data = await getEventByUrl(eventModel).unwrap();

                const isSameEvent = eventItem?.eventUrl === eventUrl;

                if (!isSameEvent && eventItem) {
                    dispatch(clearPhotoCart());
                    localStorage.removeItem('photoCart');
                    localStorage.removeItem('eventDetail');
                    return;
                }

                if (!data?.eventCode) {
                    console.log('ไม่พบ event');
                    router.push(`/`);
                    return;
                }

                 localStorage.removeItem(`${STORAGE_KEYS.PACKAGE_PHOTO}-${data?.eventCode}`);

                if (data?.status !== 'ACTIVE' && !token) {
                    console.log('ไม่พบ event');
                    router.push(`/`);
                    return;
                }

                if (!accessTokenOption && data?.eventFree === 'ACTIVE') {
                    const eventDateActive = ((new Date(data?.photoSaleDate || '') < new Date()) && new Date(data?.photoSaleEndDate || '') > new Date());
                    if ((eventDateActive && data?.status !== 'PENDING') || token) {
                        dispatch(showDialogLogin(token ? `/event/${data?.eventUrl}/${token}` : `/event/${data?.eventUrl}`));
                        return;
                    }
                }

                if (data?.eventCode && data?.photoSalePolicy) {
                    const consent = localStorage.getItem(`accepted-policy-${data.eventCode}`);
                    if (!consent) {
                        isOpenDialog.onTrue();
                    }
                }

                window.scrollTo({ top: 0, behavior: 'smooth' });
                dispatch(setEventDetail(data));
                dispatch(setListPaymentGateway(data.listPhotoPaymentGateway));
                loadFrame(data.eventCode);
            }

        } catch (error) {
            console.error('Failed to load event:', error);
            router.push(`/`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAgain, eventItem, eventUrl, dispatch, accessTokenOption]);

    const renderError = (
        <EmptyContent
            filled
            title={`${eventError}`}
            action={
                <Button
                    component={RouterLink}
                    href=''
                    startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
                    sx={{ mt: 3 }}
                >
                    {t('common.goBackHomePage')}
                </Button>
            }
            sx={{ py: 10 }}
        />
    );

    const renderSkeleton = <Box sx={{ width: '100%', height: '100%', maxWidth: '100%' }}><EventDetailsSkeleton /></Box>;

    useEffect(() => {
        loadContent();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventUrl, isAgain, accessTokenOption]);

    const handleNotAccept = () => {
        isOpenDialog.onTrue();
        router.push('/')
    }

    const onAccept = () => {
        if (eventItem?.eventCode) {
            localStorage.setItem(`accepted-policy-${eventItem.eventCode}`, 'true');
        }
        isOpenDialog.onFalse();
    }

    return (
        <>
            {
                eventItem && eventItem?.eventCode && (
                    <Helmet>
                        <title>ซื้อรูปภาพงานวิ่ง | Checkfoto.com | {eventItem?.eventNameTh}</title>
                        <meta
                            name="description"
                            content={`ค้นหารูปภาพจากกิจกรรม ${eventItem?.eventNameTh} ได้ที่ Checkfoto.com`}
                        />
                        <meta property="og:title" content={`ซื้อรูปภาพงานวิ่ง | ${eventItem?.eventNameTh}`} />
                        <meta property="og:description" content={`ดูรูปภาพงานวิ่ง ${eventItem?.eventNameTh}`} />
                        <meta property="og:image" content={eventItem?.bannerFileUrl} />
                    </Helmet>
                )
            }

            <Container
                maxWidth='lg'
                sx={{
                    mt: 2,
                    mb: 2,
                }}
            >

                {eventLoading && renderSkeleton}

                {eventError && renderError}

                {eventItem && !eventLoading && <RenderListPhotoDetail eventItem={eventItem} frames={frames} />}

                {
                    eventItem?.photoSalePolicy && <EventPrivacyPolicyDialog open={isOpenDialog.value} onAccept={onAccept} policyMessage={eventItem.photoSalePolicy || ''} handleNotAccept={handleNotAccept} />
                }

            </Container>
        </>

    );
}