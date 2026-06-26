import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';

import { useResponsive } from 'src/hooks/use-responsive';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  totalItems: number;
  onClick?: VoidFunction
};

export default function CartIconFixed({ totalItems ,onClick}: Props) {

   const lgUp = useResponsive('up', 'lg');

  return (
    <Box
      onClick={onClick}
      sx={{
        right: 0,
        top: lgUp ? 112 : 210,
        zIndex: 999,
        display: 'flex',
        cursor: 'pointer',
        position: 'fixed',
        color: 'text.primary',
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
        bgcolor: 'background.paper',
        padding: (theme) => theme.spacing(1, 3, 1, 2),
        boxShadow: (theme) => theme.customShadows.dropdown,
        transition: (theme) => theme.transitions.create(['opacity']),
        '&:hover': { opacity: 0.72 },
      }}
    >
      <Badge showZero badgeContent={totalItems} color="error" max={99}>
        <Iconify icon="solar:cart-3-bold" width={26} />
      </Badge>
    </Box>
  );
}
