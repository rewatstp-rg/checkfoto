import { BaseDataResponse } from "src/api/base/types";

import { InputFieldModel } from "./input-column.model";

export type HotelType = {
    id: number;
    hotelCode: string;
    hotelTh: string;
    hotelEn: string;
    listHotelImage: HotelImageType[];
    hotelImageBannerUrl: string;
    hotelPrice: number;
    hotelDescTh: string;
    hotelDescEn: string;
    listHotelOption: InputFieldModel[];
    available: number;
    status: string;
    statusDesc: string;
    sequence: number;
    eventCode: string;
    properties: string;
    quantity: number;
    hotelType: string;
    actionBy: string;
    eventUrl: string;
    hotelRemark: string
    hotelStartDate: Date | null | string;
    hotelEndDate: Date | null | string;
    hotelGroup: string
    orderHotelCode?: string
}

export type HotelImageType = {
    fileId: number;
    id: number;
    imageFileName: string;
    imageFileId: number;
    imageFileUrl: string;
    content: string;
    url: string;
    seq: number;
    status: string;
    statusDesc: string;
    createDtm: Date | null | string;
    createBy: string;
    lastUpdateDtm: Date | null | string;
    lastUpdateBy: string;
    imageType: string;
    actionBy: string;
    preview: string;
}

export type HotelTypeResponse = {
    data: HotelType
} & BaseDataResponse;

export type HotelTypeResponseList = {
    data: HotelType[]
} & BaseDataResponse;

export const createDefaultHotelType = (): HotelType => ({
    id: 0,
    hotelCode: '',
    hotelTh: '',
    hotelEn: '',
    hotelImageBannerUrl: '',
    hotelPrice: 0,
    hotelDescTh: '',
    hotelDescEn: '',
    listHotelImage: [],
    listHotelOption: [],
    available: 0,
    status: 'ACTIVE',
    statusDesc: '',
    sequence: 0,
    eventCode: '',
    properties: 'INACTIVE',
    quantity: 0,
    hotelType: '',
    actionBy: '',
    eventUrl: '',
    hotelRemark: '',
    hotelStartDate: null,
    hotelEndDate: null,
    hotelGroup: ''
});

export type CartOption = {
    valueEn: string;
    valueTh: string;
    optionKey: string;
    labelEn: string;
    labelTh: string;
    inputFieldKey: string;
    stock: string;
    optionValue: string;
};

export const defaultCartOptionValue = {
    valueEn: '',
    valueTh: '',
    optionKey: '',
    labelEn: '',
    labelTh: '',
    inputFieldKey: '',
    stock: 'INACTIVE',
    optionValue: ''
}