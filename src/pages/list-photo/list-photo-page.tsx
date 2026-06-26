import { useParams } from 'src/routes/hooks';

import { ListPhotoView } from 'src/sections/list-photo/view';

// ----------------------------------------------------------------------

export default function ListPhotoPage() {

    const params = useParams();

    const { eventUrl } = params;

    return (<ListPhotoView eventUrl={`${eventUrl}`} />);
}
