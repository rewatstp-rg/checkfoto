import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Divider } from '@mui/material';
import Drawer from '@mui/material/Drawer';

import { usePathname } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';
import { useMockedUser } from 'src/hooks/use-mocked-user';

import { useTranslate } from 'src/locales';

import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import { NavSectionVertical } from 'src/components/nav-section';
import BaseOptions from 'src/components/settings/drawer/base-option';

import { NAV } from '../config-layout';
import { useNavData } from './config-navigation';
import LanguagePopover from '../common/language-popover';
import NavToggleButton from '../common/nav-toggle-button';
import { useNavDataMobile } from './config-navigation-mobile';

// ----------------------------------------------------------------------

type Props = {
  openNav: boolean;
  onCloseNav: VoidFunction;
};

export default function NavVertical({ openNav, onCloseNav }: Props) {

  const { t } = useTranslate();
  const { user } = useMockedUser();

  const pathname = usePathname();

  const lgUp = useResponsive('up', 'lg');
  const navDataDesktop = useNavData();
  const navDataMobile = useNavDataMobile();
  const settings = useSettingsContext();

  const modeArr = settings.themeMode === 'dark' ? ['light'] : ['dark'];
  const modeArrIcon = settings.themeMode === 'dark' ? ['sun'] : ['moon'];

  const renderMode = (
    <BaseOptions
      sx={{ display: 'inline-flex' }}
      value={settings.themeMode}
      onChange={(newValue: string) => settings.onUpdate('themeMode', newValue)}
      options={modeArr}
      icons={modeArrIcon}
    />
  );

  const navData = (lgUp ? navDataDesktop : navDataMobile) || [];

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        },
      }}
    >
      <Logo sx={lgUp ? { mt: 3, ml: 4, mb: 1 } : { mt: 1, mb: 1 }} />

      <NavSectionVertical
        data={navData}
        slotProps={{
          currentRole: user?.role,
        }}
      />

      <Box sx={{ flexGrow: 1 }} />

      <Divider sx={{ borderStyle: 'dashed', mt: 1, mb: 1 }} />

      <Box sx={{ ml: 1 }} >
        {t('changeLanguage')} : <LanguagePopover />
      </Box>

      <Box sx={{ ml: 1, display: 'flex', alignItems: 'center', gap: 1 }} >
        {t('changeTheme')} : {renderMode}
      </Box>

      {/* <NavUpgrade /> */}
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_VERTICAL },
      }}
    >

      {
        !lgUp && (
          <NavToggleButton />
        )
      }

      {lgUp ? (
        <Stack
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.W_VERTICAL,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Stack>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.W_VERTICAL,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
