import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { OrderPhotoDownloadView } from 'src/sections/order-photo-download/view';

// ----------------------------------------------------------------------

export default function OrderPhotoDownloadPage() {
       const params = useParams();
    
        const { orderPhotoNumber } = params;
    return (
        <>
            <Helmet>
                <title> Checkfoto : Download photo </title>
            </Helmet>
            <OrderPhotoDownloadView orderPhotoNumber={`${orderPhotoNumber}`} />
        </>
    );
}