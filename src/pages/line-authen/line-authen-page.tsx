import { Helmet } from 'react-helmet-async';

import { LineAuthenView } from 'src/sections/line-authen/view';

// ----------------------------------------------------------------------

export default function LineAuthenPage() {
    return (
        <>
            <Helmet>
                <title> Checkfoto : Line Authentication</title>
            </Helmet>

            <LineAuthenView />
        </>
    );
}
