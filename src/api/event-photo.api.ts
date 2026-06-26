/* eslint import/newline-after-import: "off" */
import { createApi } from '@reduxjs/toolkit/query/react';

import { endpoints } from 'src/utils/axios';

import {
    setEventDetail,
} from 'src/slices/event.slices';

import { EventPhotoType, EventPhotoResponseType } from 'src/types/event-photo.type';

import { axiosBaseQuery } from './base/axiosBaseQuery';

const ENV_URL = `${import.meta.env.VITE_HOST_API}${endpoints.eventPhoto.root}`;

export const eventPhotoAPi = createApi({
    reducerPath: 'eventPhotoApi',
    baseQuery: axiosBaseQuery({ baseUrl: ENV_URL }),
    endpoints: (builder) => ({
        getEventPhotoByEventUrlWeb: builder.mutation<EventPhotoType, EventPhotoType>({
            query: (body) => ({
                url: `${endpoints.eventPhoto.getEventPhotoByEventUrlWeb}`,
                method: 'POST',
                body
            }),
            transformResponse: ({ data }: EventPhotoResponseType) => data,
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                dispatch(setEventDetail(undefined));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setEventDetail(data));
                } catch (err) {
                    console.log("🚀 ~ file: event.api.ts:52 ~ onQueryStarted ~ err:", err)
                }
            }
        }),
    })
});

export const {
    useGetEventPhotoByEventUrlWebMutation
} = eventPhotoAPi;