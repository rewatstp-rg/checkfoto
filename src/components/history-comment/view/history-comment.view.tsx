import Divider from '@mui/material/Divider';

import ISOToDate from 'src/utils/ISOToDate';

import Sender from '../Sender';
import Content from '../Content';

type Props = {
    history: any
}
const HistoryCommentView = ({ history }: Props) => (
    <>
        <Sender position={history?.workflowStatusDesc || '-'} actionBy={history?.actionByName || '-'} timestamp={ISOToDate(new Date(history?.createDtm || '') , 'dateRequestTime') || '-'} />
        <Content message={history?.comment || ''} />
        <Divider sx={{ borderStyle: 'dashed' }} />
    </>
);

export default HistoryCommentView;
