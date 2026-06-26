import { Helmet } from 'react-helmet-async';

import { CustomPhotoView } from 'src/sections/custom-photo/view/custom-photo-view';

// ----------------------------------------------------------------------

export default function CustomPhotoPage() {
    return (
        <>
            <Helmet>
                <title> Checkfoto : Custom </title>
            </Helmet>
            <CustomPhotoView />
        </>
    );
}