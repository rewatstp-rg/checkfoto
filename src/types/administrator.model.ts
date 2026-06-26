import { BaseDataResponse } from "src/api/base/types";

import { BasePaginateRequest } from "./base-paginate";

export type AdminUserModel = {
    id?: number,
    username?: string,
    userName?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    departmentName?: string,
    createDtm?: string,
    createBy?: string,
    adminCode?: string,
    imageProfileFileId?: number,
    lastUpdateDtm?: string,
    tel?: string,
    positionName?: string,
    status?: string,
    lastUpdateBy?: string,
    password?: string,
    imageProfileFileName?: string,
    imageProfileFileUrl?: string,
    statusDesc?: string,
    roleId?: string,
    adminRole: any[],
    fileResponse?: {
        file: any,
        name: string,
        success: boolean
    }
};

export type AdminUserSearchResponse = {
    data: AdminUserModel
} & BaseDataResponse;

export type AdminUserSearchRequest = {
    firstName?: string,
    lastName?: string,
    adminCode?: string,
    status?: string,
} & BasePaginateRequest;