/* eslint import/newline-after-import: "off" */
import { createApi } from '@reduxjs/toolkit/query/react';

import { endpoints } from 'src/utils/axios';
import { MASTER_CONFIG_GROUP } from 'src/utils/constants';

import {
    setListTagOption,
    setDistrictDetail,
    setProvinceDetail,
    setListEventOption,
    setListGenderOption,
    setConfigGroupDetail,
    setSubDistrictDetail,
    setListDefaultStatus,
    setListEventProvince,
    setListProvinceOption,
    setListInputColOption,
    setSearchDetailResult,
    setListDistrictOption,
    setListAllListboxGroup,
    setListInputTypeOption,
    setListEventTypeOption,
    setListPriceTypeOption,
    setProvinceStatusOption,
    setSearchProvinceResult,
    searchSubDistrictResult,
    setListEventStatusOption,
    setInputControlTypeOption,
    setListRegisterTypeOption,
    setListCustomerTypeOption,
    setListDistanceUnitOption,
    setListTicketStatusOption,
    setSearchConfigGroupResult,
    setListRegisterStatusOption,
    setlistPaymentGateWayOption,
    setListAgeGroupStatusOption,
    setlistPaymentGateWayUnitOption,
    setListEventSectionStatusOption,
    setListPaymentGateWayStatusOption
} from 'src/slices/master-data.slices';

import { EventModel } from 'src/types/event-config.model';
import { BasePaginateResponse } from 'src/types/base-paginate';
import type {
    Config,
    ConfigGroup,
    ConfigResponse,
    ProvinceResponse,
    MasterDistrictModel,
    ConfigGroupResponse,
    ProvinceResponseList,
    MasterSubDistrictModel,
    MasterDistrictResponse,
    ConfigGroupSearchRequest,
    MasterSubDistrictResponse,
    MasterDistrictResponseList,
    MasterDistrictSearchRequest,
    MasterProvinceSearchRequest,
    MasterProvinceSearchResponse,
    MasterSubDistrictResponseList
} from 'src/types/master-config';

import { axiosBaseQuery } from './base/axiosBaseQuery';

const ENV_URL = `${import.meta.env.VITE_HOST_API}${endpoints.masterData.root}`;

