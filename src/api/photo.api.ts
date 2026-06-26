/* eslint import/newline-after-import: "off" */
import { createApi } from '@reduxjs/toolkit/query/react';

import { endpoints } from 'src/utils/axios';

import { OrderPhotoModel } from 'src/types/order-photo.type';

import { axiosBaseQuery } from './base/axiosBaseQuery';


const ENV_URL = `${import.meta.env.VITE_HOST_API}${endpoints.photo.root}`;

export const photoApi = createApi({
    reducerPath: 'photoApi',
    baseQuery: axiosBaseQuery({ baseUrl: ENV_URL }),
    endpoints: (builder) => ({
        searchImageByFace: builder.mutation<any, FormData>({
            query: (body) => ({
                url: `${endpoints.photo.searchImageByFace}`,
                method: 'POST',
                body
            }),
        }),
        listPhotoByOrder: builder.mutation<any, OrderPhotoModel>({
            query: (body) => ({
                url: `${endpoints.photo.listPhotoByOrder}`,
                method: 'POST',
                body
            }),
        }),
    })
});

export const {
    useSearchImageByFaceMutation,
    useListPhotoByOrderMutation
} = photoApi;