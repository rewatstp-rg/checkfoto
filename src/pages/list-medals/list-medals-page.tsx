import { Helmet } from 'react-helmet-async';

import { ListMedalView } from 'src/sections/list-medal/view';

// ----------------------------------------------------------------------

export default function ListMadalsPage() {

    return (
        <>
            <Helmet>
                <title> Checkfoto : Medals </title>
            </Helmet>

            <ListMedalView />
        </>
    );
}
