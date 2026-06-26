import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { useResponsive } from 'src/hooks/use-responsive';

import { varFade, MotionContainer } from 'src/components/animate';

import ListCardView from '../list-card';

// ----------------------------------------------------------------------

export default function ListEventCard() {

  const lgUp = useResponsive('up', 'lg');

  return (
    <Container sx={{ textAlign: 'center', mt: lgUp ? 0 : 0, maxWidth: '1440px !important' }} component={MotionContainer}>
      <m.div variants={varFade().inUp}>
        <Box sx={{ position: 'relative' }}>
          <ListCardView />
        </Box>
      </m.div>
    </Container>
  );
}
