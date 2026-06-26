import { useLocation } from "react-router";
import React, { useRef, useState, createRef, useEffect, useCallback } from "react";

import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Tab, Grid, Tabs, Stack, Button, useTheme, Container, Typography } from "@mui/material";

import { RouterLink } from 'src/routes/components';
import { useParams, useRouter } from 'src/routes/hooks';

import { getStorage } from 'src/hooks/use-local-storage';
import { useResponsive } from "src/hooks/use-responsive";
import { useCountdownDate } from 'src/hooks/use-countdown';

import { checkArrayLength } from "src/utils/check-array-length";
import { STORAGE_KEYS, EVENT_SHOP_CODE } from 'src/utils/constants';

import { selectEvent } from "src/slices/event.slices";
import { jwtDecode } from 'src/auth/context/jwt/utils';
import { useLocales, useTranslate } from 'src/locales';
import { selectAuthenSlice } from 'src/slices/authen.slices';
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { showDialogLogin } from 'src/slices/dialog-login.slices';
import { useGetByUrlMutation, useListEventByEventTypeMutation } from "src/api/event.api";
import {
    setListInputField,
    setListMerchandise,
    setListRegisterForm, setRegisterFormDetail, setListTicketInputField, setListTicketOptionInputField
} from "src/slices/register.slices";

import Image from "src/components/image";
import Label from "src/components/label";
import Iconify from "src/components/iconify";
import EmptyContent from "src/components/empty-content";
import TimeBlock from "src/components/time-block/time-block";
import { BackToTop } from "src/components/animate/back-to-top";
import Lightbox, { useLightBox } from 'src/components/lightbox';
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";

import { EventModel, EventTagModel, EventSectionModel, EventSectionContent } from "src/types/event-config.model";

import EventDetailInfo from "../event-details-info";
import EventYouMayLike from "../event-you-may-like";
import { EventDetailsSkeleton } from "../event-detail-skeleton";

// ----------------------------------------------------------------------

const URL_FILE_PATH = import.meta.env.VITE_URL_FILE;

const LIST_EVENT_SHOP_CODE = EVENT_SHOP_CODE;

type Props = {
    eventUrl: string;
};

