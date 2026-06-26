// ----------------------------------------------------------------------

import { BaseDataResponse } from "src/api/base/types";

import { BasePaginateRequest } from "./base-paginate";

export type IFileFilterValue = string | string[] | Date | null;

export type IFileFilters = {
  name: string;
  type: string[];
  startDate: Date | null;
  endDate: Date | null;
};

// ----------------------------------------------------------------------

export type IFileShared = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  permission: string;
};

export type IFolderManager = {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  tags: string[];
  totalFiles?: number;
  isFavorited: boolean;
  shared: IFileShared[] | null;
  createdAt: Date | number | string;
  modifiedAt: Date | number | string;
};

export type IFileManager = {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  tags: string[];
  isFavorited: boolean;
  shared: IFileShared[] | null;
  createdAt: Date | number | string;
  modifiedAt: Date | number | string;
};

export type IFile = IFileManager | IFolderManager;

export type FileType = {
    id?: number | null;
    folderCode?: string;
    eventCode?: string;
    imageName?: string;
    fileName?: string;
    UID?: string;
    imageS3Bucket?: string;
    imageS3Key?: string;
    imageS3Version?: string;
    imageS3Size?: number | null;
    imageS3ThumbnailBucket?: string;
    imageS3ThumbnailKey?: string;
    imageS3ThumbnailVersion?: string;
    imageS3ThumbnailSize?: number | null;
    status?: string;
    statusDesc?: string;
    createDtm?: Date | string;
    createBy?: string;
    lastUpdateDtm?: Date | string;
    lastUpdateBy?: string;
    imageUrl?: string;
    uid?: string;
    key?: string;
    bucket?: string;
    folderName?: string;
    orderPhotoNumber?: string;
};

export type BaseUploadResponse = {
  success: boolean;
  name?: string;
  contentType?: string;
  file?: string; // หรือ `number[]` ขึ้นอยู่กับลักษณะการใช้งาน
  path?: string;
};

export type FileResponse = {
  id: number;
  fileName: string;
  fileType: string;
  fileSize: number; // BigDecimal -> number
  filePath: string;
  uploadType: string;
  status: string;
  actionBy: string;
  fileDesc: string;


  imageS3Bucket?: string;
  imageS3Key?: string;
  imageS3ThumbnailBucket?: string;
  imageS3ThumbnailKey?: string;
  imageThumbnailUrl?: string;
  imageUrl?: string;
  uid?: string;
};

export type FileRequest = {
  uploadType: string;
  eventUrl: string;
} & BasePaginateRequest;

export type FileResponseData = {
  data: FileResponse
} & BaseDataResponse;

export type GeneratePresignedTypeResponse = {
    data: {
        threshold?: number;
        distance?: number;
        bucketName: string;
        key: string;
        uploadUrl: string;
        uploadThumbnailUrl: string;
        status: string;
        downloadUrl: string;
        uploadFrameUrl: string;
        uploadFrameThumbnailUrl: string;
    }
} & BaseDataResponse;