/* eslint-disable perfectionist/sort-imports */
import { useState, useEffect, useCallback } from 'react';

import { useParams, useRouter, useSearchParams } from 'src/routes/hooks';

import { STORAGE_KEYS } from 'src/utils/constants';

import { useAppDispatch } from 'src/store/hooks';
import { setMenuType } from 'src/slices/menu.slices';
import { showDialogLogin } from 'src/slices/dialog-login.slices';

import { SplashScreen } from 'src/components/loading-screen';

import { getStorage } from 'src/hooks/use-local-storage';

import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  url?: string;
};

export default function AuthGuard({ children, url }: Props) {
  const { loading } = useAuthContext();

  return <>{loading ? <SplashScreen /> : <Container url={url}>{children}</Container>}</>;
}

// ----------------------------------------------------------------------

function Container({ children, url }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const params = useParams();
  const searchParams = useSearchParams();

  const { eventUrl, token, orderPhotoNumber } = params;

  const key = STORAGE_KEYS.USER_INFO;
  const accessTokenOption = getStorage(key);
  const [checked, setChecked] = useState(false);

  const checkUrl = (path: string) => {
    if (
      path === '/virtual-run-order' ||
      path === '/medals' ||
      path === '/virtual-run' ||
      path === '/profile-vr' ||
      path === '/change-address-vr' ||
      path === '/change-password-vr'
    ) {
      dispatch(setMenuType('VR'));
    } else {
      dispatch(setMenuType('RACE'));
    }
  }

  const check = useCallback(() => {
    if (!accessTokenOption) {
      if (url) {
        checkUrl(url);
        if (url === '/register/:eventUrl' && eventUrl) {
          dispatch(showDialogLogin(`/register/${eventUrl}`));
        } else if (url === '/register/:eventUrl/influencer' && eventUrl) {
          dispatch(showDialogLogin(`/register/${eventUrl}/influencer`));
        } else if (url === '/register/:eventUrl/:token' && eventUrl && token) {
          dispatch(showDialogLogin(`/register/${eventUrl}/${token}`));
        } else if (url === '/download-photo/:orderPhotoNumber' && orderPhotoNumber) {
          dispatch(showDialogLogin(`/download-photo/${orderPhotoNumber}`));
        } else {
          const eventVrUrl = searchParams.get('eventUrl');
          if (eventVrUrl) {
            dispatch(showDialogLogin(`${url}?eventUrl=${eventVrUrl}`));
          } else {
            dispatch(showDialogLogin(`${window.location.pathname}${window.location.search}`));
          }
        }
      } else {
        dispatch(showDialogLogin(`/${window.location.search}`));
      }
    } else {
      if (url) {
        checkUrl(url);
      }
      setChecked(true);

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, accessTokenOption]);

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, accessTokenOption]);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}