export default function EventDetailDetailsView({ eventUrl }: Props) {

    const params = useParams();
    const router = useRouter();
    const { t } = useTranslate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    const key = STORAGE_KEYS.USER_INFO;
    const userProfile = getStorage(key);

    const { listEventByType } = useAppSelector(selectEvent);
    const { userAuthen } = useAppSelector(selectAuthenSlice);

    const [eventItem, setEventItem] = useState<EventModel>({
        registerStep: {
            listStep: []
        }
    });
    const [eventTokenTest, setEventTokenTest] = useState<string>();
    const [userProfileState, setUserProfileState] = useState<any>();
    const [eventTokenInfluencer, setEventTokenInfluencer] = useState<string>();

    const [getEventByTypeList] = useListEventByEventTypeMutation();
    const [getEventByUrl, { isLoading: eventLoading, error: eventError }] = useGetByUrlMutation();

    const renderSkeleton = <Box sx={{ width: '100%', height: '100%', maxWidth: '100%' }}><EventDetailsSkeleton /></Box>;

    const loadContent = async () => {

        if (!checkArrayLength(listEventByType)) {
            const eventModel: EventModel = {
                eventType: '',
                registerStep: {
                    listStep: []
                }
            };
            await getEventByTypeList(eventModel).unwrap();
        }

        const eventModel: EventModel = {
            eventUrl,
            registerStep: {
                listStep: []
            }
        };

        const data = await getEventByUrl(eventModel).unwrap();

        if (data?.eventCode) {

            window.scrollTo({ top: 0, behavior: 'smooth' });
            dispatch(setListTicketOptionInputField([]));
            dispatch(setListRegisterForm([]));
            dispatch(setListInputField([]));
            dispatch(setRegisterFormDetail(undefined));
            dispatch(setListTicketInputField([]));
            dispatch(setListMerchandise([]));

            const { token } = params;
            if (token) {
                if (token === data?.token && data?.eventStatus !== 'DRAFT') {
                    setEventTokenTest(token);
                    setEventItem(data);
                } else if (token === data?.token && data?.eventStatus === 'DRAFT') {
                    setEventTokenTest(token);
                    setEventItem(data);
                } else {
                    router.push(`/event-not-found`);
                }
            } else if (data?.eventStatus !== 'DRAFT') {
                if (location.pathname.includes('influencer')) {
                    setEventTokenInfluencer('influencer');
                }
                setEventItem(data);
            } else {
                router.push(`/event-not-found`);
            }
        } else {
            router.push(`/`);
        }
    }

    useEffect(() => {
        loadContent();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventUrl]);

    useEffect(() => {
        const token = userProfile;
        if (token) {
            setUserProfileState(jwtDecode(token));
        }

        if (userAuthen && userAuthen?.accessToken) {
            setUserProfileState(jwtDecode(userAuthen.accessToken));
        }

        if (!token && !userAuthen) {
            setUserProfileState(null);
        }
    }, [userProfile, userAuthen]);

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

    const handleRegister = () => {
        const isRegister = eventItem?.listTicket?.filter((x) => x.status === 'ACTIVE') || [];
        if (isRegister?.length > 0) {
            if (userProfileState) {
                if (eventTokenTest) {
                    router.push(`/register/${eventItem.eventUrl}/${eventTokenTest}`);
                } else if (eventTokenInfluencer) {
                    router.push(`/register/${eventItem.eventUrl}/${eventTokenInfluencer}`);
                } else {
                    router.push(`/register/${eventItem.eventUrl}`);
                }
            } else {
                setUrlRedirctToDispatch(eventTokenTest || '');
            }
        }
    }

    const handleMerchant = () => {
        const isMerchant = eventItem?.listMerchandise?.filter((x) => x.status === 'ACTIVE') || [];
        if (isMerchant?.length > 0) {
            if (userProfileState) {
                if (eventTokenTest) {
                    router.push(`/merchandise/${eventItem.eventUrl}/${eventTokenTest}`);
                } else {
                    router.push(`/merchandise/${eventItem.eventUrl}`);
                }
            } else {
                setUrlRedirctMerchandiseToDispatch(eventTokenTest || '');
            }
        }
    }

    const setUrlRedirctToDispatch = (eventTokenTestIn: string) => {
        if (eventTokenTestIn) {
            dispatch(showDialogLogin(`/register/${eventItem.eventUrl}/${eventTokenTestIn}`));
        } else {
            dispatch(showDialogLogin(`/register/${eventItem.eventUrl}`));
        }
    }

    const setUrlRedirctMerchandiseToDispatch = (eventTokenTestIn: string) => {
        if (eventTokenTestIn) {
            dispatch(showDialogLogin(`/merchandise/${eventItem.eventUrl}/${eventTokenTestIn}`));
        } else {
            dispatch(showDialogLogin(`/merchandise/${eventItem.eventUrl}`));
        }
    }

    return (
        <Container
            maxWidth='lg'
            sx={{
                mt: 10,
                mb: 2,
            }}
        >

            {eventLoading && renderSkeleton}

            {eventError && renderError}

            {eventItem && !eventLoading && <RenderEventDetail eventItem={eventItem} eventTokenTest={eventTokenTest || ''} onRegister={() => handleRegister()} onMerchant={eventItem?.merchandiseStatus === 'ACTIVE' ? () => handleMerchant() : undefined} />}

        </Container>
    );
}

