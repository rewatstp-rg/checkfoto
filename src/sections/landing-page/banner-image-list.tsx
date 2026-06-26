import { m, MotionProps } from 'framer-motion';

import { Skeleton } from '@mui/material';
import Container from '@mui/material/Container';
import Box, { BoxProps } from '@mui/material/Box';

import { useResponsive } from 'src/hooks/use-responsive';

import ImageBanner from 'src/components/image/image-banner';
import { varFade, MotionContainer } from 'src/components/animate';
import Carousel, { useCarousel, CarouselArrows } from 'src/components/carousel';

import { LandingPageModel } from 'src/types/landing-page.model';

// ----------------------------------------------------------------------

type Props = {
  listBanner: LandingPageModel[],
}

const BannerSkeleton = ({ sx }: BoxProps) => (
  <Box sx={{ p: 0.5, ...sx }}>
    <Skeleton
      variant='rectangular'
      sx={{
        paddingTop: '40%',
        height: 0,
        width: '100%',
        borderRadius: 2
      }}
    />
  </Box>
)
export default function BannerImageList({ listBanner }: Props) {

  const lgUp = useResponsive('up', 'lg');
  const isLoading = listBanner?.length === 0;

  const carousel = useCarousel({
    speed: 1200,
    autoplay: true
  });

  const content = isLoading ? (
    [...Array(3)].map((_, index) => (
      <BannerSkeleton key={index} />
    ))
  ) : (
    listBanner?.map((item, index) => (
      <ImageBannerItem imageUrl={item?.imageFileUrl || ''} key={index} />
    ))
  )

  return (
    <Container sx={{ position: "relative", maxWidth: "1440px !important" }}
      component={MotionContainer}>
      <m.div variants={varFade().inUp}>
        <Box aria-hidden={isLoading ? "true" : "false"} sx={{
          height: "100%",
          width: "100%",
          ...(!lgUp && {
            position: "relative",
          })
        }}>

          <CarouselArrows
            filled
            shape="rounded"
            onNext={carousel.onNext}
            onPrev={carousel.onPrev}
          >
            <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings} aria-hidden={isLoading ? "true" : "false"}>
              {content}
            </Carousel>

          </CarouselArrows>
        </Box>
      </m.div>
    </Container>
  );
}

// ----------------------------------------------------------------------

type TextAnimateProps = BoxProps &
  MotionProps & {
    imageUrl: string;
  };

function ImageBannerItem({ imageUrl, variants, sx, ...other }: TextAnimateProps) {

  const lgUp = useResponsive('up', 'lg');

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        // height: "520px",
        height: "560px",
        borderRadius: "16px",
        mt: 1,
        mb: 3,
        ...(!lgUp && {
          height: "auto",
          mt: 2,
          mb: 2,
        })
      }}
    >

      <ImageBanner
        paddingTop='0%'
        decoding="async"
        loading="lazy"
        src={imageUrl}
        alt='checkforo-banner'
        // ratio="21/9"
        visibleByDefault
        useIntersectionObserver={false}
        isLCP
        sx={{
          position: "absolute",
          height: "100%",
          width: "100%",
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          objectFit: "cover",
          display: 'block',
          objectPosition: "center",
          borderRadius: "16px",
          color: "transparent",
          ...(!lgUp && {
            position: "relative",
            height: "auto",
          })
        }}
      />
    </Box>
  );
}
