/* eslint import/newline-after-import: "off" */
import { createApi } from '@reduxjs/toolkit/query/react';

import { endpoints } from 'src/utils/axios';

import { BasePaginateResponse } from 'src/types/base-paginate';
import { EventPhotoType, EventPhotoResponseType } from 'src/types/event-photo.type';
import { FileType, FileRequest, FileResponse, GeneratePresignedTypeResponse } from 'src/types/file';

import { axiosBaseQuery } from './base/axiosBaseQuery';

const ENV_URL = `${import.meta.env.VITE_HOST_API}${endpoints.photoBooth.root}`;

export const eventPhotoBoothApi = createApi({
    reducerPath: 'eventPhotoBoothApi',
    baseQuery: axiosBaseQuery({ baseUrl: ENV_URL }),
    endpoints: (builder) => ({
        checkEventByBoothPass: builder.mutation<EventPhotoType, EventPhotoType>({
            query: (body) => ({
                url: `${endpoints.photoBooth.checkEventByBoothPass}`,
                method: 'POST',
                body
            }),
            transformResponse: ({ data }: EventPhotoResponseType) => data,
        }),
        searchImageFrameByType: builder.mutation<BasePaginateResponse<FileResponse>, FileRequest>({
            query: (body) => ({
                url: `${endpoints.photoBooth.searchImageFrameByType}`,
                method: 'POST',
                body
            }),
        }),
        generatePresignedUrlForPhotobooth: builder.mutation<GeneratePresignedTypeResponse, FileType>({
            query: (body) => ({
                url: `${endpoints.photoBooth.generatePresignedUrlForPhotobooth}`,
                method: 'POST',
                body
            }),
        }),
        uploadFileSuccessForPhotobooth: builder.mutation<any, FileType>({
            query: (body) => ({
                url: `${endpoints.photoBooth.uploadFileSuccessForPhotobooth}`,
                method: 'POST',
                body
            }),
        }),
    })
});

export const {
    useCheckEventByBoothPassMutation,
    useSearchImageFrameByTypeMutation,
    useGeneratePresignedUrlForPhotoboothMutation,
    useUploadFileSuccessForPhotoboothMutation
} = eventPhotoBoothApi;