const RenderEventDetail = ({ eventItem, onRegister, eventTokenTest, onMerchant }: { eventItem: EventModel, onRegister: () => void, onMerchant?: () => void, eventTokenTest: string }) => {

    const { t } = useTranslate();
    const { currentLang } = useLocales();
    const lgUp = useResponsive('up', 'lg');

    const isRegister = eventItem?.listTicket?.filter((x) => x.status === 'ACTIVE') || [];
    const isMerchant = eventItem?.listMerchandise?.filter((x) => x.status === 'ACTIVE') || [];
    const isFuncMerchan = Boolean(onMerchant);
    
    const isShop = LIST_EVENT_SHOP_CODE.filter((x) => x.CODE === (eventItem?.eventCode)).length > 0;

    const eventDateActive = ((new Date(eventItem.registerStartDate || '') < new Date()) && new Date(eventItem.registerEndDate || '') > new Date());

    const [eventRegisterDate, setEventRegisterDate] = useState<any>(eventItem?.registerStartDate);

    useEffect(() => {
        if (eventItem && eventItem?.registerStartDate) {
            setEventRegisterDate(eventItem.registerStartDate);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventItem?.registerStartDate]);

    return (
        <>
            <CustomBreadcrumbs
                links={[
                    { name: t('common.home'), href: '/' },
                    { name: currentLang?.value === 'en' ? eventItem?.eventNameEn : eventItem?.eventNameTh },
                ]}
                sx={{ mt: lgUp ? 8 : 9 }}
            />

            <BackToTop />

            <Typography variant="h3" px='0px' py='10px'>
                {
                    currentLang?.value === 'en' ? eventItem?.eventNameEn : eventItem?.eventNameTh
                }
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 3, md: 5, lg: 8 }} >
                    <Grid item xs={12} md={7}>
                        <Box sx={{ textAlign: 'center' }} >
                            <Image
                                disabledEffect
                                borderRadius={2}
                                alt={eventItem?.eventNameEn}
                                src={eventItem?.imageEventBannerUrl}
                                paddingTop={0} />
                        </Box>
                        {
                            !lgUp && (
                                <Grid item xs={12} md={5} sx={{ position: 'relative', mt: 3 }}>
                                    {
                                        eventItem && <EventDetailInfo
                                            eventDetail={eventItem}
                                            onRegister={onRegister}
                                            isRegister={isRegister}
                                            isMerchant={isMerchant}
                                            isShop={isShop}
                                            eventTokenTest={eventTokenTest}
                                            onMerchant={onMerchant}
                                        />
                                    }
                                </Grid>
                            )
                        }
                        <CountdownEvent eventDetail={eventItem} eventRegisterDate={eventRegisterDate?.toString()} />
                        {
                            eventItem?.listEventSection && eventItem?.listEventSection?.length > 0 && <EventContentInfo eventItem={eventItem} />
                        }

                    </Grid>
                    {
                        lgUp && (
                            <Grid item xs={12} md={5} sx={{ position: 'relative' }}>
                                {
                                    eventItem && <EventDetailInfo
                                        eventDetail={eventItem}
                                        onRegister={onRegister}
                                        isRegister={isRegister}
                                        isMerchant={isMerchant}
                                        isShop={isShop}
                                        eventTokenTest={eventTokenTest}
                                        onMerchant={onMerchant}
                                    />
                                }
                            </Grid>
                        )
                    }

                </Grid>

            </Box>
            {
                !lgUp &&
                <Box sx={{
                    width: '100%',
                    position: 'sticky',
                    height: isFuncMerchan ? '110px' : 'auto',
                    right: { xs: 24, md: 32 },
                    bottom: { xs: 5, md: 5 },
                    marginTop: 5,
                    zIndex: (theme) => theme.zIndex.speedDial,
                    transition: (theme) => theme.transitions.create(['transform'])
                }}>

                    {
                        !isShop && <LoadingButton
                            fullWidth
                            color='primary'
                            size="large"
                            type="button"
                            variant="contained"
                            disabled={(eventItem?.eventStatus !== 'ACTIVE' || !eventDateActive || isRegister?.length === 0 || !isRegister) && eventTokenTest === ''}
                            onClick={() => onRegister()}
                        >
                            {isRegister?.length === 0 || !isRegister ? t('eventRegisterFull') : t('eventDetail.eventRegister')}
                        </LoadingButton>
                    }

                    {
                        isFuncMerchan ? <LoadingButton
                            fullWidth
                            sx={{ marginTop: 1.5 }}
                            color='inherit'
                            size="large"
                            type="button"
                            variant="contained"
                            disabled={(eventItem?.eventStatus !== 'ACTIVE' || !eventDateActive || isMerchant?.length === 0 || !isMerchant) && eventTokenTest === ''}
                            onClick={() => onMerchant?.()}
                        >
                            {isMerchant?.length === 0 || !isMerchant ? t('merchandiseFull') : t('merchandiseSale')}
                        </LoadingButton> : null
                    }
                </Box>
            }

            {
                eventItem?.listTag && eventItem?.listTag?.length > 0 &&
                <Grid container spacing={{ xs: 3, md: 5, lg: 8 }}>
                    <Grid item xs={12}>
                        <EventTagContent eventItem={eventItem} />
                    </Grid>
                </Grid>
            }

            <Grid container spacing={{ xs: 3, md: 5, lg: 8 }}>
                <Grid item xs={12}>
                    <EventYouMayLike />
                </Grid>
            </Grid>
        </>
    )
};

