/* eslint-disable perfectionist/sort-imports */
import { useState, useEffect } from "react";

import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import { Box, Button, Container } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';
import { getStorage } from 'src/hooks/use-local-storage';

import { useRouter } from "src/routes/hooks";

import { STORAGE_KEYS } from 'src/utils/constants';

import { bgBlur } from 'src/theme/css';
import { useTranslate } from "src/locales";
import { selectOrder } from "src/slices/order.slices";
import { jwtDecode } from "src/auth/context/jwt/utils";
import { selectAuthenSlice } from 'src/slices/authen.slices';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { showDialogLogin } from "src/slices/dialog-login.slices";

import Logo from 'src/components/logo';
import SvgColor from 'src/components/svg-color';
import { useSettingsContext } from 'src/components/settings';
import BaseOptions from "src/components/settings/drawer/base-option";

import NavDesktop from './nav/desktop';
// import SeachContent from './seach-content';
// import ListEventType from './list-event-type';
import CartIcon from "../common/cart-icon";
import { NAV, HEADER } from '../config-layout';
import { useNavData } from './config-navigation';
import ProfileName from '../common/profile-name';
// import SettingsButton from "../common/settings-button";
import AccountPopover from '../common/account-popover';
import LanguagePopover from '../common/language-popover';

// ----------------------------------------------------------------------

type Props = {
  onOpenNav?: VoidFunction;
};

export default function Header({ onOpenNav }: Props) {

  const theme = useTheme();
  const router = useRouter();
  const navData = useNavData();
  const { t } = useTranslate();
  const dispatch = useAppDispatch();
  const settings = useSettingsContext();
  const lgUp = useResponsive('up', 'lg');
  const offset = useOffSetTop(HEADER.H_DESKTOP);

  const isNavHorizontal = settings.themeLayout === 'horizontal';

  const isNavMini = settings.themeLayout === 'mini';

  const offsetTop = offset && !isNavHorizontal;

  const key = STORAGE_KEYS.USER_INFO;
  const userProfile = getStorage(key);

  const { photoCart } = useAppSelector(selectOrder);
  const { userAuthen } = useAppSelector(selectAuthenSlice);

  const [userProfileState, setUserProfileState] = useState<any>();
  // console.log("🚀 ~ file: header.tsx:67 ~ Header ~ userProfileState:", userProfileState)

  useEffect(() => {
    const token = userProfile;
    if (token) {
      setUserProfileState(jwtDecode(token));
    }

    if (userAuthen && userAuthen?.accessToken) {
      setUserProfileState(jwtDecode(userAuthen.accessToken));
    }

    if (!token && !userAuthen) {
      setUserProfileState(null);
    }

  }, [userProfile, userAuthen]);

  const handleLogin = () => {
    dispatch(showDialogLogin(''));
  }

  const modeArr = settings.themeMode === 'dark' ? ['light'] : ['dark'];
  const modeArrIcon = settings.themeMode === 'dark' ? ['sun'] : ['moon'];

  const renderMode = (
    <BaseOptions
      value={settings.themeMode}
      onChange={(newValue: string) => settings.onUpdate('themeMode', newValue)}
      options={modeArr}
      icons={modeArrIcon}
    />

    // <Switch
    //   color="default"
    //   value={settings.themeMode === 'dark'}
    //   icon={theme.palette.mode === 'light' ? <SvgColor src={`/assets/icons/setting/ic_moon.svg`} /> : <SvgColor src={`/assets/icons/setting/ic_moon.svg`} />}
    //   onChange={(event) => {
    //     if (event.target.checked) {
    //       settings.onUpdate('themeMode', 'dark');
    //     } else {
    //       settings.onUpdate('themeMode', 'light');
    //     }
    //   }
    //   }
    // />
  );

  const renderContent = (
    <>

      {/* เมนูไอคอนฝั่งซ้ายบน mobile */}
      {!lgUp && (
        <IconButton aria-label="menu-navbar" onClick={onOpenNav}>
          <SvgColor src="/assets/icons/navbar/ic_menu_item.svg" />
        </IconButton>
      )}

      {/* Logo */}
      <Box
        sx={{
          position: { xs: 'absolute', lg: 'static' },
          left: { xs: '50%', lg: 'auto' },
          transform: { xs: 'translateX(-50%)', lg: 'none' },
        }}
      >
        <Logo sx={lgUp ? { mr: 2.5 } : { mr: 0 }} />
      </Box>

      {/* ส่วนของเมนูและไอคอนอื่นๆ */}
      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 1 }}
      >
        {lgUp && <NavDesktop data={navData} />}
        {lgUp && <LanguagePopover />}
        {lgUp && <CartIcon totalItems={photoCart.totalOrder} onClick={() => router.push('/checkout')} />}
        {lgUp && renderMode}
        {lgUp && <ProfileName />}

        {!lgUp && !userProfileState && (
          <Button
            variant="text"
            color="inherit"
            onClick={handleLogin}
            sx={{ width: '90px', textAlign: 'center', fontSize: '16px' }}
          >
            {`${t('titleLogin')}`}
          </Button>
        )}

        {userProfileState && <AccountPopover />}
      </Stack>
    </>
  );

  // const loadMenu = async () => {
  //   await getAllMenu();
  // }


  // useEffect(() => {
  //   loadMenu();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  return (
    <AppBar
      sx={{
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `100%`,
          height: HEADER.H_DESKTOP,
          ...(offsetTop && {
            height: HEADER.H_DESKTOP_OFFSET,
          }),
          ...(isNavHorizontal && {
            width: 1,
            bgcolor: 'background.default',
            height: HEADER.H_DESKTOP_OFFSET,
            borderBottom: `dashed 1px ${theme.palette.divider}`,
          }),
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_MINI + 1}px)`,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        <Container sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
          {renderContent}
        </Container>

      </Toolbar>
      {/* <ListEventType /> */}
    </AppBar>
  );
}
