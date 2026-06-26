import { Helmet } from 'react-helmet-async';

import { UserProfileView } from 'src/sections/user-profile/view';

// ----------------------------------------------------------------------

export default function UserProfileAddressPage() {

    return (
        <>
            <Helmet>
                <title> Checkfoto : Change Address</title>
            </Helmet>
            <UserProfileView page='change-address' menuType='RACE' />
        </>
    );
}