const CountdownEvent = ({ eventDetail, eventRegisterDate }: { eventDetail: EventModel, eventRegisterDate: string }) => {

    const { t } = useTranslate();

    const startDate = (eventDetail && eventDetail?.registerStartDate ? new Date(eventDetail.registerStartDate || '') < new Date() : false);

    const countdownDate = useCountdownDate(new Date(eventRegisterDate));

    return (
        <>
            {
                (eventDetail?.eventStatus === 'ACTIVE' || eventDetail?.eventStatus === 'PENDING') &&
                (!startDate) &&
                countdownDate && <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    divider={<Box sx={{ mx: { xs: 1, sm: 2.5 } }}>:</Box>}
                    sx={{ typography: 'h2', mb: 3, mt: 5 }}
                >
                    <TimeBlock label={t('eventDetail.day')} value={countdownDate.days} />
                    <TimeBlock label={t('eventDetail.hour')} value={countdownDate.hours} />
                    <TimeBlock label={t('eventDetail.minute')} value={countdownDate.minutes} />
                    <TimeBlock label={t('eventDetail.second')} value={countdownDate.seconds} />
                </Stack>
            }
        </>
    )
}

const EventContentInfo = ({ eventItem }: { eventItem?: EventModel }) => {

    const { currentLang } = useLocales();


    const listSection = eventItem?.listEventSection?.map(({ sectionCode, sectionName, mainHeaderEn, mainHeaderTh, sequence }) => ({ sectionCode, sectionName, mainHeaderEn, mainHeaderTh, sequence })) || [];

    const [currentTab, setCurrentTab] = useState(listSection[0]?.sectionCode);
    const elementsRef: any = useRef(eventItem?.listEventSection?.map(() => createRef()));

    const handleScroll = (index: number) => {
        if (elementsRef?.current[index]) {
            if (elementsRef.current[index]?.current) {
                const navbarHeight = 150;
                const scrollPosY = elementsRef.current[index].current.getBoundingClientRect().top + window.scrollY - navbarHeight;
                window.scroll({
                    top: scrollPosY,
                    behavior: 'smooth'
                })
            }
        }
    };

    const handleChangeTab = useCallback((e: React.SyntheticEvent, newValue: string) => {
        e.preventDefault();
        setCurrentTab(newValue);
        const index = listSection.findIndex((tab) => tab.sectionCode === newValue);
        handleScroll(index);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderTabs = (
        <Tabs
            sx={{ px: 6, py: 3 }}
            value={currentTab}
            onChange={handleChangeTab}
        >
            {listSection?.map((tab) => (
                <Tab
                    key={tab.sectionCode}
                    iconPosition="end"
                    value={tab.sectionCode}
                    label={currentLang?.value === 'en' ? tab?.mainHeaderEn : tab?.mainHeaderTh}
                    sx={{
                        '&:not(:last-of-type)': {
                            mr: 3,
                            ml: 3,
                        },
                    }}
                />
            ))}
        </Tabs>
    );

    return (
        <Box>

            {renderTabs}

            {eventItem?.listEventSection?.map((section, index: number) => (
                <Box
                    key={section.sectionCode}
                    id={section.sectionCode}
                    ref={elementsRef?.current[index]}
                >
                    <RenderContent sectionModel={section} />
                </Box>
            ))}

        </Box>
    )
}

const RenderContent = ({ sectionModel }: { sectionModel: EventSectionModel }) => {

    const { listContent } = sectionModel;

    const slides = listContent?.map((img) => ({
        src: `${URL_FILE_PATH}${img?.filePath}/${img?.fileName}`,
    }));

    const lightbox = useLightBox(slides || []);

    const { currentLang } = useLocales();

    return (
        <Box sx={{
            maxWidth: '100%',
            wordWrap: 'break-word'
        }}>
            <Typography variant="h4" px='30px' mt={4} mb={3}>
                {currentLang?.value === 'en' ? sectionModel?.mainHeaderEn : sectionModel.mainHeaderTh}
            </Typography>
            {
                listContent && listContent?.length > 0 && listContent.map((content: EventSectionContent) => content?.id && <RederItem key={content.id} content={content} lightbox={lightbox} />)
            }
            <Lightbox
                index={lightbox.selected}
                slides={slides}
                open={lightbox.open}
                close={lightbox.onClose}
                onGetCurrentIndex={(index) => lightbox.setSelected(index)}
            />
        </Box>
    )

}

const RenderContentHtml = ({ message }: { message: string }) => {
    const theme = useTheme();

    return (<Box
        dangerouslySetInnerHTML={{ __html: message }}
        sx={{
            mb: 0.5,
            '& p': {
                typography: 'body2', m: 0, fontSize: '1rem', lineHeight: '30px', '& span': {
                    color: `${theme.palette.mode === 'dark' && theme.palette.text.primary} !important`,
                }
            },
            '& a': { color: 'inherit', textDecoration: 'none' },
            '& strong': { typography: 'subtitle2', fontSize: '1.2rem' },
        }}
    />
    )
}



const RederItem = ({ content, lightbox }: { content: EventSectionContent, lightbox: any }) => {
    const { currentLang } = useLocales();

    return (
        <>
            <Box px='30px'>

                <RenderContentHtml message={currentLang?.value === 'en' ? content?.contentEn || '' : content?.contentTh || ''} />
            </Box>

            <Box px='30px' textAlign='center'>
                {/* {
            content?.fileName && content?.filePath && <input type="image"
                alt={content?.contentTh}
                onClick={() => lightbox.onOpen(`${URL_FILE_PATH}${content?.filePath}/${content?.fileName}`)}
                src={`${URL_FILE_PATH}${content?.filePath}/${content?.fileName}`}
                style={{ maxWidth: 645, marginTop: 3, marginBottom: 3, borderRadius: 16, width: '100%', cursor: 'zoom-in' }} />
        } */}
                {
                    content?.fileName && content?.filePath && (
                        <Image
                            onClick={() => lightbox.onOpen(`${URL_FILE_PATH}${content?.filePath}/${content?.fileName}`)}
                            alt='event-detail' src={`${URL_FILE_PATH}${content?.filePath}/${content?.fileName}`}
                            // ratio='9/16'
                            paddingTop='0%'
                            sx={{ borderRadius: 2, mt: 2, mb: 2, cursor: 'zoom-in' }} />
                    )
                }
            </Box>
        </>
    );
}


const EventTagContent = ({ eventItem }: { eventItem: EventModel }) => {

    const { listTag = [] } = eventItem;

    return (
        <Box >
            <Typography variant="h4" mt={4} mb={3}>
                Tag
            </Typography>
            {
                listTag && listTag?.map((tag: EventTagModel, index: number) => (
                    <Label key={index} sx={{ mr: 1, mb: 1 }}>{tag.tagDesc}</Label>
                ))
            }
        </Box>
    )
}