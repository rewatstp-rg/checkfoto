import { m } from 'framer-motion';

import { Container, Typography } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import { useTranslate } from 'src/locales';

import { varFade, MotionViewport } from 'src/components/animate';

const BannerTitle = () => {

    const { t } = useTranslate();
    const lgUp = useResponsive('up', 'lg');

    return (
        <Container
            component={MotionViewport}
            sx={{
                mt: lgUp ? 7 : 10,
                py: { xs: 2, md: 2 },
                textAlign: { xs: 'center', md: 'unset' },
            }}
        >
            <m.div variants={varFade().inRight}>
                {/* 4vw */}
                <Typography variant="h2" sx={{ mb: 2, fontSize: '7vw' }}>
                    {t('bannerTitle')}
                </Typography>
                <Typography sx={{ mb: 0, color: 'text.secondary', fontSize: lgUp ? '24px' : '4vw' }}>
                    {
                        lgUp ? <>
                            {t('bannerTitleDesc1')} <br />
                            {t('bannerTitleDesc2')}
                        </>
                            : <>
                                {`${t('bannerTitleDesc1')} ${t('bannerTitleDesc2')}`}
                            </>
                    }
                </Typography>
            </m.div>
        </Container>
    )
};

export default BannerTitle;