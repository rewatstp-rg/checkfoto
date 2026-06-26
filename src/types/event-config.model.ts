import { BaseDataResponse } from "src/api/base/types";

import { HotelType } from "./hotel.type";
import { TicketModel } from "./ticket.model";
import { StepModel } from "./register-form.model";
import { PhotoType, EventPhoto } from "./photo.type";
import { BasePaginateRequest } from "./base-paginate";
import { InputFieldModel } from "./input-column.model";
import { PaymentGatewayModel } from "./payment-gateway.model";

export type EventImageModel = {
    eventImageId?: number;
    eventId?: number;
    fileId?: number;
    imageType?: string;
    imageTypeDesc?: string;
    imageName?: string;
    status?: string;
    statusDesc?: string;
    imageUrl?: string;
    fileSize?: string;
}

export type OptionDetailModel = {
    optionDetailId?: number;
    optionId?: number;
    eventId?: number;
    optionDetailName?: string;
    value1?: string;
    value2?: string;
    status?: string;
    statusDesc?: string;
    addStatus?: boolean;
    optionDetailNameEn?: string;
}

export type OptionModel = {
    optionId?: number;
    eventId?: number;
    ticketId?: number;
    fileId?: number;
    optionType?: string;
    optionStatus?: string;
    imageName?: string;
    fieldName?: string;
    fieldLabel?: string;
    fieldPlaceholder?: string;
    fieldLimit?: number;
    fieldType?: string;
    fieldRequired?: number;
    fieldItemSeq?: number;
    field?: string;
    listOptionDetail?: OptionDetailModel[];
    index?: number;
    check?: boolean;
    fieldLabelEn?: string;
    fieldPlaceholderEn?: string;
    shirtField?: string;
}

export type TicketOptionModel = {
    ticketOptionId?: number;
    eventId?: number;
    ticketId?: number;
    optionId?: number;
    ticketOptionStatus?: string;
}

export type TicketFieldModel = {
    ticketFieldId?: number;
    eventId?: number;
    ticketId?: number;
    fieldName?: string;
    fieldLabel?: string;
    fieldPlaceholder?: string;
    fieldLimit?: string;
    fieldType?: string;
    fieldRequired?: string;
    fieldItemSeq?: string;
}

export type EventSectionImage = {
    eventSectionImageId?: number;
    eventSectionId?: number;
    imageName?: string;
    imageTitle?: string;
    imageDesc?: string;
    status?: string;
    imageUrl?: any;
    eventId?: number;
}

export type EventSectionContent = {
    id?: number | 0;
    eventCode?: string;
    sectionCode?: string;
    sectionContentCode?: string;
    sequence?: number | 0;
    contentImageId?: number | 0;
    contentTh?: string;
    contentEn?: string;
    contentType?: string;
    status?: string;
    createDtm?: Date;
    createBy?: string;
    lastUpdateDtmm?: Date;
    lastUpdateBy?: string;
    contentTypeDesc?: string;
    statusDesc?: string;
    contentImageUrl?: string;
    fileName?: string;
    filePath?: string;
    contentImageName?: string;
    images: any;
}

export type EventSectionModel = {
    id?: number | 0;
    eventCode?: string;
    sectionCode?: string;
    sectionName?: string;
    mainHeaderTh?: string;
    mainHeaderEn?: string;
    detailHeaderTh?: string;
    detailHeaderEn?: string;
    status?: string;
    createDtm?: Date;
    createBy?: string;
    lastUpdateDtm?: Date;
    lastUpdateBy?: string;
    statusDesc?: string;
    actionBy?: string;
    errorStatus?: string;
    errorMessage?: string;
    sequence?: number | 0;
    listContent?: EventSectionContent[];
}

export type EventSectionModelResponse = {
    data: EventSectionModel
} & BaseDataResponse;

export type EventSectionModelListResponse = {
    data: EventSectionModel[]
} & BaseDataResponse;


export type EventTagModel = {
    id?: number;
    eventCode?: string;
    sequence?: number;
    tag?: string;
    tagDesc?: string;
    tagDescEn?: string;
}

export type AddressModel = {
    address?: string;
    createBy?: string;
    createDate?: string;
    districtCode?: string;
    districtCodeDesc?: string;
    fullName?: string;
    provinceCode?: string;
    provinceCodeDesc?: string;
    status?: string;
    subDistrictCode?: string;
    subDistrictCodeDesc?: string;
    tel?: string;
    updateBy?: string;
    updateDate?: string;
    usedStatus?: string;
    userAddressDesc?: string;
    userAddressId?: string;
    userId?: string;
    zipcode?: string;
}

