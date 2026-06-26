import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { alpha, createTheme } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';

import { getStorage } from 'src/hooks/use-local-storage';

import { STORAGE_KEYS } from 'src/utils/constants';

import { useAppSelector } from 'src/store/hooks';
import { jwtDecode } from 'src/auth/context/jwt/utils';
import { useLocales, useTranslate } from 'src/locales';
import { selectAuthenSlice } from 'src/slices/authen.slices';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

import packageJson from "../../../package.json";

// ----------------------------------------------------------------------

const theme = createTheme({
  palette: {
    mode: 'dark', // กำหนดให้เป็น Dark Mode โดยเฉพาะ
  },
});

export default function Footer() {

  // const theme = createTheme({
  //   palette: {
  //     mode: 'dark', // หรือ light
  //   },
  // });

  const key = STORAGE_KEYS.USER_INFO;
  const userProfile = getStorage(key);
  const { t } = useTranslate();
  const { currentLang } = useLocales();

  const { userAuthen } = useAppSelector(selectAuthenSlice);

  const [userProfileState, setUserProfileState] = useState<any>();

  const LINKS = [
    // {
    //   headline: t('footerSearchEvent'),
    //   children: [
    //     { name: t('footerAllEvent'), href: '/' },
    //     { name: t('footerRecommended'), href: '/result?eventType=new' },
    //     { name: t('footerReacEvent'), href: '/result?eventType=running' }
    //   ],
    // },
    {
      headline: t('footerAboutUs'),
      children: [
        { name: currentLang.value === 'th' ? 'ข้อตกลงในการใช้งาน' : 'Terms of Use', href: '/terms-of-use' },
        { name: currentLang.value === 'th' ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy', href: '/privacy-policy' }
      ],
    }
  ];

  const LINKS_AUTHN = [
    // {
    //   headline: t('footerSearchEvent'),
    //   children: [
    //     { name: t('footerAllEvent'), href: '/' },
    //     { name: t('footerRecommended'), href: '/result?eventType=new' },
    //     { name: t('footerReacEvent'), href: '/result?eventType=running' }
    //   ],
    // },
    {
      headline: t('footerAboutUs'),
      children: [
        { name: currentLang.value === 'th' ? 'ข้อตกลงในการใช้งาน' : 'Terms of Use', href: '/terms-of-use' },
        { name: currentLang.value === 'th' ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy', href: '/privacy-policy' }
        // { name: t('footerRunnerChecklist'), href: '/checklist' },
        // { name: t('footerRunnerChecklistVr'), href: '/checklist-virtual-run' }
      ],
    }
  ];

  const socials = [
    {
      value: 'facebook',
      name: 'Facebook: checkrace.th',
      icon: 'eva:facebook-fill',
      color: '#1877F2',
      path: 'https://www.facebook.com/checkrace.th',
    },
    {
      value: 'mail',
      name: 'Mail: info@checkrace.com',
      icon: 'tabler:mail-filled',
      color: '#E02D69',
      path: 'mailto:info@checkrace.com',
    },
    {
      value: 'line',
      name: 'Line',
      icon: 'ri:line-line',
      color: '#06C755',
      path: 'https://lin.ee/lfIdQAh',
    },
  ];

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

  const mainFooter = (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        bgcolor: theme.palette.background.default,
      }}
    >
      <Divider />

      <Container
        sx={{
          pt: { xs: 2, md: 1 },
          pb: 1,
          textAlign: { xs: 'center', md: 'unset' },
        }}
      >
        <Logo sx={{ mb: { xs: 0, md: 2 } }} mode='dark' />

        <Grid
          container
          justifyContent={{
            xs: 'center',
            md: 'space-between',
          }}
        >
          <Grid xs={8} md={8}>
            <Typography
              variant="body2"
              color="#ffffff"
              sx={{
                maxWidth: 270,
                mx: { xs: 'auto', md: 'unset' },
              }}
            >
              {t('footerTitle')}
            </Typography>

            <Stack
              direction={{ xs: 'column', md: 'row' }}
              justifyContent={{ xs: 'center', md: 'flex-start' }}
              alignItems={{ xs: 'center', md: 'flex-start' }}
              sx={{
                mt: { xs: 0, md: 1 },
                mb: { xs: 1, md: 0 },
              }}
            >
              {socials.map((social) => (
                <Box key={social.value} sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton
                    aria-label={social.name}
                    onClick={() => {
                      window.location.href = social.path;
                    }}
                    sx={() => ({
                      p: { xs: 0.2, md: 0.5 },
                      '&:hover': {
                        bgcolor: alpha(social.color, theme.palette.mode === 'light' ? 0.08 : 0.16),
                      },
                    })}
                  >
                    <Iconify color={social.color} icon={social.icon} />
                  </IconButton>
                  <Typography component="div" variant="overline" color="#ffffff">
                    {social.name}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Grid>

          <Grid xs={12} md={4}>
            <Stack spacing={2} direction={{ xs: 'column', md: 'row' }}>
              {
                userProfileState ? (
                  <>
                    {LINKS_AUTHN.map((list) => (
                      <Stack
                        key={list.headline}
                        spacing={1}
                        alignItems={{ xs: 'center', md: 'flex-start' }}
                        sx={{ width: 1 }}
                      >
                        <Typography component="div" variant="overline" color="#ffffff">
                          {list.headline}
                        </Typography>

                        {list.children.map((link) => (
                          <Link
                            key={link.name}
                            component={RouterLink}
                            href={link.href}
                            target="_blank"
                            color="#ffffff" // theme-aware
                            variant="body2"
                            rel="nofollow"
                          >
                            {link.name}
                          </Link>
                        ))}
                      </Stack>
                    ))}
                  </>
                ) : (
                  <>
                    {LINKS.map((list) => (
                      <Stack
                        key={list.headline}
                        spacing={1}
                        alignItems={{ xs: 'center', md: 'flex-start' }}
                        sx={{ width: 1 }}
                      >
                        <Typography component="div" variant="overline" color="#ffffff">
                          {list.headline}
                        </Typography>

                        {list.children.map((link) => (
                          <Link
                            key={link.name}
                            component={RouterLink}
                            href={link.href}
                            target="_blank"
                            variant="body2"
                            rel="nofollow"
                            color="#ffffff"
                          >
                            {link.name}
                          </Link>
                        ))}
                      </Stack>
                    ))}
                  </>
                )
              }

            </Stack>
          </Grid>
        </Grid>

        <Typography variant="body2" color="#ffffff" sx={{ mt: { xs: 2, md: 1 } }}>
          Copyright © Checkrace 2020-{new Date().getFullYear()} version {packageJson.version}
        </Typography>
      </Container>
    </Box>
  );

  return mainFooter;
}
