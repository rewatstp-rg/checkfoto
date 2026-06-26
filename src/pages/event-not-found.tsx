import { Helmet } from 'react-helmet-async';

import EventNotFoundView from 'src/sections/error/not-found-event-view';

// ----------------------------------------------------------------------

export default function EventNotFoundPage() {
  return (
    <>
      <Helmet>
        <title> Event Page Not Found!</title>
      </Helmet>

      <EventNotFoundView />
    </>
  );
}
