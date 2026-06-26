import { Helmet } from 'react-helmet-async';

import { UserProfileView } from 'src/sections/user-profile/view';

// ----------------------------------------------------------------------

export default function UserProfileMemberPage() {

    return (
        <>
            <Helmet>
                <title> Checkfoto : Member</title>
            </Helmet>
            <UserProfileView page='member' menuType='RACE' />
        </>
    );
}
