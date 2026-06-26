import { BaseDataResponse } from "src/api/base/types";

import { BaseUploadResponse } from "./file";

export type EventPhotoFrameModel = {
    id?: number;
    eventCode?: string;

    fileId?: number;

    status?: string;
    createDtm?: Date | string;
    createBy?: string;
    lastUpdateDtm?: Date | string;
    lastUpdateBy?: string;
    priceType?: string;

    actionBy?: string;

    seq?: number;

    fileName?: string;
    filePath?: string;
    fileUrl?: string;

    eventPhotoFrameCode?: string;
    eventUrl?: string;

    fileResponse?: BaseUploadResponse;
    imageOrientation?: string;
    frameNameTh?: string;
    frameNameEn?: string;
};

export type EventPhotoFrameModelResponse = {
    data: EventPhotoFrameModel
} & BaseDataResponse;

export type EventPhotoFrameModelLitsResponse = {
    data: EventPhotoFrameModel[]
} & BaseDataResponse;