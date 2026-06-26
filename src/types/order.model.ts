import { BaseDataResponse } from "src/api/base/types";

import { HotelType } from "./hotel.type";
import { StepModel } from "./register-form.model";
import { MerchandiseType } from "./merchandise.type";
import { InputFieldModel } from "./input-column.model";
import { OrderTicketModel } from "./order-ticket.model";
import { InputFieldOptionModel } from "./input-column-option.model";

export type OrderModel = {
    id?: number | null;
    userId?: number;
    userCode?: string;
    eventCode?: string;
    orderNumber?: string;
    orderPhotoNumber?: string;
    redisKey?: string;
    shippingStatus?: string;
    userAddressCode?: string;
    trackingProvider?: string;
    trackingNumber?: string;
    totalOrder?: number | null;
    totalAmount?: number | null;
    shippingAmount?: number | null;
    paymentGatewayFee?: number | null;
    paymentGatewayFeeUnit?: string;
    paymentMethod?: string;
    couponCode?: string;
    discountAmount?: number | null;
    netAmount?: number | null;
    status?: string;
    orderGenerateCode?: string;
    remark?: string;

    addr?: string;
    addrFullName?: string;
    addrTel?: string;
    addrProvinceCode?: string;
    addrDistrictCode?: string;
    addrSubDistrictCode?: string;
    addrZipcode?: string;

    createDtm?: Date | null;
    createBy?: string;
    lastUpdateDtm?: Date | null;
    lastUpdateBy?: string;
    imagePaymentSlipFileName?: string;
    directTransDate?: string;

    listOrderTicket?: OrderTicketModel[] | [];

    eventUrl?: string;
    eventNameTh?: string;
    eventNameEn?: string;
    imageEventFileUrl?: string;
    statusDescTh?: string;
    statusDescEn?: string;
    imageEventBannerUrl?: string;
    paymentMethodc?: string;
    paymentMethodDesc?: string;
    paymentMethodDescEn?: string;
    statusDesc?: string;
    qrPaymentImageUrl?: string;
    qrPaymentExpiredDate?: string;
    directPaymentExpiredDate?: string;
    /* FOR SAVE ORDER */
    registerStep: {
        listStep: StepModel[];
    };
    /* FOR SAVE ORDER */

    paymentCreditCardRedirect?: string;

    orderDate?: string;
    paymentExpiredDate?: string;
    orderSubmit?: string;

    totalRunner?: number;
    totalDistance?: number;
    ranking?: {
        rank?: number;
        genderRank?: number;
        bibNumber?: string;
        firstName?: string;
        lastName?: string;
        gender?: string;
        raceDistance?: number;
        totalDistance?: number;
        distance?: number;
        updateDtm?: string;
        bibImageUrl?: string;
        certificateImageUrl?: string;
        badgeImageUrl?: string;
        status?: string;
    },
    fullName?: string;
    eventType?: string;
};


export type OrderModelResponse = {
    data: OrderModel
} & BaseDataResponse

export type OrderModelListResponse = {
    data: OrderModel[]
} & BaseDataResponse


export type ValidateStockModel = {
    listInvalidMerchandise: MerchandiseType[];
    listMerchandise: MerchandiseType[];

    listInvalidShirt: InputFieldModel[];
    listShirt: InputFieldModel[];

    listInvalidShirtSize: InputFieldOptionModel[];
    listShirtSize: InputFieldOptionModel[];

    listInvalidHotel: HotelType[];
    listHotel: MerchandiseType[];
}

export type ValidateStockModelResponse = {
    data: ValidateStockModel
} & BaseDataResponse