/* eslint import/newline-after-import: "off" */
import { createApi } from '@reduxjs/toolkit/query/react';

import { endpoints } from 'src/utils/axios';

import { EventPhotoFrameModel, EventPhotoFrameModelResponse, EventPhotoFrameModelLitsResponse } from 'src/types/event-photo-frame.type';

import { axiosBaseQuery } from './base/axiosBaseQuery';

const ENV_URL = `${import.meta.env.VITE_HOST_API}${endpoints.eventPhotoFrame.root}`;

export const eventPhotoFrameApi = createApi({
    reducerPath: 'eventPhotoFrameApi',
    baseQuery: axiosBaseQuery({ baseUrl: ENV_URL }),
    endpoints: (builder) => ({
        listEventPhotoFrameByEventCode: builder.mutation<EventPhotoFrameModelLitsResponse, EventPhotoFrameModel>({
            query: (body) => ({
                url: `${endpoints.eventPhotoFrame.listEventPhotoFrameByEventCode}`,
                method: 'POST',
                body
            }),
        }),
        getEventPhotoFrameByCode: builder.mutation<EventPhotoFrameModelResponse, EventPhotoFrameModel>({
            query: (body) => ({
                url: `${endpoints.eventPhotoFrame.getEventPhotoFrameByCode}`,
                method: 'POST',
                body
            }),
        }),
    })
});

export const {
    useListEventPhotoFrameByEventCodeMutation,
    useGetEventPhotoFrameByCodeMutation
} = eventPhotoFrameApi;