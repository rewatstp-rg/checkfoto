import { createApi } from '@reduxjs/toolkit/query/react';

import { endpoints } from 'src/utils/axios';

import { PhotoType } from 'src/types/photo.type';
import { OrderPhotoModel, OrderPhotoModelResponse } from 'src/types/order-photo.type';
import { InputFieldModel, InputFieldModelResponse } from 'src/types/input-column.model';
import {
    OrderModel,
    ValidateStockModel,
    OrderModelResponse,
    OrderModelListResponse,
    ValidateStockModelResponse
} from 'src/types/order.model';

import { axiosBaseQuery } from './base/axiosBaseQuery';

const ENV_URL = `${import.meta.env.VITE_HOST_API}${endpoints.order.root}`;

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: axiosBaseQuery({ baseUrl: ENV_URL }),
    endpoints: (builder) => ({
        saveOrder: builder.mutation<OrderPhotoModelResponse, FormData>({
            query: (body) => ({
                url: `${endpoints.order.saveOrder}`,
                method: 'POST',
                body
            }),
        }),
        getOrderDetail: builder.mutation<OrderPhotoModelResponse, OrderPhotoModel>({
            query: (body) => ({
                url: `${endpoints.order.getOrderDetail}`,
                method: 'POST',
                body
            }),
        }),
        uploadPaymentSlip: builder.mutation<OrderModelResponse, FormData>({
            query: (body) => ({
                url: `${endpoints.order.uploadPaymentSlip}`,
                method: 'POST',
                body
            }),
        }),
        listUserOrder: builder.mutation<OrderModel[], OrderModel>({
            query: (body) => ({
                url: `${endpoints.order.listUserOrder}`,
                method: 'POST',
                body
            }),
            transformResponse: ({ data }: OrderModelListResponse) => data,
        }),
        deleteOrderByUser: builder.mutation<OrderModelListResponse, OrderModel>({
            query: (body) => ({
                url: `${endpoints.order.deleteOrderByUser}`,
                method: 'POST',
                body
            }),
        }),
        changePaymentGateway: builder.mutation<OrderPhotoModelResponse, OrderPhotoModel>({
            query: (body) => ({
                url: `${endpoints.order.changePaymentGateway}`,
                method: 'POST',
                body
            }),
        }),
        searchRacepack: builder.mutation<any, any>({
            query: (body) => ({
                url: `${endpoints.order.searchRacepack}`,
                method: 'POST',
                body
            }),
        }),
        inquiryThaiQr: builder.mutation<OrderModelResponse, OrderModel>({
            query: (body) => ({
                url: `${endpoints.order.inquiryThaiQr}`,
                method: 'POST',
                body
            }),
        }),
        checkShirtBalance: builder.mutation<InputFieldModel, InputFieldModel>({
            query: (body) => ({
                url: `${endpoints.order.checkShirtBalance}`,
                method: 'POST',
                body
            }),
            transformResponse: ({ data }: InputFieldModelResponse) => data,
        }),
        validateShirtRunner: builder.mutation<ValidateStockModel, any[]>({
            query: (body) => ({
                url: `${endpoints.order.validateShirtRunner}`,
                method: 'POST',
                body
            }),
            transformResponse: ({ data }: ValidateStockModelResponse) => data,
        }),
        validateMerchandsie: builder.mutation<ValidateStockModel, any>({
            query: (body) => ({
                url: `${endpoints.order.validateMerchandsie}`,
                method: 'POST',
                body
            }),
            transformResponse: ({ data }: ValidateStockModelResponse) => data,
        }),
        validateHotel: builder.mutation<ValidateStockModel, any>({
            query: (body) => ({
                url: `${endpoints.order.validateHotel}`,
                method: 'POST',
                body
            }),
            transformResponse: ({ data }: ValidateStockModelResponse) => data,
        }),
        searchVrRacepack: builder.mutation<any, any>({
            query: (body) => ({
                url: `${endpoints.order.searchVrRacepack}`,
                method: 'POST',
                body
            }),
        }),
        saveOrderPhotoForFree: builder.mutation<void, PhotoType>({
            query: (body) => ({
                url: `${endpoints.order.saveOrderPhotoForFree}`,
                method: 'POST',
                body
            }),
        })
    })
});

export const {
    useSaveOrderMutation,
    useGetOrderDetailMutation,
    useUploadPaymentSlipMutation,
    useListUserOrderMutation,
    useDeleteOrderByUserMutation,
    useChangePaymentGatewayMutation,
    useSearchRacepackMutation,
    useInquiryThaiQrMutation,
    useCheckShirtBalanceMutation,
    useValidateShirtRunnerMutation,
    useValidateMerchandsieMutation,
    useValidateHotelMutation,
    useSearchVrRacepackMutation,
    useSaveOrderPhotoForFreeMutation
} = orderApi;