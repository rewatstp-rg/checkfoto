/* eslint import/newline-after-import: "off" */
import { createApi } from '@reduxjs/toolkit/query/react';

import { endpoints } from 'src/utils/axios';

import { setRegisterFormDetail } from 'src/slices/register.slices';
import {
    setEventDetail,
    setListEventByType
} from 'src/slices/event.slices';

import {
    EventModel,
    EventModelResponse,
    EventModelListResponse
} from 'src/types/event-config.model';

import { axiosBaseQuery } from './base/axiosBaseQuery';

const ENV_URL = `${import.meta.env.VITE_HOST_API}${endpoints.event.root}`;

export const eventApi = createApi({
    reducerPath: 'eventApi',
    baseQuery: axiosBaseQuery({ baseUrl: ENV_URL }),
    endpoints: (builder) => ({
        listEventByEventType: builder.mutation<EventModel[], EventModel>({
            query: (body) => ({
                url: `${endpoints.event.listEventByEventType}`,
                method: 'POST',
                body
            }),
            transformResponse: ({ data }: EventModelListResponse) => data,
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                dispatch(setListEventByType(undefined));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setListEventByType(data));
                } catch (err) {
                    console.log("🚀 ~ file: event-config.api.ts:37 ~ onQueryStarted ~ err:", err)
                }
            },
        }),
        getByUrl: builder.mutation<EventModel, EventModel>({
            query: (body) => ({
                url: `${endpoints.event.getEventByEventUrlWeb}`,
                method: 'POST',
                body
            }),
            transformResponse: ({ data }: EventModelResponse) => data,
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
        getEventRegisterFormByUrl: builder.mutation<EventModel, EventModel>({
            query: (body) => ({
                url: `${endpoints.event.getEventRegisterFormByUrl}`,
                method: 'POST',
                body
            }),
            transformResponse: ({ data }: EventModelResponse) => data,
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                dispatch(setRegisterFormDetail(undefined));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setRegisterFormDetail(data));
                } catch (err) {
                    console.log("🚀 ~ file: event.api.ts:73 ~ onQueryStarted ~ err:", err)
                }
            }
        }),
        getMerchandiseRegisterFormByUrl: builder.mutation<EventModel, EventModel>({
            query: (body) => ({
                url: `${endpoints.event.getMerchandiseRegisterFormByUrl}`,
                method: 'POST',
                body
            }),
            transformResponse: ({ data }: EventModelResponse) => data,
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                dispatch(setRegisterFormDetail(undefined));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setRegisterFormDetail(data));
                } catch (err) {
                    console.log("🚀 ~ file: event.api.ts:73 ~ onQueryStarted ~ err:", err)
                }
            }
        }),
    })
});

export const {
    useListEventByEventTypeMutation,
    useGetByUrlMutation,
    useGetEventRegisterFormByUrlMutation,
    useGetMerchandiseRegisterFormByUrlMutation
} = eventApi;