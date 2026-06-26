import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { UploadCommonImageFrameView } from 'src/sections/upload-common-image-frame/view';

// ----------------------------------------------------------------------

const UploadCommonImageFramePage = () => {

    const param = useParams();
    const { eventUrl } = param;

    return (
        <>
            <Helmet>
                <title>Upload Image Frame</title>
            </Helmet>

            <UploadCommonImageFrameView eventUrl={`${eventUrl}`} />
        </>
    )
}

export default UploadCommonImageFramePage;