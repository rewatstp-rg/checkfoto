import { Helmet } from 'react-helmet-async';

import { NewPasswordForEmailView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function NewPasswordForEmailPage() {
    return (
        <>
            <Helmet>
                <title> Checkfoto: Change Password</title>
            </Helmet>

            <NewPasswordForEmailView />
        </>
    );
}
