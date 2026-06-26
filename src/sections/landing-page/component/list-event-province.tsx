import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Typography, ListItemText } from '@mui/material';
// import Typography from '@mui/material/Typography';

import { useResponsive } from 'src/hooks/use-responsive';

import { useAppSelector } from 'src/store/hooks';
import { useLocales, useTranslate } from 'src/locales';
import { selectMasterData } from 'src/slices/master-data.slices';

import Image from 'src/components/image';
import { MotionViewport } from 'src/components/animate';
import Carousel, { useCarousel, CarouselDots, CarouselArrows } from 'src/components/carousel';

// ----------------------------------------------------------------------

export default function ListEventProvince() {

  const { t } = useTranslate();
  const lgUp = useResponsive('up', 'lg');

  const { listEventProvince } = useAppSelector(selectMasterData);

  const lengthDefault = 6;
  const lengthShow = (lgUp ? listEventProvince?.length : 2);

  const carousel = useCarousel({
    autoplay: false,
    ...CarouselDots({
      rounded: true,
      sx: { mt: 5 },
    }),
    slidesToShow: listEventProvince?.length > 6 ? lengthDefault : lengthShow,
    centerMode: false,
    centerPadding: '0px',
    rtl: false,
    swipeToSlide: false,
    focusOnSelect: true,
    variableWidth: false,
    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: { slidesToShow: 1 },
    //   },
    //   {
    //     breakpoint: 600,
    //     settings: { slidesToShow: 1 },
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: { slidesToShow: 1, centerPadding: '0' },
    //   },
    // ],
  });

  return (
    <Container component={MotionViewport} sx={{ textAlign: 'center', mt: 10, mb: 10, maxWidth: '1110px !important' }}>
      <Box sx={{ position: 'relative' }}>
        <Typography variant="h3">{t('common.nationwideRaces')}</Typography>
        {
          listEventProvince?.length > 0 && (
            <CarouselArrows
              filled
              leftButtonProps={{
                size: 'small',
                sx: { top: 'calc(50% + 6px)', left: -0 },
              }}
              rightButtonProps={{
                size: 'small',
                sx: { top: 'calc(50% + 6px)', right: -0 },
              }}
              onNext={carousel.onNext}
              onPrev={carousel.onPrev}
            >
              <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
                {listEventProvince.map((item) => (
                  <CarouselItem key={item.name} item={item} />
                ))}
              </Carousel>
            </CarouselArrows>
          )
        }
      </Box>
    </Container>
  );
}

function CarouselItem({ item }: { item: any }) {

  const { t } = useTranslate();
  const { currentLang } = useLocales();

  const { value4, name, value2, nameEn } = item;
  return <>
    <Image alt={name} src={value4} width={120} paddingTop={3} />
    <ListItemText
      sx={{ mb: 1, mt: 2, minHeight: 40 }}
      primary={currentLang.value === 'en' ? nameEn : name}
      secondary={`${value2} ${t('homePage.eventUnit')}`}
      primaryTypographyProps={{ typography: 'subtitle1' }}
      secondaryTypographyProps={{
        mt: 1,
        component: 'span',
        typography: 'caption',
        color: 'text.disabled',
        fontSize: '14px',
      }}
    />
  </>
}
