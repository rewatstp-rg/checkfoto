/* eslint import/newline-after-import: "off" */
import { createApi } from '@reduxjs/toolkit/query/react';

import { endpoints } from 'src/utils/axios';

import { DiscountCodeModel, DiscountCodeModelResponse } from 'src/types/discount.model';

import { axiosBaseQuery } from './base/axiosBaseQuery';

const ENV_URL = `${import.meta.env.VITE_HOST_API}${endpoints.discount.root}`;

export const discountApi = createApi({
    reducerPath: 'discountApi',
    baseQuery: axiosBaseQuery({ baseUrl: ENV_URL }),
    endpoints: (builder) => ({
        checkDiscountCode: builder.mutation<DiscountCodeModelResponse, DiscountCodeModel>({
            query: (body) => ({
                url: `${endpoints.discount.checkDiscountCode}`,
                method: 'POST',
                body
            }),
        }),
    })
});

export const {
    useCheckDiscountCodeMutation
} = discountApi;