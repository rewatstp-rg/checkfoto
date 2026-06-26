import { Helmet } from 'react-helmet-async';

import { EventSearchResultView } from 'src/sections/event-search-result/view';

// ----------------------------------------------------------------------

export default function EventSearchResultPage() {

    return (
        <>
            <Helmet>
                <title> Checkfoto : Search Result</title>
            </Helmet>

            <EventSearchResultView />
        </>
    );
}
