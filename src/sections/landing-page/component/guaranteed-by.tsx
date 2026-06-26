import { m } from 'framer-motion';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import Image from 'src/components/image';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function GuaranteedBy() {

    const { t } = useTranslate();

    return (
        <Container
            component={MotionViewport}
            sx={{ textAlign: 'center', mt: { xs: 3, md: 6 }, mb: { xs: 4, md: 6 }, maxWidth: '1110px !important' }}
        >
            <m.div variants={varFade().inUp}>
                <Typography variant="h3" sx={{ mb: 3 }}>{t('common.guaranteedBy')}</Typography>
            </m.div>
            <Grid container alignItems="center" justifyContent="center">
                <m.div variants={varFade().inUp}>
                    <Image
                        paddingTop={1}
                        alt="our office 2"
                        src="/assets/event-image-object/pay.webp"
                    />
                </m.div>
            </Grid>
        </Container>
    );
}
