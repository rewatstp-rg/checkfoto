import { Helmet } from 'react-helmet-async';

import { UserProfileView } from 'src/sections/user-profile/view';

// ----------------------------------------------------------------------

export default function UserProfileChangePasswordPage() {

    return (
        <>
            <Helmet>
                <title> Checkfoto : Change Password</title>
            </Helmet>
            <UserProfileView page='change-password' menuType='RACE' />
        </>
    );
}
