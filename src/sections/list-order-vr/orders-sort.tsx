import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import { useResponsive } from 'src/hooks/use-responsive';

import { useLocales, useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

type Props = {
  sort: string;
  onSort: (newValue: string) => void;
  sortOptions: {
    value: string;
    label: string;
    labelEn: string;
  }[];
};

export default function OrdersSort({ sort, onSort, sortOptions }: Props) {

  const popover = usePopover();
  const { t } = useTranslate();
  const { currentLang } = useLocales();
  const lgUp = useResponsive('up', 'lg');

  const sortItem = sortOptions.find((option) => option.value === sort);

  return (
    <Stack
      spacing={3}
      justifyContent="space-between"
      alignItems={{ xs: 'center', sm: 'center' }}
      direction={{ xs: 'row', sm: 'row' }}
      sx={{ maxWidth: '-webkit-fill-available' }}
    >
      {
        lgUp && <Button
          disableRipple
          color="inherit"
          onClick={popover.onOpen}
          endIcon={
            <Iconify
              icon={popover.open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
            />
          }
          sx={{ fontWeight: 'fontWeightSemiBold' }}
        >
          {t('orders.sortBt')}:
          <Box component="span" sx={{ ml: 0.5, fontWeight: 'fontWeightBold' }}>
            {currentLang.value === 'th' ? sortItem?.label : sortItem?.labelEn}
          </Box>
        </Button>
      }
      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 140 }}>
        {sortOptions.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === sort}
            onClick={() => {
              popover.onClose();
              onSort(option.value);
            }}
          >
            {currentLang.value === 'th' ? option?.label : option?.labelEn}
          </MenuItem>
        ))}
      </CustomPopover>
    </Stack>
  );
}
