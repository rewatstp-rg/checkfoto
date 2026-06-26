import { Helmet } from 'react-helmet-async';

import { ChecklistView } from 'src/sections/checklist/view';

// ----------------------------------------------------------------------

export default function ChecklistPage() {

    return (
        <>
            <Helmet>
                <title> Checklist : Checkfoto </title>
            </Helmet>

            <ChecklistView />
        </>
    );
}