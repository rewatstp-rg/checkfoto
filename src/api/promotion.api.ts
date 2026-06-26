import { createApi } from '@reduxjs/toolkit/query/react';

import { endpoints } from 'src/utils/axios';

import { setListRunnerAfterCheckPromotion } from 'src/slices/register.slices';
import { setPromotionDetail, setListTicketSelectedOption } from 'src/slices/promotion.slices';

import {
    IPromotionType,
    IPromotionRequestType,
    IPromotionResponseType
} from 'src/types/promotion.type';

import { axiosBaseQuery } from './base/axiosBaseQuery';


const ENV_URL = `${import.meta.env.VITE_HOST_API}${endpoints.promotion.root}`;

export const promotionApi = createApi({
    reducerPath: 'promotionApi',
    baseQuery: axiosBaseQuery({ baseUrl: ENV_URL }),
    endpoints: (builder) => ({
        getByPromotionCode: builder.mutation<IPromotionType, IPromotionRequestType>({
            query: (body) => ({
                url: `${endpoints.promotion.getByPromotionCode}`,
                method: 'POST',
                body
            }),
            transformResponse: ({ data }: IPromotionResponseType) => data,
            onQueryStarted: async (body, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = (await queryFulfilled);
                    dispatch(setPromotionDetail(data));
                    if (data?.listPromotionTicket && data.listPromotionTicket?.length > 0) {
                        dispatch(setListTicketSelectedOption(data.listPromotionTicket));
                    } else {
                        dispatch(setListTicketSelectedOption([]));
                    }

                } catch (err) {
                    console.error(err);
                }
            }
        }),
        checkPromotion: builder.mutation<any, any>({
            query: (body) => ({
                url: `${endpoints.promotion.checkPromotion}`,
                method: 'POST',
                body
            }),
            onQueryStarted: async (body, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = (await queryFulfilled).data;
                    dispatch(setListRunnerAfterCheckPromotion(data));
                } catch (err) {
                    console.error(err);
                }
            }
        }),
    }),
});

export const {
    useGetByPromotionCodeMutation,
    useCheckPromotionMutation
} = promotionApi;