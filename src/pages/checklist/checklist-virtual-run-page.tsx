import { Helmet } from 'react-helmet-async';

import { ChecklistVirtualRunView } from 'src/sections/checklist-virtual-run/view';

// ----------------------------------------------------------------------

export default function ChecklistVirtualRunPage() {

    return (
        <>
            <Helmet>
                <title> Checklist Virtual Run : Checkfoto </title>
            </Helmet>

            <ChecklistVirtualRunView />
        </>
    );
}
