import { Helmet } from 'react-helmet-async';

import { UserProfileView } from 'src/sections/user-profile/view';

// ----------------------------------------------------------------------

export default function UserProfilePage() {

    return (
        <>
            <Helmet>
                <title> Checkfoto : Profile</title>
            </Helmet>
            <UserProfileView page='profile' menuType='RACE' />
        </>
    );
}
