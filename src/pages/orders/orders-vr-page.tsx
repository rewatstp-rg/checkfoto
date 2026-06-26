import { Helmet } from 'react-helmet-async';

import { ListOrdersVrView } from 'src/sections/list-order-vr/view';

// ----------------------------------------------------------------------

export default function ListOrdersVrPage() {

    return (
        <>
            <Helmet>
                <title> Checkfoto : Virtual Run Orders </title>
            </Helmet>
            <ListOrdersVrView />
        </>
    );
}
