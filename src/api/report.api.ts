/* eslint import/newline-after-import: "off" */
import { createApi } from '@reduxjs/toolkit/query/react';

import { endpoints } from 'src/utils/axios';

import { axiosBaseQuery } from './base/axiosBaseQuery';


const ENV_URL = `${import.meta.env.VITE_HOST_API}${endpoints.report.root}`;

export const reportApi = createApi({
    reducerPath: 'reportApi',
    baseQuery: axiosBaseQuery({ baseUrl: ENV_URL }),
    endpoints: (builder) => ({
        reportDemo: builder.mutation<any, void>({
            query: (body) => ({
                url: `${endpoints.report.demo}`,
                method: 'POST',
                body
            }),
        }),
    })
});

export const {
    useReportDemoMutation
} = reportApi;