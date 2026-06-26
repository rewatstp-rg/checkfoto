import { useState, useEffect, forwardRef } from 'react';

import Link from '@mui/material/Link';
import { useTheme } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';

import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import { useAppSelector } from 'src/store/hooks';
import { selectAuthMenu } from 'src/slices/menu.slices';

// ----------------------------------------------------------------------

export const HOST_API = import.meta.env.VITE_HOST_URL_FOR_RUN;

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
  mode?: 'light' | 'dark';
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, mode, sx, ...other }, ref) => {

    const { menuType } = useAppSelector(selectAuthMenu);
    const lgUp = useResponsive('up', 'lg');
    const theme = useTheme();
    const urlRace = '/';
    const urlVr = HOST_API;

    mode = mode || theme.palette.mode ;

    const [useUrl, setUseUrl] = useState('');

    useEffect(() => {

      if (menuType === 'VR') {
        setUseUrl(urlVr);
      } else {
        setUseUrl(urlRace);
      }

    }, [menuType, urlVr])

    const logo = (
      <Box
        ref={ref}
        component="div"
        sx={!lgUp ? {
          width: 140,
          height: 'auto',
          display: 'inline-flex',
          ...sx,
          // filter: 'grayscale(1)',
        } : {
          width: 150,
          height: 'auto',
          margin: '25px auto auto !important',
          display: 'inline-flex',
          ...sx,
          // filter: 'grayscale(1)',
        }}
        {...other}
      >
        {
          (mode === 'light') &&
          <img src="/assets/logo/CI-CHECKFOTO2026-new.png" alt="race-checkrace-logo" />
        }
        {
          (mode === 'dark') &&
          <img src="/assets/logo/CI-CHECKFOTO2026.png" alt="race-checkrace-logo" />
        }
      </Box>
    );

    if (disabledLink) {
      return logo;
    }



    return (
      <Link component={RouterLink} href={useUrl} sx={
        lgUp ?
          { display: 'contents' } :
          { display: 'inline-flex', justifyContent: 'center', width: '100%', ...sx }}
      >
        {window.location.pathname !== '/login' ? logo : null}
      </Link>
    );
  }
);

export default Logo;
