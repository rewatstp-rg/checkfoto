/* eslint-disable perfectionist/sort-imports */
import { removeStorage } from 'src/hooks/use-local-storage';

import axios from 'src/utils/axios';
import { STORAGE_KEYS } from 'src/utils/constants';

// ----------------------------------------------------------------------

export function jwtDecode(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );
  return JSON.parse(jsonPayload);
}

// ----------------------------------------------------------------------

export const isValidToken = (accessTokenModel: any) => {
  if (!accessTokenModel?.accessToken) {
    return false;
  }
  const decoded = jwtDecode(accessTokenModel?.accessToken);
  const currentTime = Date.now() + 4 / 1000;
  return decoded.exp > currentTime;
};

// ----------------------------------------------------------------------

export const tokenExpired = (exp: number) => {
  // eslint-disable-next-line prefer-const
  let expiredTimer;

  const currentTime = Date.now();

  // Test token expires after 10s
  // const timeLeft = currentTime + 10000 - currentTime; // ~10s
  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    alert('Token expired');

    const key = STORAGE_KEYS.USER_INFO;

    removeStorage(key);

    // window.location.href = paths.auth.jwt.login;
  }, timeLeft);
};

// ----------------------------------------------------------------------

export const setSession = (accessToken: string | null) => {
  if (accessToken) {
    const key = STORAGE_KEYS.USER_INFO;
    localStorage.setItem(key, accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // This function below will handle when token is expired
    // const { exp } = jwtDecode(accessToken); // ~3 days by minimals server
    // tokenExpired(exp);
  } else {
    const key = STORAGE_KEYS.USER_INFO;
    removeStorage(key);
    delete axios.defaults.headers.common.Authorization;
  }
};
