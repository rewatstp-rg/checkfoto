import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { EventDetailDetailsView } from 'src/sections/event-detail/view';

// ----------------------------------------------------------------------

export default function EventDetailPage() {

    const params = useParams();

    const { eventUrl } = params;

    return (
        <>
            <Helmet>
                <title> Checkfoto </title>
            </Helmet>

            <EventDetailDetailsView eventUrl={`${eventUrl}`} />
        </>
    );
}
