import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  totalItems?: number;
  onClick?: VoidFunction;
  iconSize?: number;
  iconColor?: string;
};

export default function CartIcon({ totalItems, onClick, iconSize = 24, iconColor = "text.primary" }: Props) {

  return (
    <Box
      onClick={onClick}
      sx={{
        // right: 0,
        // top: lgUp ? 112 : 210,
        // zIndex: 999,
        display: 'flex',
        cursor: 'pointer',
        // position: 'fixed',
        mr: 2,
        ml: 2,
        color: 'text.primary',
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
        // bgcolor: 'background.paper',
        // padding: (theme) => theme.spacing(1, 3, 1, 2),
        // boxShadow: (theme) => theme.customShadows.dropdown,
        transition: (theme) => theme.transitions.create(['opacity']),
        '&:hover': { opacity: 0.72 },
      }}
    >
      <Badge showZero badgeContent={totalItems} color="error" max={99}>
        <Iconify icon="solar:cart-3-bold" width={iconSize} color={iconColor} />
      </Badge>
    </Box>
  );
}
