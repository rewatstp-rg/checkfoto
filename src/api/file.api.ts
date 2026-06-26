/* eslint import/newline-after-import: "off" */
import { createApi } from '@reduxjs/toolkit/query/react';

import { endpoints } from 'src/utils/axios';

import { FileModel } from 'src/types/file.model';

import { axiosBaseQuery } from './base/axiosBaseQuery';

const ENV_URL = `${import.meta.env.VITE_HOST_API}${endpoints.file.root}`;

export const fileApi = createApi({
    reducerPath: 'fileApi',
    baseQuery: axiosBaseQuery({ baseUrl: ENV_URL }),
    endpoints: (builder) => ({
        downloadFileById: builder.mutation<any, FileModel>({
            query: (body) => ({
                url: `${endpoints.file.downloadFileById}/${body.fileId}`,
                method: 'POST',
            }),
        }),
    })
});

export const {
    useDownloadFileByIdMutation
} = fileApi;