import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';

import { useLocales } from 'src/locales';
import { useAppSelector } from 'src/store/hooks';
import { selectEvent } from 'src/slices/event.slices';

import ListEventCard from 'src/components/list-event-card/list-event-card';
import TitleEventType from 'src/components/title-event-type/title-event-type';

import { EventPhoto } from 'src/types/photo.type';

const CardView = () => {

    const { currentLang } = useLocales();

    const { listEventByType } = useAppSelector(selectEvent);
    // const [listAllEvent, setListAllEvent] = useState<EventPhoto[]>([]);
    const [listEventAtive, setListEventAtive] = useState<EventPhoto[]>([]);
    const [listEventPending, setListEventPending] = useState<EventPhoto[]>([]);
    const [listEventClose, setListEventClose] = useState<EventPhoto[]>([]);

    const getEventByType = () => {
        let selectedRunningEvent: EventPhoto[] = [];
        const allEvent: EventPhoto[] = [];
        if (listEventByType) {

            const listActive: EventPhoto[] = [];
            const listClose: EventPhoto[] = [];
             const listPending: EventPhoto[] = [];

            selectedRunningEvent = listEventByType?.filter((x) => x.status !== 'DRAFT' && x.status !== 'INACTIVE' && x.eventUrl !== "checkraceshop" && !x.eventNameTh?.toLowerCase().includes('migrate') && !x.eventNameTh?.toLowerCase().includes('test')) || [];
            selectedRunningEvent?.forEach((eventModel: EventPhoto) => {
                const eventDateActive = ((new Date(eventModel?.photoSaleDate || '') < new Date()) && new Date(eventModel?.photoSaleEndDate || '') > new Date());
                if (eventModel?.status === 'ACTIVE' || eventModel?.status === 'PENDING' || eventModel?.status === 'DRAFT') {
                    if ((eventDateActive && eventModel?.status === 'PENDING' || ((new Date(eventModel.photoSaleDate || '') > new Date())))) {
                        listPending.push(eventModel);
                    } else if ((new Date(eventModel?.photoSaleDate || '') < new Date()) && new Date(eventModel?.photoSaleEndDate || '') < new Date()) {
                        listClose.push(eventModel);
                    } else if (eventDateActive && eventModel?.status !== 'PENDING') {
                        listActive.push(eventModel);
                    }
                } else {
                    listClose.push(eventModel);
                }
            })
            // setListEventPending(listEventPending);
            allEvent.push(...listActive, ...listClose);
            // setListAllEvent(allEvent);
            setListEventPending(listPending);
            setListEventAtive(listActive);
            setListEventClose(listClose);
        }
    }

    useEffect(() => {
        getEventByType();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listEventByType])

    return (
        <>
            {/* <Box sx={{ mb: 7 }}>
                <TitleEventType label={(currentLang?.value === 'en' ? 'New Event' : 'กิจกรรมล่าสุด')} imageSrc='/assets/event-image-object/add_road_black.png' />
                <ListEventCard listEvent={listAllEvent} />
            </Box> */}
            {
                listEventAtive?.length > 0 && <Box sx={{ mb: 7 }}>
                    <TitleEventType label={(currentLang?.value === 'en' ? 'Active Event' : 'งานที่เปิดขายภาพ')} imageSrc='/assets/event-image-object/add_road_black.png' />
                    <ListEventCard listEvent={listEventAtive} />
                </Box>
            }

            {
                listEventPending?.length > 0 && <Box sx={{ mb: 7 }}>
                    <TitleEventType label={(currentLang?.value === 'en' ? 'Pending Event' : 'รอเปิดขายภาพ')} imageSrc='/assets/event-image-object/add_road_black.png' />
                    <ListEventCard listEvent={listEventPending} />
                </Box>
            }
            <Box sx={{ mb: 7 }}>
                <TitleEventType label={(currentLang?.value === 'en' ? 'Past Event' : 'งานที่ผ่านมาแล้ว')} imageSrc='/assets/event-image-object/add_road_black.png' />
                <ListEventCard listEvent={listEventClose} />
            </Box>
        </>
    );
};

export default CardView;