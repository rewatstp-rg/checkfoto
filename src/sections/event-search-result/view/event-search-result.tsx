import { useState, useEffect } from 'react';

import { Box } from '@mui/material';
import Container from '@mui/material/Container';

import { useSearchParams } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import { checkArrayLength } from 'src/utils/check-array-length';

import { useTranslate } from 'src/locales';
import { useAppSelector } from 'src/store/hooks';
import { selectEvent } from 'src/slices/event.slices';
import { useListEventByEventTypeMutation } from 'src/api/event.api';
import { selectErrorMessage } from 'src/slices/error-message.slices';

import ListEventCard from 'src/components/list-event-card/list-event-card';
import TitleEventType from 'src/components/title-event-type/title-event-type';

import { EventPhoto } from 'src/types/photo.type';
import { EventModel } from 'src/types/event-config.model';

export default function EventSearchResult() {

    const { t } = useTranslate();
    const searchParams = useSearchParams();

    const lgUp = useResponsive('up', 'lg');

    const [getEventByTypeList] = useListEventByEventTypeMutation();

    const { listEventByType } = useAppSelector(selectEvent);
    const { loadingState } = useAppSelector(selectErrorMessage);

    const name = searchParams.get('name');
    const provinces = searchParams.get('provinces');
    const eventMonth = searchParams.get('eventMonth');
    const eventDistance = searchParams.get('eventDistance');

    const [listEvent, setListEvent] = useState<EventPhoto[]>([]);

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
    }

    useEffect(() => {
        loadContent();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const forObjectToSearch = (keySearch: string, eventItem: any) => Object.keys(eventItem).some((key: any) =>
        String(eventItem[key]).toLowerCase().includes(keySearch.toLowerCase())
    )

    const forObjectToSearchEventMonth = (keySearch: string, eventItem: any) => (eventItem?.eventDate?.split('-')[1].toLowerCase().includes(keySearch.toLowerCase()));

    const filterEventsByDistance = (distance: string, eventItem: any) => (eventItem?.listTicketDistance?.includes(distance));

    const filterEvents = (listEventSearch: any[], nameSearch?: string | null, provincesSearch?: string | null, eventMonthSearch?: string | null, eventDistanceSearch?: string | null) => (
        listEventSearch?.filter((eventItem: any) => {
            const isNotVirtualRun = eventItem?.eventType !== 'VIRTUAL_RUN';
            const isNotPastOrDraft = eventItem?.status !== 'PAST' && eventItem?.status !== 'DRAFT';
            // Convert null to undefined for type compatibility
            const isMatchName = nameSearch ? forObjectToSearch(nameSearch ?? '', eventItem) : true;
            const isMatchProvince = provincesSearch ? forObjectToSearch(provincesSearch ?? '', eventItem) : true;
            const isMatchEventMonth = eventMonthSearch ? forObjectToSearchEventMonth(eventMonthSearch ?? '', eventItem) : true;
            const isEventDistance = eventDistanceSearch ? filterEventsByDistance(eventDistanceSearch ?? '', eventItem) : true;
            return isNotVirtualRun && isNotPastOrDraft && isMatchName && isMatchProvince && isMatchEventMonth && isEventDistance;
        })
    );

    useEffect(() => {
        setListEvent([]);
        if (listEventByType?.length > 0) {
            const listEventSearch = filterEvents(listEventByType, name, provinces, eventMonth, eventDistance);
            setListEvent([]);
            if (listEventSearch?.length > 0) {
                setListEvent(listEventSearch);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, listEventByType, provinces, eventMonth, eventDistance]);

    return (
        <Container sx={{ textAlign: 'center', mt: lgUp ? 6 : 0, maxWidth: '1440px !important' }}>
            <Box sx={{ position: 'relative' }}>

                {/* {!lgUp && <SearchEvent />} */}

                <TitleEventType label={t('resultSearch')} imageSrc='/assets/event-image-object/add_road_black.png' />
                {
                    listEvent && listEvent?.length > 0 && (
                        <ListEventCard listEvent={listEvent || []} loading={false} />
                    )
                }

                {
                    !loadingState && listEvent && listEvent?.length === 0 && (
                        <Box>{t('noInformationFound')}</Box>
                    )
                }

                {
                    loadingState && (
                        <Box>{t('londing')}</Box>
                    )
                }
            </Box>
        </Container>
    )
}