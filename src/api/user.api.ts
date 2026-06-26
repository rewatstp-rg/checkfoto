/* eslint import/newline-after-import: "off" */
import { createApi } from '@reduxjs/toolkit/query/react';

import { endpoints } from 'src/utils/axios';

import { setListFriend } from 'src/slices/register.slices';
import { setListUserAddressByUserId } from 'src/slices/user.slices';

import { FriendModel, IUserAccount, UserAddressModel, FriendModelResponse, IUserAccountResponse, UserAddressModelListResponse } from 'src/types/user';

import { axiosBaseQuery } from './base/axiosBaseQuery';


const ENV_URL = `${import.meta.env.VITE_HOST_API}${endpoints.user.root}`;

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: axiosBaseQuery({ baseUrl: ENV_URL }),
    endpoints: (builder) => ({
        listUserAddressByUserId: builder.mutation<UserAddressModel[], UserAddressModel>({
            query: (body) => ({
                url: `${endpoints.user.listUserAddressByUserId}`,
                method: 'POST',
                body
            }),
            transformResponse: ({ data }: UserAddressModelListResponse) => data,
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                dispatch(setListUserAddressByUserId([]));
                try {
                    const { data } = await queryFulfilled;
                    // console.log("🚀 ~ file: user.api.ts:31 ~ onQueryStarted ~ data:", data)
                    dispatch(setListUserAddressByUserId(data));
                } catch (err) {
                    console.log("🚀 ~ file: user.api.ts:32 ~ onQueryStarted ~ err:", err)
                }
            },
        }),
        saveUserAddress: builder.mutation<UserAddressModelListResponse, UserAddressModel>({
            query: (body) => ({
                url: `${endpoints.user.saveUserAddress}`,
                method: 'POST',
                body
            })
        }),
        listUserFriends: builder.mutation<FriendModel, void>({
            query: (body) => ({
                url: `${endpoints.user.listUserFriends}`,
                method: 'POST',
                body
            }),
            transformResponse: ({ data }: FriendModelResponse) => data,
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                // dispatch(setListUserAddressByUserId([]));
                dispatch(setListFriend([]));
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setListFriend(data?.listFriend || []));
                } catch (err) {
                    console.log("🚀 ~ file: user.api.ts:32 ~ onQueryStarted ~ err:", err)
                }
            },
        }),
        saveUserProfile: builder.mutation<IUserAccountResponse, IUserAccount>({
            query: (body) => ({
                url: `${endpoints.user.saveUserProfile}`,
                method: 'POST',
                body
            }),
        }),
        resetPassword: builder.mutation<IUserAccountResponse, IUserAccount>({
            query: (body) => ({
                url: `${endpoints.user.resetPassword}`,
                method: 'POST',
                body
            })
        }),
        saveUserProfileImage: builder.mutation<IUserAccountResponse, FormData>({
            query: (body) => ({
                url: `${endpoints.user.saveUserProfileImage}`,
                method: 'POST',
                body
            }),
        }),

    })
});

export const {
    useListUserAddressByUserIdMutation,
    useSaveUserAddressMutation,
    useListUserFriendsMutation,
    useSaveUserProfileMutation,
    useResetPasswordMutation,
    useSaveUserProfileImageMutation
} = userApi;
