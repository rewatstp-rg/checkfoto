import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { NavSubListProps } from '../types';

// ----------------------------------------------------------------------

export default function NavSubList({ data, slotProps, ...other }: NavSubListProps) {
  console.log("🚀 ~ file: nav-sub-list.tsx:13 ~ NavSubList ~ data:", data)
  const pathname = usePathname();

  return (
    <>
      {data.map((list, index) => (
        <Stack key={list.subHeader + index} spacing={1} {...other}>
          {list.subHeader && (
            <Typography variant="subtitle2" noWrap sx={slotProps?.subHeader}>
              {list.subHeader}
            </Typography>
          )}

          {list.items.map((link) => {
            const active = pathname === link.path || pathname === `${link.path}/`;

            return (
              <Link
                noWrap
                key={link.title}
                component={RouterLink}
                href={link.path}
                className={active ? 'active' : ''}
                variant="body2"
                sx={{
                  fontSize: 13,
                  color: 'text.secondary',
                  transition: (theme) => theme.transitions.create('all'),
                  '&:hover': {
                    color: 'text.primary',
                  },
                  ...(active && {
                    color: 'text.primary',
                    textDecoration: 'underline',
                    fontWeight: 'fontWeightSemiBold',
                  }),
                  ...slotProps?.subItem,
                }}
              >
                {link.title}
              </Link>
            );
          })}
        </Stack>
      ))}
    </>
  );
}
