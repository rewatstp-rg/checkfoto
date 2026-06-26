import { Box, Stack, Divider, useTheme, Typography, } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import { checkDateStatus, beteweenEventDate } from 'src/utils/format-time';

import { useLocales, useTranslate } from 'src/locales';

import Image from 'src/components/image';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import { EventPhoto } from 'src/types/photo.type';

// ----------------------------------------------------------------------

type Props = {
  eventDetail: EventPhoto;
};

export default function EventPhotoDetailInfo({
  eventDetail,
  ...other
}: Props) {

  const {
    eventDate,
    eventEndDate,
    eventNameEn,
    eventNameTh
  } = eventDetail;

  const { photoSaleDate = '', photoSaleEndDate = '' } = eventDetail || {};

  // const isBetweenDate = isBetween(new Date(), new Date(photoSaleDate), new Date(photoSaleEndDate));
  const isBetweenDate = checkDateStatus(new Date(), photoSaleDate, photoSaleEndDate);

  const checkStatus = () => {
    if (isBetweenDate === 'past') {
      // console.log('เลยวันปัจจุบันแล้ว');
      // setStatusDesc(t('eventDetail.eventPast'));
      return t('eventDetail.eventPast');
    }

    if (isBetweenDate === 'upcoming') {
      // console.log('ยังไม่ถึงวันปัจจุบัน');
      // setStatusDesc(t('eventDetail.photoPending'));
      return t('eventDetail.photoPending');
    }

    return t('eventDetail.photoSale');
  }

  const checkStatusColor = () => {
    if (isBetweenDate === 'past') {
      // console.log('เลยวันปัจจุบันแล้ว');
      // setStatusDesc(t('eventDetail.eventPast'));
      return 'error';
    }

    if (isBetweenDate === 'upcoming') {
      // console.log('ยังไม่ถึงวันปัจจุบัน');
      // setStatusDesc(t('eventDetail.photoPending'));
      return 'warning';
    }

    return 'success';
  }


  const theme = useTheme();
  const { t } = useTranslate();
  const { currentLang } = useLocales();
  const lgUp = useResponsive('up', 'lg');

  const renderLabels = (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: -1 }}>
      <Label color={checkStatusColor()} fontSize='15px !important'>{checkStatus()}</Label>
    </Stack >
  );

  const infoList = [
    {
      id: 'eventDate',
      label: `${t('photo.date')} ${currentLang?.value === 'en' ? beteweenEventDate(eventDate && new Date(eventDate), eventEndDate && new Date(eventEndDate), 'SHORT', 'en') : beteweenEventDate(eventDate && new Date(eventDate), eventEndDate && new Date(eventEndDate), 'SHORT', 'th')}`,
      icon: <Iconify width={20} icon="solar:clock-circle-bold" sx={{ flexShrink: 0 }} />,
    }
  ];

  const renderEventInfo = (
    <Box display="grid" gridTemplateColumns="repeat(1, 1fr)" >
      {
        infoList.map((item) => (
          <Stack
            key={item.id}
            spacing={0.5}
            rowGap={2}
            mb={1}
            flexShrink={0}
            direction="row"
            alignItems="flex-start"
            sx={{ color: 'text.disabled', minWidth: 0 }}
          >
            {item.icon}
            <Typography variant="caption" fontSize={16} ml={2}>
              {item.label}
            </Typography>
          </Stack>
        ))
      }
    </Box>
  )

  const guaranteedPaymentSecurity = (
    <Stack direction="column" alignItems="flex-start" spacing={1}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Iconify width={20} icon="solar:shield-check-bold" sx={{ flexShrink: 0, color: theme.palette.success.main }} />
        <Typography
          variant="caption"
          sx={{
            fontSize: 16,
            color: 'text.secondary',
          }}
        >
          {t('eventDetail.guaranteedPaymentSecurity')}
        </Typography>

      </Stack>

      <Image
        borderRadius={2}
        alt='payment-security'
        src='/assets/event-detail-image/347x16.png'
        paddingTop={0} />
    </Stack>
  )

  const leftContent = eventDetail && (
    <>
      <>
        <Typography component='h1' variant="h5" sx={{ mt: lgUp ? 2 : 0 }}>
          {
            currentLang?.value === 'en' ? eventNameEn : eventNameTh
          }
        </Typography>

        {/* <Typography variant="subtitle1">{t('photo.photoDate')}</Typography> */}
        {renderLabels}

        {lgUp && renderEventInfo}
        {/* <Typography variant="body1" sx={{ color: 'red' }}>{`${t('photo.note')}`}</Typography> */}
        {/* <Divider sx={{ borderStyle: 'dashed' }} /> */}
        {lgUp && <Divider sx={{ borderStyle: 'dashed' }} />}
      </>
      {lgUp && guaranteedPaymentSecurity}
    </>
  )

  return (
    <Stack spacing={2} {...other}>

      {leftContent}

    </Stack>
  );
}

