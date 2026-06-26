import { useScroll } from 'framer-motion';
import { useState, useEffect } from 'react';

import { Box, useTheme, Typography } from '@mui/material';

import { useSearchParams } from 'src/routes/hooks';

import { checkArrayLength } from 'src/utils/check-array-length';
import { STORAGE_KEYS, MASTER_CONFIG_GROUP } from 'src/utils/constants';

import { useLocales } from 'src/locales';
import { clearPhotoCart } from 'src/slices/order.slices';
import { useCountPhotoMutation } from 'src/api/common.api';
import { selectMasterData } from 'src/slices/master-data.slices';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { useListBannerMutation } from 'src/api/landing-page.api';
import { useListEventByEventTypeMutation } from 'src/api/event.api';
import { selectEvent, setEventDetail } from 'src/slices/event.slices';
import { setIsSearchMyFace, setResultSearchMyFace } from 'src/slices/file.slices';
import { useGetConfigByGroupMutation, useListEventProvinceMutation } from 'src/api/master-data.api';
import {
  setListInputField,
  setListMerchandise,
  setListRegisterForm, setRegisterFormDetail, setListTicketInputField, setListTicketOptionInputField
} from 'src/slices/register.slices';

import ScrollProgress from 'src/components/scroll-progress/scroll-progress';

import EventSearchResult from 'src/sections/event-search-result/view/event-search-result';

import { Config } from 'src/types/master-config';
import { EventModel } from 'src/types/event-config.model';
import { LandingPageModel } from 'src/types/landing-page.model';

import SearchEvent from '../search-event';
import BannerImageList from '../banner-image-list';
import { GuaranteedBy, ListEventCard } from '../component';

// ----------------------------------------------------------------------


export default function LandingPageView() {

  const {
    EVENT_RACE_TYPE
  } = MASTER_CONFIG_GROUP;

  const { currentLang } = useLocales();
  const dispatch = useAppDispatch();

  const searchParams = useSearchParams();

  const { scrollYProgress } = useScroll();

  const [listLandingImage] = useListBannerMutation();
  const [getConfigByGroup] = useGetConfigByGroupMutation();
  const [getEventProvinceList] = useListEventProvinceMutation();
  const [getEventByTypeList] = useListEventByEventTypeMutation();

  const [countPhoto] = useCountPhotoMutation();

  const { listEventByType } = useAppSelector(selectEvent);
  const { listEventTypeOption, listEventProvince } = useAppSelector(selectMasterData);

  const [listBanner, setListBanner] = useState<LandingPageModel[]>([]);

  const [photoNumber, setPhotoNumber] = useState(0);

  const getEventRaceType = async () => {
    const body: Config = {
      listboxGroup: EVENT_RACE_TYPE,
      status: 'ACTIVE'
    }
    await getConfigByGroup(body).unwrap();
  }

  const getListBannerPhoto = async () => {
    const body: LandingPageModel = {}
    const result = await listLandingImage(body).unwrap();
    setListBanner(result);
  }

  const removePackagePhotoStorage = () => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(STORAGE_KEYS.PACKAGE_PHOTO)) {
        localStorage.removeItem(key);
      }
    });
  };

  const loadContent = async () => {

    dispatch(setIsSearchMyFace(false));
    dispatch(setEventDetail(undefined));
    dispatch(setListTicketOptionInputField([]));
    dispatch(setListRegisterForm([]));
    dispatch(setListInputField([]));
    dispatch(setRegisterFormDetail(undefined));
    dispatch(setListTicketInputField([]));
    dispatch(setListMerchandise([]));
    dispatch(setResultSearchMyFace(undefined));
    dispatch(clearPhotoCart());
    localStorage.removeItem('photoCart');
    localStorage.removeItem('eventDetail');
    removePackagePhotoStorage();
    if (!checkArrayLength(listEventTypeOption)) {
      await getEventRaceType();
    }

    getListBannerPhoto();

    await countPhoto().unwrap().then(res => {
      setPhotoNumber(Number(res));
    });

    if (!checkArrayLength(listEventByType)) {
      const eventModel: EventModel = {
        eventType: '',
        registerStep: {
          listStep: []
        }
      };
      await getEventByTypeList(eventModel).unwrap();
    }

    if (!checkArrayLength(listEventProvince)) {
      await getEventProvinceList().unwrap();
    }

  }

  useEffect(() => {
    loadContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box>
      <ScrollProgress scrollYProgress={scrollYProgress} />

      <BannerImageList listBanner={listBanner?.filter((item) => item.imageType === 'PHOTO_BANNER_IMAGE') || []} />

      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        <ShapeDividerTop />
        <Box
          sx={{
            position: 'relative',
            bgcolor: '#f5f5f5',
            pt: { xs: 3, md: 10 },
            pb: { xs: 1, md: 6 },
            overflow: 'hidden',

            // ::before overlay
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: '#FF0303',
              opacity: 0.7, // mimic overlay-opacity
              zIndex: 0,
              transition: 'background 0.3s, border-radius 0.3s, opacity 0.3s',
            },
          }}
        >
          {/* Shape Divider */}
          <StatCounter toValue={photoNumber || 0} currentLang={currentLang} />
        </Box>

      </Box>

      <SearchEvent />

      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >

        {/* {
          lgUp && <BannerListEvent />
        } */}

        {
          searchParams?.size === 0 ? <ListEventCard /> : <EventSearchResult />
        }
        {/* <ListEventCard /> */}

        {/* <ListEventProvince /> */}

        <GuaranteedBy />
      </Box>

    </Box>
  );
}

type StatCounterProps = {
  toValue: number;
  duration?: number;
  currentLang: any
}
const StatCounter = ({ currentLang, toValue, duration = 2000 }: StatCounterProps) => {

  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = toValue / (duration / 30);
    const interval = setInterval(() => {
      start += increment;
      if (start >= toValue) {
        clearInterval(interval);
        setCount(toValue);
      } else {
        setCount(Math.ceil(start));
      }
    }, 30);

    return () => clearInterval(interval);
  }, [toValue, duration]);

  return (
    <Box textAlign="center" zIndex={1000} sx={{ position: 'relative' }}>
      <Typography component="h1" variant="h1" fontWeight="bold" sx={{ fontSize: { xs: '3rem', md: '6rem' }, color: '#FFFFFF' }}>
        {count.toLocaleString()}
      </Typography>
      <Typography component="h2"
        variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '3rem' }, color: '#FFFFFF' }}>
        {currentLang?.value === 'th' ? 'รูปภาพทั้งหมด' : 'Photos Total'}
      </Typography>
    </Box>
  );
};

export const ShapeDividerTop = () => {

  const theme = useTheme();

  return (
    <Box
      sx={{
        direction: 'ltr',
        left: 0,
        lineHeight: 0,
        overflow: 'hidden',
        position: 'absolute',
        width: '100%',
        top: { xs: '-2px', md: '-1px' },
        zIndex: 100
      }}
    >
      <Box
        component="svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        sx={{
          height: { xs: '28px', md: '55px' },
          display: 'block',
          left: '50%',
          position: 'relative',
          transform: 'translateX(-50%) rotateY(180deg);',
          width: 'calc(100% + 1.3px)'
        }}
      >
        <path d="M0,6V0h1000v100L0,6z" style={{
          fill: theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.grey[900],
          transform: 'rotateY(0deg)',
          transformOrigin: 'center'
        }} />
      </Box >
    </Box >
  )
};