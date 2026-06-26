import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { alpha, useTheme } from '@mui/material/styles';

import { useResponsive } from 'src/hooks/use-responsive';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';

// ----------------------------------------------------------------------

export const IMAGE_BACKGROUND = import.meta.env.VITE_IMAGE_BACKGROUND;
const HOST_NAME = import.meta.env.VITE_HOST_NAME;

type Props = {
  title?: string;
  image?: string;
  children: React.ReactNode;
};

export default function AuthClassicLayout({ children, image, title }: Props) {


  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');


  const renderLogo = (
    <Logo
      sx={{
        zIndex: 9,
        position: 'absolute',
        m: { xs: 2, md: 5 },
      }}
    />
  );

  const renderContent = (
    <Stack
      sx={{
        width: 1,
        mx: 'auto',
        maxWidth: mdUp ? window.innerWidth / 2 : 480,
        paddingRight: 16,
        justifyContent: 'center',
        px: { xs: 2, md: 8 },
        pt: { xs: 15, md: 20 },
        pb: { xs: 15, md: 0 },
      }}
    >
      {children}
    </Stack>
  );

  const renderSection = (
    <Stack
      flexGrow={1}
      spacing={10}
      alignItems="flex-end"
      justifyContent="center"
      sx={{
        ...bgGradient({
          color: alpha(
            theme.palette.background.default,
            theme.palette.mode === 'light' ? 0.88 : 0.94
          ),
        }),
      }}
    >

      <Box
        component="img"
        alt="auth"
        src={image || IMAGE_BACKGROUND}
        sx={{
          maxWidth: {
            xs: HOST_NAME === 'ADMIN' ? 360 : 450,
            lg: HOST_NAME === 'ADMIN' ? 400 : 540,
            xl: HOST_NAME === 'ADMIN' ? 460 : 580,
          },
          position: 'relative',
          top: 10
        }}
      />
    </Stack>
  );

  return (
    <Stack
      component="main"
      direction="row"
      sx={{
        minHeight: '100vh',
        position: 'relative'
      }}
    >
      {renderLogo}

      {/* {renderLogoBanner} */}

      {mdUp && renderSection}

      {renderContent}
    </Stack>
  );
}
