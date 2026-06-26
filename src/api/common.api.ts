/* eslint import/newline-after-import: "off" */
import { createApi } from '@reduxjs/toolkit/query/react';

import { endpoints } from 'src/utils/axios';

import { setListEventCheckRegister } from 'src/slices/common.slices';

import { EventModel } from 'src/types/event-config.model';
import { FileResponse, FileResponseData } from 'src/types/file';
import { Config, ConfigResponse } from 'src/types/master-config';

import { axiosBaseQuery } from './base/axiosBaseQuery';

const ENV_URL = `${import.meta.env.VITE_HOST_API}${endpoints.common.root}`;

export const commonApi = createApi({
    reducerPath: 'commonApi',
    baseQuery: axiosBaseQuery({ baseUrl: ENV_URL }),
    endpoints: (builder) => ({
        getListEventCheckRegister: builder.mutation<Config[], EventModel>({
            query: (body) => ({
                url: `${endpoints.common.listEventCheckRegister}`,
                method: 'POST',
                body
            }),
            transformResponse: ({ data }: ConfigResponse) => data,
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setListEventCheckRegister(data));
                } catch (err) {
                    console.error("🚀 ~ onQueryStarted ~ err:", err)
                }
            },
        }),
        uploadImageFrame: builder.mutation<FileResponse, FormData>({
            query: (body) => ({
                url: `${endpoints.common.uploadImageFrame}`,
                method: 'POST',
                body
            }),
            transformResponse: ({ data }: FileResponseData) => data
        }),
        countPhoto: builder.mutation<string, void>({
            query: (body) => ({
                url: `${endpoints.common.countPhoto}`,
                method: 'POST',
                body
            }),
        }),
    })
});

export const {
    useGetListEventCheckRegisterMutation,
    useUploadImageFrameMutation,
    useCountPhotoMutation
} = commonApi;