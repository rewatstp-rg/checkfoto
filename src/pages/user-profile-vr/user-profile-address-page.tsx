import { Helmet } from 'react-helmet-async';

import { UserProfileView } from 'src/sections/user-profile/view';

// ----------------------------------------------------------------------

export default function UserProfileAddressPageVr() {

    return (
        <>
            <Helmet>
                <title> Checkfoto : Change Address</title>
            </Helmet>
            <UserProfileView page='change-address' menuType='VR' />
        </>
    );
}