export type EventUserTestModel = {
    birthDate?: string;
    createBy?: string;
    createDate?: string;
    email?: string;
    firstName?: string;
    fullName?: string;
    gender?: string;
    idpsNumber?: string;
    imageProfile?: string;
    lastName?: string;
    middleName?: string;
    policyAccept?: string;
    remark?: string;
    status?: string;
    statusDesc?: string;
    tel?: string;
    updateBy?: string;
    updateDate?: string;
    userId?: any;
    listAddress?: AddressModel[];
    listItemBg?: any[];
    listUserProvider?: any[];
}

export type EventModel = {
    id?: number;
    eventDesc?: string;
    eventNameTh?: string;
    eventNameEn?: string;
    eventUrl?: string;
    eventProvinceCode?: string;
    eventDate?: Date | null | undefined;
    eventEndDate?: Date | null | undefined;
    eventLocationTh?: string;
    eventLocationEn?: string;
    registerStartDate?: Date | null | undefined;
    registerEndDate?: Date | null | undefined;
    registerType?: string;
    shippingStatus?: string;
    shippingFee?: number;
    additionalShippingFee?: number;
    status?: string;
    sequence?: number;
    applyForFriend?: string;
    lineAccessToken?: string;
    racepackLocationTh?: string;
    racepackLocationEn?: string;
    eventImgBanner?: string;
    eventType?: string | ''; /** RACE */
    eventStatus?: string;
    viewType?: string;
    weaverInfo?: string;

    organizerCode?: string;
    eventCode?: string;
    registerLimit?: string;
    registerStatus?: string;

    registerUrl?: string;
    registerPrivateUrl?: string;
    testUrl?: string;
    testRegisterUrl?: string;

    createDtm?: string;
    createBy?: string;
    lastUpdateDtm?: string;
    lastUpdateBy?: string;

    listTag?: EventTagModel[];
    listTicket?: TicketModel[];
    listTestUser?: EventUserTestModel[];
    listInputField?: InputFieldModel[];
    listEventSection?: EventSectionModel[];
    listPaymentGateway?: PaymentGatewayModel[];
    listEventSectionHeader?: EventSectionModel[];
    listMerchandise?: any[];
    imageEventFileName?: string;
    statusDesc?: string;
    imageEventBannerUrl?: string;
    eventImageId?: number;
    imageEventFileId?: number;
    listTicketDistance?: string[];
    imageEventFileUrl?: string;
    organizerName?: string;
    eventProvinceTh?: string;
    eventProvinceEn?: string;
    eventStatusDesc?: string;
    eventStatusDescEn?: string;
    discountStatus?: string;
    promotionStatus?: string;
    token?: string;
    registerStep: {
        listStep: StepModel[];
    };
    merchandiseStatus?: string;
    totalRunner?: number;
    totalDistance?: number;
    ranking?: {
        rank?: number;
        genderRank?: number;
        bibNumber?: string;
        firstName?: string;
        lastName?: string;
        gender?: string;
        distanceUnit?: string;
        raceDistance?: number;
        totalDistance?: number;
        distance?: number;
        updateDtm?: string;
        bibImageUrl?: string;
        certificateImageUrl?: string;
        badgeImageUrl?: string;
    },
    listHotel?: HotelType[];
    vrLimitSubmit?: string | 'ACTIVE' | 'INACTVE';
    vrSubmit?: string | 'NONE_SUBMIT' | 'SUBMITTED';
    userRegisterStatus?: string | 'REGISTERED' | 'UNREGISTERED';
    discountWithPromotion?: string | 'ACTIVE' | 'INACTVE';
    eventPromotion?: string | 'ACTIVE' | 'INACTVE';
    eventPhoto?: EventPhoto;
    listHighlights?: PhotoType[];

    boothUploadPassword?: string;
    uploadFrameUrl?: string;
    uploadFrameThumbnailUrl?: string;
    imageWithFrameName?: string;
    idFrame?: string;
    imageUidFrame?: string;
    folderCode?: string;

};

export type EventSearchRequestModel = {
    eventName?: string;
    eventCode?: string;
    status?: string;
    eventProvinceCode?: string;
    organizerCode?: string;
} & BasePaginateRequest;

export type EventModelResponse = {
    data: EventModel
} & BaseDataResponse;

export type EventModelListResponse = {
    data: EventModel[]
} & BaseDataResponse;

export type EventSectionContentResponse = {
    data: EventSectionContent
} & BaseDataResponse;


export type EventSectionContentListResponse = {
    data: EventSectionContent[]
} & BaseDataResponse;