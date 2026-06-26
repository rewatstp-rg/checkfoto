import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

import Box from '@mui/material/Box';
import { Backdrop, CircularProgress } from '@mui/material';

import { useRouter, usePathname, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import RedirectToChrome from 'src/utils/redirect-to-chrome';

import { selectOrder } from 'src/slices/order.slices';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { showDialogLogin, closeDialogLogin } from 'src/slices/dialog-login.slices';
import { closeDialogMessage, selectErrorMessage } from 'src/slices/error-message.slices';

import AlertDialog from 'src/components/dialog/alert-dialog';
import { CookieConsent } from 'src/components/cookie-consent';
import ConfirmGotoChromeDialog from 'src/components/dialog/confirm-goto-chrome';

import Footer from './footer';
import Header from './header';
import NavVertical from './nav-vertical';
import { DialogLogin } from '../dialog-login';
import packageJson from "../../../package.json";
import CartIconFlex from "../common/cart-icon-fixed";
import { DialogNoneEmail } from '../dialog-none-email';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {

  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');

  const nav = useBoolean();
  const pathname = usePathname();
  const lgUp = useResponsive('up', 'lg');
  const openIsFacebookBrowser = useBoolean();
  const isGotoFacebookBrowser = useBoolean();

  const dispatch = useAppDispatch();

  const { photoCart } = useAppSelector(selectOrder);
  const { loadingState, alertDialogModel, isLoadingDailog } = useAppSelector(selectErrorMessage);

  const [cookie] = useCookies(["cookie-consent-accepted", "cookie_time-zone", "cookie-consent-useragent"]);

  const isFacebookOrLineBrowser = (): boolean => {
    const ua = navigator.userAgent.toLowerCase();
    return ua.includes('fbav') || ua.includes('line');
  };

  const isAndroid = (): boolean => (/android/i.test(navigator.userAgent));

  const renderNavVertical = <NavVertical openNav={nav.value} onCloseNav={nav.onFalse} />;

  const homePage = pathname === '/';

  const onCloseDialogAlert = () => {
    dispatch(closeDialogMessage());
  }

  const caching = () => {
    const version = localStorage.getItem('version');
    if (version === packageJson.version) {
      checkLogin();
    }
  };

  const checkLogin = async () => {
    try {
      if (returnTo) {
        dispatch(showDialogLogin(`${returnTo}`));
      }
    } catch (error) {
      dispatch(closeDialogLogin());
      console.error("🚀 ~ checkLogin ~ error:", error)
    }
  }

  const onAcceptGotoChrome = () => {
    openIsFacebookBrowser.onFalse();
    setTimeout(() => {
      isGotoFacebookBrowser.onTrue();
    }, 300);
  }

  useEffect(() => {

    caching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [returnTo, packageJson.version]);

  useEffect(() => {
    if (isFacebookOrLineBrowser() && isAndroid()) {
      openIsFacebookBrowser.onTrue();
      isGotoFacebookBrowser.onFalse();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, pathname]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>

      {
        isGotoFacebookBrowser.value && (
          <RedirectToChrome />
        )
      }

      <AlertDialog model={alertDialogModel} onCancel={onCloseDialogAlert} loading={isLoadingDailog} />
      {(loadingState) && (
        <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
          <CircularProgress color="primary" />
        </Backdrop>
      )}

      <DialogNoneEmail />
      <DialogLogin />

      <ConfirmGotoChromeDialog open={openIsFacebookBrowser.value} onAccept={onAcceptGotoChrome} />

      <Header onOpenNav={nav.onTrue} />

      {
        shouldApplyConfig(pathname, ['/checkout', '/order', '/download-photo']) && (
          <CartIconFlex totalItems={photoCart.totalOrder} onClick={() => { router.push('/checkout'); }} />
        )
      }

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginTop: lgUp ? 10 : 6,
          ...(!homePage && {
            pt: { xs: 0, md: 0 },
          }),
        }}
      >
        {children}
      </Box>

      {renderNavVertical}

      <Footer />
      {!cookie['cookie-consent-accepted'] && <CookieConsent />}
    </Box>
  );
}

const shouldApplyConfig = (
  pathname: string,
  excludedSubstrings: string[]
): boolean => {
  if (pathname === '/') {
    return false;
  }

  return !excludedSubstrings.some(sub => pathname.includes(sub));
};