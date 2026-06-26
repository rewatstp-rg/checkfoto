
import { createApi } from '@reduxjs/toolkit/query/react';

import { endpoints } from 'src/utils/axios';

import { FileType } from 'src/types/file';

import { axiosBaseQuery } from './base/axiosBaseQuery';

const ENV_URL = `${import.meta.env.VITE_HOST_API}${endpoints.uploadFile.root}`;

export const uploadFileApi = createApi({
    reducerPath: 'uploadFileApi',
    baseQuery: axiosBaseQuery({ baseUrl: ENV_URL }),
    endpoints: (builder) => ({
        downloadFile: builder.mutation<any, FileType>({
            query: (body) => ({
                url: `${endpoints.uploadFile.downloadFile}`,
                method: 'POST',
                body
            }),
        }),
        downloadImageFile: builder.mutation<any, FileType>({
            query: (body) => ({
                url: `${endpoints.uploadFile.downloadImageFile}`,
                method: 'POST',
                body
            }),
        }),
    })
});

export const {
    useDownloadFileMutation,
    useDownloadImageFileMutation
} = uploadFileApi;