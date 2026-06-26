import { m, AnimatePresence } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Paper, { PaperProps } from '@mui/material/Paper';
import Dialog, { DialogProps } from '@mui/material/Dialog';

import { useTranslate } from 'src/locales';
import { OrderCompleteIllustration } from 'src/assets/illustrations';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

interface Props extends DialogProps {
  onReset: () => void;
  onNextStep: VoidFunction;
  orderNumber?: string;
  eventType?: string;
  isFree?: boolean;
  imageUrl?: string;
  open: boolean;
}

export default function RegisterOrderComplete({ open, onReset, onNextStep, orderNumber = 'xxxx-xxxx-xxxxx', isFree = false, imageUrl, eventType }: Props) {

  const { t } = useTranslate();

  const renderContent = (
    <Stack
      spacing={5}
      sx={{
        m: 'auto',
        maxWidth: 480,
        textAlign: 'center',
        px: { xs: 2, sm: 0 },
      }}
    >
      <Typography variant="h4">{t('registerForm.payment.thankForPurchase')}</Typography>

      {
        imageUrl ?
          <Image
            alt='event-image'
            src={imageUrl}
            paddingTop={0}
            sx={{
              height: 260, marginBottom: 3, borderRadius: 1, width: '100%'
            }}
          />
          : <OrderCompleteIllustration sx={{ height: 260 }} />
      }

      <Typography>
        {t('registerForm.payment.orderNumberRef')}
        <br />
        <br />
        <b>{orderNumber}</b>
        <br />
        <br />
        {!isFree && t('registerForm.payment.uploadSlipSuccess')}
      </Typography>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack
        spacing={2}
        justifyContent="space-between"
        direction={{ xs: 'column-reverse', sm: 'row' }}
      >
        <Button
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
          onClick={onReset}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
        >
          {t('registerForm.payment.goBack')}
        </Button>

        {/* <Button
          fullWidth
          size="large"
          variant="contained"
          startIcon={<Iconify icon="eva:cloud-download-fill" />}
          onClick={onNextStep}
        >
          {t('registerForm.payment.clickPay')}
        </Button> */}
      </Stack>
    </Stack>
  );

  return (
    <AnimatePresence>
      {open && (
        <Dialog
          fullWidth
          fullScreen
          open={open}
          PaperComponent={(props: PaperProps) => (
            <Box
              component={m.div}
              {...varFade({
                distance: 120,
                durationIn: 0.32,
                durationOut: 0.24,
                easeIn: 'easeInOut',
              }).inUp}
              sx={{
                width: 1,
                height: 1,
                p: { md: 3 },
              }}
            >
              <Paper {...props}>{props.children}</Paper>
            </Box>
          )}
        >
          {renderContent}
        </Dialog>
      )}
    </AnimatePresence>
  );
}
