import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { ViewCommonImageFrameView } from 'src/sections/upload-common-image-frame/view';

// ----------------------------------------------------------------------

const ViewCommonImageFramePage = () => {

    const params = useParams();
    const { eventUrl } = params;

    return (
         <>
        <Helmet>
            <title>View Image Frame</title>
        </Helmet>

        <ViewCommonImageFrameView eventUrl={`${eventUrl}`} />
    </>
    )
}

export default ViewCommonImageFramePage;