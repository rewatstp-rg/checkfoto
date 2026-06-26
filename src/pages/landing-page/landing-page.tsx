import { Helmet } from 'react-helmet-async';

import { LandingPageView } from 'src/sections/landing-page/view';

// ----------------------------------------------------------------------

export default function AboutPage() {
    return (
        <>
            <Helmet>
                <title>ซื้อรูปภาพงานวิ่ง | Checkfoto.com เก็บความทรงจำกิจกรรมวิ่ง</title>
            </Helmet>

            <LandingPageView />
        </>
    );
}
