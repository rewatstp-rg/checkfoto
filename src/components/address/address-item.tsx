import { useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import Paper, { PaperProps } from '@mui/material/Paper';
import Stack, { StackProps } from '@mui/material/Stack';

import { useResponsive } from 'src/hooks/use-responsive';

import { useTranslate } from 'src/locales';

import { UserAddressModel } from 'src/types/user';

import Label from '../label/label';

// ----------------------------------------------------------------------

type Props = PaperProps &
  StackProps & {
    action?: React.ReactNode;
    address: UserAddressModel;
    selectShipping: string;
  };

export default function AddressItem({ address, action, sx, selectShipping, ...other }: Props) {

  const theme = useTheme();
  const { t } = useTranslate();

  const lgUp = useResponsive('up', 'lg');

  const { fullName, fullAddress, status, tel } = address;

  return (
    <Stack
      component={Paper}
      spacing={2}
      alignItems={{ md: 'flex-end' }}
      direction={{ xs: 'column', md: 'row' }}
      sx={{
        position: 'relative',
        ...(status === 'USED' && selectShipping ? {
          boxShadow: () => `0 0 0 2px ${theme.palette.primary.main} !important`,
        } : { borderStyle: 'dashed', borderWidth: 1, borderColor: 'grey.300', borderRadius: 1, width: '100%' }),
        ...sx,
      }}
      {...other}
    >
      <Stack flexGrow={1} spacing={1}>
        <Stack alignItems="center" direction="row">
          <Typography variant="subtitle2" sx={{ mr: 1 }}>
            {t('registerForm.shipping.fullName')}
          </Typography>
          {"  :  "}
          <Typography variant="subtitle2" sx={{ ml: 1 }}>
            {fullName}
          </Typography>

          {status === 'USED' && selectShipping && (
            <Label color="error" sx={{ ml: 1 }}>
              {t('registerForm.shipping.selectAddressed')}
            </Label>
          )}
        </Stack>
        <Stack direction={lgUp ? "row" : "column"} alignItems={lgUp ? "center" : "flex-start"}>
          <Typography variant="subtitle2" sx={{ mr: 1 }}>
            {t('registerForm.shipping.address')}
          </Typography>
          {lgUp ? "  :  " : ""}
          <Typography variant="body2" sx={{ color: 'text.secondary', ml: 1  }}>
            {fullAddress}
          </Typography>
        </Stack>
        <Stack direction={lgUp ? "row" : "column"} alignItems={lgUp ? "center" : "flex-start"}>
          <Typography variant="subtitle2" sx={{ mr: 1 }}>
            {t('registerForm.shipping.phoneNumber')}
          </Typography>
          {lgUp ? "  :  " : ""}
          <Typography variant="body2" sx={{ color: 'text.secondary',  ml: 1  }}>
            {tel}
          </Typography>
        </Stack>

      </Stack>

      {action && action}
    </Stack>
  );
}
