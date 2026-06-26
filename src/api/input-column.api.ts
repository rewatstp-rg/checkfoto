/* eslint import/newline-after-import: "off" */
import { createApi } from '@reduxjs/toolkit/query/react';

import { endpoints } from 'src/utils/axios';

import { setInputColumnOption } from 'src/slices/input-column.slices';

import { InputFieldModel } from 'src/types/input-column.model';
import { InputFieldOptionModel, InputColumnOptionModelResponseList } from 'src/types/input-column-option.model';

import { axiosBaseQuery } from './base/axiosBaseQuery';

const ENV_URL = `${import.meta.env.VITE_HOST_API}${endpoints.inputColumn.root}`;

export const inputColumnApi = createApi({
    reducerPath: 'inputColumnApi',
    baseQuery: axiosBaseQuery({ baseUrl: ENV_URL }),
    endpoints: (builder) => ({
        createInputColumn: builder.mutation<any, InputFieldModel>({
            query: (body) => ({
                url: `${endpoints.inputColumn.createInputColumn}`,
                method: 'POST',
                body
            }),
        }),
        updateInputColumn: builder.mutation<any, InputFieldModel>({
            query: (body) => ({
                url: `${endpoints.inputColumn.updateInputColumn}`,
                method: 'POST',
                body
            }),
        }),
        listInputColumnOption: builder.mutation<InputFieldOptionModel[], number>({
            query: (id) => ({
                url: `${endpoints.inputColumn.listInputColumnOption}?inputColumnId=${id}`,
                method: 'POST',
            }),
            transformResponse: ({ data }: InputColumnOptionModelResponseList) => data,
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                dispatch(setInputColumnOption([]));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setInputColumnOption(data));
                } catch (err) {
                    console.log("🚀 ~ file: input-column.api.ts:37 ~ onQueryStarted ~ err:", err)
                }
            },
        }),
        createListInputColumn: builder.mutation<any, InputFieldModel[]>({
            query: (body) => ({
                url: `${endpoints.inputColumn.createListInputColumn}`,
                method: 'POST',
                body
            }),
        }),
        updateListInputColumn: builder.mutation<any, InputFieldModel[]>({
            query: (body) => ({
                url: `${endpoints.inputColumn.updateListInputColumn}`,
                method: 'POST',
                body
            }),
        }),
    })
});

export const {
    useCreateInputColumnMutation,
    useListInputColumnOptionMutation,
    useUpdateInputColumnMutation,
    useCreateListInputColumnMutation,
    useUpdateListInputColumnMutation
} = inputColumnApi;
