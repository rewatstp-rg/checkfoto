import { BaseDataResponse } from "src/api/base/types";

export type DiscountCodeModel = {
    id?: number;
    discountCode?: string;
    eventCode?: string;
    couponCode?: string;

    createDtm?: Date;
    createBy?: string;
    lastUpdateDtm?: Date;
    lastUpdateBy?: string;
    discountMode?: string;

    discountType?: string;
    discountValue?: number;
    unitRate?: string;
    status?: string;
    statusDesc?: string;
    statusDescEn?: string;
    discountModule?: string;
}

export type DiscountCodeModelResponse = {
    data: DiscountCodeModel
} & BaseDataResponse;