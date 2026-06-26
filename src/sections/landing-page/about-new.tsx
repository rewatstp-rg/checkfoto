import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';
import Carousel, { useCarousel, CarouselArrows } from 'src/components/carousel';

// ----------------------------------------------------------------------

export default function AboutNew() {
  const carousel = useCarousel({
    infinite: false,
    slidesToShow: 4,
    responsive: [
      {
        breakpoint: 1279,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 959,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  });

  const mockupData: any[] = [
    {
      id: 1,
      name: '1',
      avatarUrl: '/assets/images/about/169837772_1083351785488545_2796190614635227634_n.jpg',
    },
    {
      id: 2,
      name: '2',
      avatarUrl: '/assets/images/about/170488805_933182570751607_6547835598957007_n.jpg',
    },
    {
      id: 3,
      name: '3',
      avatarUrl: '/assets/images/about/239401686_219669173311054_7281664855973136686_n.jpg',
    },
    {
      id: 4,
      name: '4',
      avatarUrl: '/assets/images/about/97129591_570915430225649_3270951964280831861_n.jpg'
    },
    {
      id: 5,
      name: '5',
      avatarUrl: '/assets/images/about/151706749_149141400385880_6187951560358815826_n.jpg'
    }
  ]

  return (
    <Box
      sx={{
        pt: 10,
        pb: 10,
        position: 'relative',
        bgcolor: 'background.neutral',
        '&:before': {
          top: 0,
          left: 0,
          width: 1,
          content: "''",
          position: 'absolute',
          bgcolor: 'background.default',
        },
      }}
    >
      <Container component={MotionViewport} sx={{ textAlign: 'center' }}>

        <m.div variants={varFade().inUp}>
          <Typography variant="h2" sx={{ my: 3 }}>
            UPDATE CHECKRACE
          </Typography>
        </m.div>

        <Box sx={{ position: 'relative' }}>
          <CarouselArrows
            filled
            shape="rounded"
            onNext={carousel.onNext}
            onPrev={carousel.onPrev}
            leftButtonProps={{
              sx: {
                left: 24,
                ...(mockupData.length < 5 && { display: 'none' }),
              },
            }}
            rightButtonProps={{
              sx: {
                right: 24,
                ...(mockupData.length < 5 && { display: 'none' }),
              },
            }}
          >
            <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
              {mockupData.map((member) => (
                <Box
                  key={member.id}
                  component={m.div}
                  variants={varFade().in}
                  sx={{
                    px: 1.5,
                    py: { xs: 8, md: 10 },
                  }}
                >
                  <MemberCard member={member} />
                </Box>
              ))}
            </Carousel>
          </CarouselArrows>
        </Box>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

type MemberCardProps = {
  member: {
    name: string;
    avatarUrl: string;
  };
};

function MemberCard({ member }: MemberCardProps) {
  const { name, avatarUrl } = member;

  const socials = [
    {
      value: 'facebook',
      name: 'FaceBook',
      icon: 'eva:facebook-fill',
      color: '#1877F2',
      path: 'https://www.facebook.com/checkrace.th',
    },
    {
      value: 'instagram',
      name: 'Instagram',
      icon: 'ant-design:instagram-filled',
      color: '#E02D69',
      path: 'https://www.instagram.com/runtourthai/',
    },
  ];

  return (
    <Card key={name}>
      {/* <Typography variant="subtitle1" sx={{ mt: 2.5, mb: 0.5 }}>
        {name}
      </Typography>

      <Typography variant="body2" sx={{ mb: 2.5, color: 'text.secondary' }}>
        {role}
      </Typography> */}

      <Box sx={{ px: 1 }}>
        <Image alt={name} src={avatarUrl} ratio="1/1" sx={{ borderRadius: 2 }} />
      </Box>

      <Stack direction="row" alignItems="center" justifyContent="center" sx={{ p: 2 }}>
        {socials.map((social) => (
          <IconButton
            key={social.name}
            sx={{
              color: social.color,
              '&:hover': {
                bgcolor: alpha(social.color, 0.08),
              },
            }}
          >
            <Iconify icon={social.icon} />
          </IconButton>
        ))}
      </Stack>
    </Card>
  );
}
