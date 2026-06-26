import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import LoadingButton from '@mui/lab/LoadingButton';
import { Divider, useTheme, Typography, IconButton, ListItemText } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fCurrency } from 'src/utils/format-number';
import { EVENT_RACE_TYPE } from 'src/utils/constants';
import { dateEnFormat, dateThFormat } from 'src/utils/format-time';

import { useLocales, useTranslate } from 'src/locales';

import Label from 'src/components/label';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';

import { OrderModel } from 'src/types/order.model';
import { EventModel } from 'src/types/event-config.model';

// ----------------------------------------------------------------------

const { VIRTUAL_RUN } = EVENT_RACE_TYPE;

type Props = {
  order: OrderModel & EventModel;
  handleDeleteOrder: (order: OrderModel) => void;
};

export default function OrderItem({ order, handleDeleteOrder }: Props) {

  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslate();
  const { currentLang } = useLocales();

  const { orderPhotoNumber, eventType, eventNameTh, fullName, eventNameEn, imageEventBannerUrl, netAmount, status, paymentMethodDesc, paymentMethodDescEn, statusDesc, statusDescEn, eventDate, paymentExpiredDate, totalOrder } = order;

  const linkTo = paths.order.details(orderPhotoNumber || '');

  const renderImg = (
    <Box sx={{ position: 'relative', p: 1 }}>
      <Image
        paddingTop='67%'
        alt={eventNameTh}
        src={imageEventBannerUrl}
        ratio="1/1"
        sx={{
          borderRadius: 1.5
        }}
      />
    </Box>
  );

  const renderDelete = (status === 'CANCEL' || status === 'PAYMENT_TIMEOUT') && (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{ position: 'absolute', zIndex: 9, top: 16, right: 16 }}
    >
      <Tooltip title={currentLang.value === 'en' ? 'Delete' : 'ลบ'}>
        <IconButton onClick={() => handleDeleteOrder(order)} sx={{ background: theme.palette.background.default }}>
          <Iconify icon="fluent:delete-16-filled" color='red' />
        </IconButton>
      </Tooltip>
    </Stack>
  );

  const renderContent = (
    <Stack spacing={1.2} sx={{ p: 3, pt: 2 }}>

      <ListItemText
        sx={{ mb: -0.5, minHeight: 49, textAlign: 'left' }}
        primary={currentLang?.value === 'en' ? eventNameEn : eventNameTh}
        secondary={eventType === VIRTUAL_RUN ? (fullName) : `${currentLang?.value === 'en' ? `Event Date ${dateEnFormat(eventDate, 'SHORT')}` : `วันที่จัดงาน ${dateThFormat(eventDate, 'SHORT')}`}`}
        primaryTypographyProps={{ typography: 'subtitle1' }}
        secondaryTypographyProps={{
          mt: 1,
          component: 'span',
          typography: 'caption',
          color: 'text.secondary',
          fontSize: '14px',
        }}
      />

      {/* <Typography variant="caption" color="text.secondary" sx={{ fontSize: '14px' }}>
        {`${currentLang?.value === 'en' ? `Register Date ${dateEnFormat(orderDate, 'SHORT')}` : `วันที่สมัครกิจกรรม ${dateThFormat(orderDate, 'SHORT')}`}`}
      </Typography> */}

      {
        status === 'PENDING_PAYMENT' && <Typography variant="caption" color="red" sx={{ fontSize: '14px' }}>
          {paymentExpiredDate && (currentLang.value === 'en' ? `Expired Date ${dateEnFormat(paymentExpiredDate, 'LONG-TIME')}` : `หมดอายุ ${dateThFormat(paymentExpiredDate, 'LONG-TIME')}`)}
        </Typography>
      }

      <Label
        variant="soft"
        color={
          (status === 'PAID' && 'success') ||
          (status === 'PENDING_PAYMENT' && 'warning') ||
          (status === 'PENDING_APPROVE' && 'info') ||
          ((status === 'PAYMENT_TIMEOUT' || status === 'CANCEL') && 'error') ||
          'default'
        }
        sx={{ fontSize: '0.875rem !important', padding: '18px' }}
      >
        {currentLang?.value === 'en' ? statusDescEn : statusDesc}
      </Label>

      <Divider sx={{ borderStyle: 'dashed', mt: 1, mb: 1 }} />

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box component="span">{t('orders.orderNumber')}</Box>
        <Stack direction="row" spacing={0.5} sx={{ typography: 'subtitle1' }}>
          <Box component="span">{orderPhotoNumber}</Box>
        </Stack>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box component="span">{t('orders.paymentMedthod')}</Box>
        <Stack direction="row" spacing={0.5} sx={{ typography: 'subtitle1' }}>
          <Box component="span" sx={{ fontSize: '14px' }}>  {currentLang?.value === 'en' ? paymentMethodDescEn : paymentMethodDesc}</Box>
        </Stack>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box component="span">{t('orders.orderPrice')}</Box>
        <Stack direction="row" spacing={0.5} sx={{ typography: 'subtitle1' }}>
          <Box component="span">{netAmount === 0 ? t('orders.free') : `${fCurrency(netAmount || 0)} ฿`}	</Box>
        </Stack>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2}>
        <LoadingButton
          sx={{ mt: 2 }}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color={status === 'PENDING_PAYMENT' ? 'primary' : 'inherit'}
          onClick={() => {
            if (status === 'PAID') {
              router.push(`/download-photo/${orderPhotoNumber}`);
            } else {
              router.push(linkTo)
            }
          }}
        >
          {status === 'PENDING_PAYMENT' && t('orders.paymentBtn')}
          {status === 'PAID' && t('orders.orderPhotoDownload')}
          {status === 'PENDING_APPROVE' && t('orders.viewBtn')}
          {(status === 'CANCEL' || status === 'PAYMENT_TIMEOUT') && t('orders.viewBtn')}

          {` (${totalOrder} ${t('registerForm.merchandise.item')}) `}
        </LoadingButton>

      </Stack>

    </Stack>
  );

  return (
    <Card
      sx={{
        '&:hover .add-cart-btn': {
          opacity: 1,
        },
      }}
    >

      {renderDelete}

      {renderImg}

      {renderContent}
    </Card>
  );
}
