// import axios, { AxiosError, AxiosResponse } from 'axios';
// import type { BaseQueryFn } from '@reduxjs/toolkit/query';

// import { getStorage, removeStorage } from 'src/hooks/use-local-storage';

// import { STORAGE_KEYS } from 'src/utils/constants';

// import {
//   AxiosBase,
//   BaseRequest,
//   BaseDataResponse,
//   BaseErrorResponse,
// } from './types';
// import {
//   createErrorMessageWithAxiosError,
//   createErrorMessageWithAxiosResponse,
// } from './createErrorMessage';

// export const axiosBaseQuery =
//   ({
//     baseUrl = '',
//   }: AxiosBase): BaseQueryFn<BaseRequest, unknown, BaseErrorResponse> =>
//     async ({ url, method, body, params, overrideBaseUrl }) => {
//       try {
//         let clientModule = {};
//         const key = STORAGE_KEYS.USER_INFO;
//         const accessTokenOption = getStorage(key);
//         clientModule = { 'Client-Module': `customer`, 'Checkfoto': 'ACTIVE' };
//         const _url = overrideBaseUrl ? url : baseUrl + url
//         const headers = { 'Accept-Language': 'th', ...(accessTokenOption ? { Authorization: `Bearer ${accessTokenOption}` } : {}), ...clientModule }

//         const response = await axios({
//           url: _url,
//           method,
//           data: body,
//           params,
//           headers,
//         })

//         if (isServiceError(response)) {
//           console.error(`API RESPONSE ERROR WITH DATA :`, response.data)
//           return createErrorMessageWithAxiosResponse(response)
//         }

//         return { data: response.data }
//       } catch (axiosError) {
//         const err = axiosError as AxiosError<BaseDataResponse, any>
//         const key = STORAGE_KEYS.USER_INFO;
//         if (err?.response?.status === 401) {
//           removeStorage(key);

//           const currentUrl = new URL(window.location.href);
//           const hasReturnTo = currentUrl.searchParams.has('returnTo');

//           if (!hasReturnTo) {
//             const searchParams = new URLSearchParams({
//               returnTo: window.location.pathname,
//             });

//             // แนบ query เดิมที่อาจมีอยู่แล้ว
//             const currentQuery = currentUrl.search;
//             const extraQuery = currentQuery ? currentQuery.replace(/^\?/, '&') : '';

//             window.location.href = `/?${searchParams.toString()}${extraQuery}`;
//           } else {
//             // ถ้ามี returnTo อยู่แล้ว → ไม่ต้อง redirect ซ้ำ
//             window.location.href = '/';
//           }
//         }
//         console.error(
//           `API RESPONSE ERROR WITH HTTP STUTUS : ${err.response?.status}, DATA :`,
//           err.response?.data
//         )

//         return createErrorMessageWithAxiosError(err)
//       }
//     }

// const isServiceError = (res: AxiosResponse) => {
//   if (res.status !== 200 && res.status !== 499) return true
//   if (res.data.status && res.data.status.code === '102') return true
//   return false
// }


import axios, { AxiosError, AxiosResponse } from 'axios';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';

import { getStorage, removeStorage } from 'src/hooks/use-local-storage';

import { endpoints } from 'src/utils/axios';
import { STORAGE_KEYS } from 'src/utils/constants';

import { jwtDecode, setSession } from 'src/auth/context/jwt/utils';

import {
  AxiosBase,
  BaseRequest,
  BaseDataResponse,
  BaseErrorResponse,
} from './types';
import {
  createErrorMessageWithAxiosError,
  createErrorMessageWithAxiosResponse,
} from './createErrorMessage';

const ENV_URL = `${import.meta.env.VITE_HOST_API}`;

