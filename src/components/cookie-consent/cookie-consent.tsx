import { useCookies } from 'react-cookie';

import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Link, useTheme, Typography } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';
import { useOffSetTop } from 'src/hooks/use-off-set-top';

import { bgBlur } from 'src/theme/css';
import { useTranslate } from 'src/locales';
import { HEADER } from 'src/layouts/config-layout';

import { useSettingsContext } from '../settings';

const CookieConsent = () => {

    const theme = useTheme();
    const { t } = useTranslate();
    const lgUp = useResponsive('up', 'lg');
    const offset = useOffSetTop(HEADER.H_DESKTOP);

    const settings = useSettingsContext();

    const isNavHorizontal = settings.themeLayout === 'horizontal';

    const offsetTop = offset && !isNavHorizontal;

    const [cookie, setCookie] = useCookies(["cookie-consent-accepted", "cookie_time-zone", "cookie-consent-useragent"]);

    const giveCookieConsent = () => {
        const userAgent: string = navigator.userAgent || navigator.vendor;
        const { timeZone }: any = Intl.DateTimeFormat().resolvedOptions();
        setCookie("cookie-consent-accepted", true, { path: "/" });
        setCookie("cookie_time-zone", timeZone.toString(), { path: "/" });
        setCookie("cookie-consent-useragent", userAgent.toString(), { path: "/" });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'fixed',
                bottom: '0px',
                height: 140,
                padding: '15px 25px 10px',
                gap: '25px',
                width: '100%',
                zIndex: theme.zIndex.appBar + 1,
                ...bgBlur({
                    color: theme.palette.background.default,
                }),
                boxShadow: theme.shadows[20],
                transition: theme.transitions.create(['height'], {
                    duration: theme.transitions.duration.shorter,
                }),
                ...(lgUp && {
                    height: '88px',
                    ...(offsetTop && {
                        height: '88px',
                    }),
                    ...(isNavHorizontal && {
                        bgcolor: 'background.default',
                        height: '88px',
                        borderBottom: `dashed 1px ${theme.palette.divider}`,
                    })
                }),
            }} >
            <Box>
                <Typography variant="h5" sx={{ mb: 0.5 }}>{t('cookie.title')}</Typography>
                <Typography>{t('cookie.message')} {" "}
                    <Link target="_blank" href="/privacy-policy">{t('cookie.messageLink')}</Link>
                </Typography>
            </Box>
            {
                !cookie['cookie-consent-accepted'] && <LoadingButton
                    color="primary"
                    size="medium"
                    type="submit"
                    variant="contained"
                    loading={false}
                    sx={{
                        width: 'auto',
                        height: '40px',
                    }}
                    onClick={giveCookieConsent}
                >
                    {t('cookie.accept')}
                </LoadingButton>
            }
        </Box >
    );
};


export default CookieConsent;