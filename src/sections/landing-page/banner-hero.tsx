import { m, MotionProps } from 'framer-motion';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { varFade, MotionContainer } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function BannerHero() {
  return (
    <Box
      sx={{
        height: { md: 790 },
        py: { xs: 10, md: 0 },
        overflow: 'hidden',
        position: 'relative',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage:
          'url(/assets/background/overlay_1.svg), url(/assets/images/about/35766626_2112712562283798_2874691030769205248_n.jpg)',
      }}
    >
      <Container component={MotionContainer}>
        <Box
          sx={{
            bottom: { md: 80 },
            position: { md: 'absolute' },
            textAlign: {
              xs: 'center',
              md: 'unset',
            },
          }}
        >
          <TextAnimate text="CHECKRACE" variants={varFade().inRight} sx={{ color: 'primary.main' }} />

          <br />

          <Stack spacing={2} display="inline-flex" direction="row" sx={{ color: 'common.white' }}>
            <TextAnimate text="ค้นหา" />
            <Box
              component={m.div}
              sx={{
                typography: 'h1',
                overflow: 'hidden',
                display: 'inline-flex'
              }}
            >
              <m.span variants={varFade().inUp}>
                งานวิ่งทั่วไทย
              </m.span>
            </Box>
          </Stack>

          <m.div variants={varFade().inRight}>
            <Typography
              variant="h4"
              sx={{
                mt: 3,
                color: 'common.white',
                fontWeight: 'fontWeightSemiBold',
              }}
            >
              เลือกการแข่งขันที่ใช่ ท้าทายไปกับงานวิ่งถนน วิ่งเทรล<br />
              ไตรกีฬา จักรยาน พร้อมระเบิดพลังในตัวคุณ

              {/* Let&apos;s work together and
              <br /> make awesome site easily */}
            </Typography>
          </m.div>
        </Box>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

type TextAnimateProps = BoxProps &
  MotionProps & {
    text: string;
  };

function TextAnimate({ text, variants, sx, ...other }: TextAnimateProps) {
  return (
    <Box
      component={m.div}
      sx={{
        typography: 'h1',
        overflow: 'hidden',
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      {text.split('').map((letter, index) => (
        <m.span key={index} variants={variants || varFade().inUp}>
          {letter}
        </m.span>
      ))}
    </Box>
  );
}