export const axiosBaseQuery =
  ({ baseUrl = '' }: AxiosBase): BaseQueryFn<BaseRequest, unknown, BaseErrorResponse> =>
    async ({ url, method, body, params, overrideBaseUrl }) => {
      const key = STORAGE_KEYS.USER_INFO;

      const sendRequest = async (accessToken?: string) => {
        const clientModule = {
          'Client-Module': `customer`,
          'Checkfoto': 'ACTIVE',
        };

        const _url = overrideBaseUrl ? url : baseUrl + url;
        const headers = {
          'Accept-Language': 'th',
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          ...clientModule,
        };

        return axios({
          url: _url,
          method,
          data: body,
          params,
          headers,
        });
      };

      try {
        const accessToken = getStorage(key) as string;
        const response = await sendRequest(accessToken);

        if (isServiceError(response)) {
          console.error(`API RESPONSE ERROR WITH DATA :`, response.data);
          return createErrorMessageWithAxiosResponse(response);
        }

        return { data: response.data };
      } catch (axiosError) {
        const err = axiosError as AxiosError<BaseDataResponse, any>;

        // 👉 ถ้า accessToken หมดอายุ ให้ลอง refresh ก่อน
        if (err?.response?.status === 401) {
          try {
            const newToken = await refreshAccessToken(); // ✅ step สำคัญ
            // console.log("🚀 ~ axiosBaseQuery ~ newToken:", newToken)
            if (newToken) {
              // setStorage(key, newToken); // บันทึก token ใหม่
              setSession(newToken);
              const retryRes = await sendRequest(newToken); // ยิงใหม่ด้วย token ใหม่
              return { data: retryRes.data };
            }

            // กรณี refresh ไม่ได้ → เคลียร์ storage และ redirect
            removeStorage(key);
            const currentUrl = new URL(window.location.href);
            const hasReturnTo = currentUrl.searchParams.has('returnTo');

            if (!hasReturnTo) {
              const searchParams = new URLSearchParams({
                returnTo: window.location.pathname,
              });

              const currentQuery = currentUrl.search;
              const extraQuery = currentQuery ? currentQuery.replace(/^\?/, '&') : '';
              window.location.href = `/?${searchParams.toString()}${extraQuery}`;
            } else {
              window.location.href = '/';
            }

            return Promise.reject(err);
          } catch (refreshErr) {
            // refresh ไม่ได้ → เคลียร์ storage และ redirect
            removeStorage(key);
            const currentUrl = new URL(window.location.href);
            const hasReturnTo = currentUrl.searchParams.has('returnTo');

            if (!hasReturnTo) {
              const searchParams = new URLSearchParams({
                returnTo: window.location.pathname,
              });

              const currentQuery = currentUrl.search;
              const extraQuery = currentQuery ? currentQuery.replace(/^\?/, '&') : '';
              window.location.href = `/?${searchParams.toString()}${extraQuery}`;
            } else {
              window.location.href = '/';
            }
          }
        }

        console.error(
          `API RESPONSE ERROR WITH HTTP STATUS : ${err.response?.status}, DATA :`,
          err.response?.data
        );

        return createErrorMessageWithAxiosError(err);
      }
    };

const isServiceError = (res: AxiosResponse) => {
  if (res.status !== 200 && res.status !== 499) return true;
  if (res.data.status && res.data.status.code === '102') return true;
  return false;
};

// ✅ Function ที่ต้องเพิ่มไว้เพื่อ refresh token
const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const url = ENV_URL + endpoints.auth.root + endpoints.auth.refreshToken;

    const token = getStorage(STORAGE_KEYS.USER_INFO);
    const decoded = token ? jwtDecode(token) : null;
    // console.log("🚀 ~ refreshAccessToken ~ decoded:", decoded)
    const refreshToken = decoded?.userDetail?.refreshToken;

    if (!refreshToken) return null;

    const model = {
      "refreshToken": decoded.userDetail.refreshToken,
    }

    delete axios.defaults.headers.common.Authorization;
    const response = await axios.post(url, model);

    const { data, status } = response.data;

    if (status.description === "SUCCESS" && data?.accessToken) {
      return data.accessToken;
    }

    return null;
  } catch (err) {
    console.error('Failed to refresh token', err);
    return null;
  }
};
