import { Box, Button, Typography } from "@mui/material";

import { useParams, useRouter } from "src/routes/hooks";

import { useTranslate } from "src/locales";
import { useAppSelector } from "src/store/hooks";
import { selectEvent } from "src/slices/event.slices";

import ListEventCard from "src/components/list-event-card/list-event-card";

import { EventPhoto } from "src/types/photo.type";

export default function EventYouMayLike() {

    const { t } = useTranslate();

    const params = useParams();

    const { eventUrl } = params;

    const router = useRouter();

    const { listEventByType } = useAppSelector(selectEvent);

    const listEventMayLikeLength = Math.min(listEventByType?.filter((x) => x.eventUrl !== eventUrl && x.status !== 'PAST' && x.status !== 'DRAFT' && x.status !== 'INACTIVE' && x.eventType !== 'VIRTUAL_RUN' && x.bannerFileUrl)?.length, 4) || 0;
    const listEventMayLike: EventPhoto[] = listEventByType?.filter((x) => x.eventUrl !== eventUrl && x.status !== 'PAST' && x.status !== 'DRAFT' && x.status !== 'INACTIVE' && x.eventType !== 'VIRTUAL_RUN' && x.bannerFileUrl)?.slice(0, listEventMayLikeLength).sort((a: EventPhoto, b: EventPhoto) => (a?.sequence || 0) - (b?.sequence || 0));

    const handleViewAll = () => {
        console.log('view all');
        router.push('/');
    }

    return (
        <Box mt={4} >
            <Typography variant="h4" mt={4} mb={3}>
                {t('eventDetail.eventsMayLike')}
            </Typography>
            <Box textAlign='center'>
                <ListEventCard listEvent={listEventMayLike} loading={false} />
                <Button
                    variant="outlined"
                    size="large"
                    onClick={handleViewAll}
                    aria-label="move all event right"
                    sx={{ mt: 4, mb: 2 }}
                >
                    {t('common.viewAll')}
                </Button>
            </Box>
        </Box>
    )
}