/* eslint import/newline-after-import: "off" */
import { createApi } from '@reduxjs/toolkit/query/react';

import { endpoints } from 'src/utils/axios';

import { OrderModel, OrderModelResponse } from 'src/types/order.model';
import { MedalModel, VrLogModel, MedalModelResponse, VrLogModelResponse, VrLogModelListResponse } from 'src/types/vr-log-type';

import { axiosBaseQuery } from './base/axiosBaseQuery';


const ENV_URL = `${import.meta.env.VITE_HOST_API}${endpoints.vr.root}`;


export const vrApi = createApi({
    reducerPath: 'vrApi',
    baseQuery: axiosBaseQuery({ baseUrl: ENV_URL }),
    endpoints: (builder) => ({
        uploadVrLog: builder.mutation<VrLogModelResponse, FormData>({
            query: (body) => ({
                url: `${endpoints.vr.uploadVrLog}`,
                method: 'POST',
                body
            }),
        }),
        viewVrHistoryLog: builder.mutation<VrLogModel[], VrLogModel>({
            query: (body) => ({
                url: `${endpoints.vr.viewVrHistoryLog}`,
                method: 'POST',
                body
            }),
            transformResponse: ({ data }: VrLogModelListResponse) => data,
        }),
        getOrderVr: builder.mutation<OrderModelResponse, OrderModel>({
            query: (body) => ({
                url: `${endpoints.vr.getOrderVr}`,
                method: 'POST',
                body
            }),
        }),
        searchRanking: builder.mutation<any, any>({
            query: (body) => ({
                url: `${endpoints.vr.searchRanking}`,
                method: 'POST',
                body
            }),
        }),
        listMedal: builder.mutation<MedalModel, void>({
            query: (body) => ({
                url: `${endpoints.vr.listMedal}`,
                method: 'POST',
                body
            }),
            transformResponse: ({ data }: MedalModelResponse) => data,
        }),
    })
});

export const {
    useUploadVrLogMutation,
    useViewVrHistoryLogMutation,
    useGetOrderVrMutation,
    useSearchRankingMutation,
    useListMedalMutation
} = vrApi;