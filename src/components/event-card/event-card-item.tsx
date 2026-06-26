import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { RouterLink } from 'src/routes/components';

import { checkDateStatus, beteweenEventDate } from 'src/utils/format-time';

import { useLocales, useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';

import { EventPhoto } from 'src/types/photo.type';

import Label from '../label';

// ----------------------------------------------------------------------

type Props = {
  eventModel: EventPhoto;
  onView: () => void;
};

export function EventCardItem({ eventModel, onView }: Props) {

  const { t } = useTranslate();
  const { currentLang } = useLocales();
  const { photoSaleDate, photoSaleEndDate } = eventModel;
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

  const renderLabels = (
    <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1} sx={{ mr: 1 }}>
      <Label color={checkStatusColor()} fontSize='15px !important'>{checkStatus()}</Label>
    </Stack >
  );

  const {
    status: eventStatus,
  } = eventModel;

  useEffect(() => {
    const link: any = document.createElement("link");
    link.rel = "preload";
    link.href = eventModel?.bannerFileUrl;
    link.as = "image";
    document.head.appendChild(link);
  }, [eventModel?.bannerFileUrl]);

  return (
    <Card sx={{ position: 'relative', paddingBottom: '48px' }}>
      <Box
        onClick={onView}
        sx={{
          width: '100%',
          // height: '212px',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
      >
        <Avatar
          onClick={onView}
          alt={`${eventModel?.eventNameEn} | ${eventModel?.eventNameTh}`}
          src={eventModel?.bannerFileUrl}
          variant="square"
          sx={{
            mb: 2,
            width: '100%',
            height: '100%',
            // objectFit: 'cover',
          }}
        />
      </Box>

      <Stack sx={{ p: '12px 24px' }}>
        <ListItemText
          sx={{ mb: 1, textAlign: 'left' }}
          primary={
            <Link
              component={RouterLink}
              href={`/event/${eventModel?.eventUrl}`}
              color="inherit"
            >
              {currentLang?.value === 'en'
                ? eventModel?.eventNameEn
                : eventModel?.eventNameTh}
            </Link>
          }
          primaryTypographyProps={{ typography: 'subtitle1' }}
          secondaryTypographyProps={{
            mt: 1,
            component: 'span',
            typography: 'caption',
            color: 'text.disabled',
            fontSize: '14px',
          }}
        />
      </Stack>

      {eventStatus !== 'PAST' && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            bgcolor: 'background.paper',
          }}
        >
          <Divider sx={{ borderStyle: 'dashed' }} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '8px',
            }}
          >
            <Stack
              spacing={0.5}
              flexShrink={0}
              direction="row"
              alignItems="center"
              sx={{ color: 'text.disabled', minWidth: 0 }}
            >
              <Iconify
                width={16}
                icon="solar:clock-circle-bold"
                sx={{ flexShrink: 0 }}
              />
              <Typography
                variant="caption"
                noWrap
                sx={{ fontSize: '14px' }}
                color="text.primary"
              >
                {`${currentLang?.value === 'en'
                  ? beteweenEventDate(
                    eventModel?.photoSaleDate &&
                    new Date(eventModel.photoSaleDate),
                    eventModel?.photoSaleEndDate &&
                    new Date(eventModel.photoSaleEndDate),
                    'SHORT',
                    'en'
                  )
                  : beteweenEventDate(
                    eventModel?.photoSaleDate &&
                    new Date(eventModel.photoSaleDate),
                    eventModel?.photoSaleEndDate &&
                    new Date(eventModel.photoSaleEndDate),
                    'SHORT',
                    'th'
                  )}`}
              </Typography>
            </Stack>
            {renderLabels}
          </Box>
        </Box>
      )}
    </Card>
  );
}

