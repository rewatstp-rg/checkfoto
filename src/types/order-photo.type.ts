import { BaseDataResponse } from "src/api/base/types";

import { DiscountCodeModel } from "./discount.model";
import { PaymentGatewayModel } from "./payment-gateway.model";

export type OrderPhotoObjectModel = {
    id?: number | null;
    orderPhotoNumber?: string;
    photoPriceCode?: string;
    uid?: string;
    status?: string;
    remark?: string;
    createDtm?: Date | string;
    createBy?: string;
    lastUpdateDtm?: Date | string;
    lastUpdateBy?: string;
    imageThumbnailUrl?: string;
    photoPriceType?: string;
    photoPriceDescEn?: string;
    photoPriceDescTh?: string;
    photoPriceTypeDescTh?: string;
    photoPriceTypeDescEn?: string;
    photoPrice?: number;
    imageType?: string;
};

export type StepPaymentGatewayModel = {
    listPaymentGateway: PaymentGatewayModel[];
    eventCode: string | '';
    shippingStatus: string;
    totalOrder: number | 0;
    totalAmount: number | 0;
    shippingAmount: number | 0;
    paymentGatewayFee: number | 0;
    paymentGatewayFeeUnit: string;
    paymentMethod: string;
    couponCode: string;
    discountAmount: number | 0;
    netAmount: number | 0;
    status: string;
    paymentGatewayAmount: number | 0;
    qrImage?: string;
    paymentExpiredDate?: string;
    referenceOrder?: string;
    realDiscounts: number | 0;
    beforeNetAmount: number | 0;
    paymentCreditCardRedirect?: string;
}

export type OrderPhotoModel = {
    id?: number | null;
    userCode?: string;
    eventUrl?: string;
    userId?: number;
    eventCode?: string;
    orderPhotoNumber?: string;
    photoPackageCode?: string;
    totalOrder: number;
    totalAmount: number | null;
    paymentGatewayFee: number | null;
    paymentGatewayFeeUnit: string;
    paymentMethod: string;
    couponCode?: string;
    discountAmount: number | null;
    netAmount: number | null;
    status?: string;
    remark?: string;
    createDtm?: Date | string;
    createBy?: string;
    lastUpdateDtm?: Date | string;
    lastUpdateBy?: string;
    referenceOrder?: string;
    actionBy?: string;
    message?: string;
    orderSubmit?: string;
    statusDescEn?: string;
    statusDesc?: string;
    paymentCreditCardRedirect?: string;
    beforeNetAmount?: number | 0;
    realDiscounts?: number | 0;
    paymentModel?: StepPaymentGatewayModel;
    listOrderPhotoObject?: OrderPhotoObjectModel[];
    listPaymentGateway?: PaymentGatewayModel[];
    discountModel?: DiscountCodeModel;
    imageEventBannerUrl?: string;
    imagePaymentSlipFileName?: string;
    directTransDate?: Date | string;
    directPaymentExpiredDate?: Date | string;
    downloadAllStatus?: string;
    downloadAllUrl?: string;
    searchImageFileName?: string;

    eventNameTh?: string;
    eventNameEn?: string;
    bibNumber?: string;
    searchImageFileUrl?: string;
    registerEmail?: string;
    providerName?: string;
    downloadFrameAllStatus?: string;
    downloadFrameAllUrl?: string;
    zipForPackage?: string;
    zipWithFrame?: string;
};

export type OrderPhotoModelResponse = {
    data: OrderPhotoModel
} & BaseDataResponse