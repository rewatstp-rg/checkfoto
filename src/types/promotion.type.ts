import { BaseDataResponse } from "src/api/base/types";

import { BasePaginateRequest } from "./base-paginate";

export type IPromotionType = {
    id: number;
    promotionCode: string;
    eventCode: string;
    promotionName: string;
    promotionNameEn: string;
    promotionType: string;
    promotionTypeDesc: string;
    promotionDesc: string;
    privilegeRunnerFileId: number;
    startDate: string;
    endDate: string;
    registerAmount: number;
    minAge: number;
    maxAge: number;
    discount: number;
    discountUnit: string; // e.g., '%', 'USD'
    discountUnitDesc: string; // e.g., '%', 'USD'
    status: string;
    statusDesc: string;
    createDtm?: Date | null | string;
    createBy: string;
    lastUpdateDtm?: Date | null | string;
    lastUpdateBy: string;
    listPromotionTicket: IPromotionTicket[];
    fileName: string;
    fileUpload?: File | null;
    selected?: boolean;
    promotionDiscount?: number;
};

export const createDefaultPromotion = (): IPromotionType => ({
    id: 0,
    promotionCode: '',
    eventCode: '',
    promotionName: '',
    promotionNameEn: '',
    promotionType: '',
    promotionTypeDesc: '',
    promotionDesc: '',
    privilegeRunnerFileId: 0,
    startDate: '',
    endDate: '',
    registerAmount: 0,
    minAge: 0,
    maxAge: 0,
    discount: 0,
    discountUnit: '',
    discountUnitDesc: '',
    status: 'ACTIVE',
    statusDesc: '',
    createBy: '',
    lastUpdateBy: '',
    listPromotionTicket: [],
    fileName: ''
});

export type IPromotionPrivilegeRunnerType = {
    id: number;
    promotionCode: string;
    firstName: string;
    lastName: string;
    tel: string;
    idCard: string;
    status: string;
    statusDesc: string;
    createDtm: string; // ISO date string
    createBy: string;
    lastUpdateDtm: string; // ISO date string
    lastUpdateBy: string;
};

export const createDefaultPrivilegeRunnerType: IPromotionPrivilegeRunnerType = {
    id: 0,
    promotionCode: '',
    firstName: '',
    lastName: '',
    tel: '',
    idCard: '',
    status: 'ACTIVE',  // Assuming 'inactive' as a default status
    createDtm: '',
    createBy: '',
    lastUpdateDtm: '',
    lastUpdateBy: '',
    statusDesc: ''
};

export type IPromotionTicket = {
    id: number;
    promotionCode: string;
    ticketCode: string;
    status?: string;
    statusDesc?: string;
};

export const createDefaultPromotionTicket: IPromotionTicket = {
    id: 0,
    promotionCode: '',
    ticketCode: '',
};

export type IPromotionResponseType = {
    data: IPromotionType
} & BaseDataResponse;

export type IPromotionListResponse = {
    data: IPromotionType[]
} & BaseDataResponse


export type IPromotionPrivilegeRunnerTypeResponse = {
    data: IPromotionPrivilegeRunnerType
} & BaseDataResponse;

export type IPromotionRequestType = {
    promotionCode?: string;
    eventCode?: string;
    keyword?: string;
    promotionType?: string;
} & BasePaginateRequest;

export type IPromotionUseType = {
    promotionCode?: string;
    promotionName?: string;
    discount?: number;
    discountUnitDesc?: string;
    promotionDiscount?: number;
    startDate: Date | null | string;
    endDate: Date | null | string;
}