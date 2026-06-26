/* eslint-disable perfectionist/sort-imports */
// import liff from '@line/liff';
import { m } from 'framer-motion';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';
import { getStorage } from 'src/hooks/use-local-storage';

import { STORAGE_KEYS } from 'src/utils/constants';

import { _mock } from 'src/_mock';
import { useLocales, useTranslate } from 'src/locales';
import { selectAuthMenu } from 'src/slices/menu.slices';
import { setUrlRedirct } from 'src/slices/dialog-login.slices';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { setLoadingState } from 'src/slices/error-message.slices';
import { jwtDecode, setSession } from 'src/auth/context/jwt/utils';
import { setUserAuthen, setUserImageUrl, selectAuthenSlice } from 'src/slices/authen.slices';

import Iconify from 'src/components/iconify';
import { varHover } from 'src/components/animate';
import { useSnackbar } from 'src/components/snackbar';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export const HOST_API = import.meta.env.VITE_HOST_URL_FOR_RUN;

export default function AccountPopover() {

  const { menuType } = useAppSelector(selectAuthMenu);

  const vrMenu = [
    {
      label: 'หน้าหลัก',
      labelEn: 'Home',
      linkTo: `${HOST_API}`,
      icon: <Iconify icon="solar:home-2-bold-duotone" sx={{ width: '20px !important' }} />
    },
    // {
    //   label: 'โปรไฟล์',
    //   labelEn: 'Profile',
    //   linkTo: `/profile-vr`,
    //   icon: <Iconify icon="solar:user-bold" sx={{ width: '20px !important' }} />
    // },
    // {
    //   label: 'เปลี่ยนรหัสผ่าน',
    //   labelEn: 'Change Password',
    //   linkTo: '/change-password-vr',
    //   icon: <Iconify icon="solar:key-bold" sx={{ width: '20px !important' }} />
    // },
    // {
    //   label: 'ตั้งค่าที่อยู่จัดส่ง',
    //   labelEn: 'Config Address',
    //   linkTo: '/change-address-vr',
    //   icon: <Iconify icon="solar:point-on-map-bold" sx={{ width: '20px !important' }} />
    // }
  ];

  const raceMenu = [
    {
      label: 'หน้าหลัก',
      labelEn: 'Home',
      linkTo: '/',
      icon: <Iconify icon="solar:home-2-bold-duotone" sx={{ width: '20px !important' }} />
    },
    // {
    //   label: 'โปรไฟล์',
    //   labelEn: 'Profile',
    //   linkTo: `/profile`,
    //   icon: <Iconify icon="solar:user-bold" sx={{ width: '20px !important' }} />
    // },
    // {
    //   label: 'เปลี่ยนรหัสผ่าน',
    //   labelEn: 'Change Password',
    //   linkTo: '/change-password',
    //   icon: <Iconify icon="solar:key-bold" sx={{ width: '20px !important' }} />
    // },
    // {
    //   label: 'ตั้งค่าที่อยู่จัดส่ง',
    //   labelEn: 'Config Address',
    //   linkTo: '/change-address',
    //   icon: <Iconify icon="solar:point-on-map-bold" sx={{ width: '20px !important' }} />
    // }
  ]

  const router = useRouter();

  const key = STORAGE_KEYS.USER_INFO;
  const userProfile = getStorage(key);

  const userImage = localStorage.getItem('userImage');

  const { t } = useTranslate();
  const { currentLang } = useLocales();

  const popover = usePopover();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { userAuthen, userImageUrl } = useAppSelector(selectAuthenSlice);

  const [menuList, setMenuList] = useState<any>([]);
  const [providerName, setProviderName] = useState('');
  const [userProfileState, setUserProfileState] = useState<any>();
  const [userImageProfile, setUserImageProfile] = useState('');

  const handleLogout = async () => {
    // const hostName = window.location.pathname;
    // console.log("🚀 ~ handleLogout ~ hostName:", hostName)
    try {
      // await liff.ready;
      dispatch(setLoadingState(true));
      setTimeout(() => {
        // if (liff?.isLoggedIn()) {
        //   liff.logout();
        // }
        dispatch(setUserAuthen(null));
        dispatch(setUrlRedirct(''));
        dispatch(setUserImageUrl(''));
        setSession(null);
        popover.onClose();
        router.replace('/');
        dispatch(setLoadingState(false));
        Object.keys(localStorage).forEach((keyItem) => {
          if (!keyItem.includes("accepted-policy-") && keyItem !== "version" && keyItem !== "settings" && keyItem !== "i18nextLng") {
            delete localStorage[keyItem];
          }
        });
        // localStorage.clear();
      }, 1000);
    } catch (error) {
      console.error(error);
      dispatch(setLoadingState(false));
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  const handleClickItem = (path: string) => {
    popover.onClose();
    if (menuType === 'VR') {
      window.location.href = path;
    } else {
      router.push(path);
    }

  };

  function isNullOrEmpty(value: any): boolean {
    return value === null || value === undefined || value === 'null' || value === 'null null';
  }

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


  useEffect(() => {
    if (menuType === 'VR') {
      const menu = providerName === 'SYSTEM' ? vrMenu.filter(x => x.linkTo !== '/change-password') : vrMenu;
      setMenuList(menu);
    } else {
      const menu = providerName === 'SYSTEM' ? raceMenu.filter(x => x.linkTo !== '/change-password') : raceMenu;
      setMenuList(menu);
      setMenuList(raceMenu);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuType])

  useEffect(() => {
    if (userProfile) {
      const user = jwtDecode(userProfile)?.userDetail;
      if (user) {
        setProviderName(user?.providerName || '-');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile]);

  useEffect(() => {
    if (userImageUrl) {
      setUserImageProfile(userImageUrl);
    }

    if (userImage) {
      setUserImageProfile(userImage);
    }
  }, [userImageUrl, userImage])


  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(popover.open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={userImageProfile || userImage || _mock.image.avatar(24)}
          alt="user-profile"
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
            // filter: 'grayscale(1)'
          }}
        >
          {userProfileState?.userDetail?.fullName?.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 200, p: 0 }}>
        <Box sx={{ p: 2, pb: 1.5 }}>
          {
            userProfileState?.userDetail?.fullName &&
            <Typography variant="subtitle2" noWrap>
              {isNullOrEmpty(userProfileState?.userDetail?.fullName) ? '-' : userProfileState?.userDetail?.fullName}
            </Typography>
          }

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {userProfileState?.userDetail?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {menuList.map((option: any) => (
            <MenuItem
              key={option.label}
              onClick={() => handleClickItem(option.linkTo)}
              sx={{
                py: 1,
                color: 'text.secondary',
                '& svg': { width: 24, height: 24 },
                '&:hover': { color: 'text.primary' },
                ...option.linkTo === window.location.pathname && ({
                  color: 'primary.main',
                  backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
                })
              }}
            >
              {option.icon}
              {currentLang.value === 'en' ? option.labelEn : option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />
        {/* <Iconify width={22} icon="solar:home-2-bold-duotone" /> */}
        <MenuItem
          onClick={handleLogout}
          sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'error.main' }}
        >
          <Iconify icon="solar:logout-3-bold-duotone" sx={{ width: '20px !important' }} />
          {t('logout')}
        </MenuItem>
      </CustomPopover>
    </>
  );
}
