import { Helmet } from 'react-helmet-async';

import { PrivacyPolicyView } from 'src/sections/privacy-policy/view';

// ----------------------------------------------------------------------

export default function PrivacyPolicyPage() {

    return (
        <>
            <Helmet>
                <title> Checkfoto : Privacy Policy </title>
            </Helmet>
            <PrivacyPolicyView />
        </>
    );
}
