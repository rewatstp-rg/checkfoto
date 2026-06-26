import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { OrderDetailView } from 'src/sections/order-detail/view';

// ----------------------------------------------------------------------

export default function OrderDetailPage() {

    const params = useParams();

    const { orderPhotoNumber } = params;

    return (
        <>
            <Helmet>
                <title> Checkfoto : Order </title>
            </Helmet>

            <OrderDetailView orderPhotoNumber={`${orderPhotoNumber}`} />
        </>
    );
}
