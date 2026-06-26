
import { createApi } from '@reduxjs/toolkit/query/react';

import { endpoints } from 'src/utils/axios';

import { setAdministratorDetail, setSearchAdministratorResult } from 'src/slices/administrator.slices';

import { BasePaginateResponse } from 'src/types/base-paginate';
import { AdminUserModel, AdminUserSearchRequest, AdminUserSearchResponse } from 'src/types/administrator.model';

import { axiosBaseQuery } from './base/axiosBaseQuery';

const ENV_URL = `${import.meta.env.VITE_HOST_API}${endpoints.administrator.root}`;

export const administratorApi = createApi({
    reducerPath: 'administratorApi',
    baseQuery: axiosBaseQuery({ baseUrl: ENV_URL }),
    endpoints: (builder) => ({
        searchAdministrator: builder.mutation<BasePaginateResponse<AdminUserModel>, AdminUserSearchRequest>({
            query: (body) => ({
                url: `${endpoints.administrator.searchAdminUser}`,
                method: 'POST',
                body
            }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                dispatch(setSearchAdministratorResult(undefined));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setSearchAdministratorResult(data));
                } catch (err) {
                    console.log("🚀 ~ onQueryStarted line 31 ~ err:", err)
                }
            },
        }),
        getAdminByCode: builder.mutation<AdminUserModel, AdminUserModel>({
            query: (body) => ({
                url: `${endpoints.administrator.getAdminByCode}`,
                method: 'POST',
                body
            }),
            transformResponse: ({ data }: AdminUserSearchResponse) => data,
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                dispatch(setAdministratorDetail(undefined));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setAdministratorDetail(data));
                } catch (err) {
                    console.log("🚀 ~ onQueryStarted line 48 ~ err:", err)
                }
            },
        }),
        createAdminUser: builder.mutation<AdminUserSearchResponse, FormData>({
            query: (body) => ({
                url: `${endpoints.administrator.createAdminUser}`,
                method: 'POST',
                body
            }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                dispatch(setAdministratorDetail(undefined));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setAdministratorDetail(data.data));
                } catch (err) {
                    console.log("🚀 ~ onQueryStarted line 64 ~ err:", err)
                }
            },
        }),
        updateAdminUser: builder.mutation<AdminUserSearchResponse, FormData>({
            query: (body) => ({
                url: `${endpoints.administrator.updateAdminUser}`,
                method: 'POST',
                body
            }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                dispatch(setAdministratorDetail(undefined));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setAdministratorDetail(data.data));
                } catch (err) {
                    console.log("🚀 ~ onQueryStarted line 80 ~ err:", err)
                }
            },
        }),
        deleteAdminUser: builder.mutation<AdminUserSearchResponse, AdminUserModel>({
            query: (body) => ({
                url: `${endpoints.administrator.deleteAdminUser}`,
                method: 'POST',
                body
            }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setAdministratorDetail(undefined));
                } catch (err) {
                    console.log("🚀 ~ file: Administrator.api.ts:94 ~ onQueryStarted ~ err:", err)
                }
            },
        }),

    })
});

export const {
    useSearchAdministratorMutation,
    useCreateAdminUserMutation,
    useDeleteAdminUserMutation,
    useGetAdminByCodeMutation,
    useUpdateAdminUserMutation
} = administratorApi;
