
import { createApi } from '@reduxjs/toolkit/query/react';

import { endpoints } from 'src/utils/axios';

import { setListAllMenu } from 'src/slices/menu.slices';

import { MenuProps, MenuPropsList } from 'src/components/mega-menu';

import { axiosBaseQuery } from './base/axiosBaseQuery';

const ENV_URL = `${import.meta.env.VITE_HOST_API}${endpoints.menus.root}`;

export const menuApi = createApi({
    reducerPath: 'menuApi',
    baseQuery: axiosBaseQuery({ baseUrl: ENV_URL }),
    endpoints: (builder) => ({
        listAllMenu: builder.mutation<MenuProps[], void>({
            query: () => ({
                url: `${endpoints.menus.listAllMenu}`,
                method: 'GET'
            }),
            transformResponse: ({ data }: MenuPropsList) => data,
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                dispatch(setListAllMenu([]));
                try {
                    const { data } = await queryFulfilled;
                    console.log("🚀 ~ file: menu.api.ts:28 ~ onQueryStarted ~ data:", data)
                    dispatch(setListAllMenu(data));
                } catch (err) {
                    console.log("🚀 ~ file: menu.api.ts:29 ~ onQueryStarted ~ err:", err)
                }
            },
        }),
    })
});

export const {
    useListAllMenuMutation
} = menuApi;