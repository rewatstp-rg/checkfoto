import { enqueueSnackbar } from 'notistack';
import { createApi } from '@reduxjs/toolkit/query/react';

import { setStorage } from 'src/hooks/use-local-storage';

import { endpoints } from 'src/utils/axios';
import { STORAGE_KEYS } from 'src/utils/constants';

import { setSession } from 'src/auth/context/jwt/utils';
import { setUserAuthen } from 'src/slices/authen.slices';

import { AuthResponse, AuthenUserModel } from 'src/types/authen.model';

import { axiosBaseQuery } from './base/axiosBaseQuery';

const ENV_URL = `${import.meta.env.VITE_HOST_API}${endpoints.auth.root}`;

export const authenApi = createApi({
    reducerPath: 'authenApi',
    baseQuery: axiosBaseQuery({ baseUrl: ENV_URL }),
    endpoints: (builder) => ({
        authenticate: builder.mutation<AuthenUserModel, AuthenUserModel>({
            query: (body) => ({
                url: `${endpoints.auth.authenticate}`,
                method: 'POST',
                body
            }),
            transformResponse: ({ data }: AuthResponse) => data,
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                dispatch(setUserAuthen(undefined));
                try {
                    const { data } = await queryFulfilled;
                    const key = STORAGE_KEYS.USER_INFO;
                    dispatch(setUserAuthen(data));
                    setSession(data?.accessToken);
                    setStorage(key, data);
                    enqueueSnackbar("ยินดีต้อนรับเข้าสู่ระบบ", {
                        variant: 'success',
                    });
                } catch (err) {
                    console.log("🚀 ~ file: auth.api.ts:42 ~ onQueryStarted ~ err:", err)
                }
            },
        }),
    })
});

export const {
    useAuthenticateMutation
} = authenApi;