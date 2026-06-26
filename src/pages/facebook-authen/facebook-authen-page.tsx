import { Helmet } from 'react-helmet-async';

import { FacebookAuthenView } from 'src/sections/facebook-authen/view';

// ----------------------------------------------------------------------

export default function FacebookAuthenPage() {
    return (
        <>
            <Helmet>
                <title> Checkfoto : Facebook Authentication</title>
            </Helmet>

            <FacebookAuthenView />
        </>
    );
}
