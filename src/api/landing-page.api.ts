
import { createApi } from '@reduxjs/toolkit/query/react';

import { endpoints } from 'src/utils/axios';

import {
    LandingPageModel,
    LandingStatCounterModel,
    LandingPageModelResponseList,
    LandingPageAnnouncementModel,
    LandingStatCounterModelResponse,
    LandingPageAnnouncementModelResponseList
} from 'src/types/landing-page.model';

import { axiosBaseQuery } from './base/axiosBaseQuery';

const ENV_URL = `${import.meta.env.VITE_HOST_API}${endpoints.landingPage.root}`;

export const landingPageApi = createApi({
    reducerPath: 'landingPageApi',
    baseQuery: axiosBaseQuery({ baseUrl: ENV_URL }),
    endpoints: (builder) => ({
        listProduct: builder.mutation<LandingPageModel[], LandingPageModel>({
            query: (body) => ({
                url: `${endpoints.landingPage.listProduct}`,
                method: 'POST',
                body
            }),
            transformResponse: ({ data }: LandingPageModelResponseList) => data,
        }),
        listBanner: builder.mutation<LandingPageModel[], LandingPageModel>({
            query: (body) => ({
                url: `${endpoints.landingPage.listBanner}`,
                method: 'POST',
                body
            }),
            transformResponse: ({ data }: LandingPageModelResponseList) => data,
        }),
        listAboutUs: builder.mutation<LandingPageModel[], LandingPageModel>({
            query: (body) => ({
                url: `${endpoints.landingPage.listAboutUs}`,
                method: 'POST',
                body
            }),
            transformResponse: ({ data }: LandingPageModelResponseList) => data,
        }),
        listAnnouncement: builder.mutation<LandingPageAnnouncementModel[], LandingPageAnnouncementModel>({
            query: (body) => ({
                url: `${endpoints.landingPage.listAnnouncement}`,
                method: 'POST',
                body
            }),
            transformResponse: ({ data }: LandingPageAnnouncementModelResponseList) => data,
        }),
        getStatCounterById: builder.mutation<LandingStatCounterModel, LandingStatCounterModel>({
            query: (body) => ({
                url: `${endpoints.landingPage.getStatCounterById}`,
                method: 'POST',
                body
            }),
            transformResponse: ({ data }: LandingStatCounterModelResponse) => data,
        })
    })
});

export const {
    useListAboutUsMutation,
    useListBannerMutation,
    useListProductMutation,
    useListAnnouncementMutation,
    useGetStatCounterByIdMutation
} = landingPageApi;