export const masterDataApi = createApi({
    reducerPath: 'masterDataApi',
    baseQuery: axiosBaseQuery({ baseUrl: ENV_URL }),
    endpoints: (builder) => ({
        getConfigByGroup: builder.mutation<Config[], Config>({
            query: (body) => ({
                url: `${endpoints.masterData.listboxByGroup}`,
                method: 'POST',
                body
            }),
            transformResponse: ({ data }: ConfigResponse) => data,
            async onQueryStarted(body, { dispatch, queryFulfilled }) {

                const {
                    CUSTOMER_TYPE,
                    EVENT_STATUS,
                    PROVINCE_STATUS,
                    INPUT_CONTROL_TYPE,
                    INPUT_COL,
                    INPUT_TYPE,
                    DEFAULT_STATUS,
                    EVENT_RACE_TYPE,
                    REGISTER_STATUS,
                    PAYMENT_GATEWAY,
                    PAYMENT_GATEWAY_UNIT,
                    PAYMENT_GATEWAY_STATUS,
                    TAG,
                    EVENT_REGISTER_TYPE,
                    DISTANCE_UNIT,
                    TICKET_STATUS_OPTION,
                    PRICE_TYPE,
                    TICKET_AGE_GROUP_STATUS,
                    GENDER,
                    EVENT_SECTION_STATUS
                } = MASTER_CONFIG_GROUP;

                try {
                    const { data } = await queryFulfilled;

                    if (body.listboxGroup === CUSTOMER_TYPE) {
                        dispatch(setListCustomerTypeOption(data));
                    } else if (body.listboxGroup === PROVINCE_STATUS) {
                        dispatch(setProvinceStatusOption(data));
                    } else if (body.listboxGroup === INPUT_CONTROL_TYPE) {
                        dispatch(setInputControlTypeOption(data));
                    } else if (body.listboxGroup === INPUT_COL) {
                        dispatch(setListInputColOption(data));
                    } else if (body.listboxGroup === INPUT_TYPE) {
                        dispatch(setListInputTypeOption(data));
                    } else if (body.listboxGroup === DEFAULT_STATUS) {
                        dispatch(setListDefaultStatus(data));
                    } else if (body.listboxGroup === EVENT_RACE_TYPE) {
                        dispatch(setListEventTypeOption(data));
                    } else if (body.listboxGroup === EVENT_STATUS) {
                        dispatch(setListEventStatusOption(data));
                    } else if (body.listboxGroup === REGISTER_STATUS) {
                        dispatch(setListRegisterStatusOption(data));
                    } else if (body.listboxGroup === PAYMENT_GATEWAY) {
                        dispatch(setlistPaymentGateWayOption(data));
                    } else if (body.listboxGroup === PAYMENT_GATEWAY_UNIT) {
                        dispatch(setlistPaymentGateWayUnitOption(data));
                    } else if (body.listboxGroup === PAYMENT_GATEWAY_STATUS) {
                        dispatch(setListPaymentGateWayStatusOption(data));
                    } else if (body.listboxGroup === TAG) {
                        dispatch(setListTagOption(data));
                    } else if (body.listboxGroup === EVENT_REGISTER_TYPE) {
                        dispatch(setListRegisterTypeOption(data));
                    } else if (body.listboxGroup === DISTANCE_UNIT) {
                        dispatch(setListDistanceUnitOption(data));
                    } else if (body.listboxGroup === TICKET_STATUS_OPTION) {
                        dispatch(setListTicketStatusOption(data));
                    } else if (body.listboxGroup === PRICE_TYPE) {
                        dispatch(setListPriceTypeOption(data));
                    } else if (body.listboxGroup === TICKET_AGE_GROUP_STATUS) {
                        dispatch(setListAgeGroupStatusOption(data));
                    } else if (body.listboxGroup === GENDER) {
                        dispatch(setListGenderOption(data));
                    } else if (body.listboxGroup === EVENT_SECTION_STATUS) {
                        dispatch(setListEventSectionStatusOption(data));

                    }

                } catch (err) {
                    console.log("🚀 ~ file: master-data.api.ts:120 ~ onQueryStarted ~ err:", err)
                }
            },
        }),
        searchProvince: builder.mutation<BasePaginateResponse<MasterProvinceSearchResponse>, MasterProvinceSearchRequest>({
            query: (body) => ({
                url: `${endpoints.masterData.searchProvince}`,
                method: 'POST',
                body
            }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                dispatch(setSearchProvinceResult(undefined));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setSearchProvinceResult(data));
                } catch (err) {
                    console.log("🚀 ~ file: master-data.api.ts:96 ~ onQueryStarted ~ err:", err)
                }
            },
        }),
        saveProvince: builder.mutation<ProvinceResponse, MasterProvinceSearchResponse>({
            query: (body) => ({
                url: `${endpoints.masterData.saveProvince}`,
                method: 'POST',
                body
            }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                dispatch(setProvinceDetail(undefined));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setProvinceDetail(data.data));
                } catch (err) {
                    console.log("🚀 ~ file: master-data.api.ts:119 ~ onQueryStarted ~ err:", err)
                }
            },
        }),
        getProvinceByCode: builder.mutation<ProvinceResponse, MasterProvinceSearchResponse>({
            query: (body) => ({
                url: `${endpoints.masterData.getProvinceByCode}`,
                method: 'POST',
                body
            }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                dispatch(setProvinceDetail(undefined));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setProvinceDetail(data.data));
                } catch (err) {
                    console.log("🚀 ~ file: master-data.api.ts:135 ~ onQueryStarted ~ err:", err)
                }
            },
        }),
        searchDistrict: builder.mutation<BasePaginateResponse<MasterDistrictModel>, MasterDistrictSearchRequest>({
            query: (body) => ({
                url: `${endpoints.masterData.searchDistrict}`,
                method: 'POST',
                body
            }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                dispatch(setSearchDetailResult(undefined));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setSearchDetailResult(data));
                } catch (err) {
                    console.log("🚀 ~ file: master-data.api.ts:96 ~ onQueryStarted ~ err:", err)
                }
            },
        }),
        getByDistrictCode: builder.mutation<MasterDistrictResponse, MasterDistrictModel>({
            query: (body) => ({
                url: `${endpoints.masterData.getByDistrictCode}`,
                method: 'POST',
                body
            }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                dispatch(setDistrictDetail(undefined));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setDistrictDetail(data.data));
                } catch (err) {
                    console.log("🚀 ~ file: master-data.api.ts:171 ~ onQueryStarted ~ err:", err)
                }
            },
        }),
        saveDistrict: builder.mutation<MasterDistrictResponse, MasterDistrictModel>({
            query: (body) => ({
                url: `${endpoints.masterData.saveDistrict}`,
                method: 'POST',
                body
            }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                dispatch(setDistrictDetail(undefined));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setDistrictDetail(data.data));
                } catch (err) {
                    console.log("🚀 ~ file: master-data.api.ts:187 ~ onQueryStarted ~ err:", err)
                }
            },
        }),
        searchSubDistrict: builder.mutation<BasePaginateResponse<MasterDistrictModel>, MasterDistrictSearchRequest>({
            query: (body) => ({
                url: `${endpoints.masterData.searchSubDistrict}`,
                method: 'POST',
                body
            }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                dispatch(searchSubDistrictResult(undefined));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(searchSubDistrictResult(data));
                } catch (err) {
                    console.log("🚀 ~ file: master-data.api.ts:210 ~ onQueryStarted ~ err:", err)
                }
            },
        }),
        getBySubDistrictCode: builder.mutation<MasterSubDistrictResponse, MasterSubDistrictModel>({
            query: (body) => ({
                url: `${endpoints.masterData.getBySubDistrictCode}`,
                method: 'POST',
                body
            }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                dispatch(setSubDistrictDetail(undefined));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setSubDistrictDetail(data.data));
                } catch (err) {
                    console.log("🚀 ~ file: master-data.api.ts:171 ~ onQueryStarted ~ err:", err)
                }
            },
        }),
        searchConfigGroup: builder.mutation<BasePaginateResponse<ConfigGroup>, ConfigGroupSearchRequest>({
            query: (body) => ({
                url: `${endpoints.masterData.searchConfig}`,
                method: 'POST',
                body
            }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                dispatch(setSearchConfigGroupResult(undefined));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setSearchConfigGroupResult(data));
                } catch (err) {
                    console.log("🚀 ~ file: master-data.api.ts:206 ~ onQueryStarted ~ err:", err)
                }
            },
        }),
        getByConfigGroup: builder.mutation<ConfigGroupResponse, ConfigGroup>({
            query: (id) => ({
                url: `${endpoints.masterData.getByConfigGroup}/${id}`,
                method: 'GET',
            }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                dispatch(setConfigGroupDetail(undefined));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setConfigGroupDetail(data));
                } catch (err) {
                    console.log("🚀 ~ file: master-data.api.ts:223 ~ onQueryStarted ~ err:", err)
                }
            },
        }),
        listProvince: builder.mutation<ProvinceResponseList, void>({
            query: () => ({
                url: `${endpoints.masterData.listProvince}`,
                method: 'POST',
            }),
            transformResponse: ({ data }: any) => data,
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                dispatch(setListProvinceOption([]));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setListProvinceOption(data));
                } catch (err) {
                    console.log("🚀 ~ file: master-data.api.ts:276 ~ onQueryStarted ~ err:", err)
                }
            },
        }),
        listDistrictByProvinceCode: builder.mutation<MasterDistrictResponseList, MasterDistrictModel>({
            query: (body) => ({
                url: `${endpoints.masterData.listDistrictByProvinceCode}`,
                method: 'POST',
                body
            }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                dispatch(setListDistrictOption([]));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setListDistrictOption(data.data));
                } catch (err) {
                    console.log("🚀 ~ file: master-data.api.ts:276 ~ onQueryStarted ~ err:", err)
                }
            },
        }),
        saveSubDistrict: builder.mutation<MasterSubDistrictResponse, MasterSubDistrictModel>({
            query: (body) => ({
                url: `${endpoints.masterData.saveSubDistrict}`,
                method: 'POST',
                body
            }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                dispatch(setSubDistrictDetail(undefined));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setSubDistrictDetail(data.data));
                } catch (err) {
                    console.log("🚀 ~ file: master-data.api.ts:311 ~ onQueryStarted ~ err:", err)
                }
            },
        }),
        listSubDistrictByDistrictCode: builder.mutation<MasterSubDistrictResponseList, MasterSubDistrictModel>({
            query: (body) => ({
                url: `${endpoints.masterData.listSubDistrictByDistrictCode}`,
                method: 'POST',
                body
            })
        }),
        listAllListboxGroup: builder.mutation<ConfigResponse, void>({
            query: (body) => ({
                url: `${endpoints.masterData.listAllListboxGroup}`,
                method: 'POST',
                body
            }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                dispatch(setListAllListboxGroup([]));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setListAllListboxGroup(data.data));
                } catch (err) {
                    console.log("🚀 ~ file: master-data.api.ts:276 ~ onQueryStarted ~ err:", err)
                }
            },
        }),
        getBoxGroupMaster: builder.mutation<ConfigGroupResponse, ConfigGroup>({
            query: (body) => ({
                url: `${endpoints.masterData.listboxGroupMaster}`,
                method: 'POST',
                body
            }),
            transformResponse: ({ data }: any) => data,
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                dispatch(setConfigGroupDetail(undefined));
                try {
                    const { data }: any = await queryFulfilled;
                    dispatch(setConfigGroupDetail(data[0]));
                } catch (err) {
                    console.log("🚀 ~ file: master-data.api.ts:352 ~ onQueryStarted ~ err:", err)
                }
            },
        }),
        saveListBoxGroupMaster: builder.mutation<ConfigGroupResponse, ConfigGroup>({
            query: (body) => ({
                url: `${endpoints.masterData.saveListBoxGroupMaster}`,
                method: 'POST',
                body
            }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                dispatch(setConfigGroupDetail(undefined));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setConfigGroupDetail(data.data));
                } catch (err) {
                    console.log("🚀 ~ file: master-data.api.ts:311 ~ onQueryStarted ~ err:", err)
                }
            },
        }),
        saveListBoxMaster: builder.mutation<ConfigResponse, Config>({
            query: (body) => ({
                url: `${endpoints.masterData.saveListBoxMaster}`,
                method: 'POST',
                body
            })
        }),
        listEventProvince: builder.mutation<Config[], void>({
            query: (body) => ({
                url: `${endpoints.masterData.listEventProvince}`,
                method: 'POST',
                body
            }),
            transformResponse: ({ data }: ConfigResponse) => data,
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                dispatch(setListEventProvince([]));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setListEventProvince(data));
                } catch (err) {
                    console.log("🚀 ~ file: master-data.api.ts:436 ~ onQueryStarted ~ err:", err)
                }
            },
        }),
        getListEventDropdown: builder.mutation<Config[], EventModel>({
            query: (body) => ({
                url: `${endpoints.masterData.listEventDropdown}`,
                method: 'POST',
                body
            }),
            transformResponse: ({ data }: ConfigResponse) => data,
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setListEventOption(data));
                } catch (err) {
                    console.log("🚀 ~ file: master-data.api.ts:454 ~ onQueryStarted ~ err:", err)
                }
            },
        }),
    })
});

export const {
    useGetConfigByGroupMutation,
    useSearchProvinceMutation,
    useSaveProvinceMutation,
    useGetProvinceByCodeMutation,
    useSearchDistrictMutation,
    useGetByDistrictCodeMutation,
    useSaveDistrictMutation,
    useSearchConfigGroupMutation,
    useGetByConfigGroupMutation,
    useSearchSubDistrictMutation,
    useGetBySubDistrictCodeMutation,
    useListProvinceMutation,
    useListDistrictByProvinceCodeMutation,
    useSaveSubDistrictMutation,
    useListSubDistrictByDistrictCodeMutation,
    useListAllListboxGroupMutation,
    useGetBoxGroupMasterMutation,
    useSaveListBoxGroupMasterMutation,
    useSaveListBoxMasterMutation,
    useListEventProvinceMutation,
    useGetListEventDropdownMutation
} = masterDataApi;
