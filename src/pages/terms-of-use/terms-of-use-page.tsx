import { Helmet } from 'react-helmet-async';

import { TermsOfUseView } from 'src/sections/terms-of-use';

// ----------------------------------------------------------------------

export default function TermsOfUsePage() {
    return (
        <>
            <Helmet>
                <title> Checkfoto : Terms of Use </title>
            </Helmet>
            <TermsOfUseView />
        </>
    );
}
