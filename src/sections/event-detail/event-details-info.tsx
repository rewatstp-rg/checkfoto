import { m } from 'framer-motion';

// import { useEffect, useCallback } from 'react';
// import Badge from '@mui/material/Badge';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Stack, Divider, useTheme, Typography, } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';
// import { useRouter } from 'src/routes/hooks';

import { dateEnFormat, dateThFormat, beteweenEventDate } from 'src/utils/format-time';

import { useLocales, useTranslate } from 'src/locales';

import Image from 'src/components/image';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { varFade } from 'src/components/animate';

import { EventModel } from 'src/types/event-config.model';

// ----------------------------------------------------------------------

type Props = {
  eventDetail: EventModel;
  shareForFriends?: () => void;
  onRegister: () => void;
  onMerchant?: () => void;
  isRegister: any[];
  isMerchant?: any[];
  eventTokenTest: string;
  isShop?: boolean;
};

export default function EventDetailInfo({
  eventDetail,
  shareForFriends,
  onRegister,
  onMerchant,
  isRegister,
  isMerchant,
  eventTokenTest,
  isShop,
  ...other
}: Props) {

  const {
    eventStatus,
    eventStatusDesc,
    eventStatusDescEn,
    registerStartDate,
    registerEndDate,
    eventNameEn,
    eventNameTh,
    eventLocationEn,
    eventLocationTh,
    eventDate,
    eventEndDate
  } = eventDetail;

  // const router = useRouter();
  const theme = useTheme();
  const { t } = useTranslate();
  const { currentLang } = useLocales();
  const lgUp = useResponsive('up', 'lg');

  // const startDate = (eventDetail && eventDetail?.registerStartDate ? new Date(eventDetail.registerStartDate || '') > new Date() : false);
  // const endDate = (eventDetail && eventDetail?.registerEndDate ? new Date(eventDetail.registerEndDate || '') < new Date() : false);
  // const eventDateActive = startDate && endDate;
  const eventDateActive = ((new Date(eventDetail.registerStartDate || '') < new Date()) && new Date(eventDetail.registerEndDate || '') > new Date());
  const isFuncMerchan = Boolean(onMerchant);

  const infoList = [
    {
      id: 'eventLocationTh',
      label: `${t('eventDetail.eventLocation')} ${currentLang?.value === 'en' ? eventLocationEn : eventLocationTh}`,
      icon: <Iconify width={20} icon="carbon:location-filled" sx={{ flexShrink: 0 }} />,
    },
    {
      id: 'eventDate',
      label: `${t('eventDetail.eventDate')} ${currentLang?.value === 'en' ? beteweenEventDate(eventDate && new Date(eventDate), eventEndDate && new Date(eventEndDate), 'SHORT', 'en') : beteweenEventDate(eventDate && new Date(eventDate), eventEndDate && new Date(eventEndDate), 'SHORT', 'th')}`,
      icon: <Iconify width={20} icon="solar:clock-circle-bold" sx={{ flexShrink: 0 }} />,
    }
  ];

  const infoVrList = [
    {
      id: 'eventDate',
      label: `${t('eventDetail.eventDate')} ${currentLang?.value === 'en' ? beteweenEventDate(eventDate && new Date(eventDate), eventEndDate && new Date(eventEndDate), 'SHORT', 'en') : beteweenEventDate(eventDate && new Date(eventDate), eventEndDate && new Date(eventEndDate), 'SHORT', 'th')}`,
      icon: <Iconify width={20} icon="solar:clock-circle-bold" sx={{ flexShrink: 0 }} />,
    }
  ];

  const renderLabels = (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: -1 }}>
      {/* {eventStatus === 'ACTIVE' && eventDateActive && <Label color="success" fontSize='15px !important'>{currentLang?.value === 'en' ? eventStatusDescEn : eventStatusDesc}</Label>} */}
      {
        (eventStatus === 'ACTIVE' || eventStatus === 'PENDING' || eventStatus === 'DRAFT' || eventStatus === 'PAST') && (
          <>
            {(eventDateActive && eventStatus === 'PENDING') && <Label color="warning" fontSize='15px !important'>{t('eventDetail.eventPending')}</Label>}
            {eventDateActive && eventStatus !== 'PENDING' && <Label color="success" fontSize='15px !important'>{currentLang?.value === 'en' ? eventStatusDescEn : eventStatusDesc}</Label>}
            {((new Date(eventDetail.registerStartDate || '') > new Date())) && <Label color="warning" fontSize='15px !important'>{t('eventDetail.eventPending')}</Label>}
            {((new Date(eventDetail.registerStartDate || '') < new Date()) && new Date(eventDetail.registerEndDate || '') < new Date()) && <Label color="warning" fontSize='15px !important'>{t('eventDetail.eventClosed')}</Label>}
          </>
        )
      }
      {(eventStatus === 'INACTIVE' || eventStatus === 'CLOSE') && <Label color="error" fontSize='15px !important'>{currentLang?.value === 'en' ? eventStatusDescEn : eventStatusDesc}</Label>}
    </Stack >
  );

  const registrationInfo = (
    <>
      <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" gap={1}>
        <Typography
          sx={{
            color: 'text.main',
            minWidth: 100
          }}
        >
          {t('eventDetail.openRegistration')} :
        </Typography>
        <Typography
          sx={{
            color: 'text.secondary',
          }}
        >
          {`${currentLang?.value === 'en' ? dateEnFormat(registerStartDate, 'LONG-TIME') : dateThFormat(registerStartDate, 'LONG-TIME')}`}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" gap={1}>
        <Typography
          sx={{
            color: 'text.main',
            minWidth: 100
          }}
        >
          {t('eventDetail.closeRegistration')}  :
        </Typography>
        <Typography
          sx={{
            color: 'text.secondary',
          }}
        >
          {`${currentLang?.value === 'en' ? dateEnFormat(registerEndDate, 'LONG-TIME') : dateThFormat(registerEndDate, 'LONG-TIME')}`}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-start" gap={1}>
        <Typography
          sx={{
            color: 'text.secondary',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Iconify width={16} icon="ph:warning-octagon" sx={{ flexShrink: 0, mr: 1 }} />
          <Typography variant="caption" noWrap>
            {t('eventDetail.registrationMaximumCapacity')}
          </Typography>
        </Typography>
      </Stack>
    </>
  )

  const renderEventInfo = (
    <Box display="grid" gridTemplateColumns="repeat(1, 1fr)" >
      {eventDetail?.eventType === 'VIRTUAL_RUN' ? infoVrList.map((item) => (
        <Stack
          key={item.id}
          spacing={0.5}
          rowGap={2}
          mb={1}
          flexShrink={0}
          direction="row"
          alignItems="center"
          sx={{ color: 'text.disabled', minWidth: 0 }}
        >
          {item.icon}
          <Typography variant="caption" noWrap fontSize={16} ml={2}>
            {item.label}
          </Typography>
        </Stack>
      )) : infoList.map((item) => (
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
      ))}
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

      {
        !isShop && (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h5" sx={{ mb: 1 }}>{t('eventDetail.registrationInfo')}</Typography>
              {renderLabels}
            </Box>

            <Stack spacing={2} alignItems="flex-start" gap={1}>

              {registrationInfo}

            </Stack>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Typography variant="h5" sx={{ mt: 2 }}>{currentLang?.value === 'en' ? eventNameEn : eventNameTh}</Typography>

            {renderEventInfo}

            <Divider sx={{ borderStyle: 'dashed' }} />
          </>
        )
      }

      {lgUp && guaranteedPaymentSecurity}

      {
        lgUp && !isShop && <m.div variants={varFade().inRight}>
          <LoadingButton
            fullWidth
            color='primary'
            size="large"
            type="button"
            variant="contained"
            disabled={(eventStatus !== 'ACTIVE' || !eventDateActive || isRegister?.length === 0 || !isRegister) && eventTokenTest === ''}
            onClick={() => onRegister()}
          >
            {isRegister?.length === 0 || !isRegister ? t('eventRegisterFull') : t('eventDetail.eventRegister')}
          </LoadingButton>
        </m.div>
      }

      {
        lgUp && isFuncMerchan && <m.div variants={varFade().inRight}>
          <LoadingButton
            fullWidth
            color='inherit'
            size="large"
            type="button"
            variant="contained"
            disabled={(eventStatus !== 'ACTIVE' || !eventDateActive || isMerchant?.length === 0 || !isMerchant) && eventTokenTest === ''}
            onClick={() => onMerchant?.()}
          >
            {isMerchant?.length === 0 || !isMerchant ? t('merchandiseFull') : t('merchandiseSale')}
          </LoadingButton>
        </m.div>
      }

      {
        shareForFriends?.() && (
          <m.div variants={varFade().inRight}>
            <LoadingButton
              fullWidth
              color='inherit'
              size="large"
              type="button"
              variant="contained"
              onClick={() => shareForFriends?.()}
            >
              share for friends
            </LoadingButton>
          </m.div>
        )
      }

    </>
  )

  return (
    <Stack spacing={3} sx={{ pt: 0, position: 'sticky', top: 145 }} {...other}>

      {leftContent}

    </Stack>
  );
}


// const RenderCartIcon = () => (
//   <Box
//     sx={{
//       right: 0,
//       top: 300,
//       zIndex: 999,
//       display: 'flex',
//       cursor: 'pointer',
//       position: 'fixed',
//       color: 'text.primary',
//       borderTopLeftRadius: 16,
//       borderBottomLeftRadius: 16,
//       bgcolor: 'background.paper',
//       padding: (theme) => theme.spacing(1, 3, 1, 2),
//       boxShadow: (theme) => theme.customShadows.dropdown,
//       transition: (theme) => theme.transitions.create(['opacity']),
//       '&:hover': { opacity: 0.72 },
//     }}
//   >
//     <Badge showZero badgeContent={1} color="error" max={99}>
//       <Iconify icon="solar:cart-3-bold" width={24} />
//     </Badge>
//   </Box>
// )

