import { InputFieldModel } from "./input-column.model";

export type MerchandiseType = {
    id: number;
    merchandiseCode: string;
    merchandiseTh: string;
    merchandiseEn: string;
    listMerchandiseImage: any[];
    merchandiseImageBannerUrl: string;
    merchandisePrice: number;
    merchandiseDescTh: string;
    merchandiseDescEn: string;
    listMerchandiseOption: InputFieldModel[];
    available: number;
    status: string;
    statusDesc: string;
    sequence: number;
    eventCode: string;
    properties: string;
    quantity: number;
    merchandiseStartDate: Date | null | string;
    merchandiseEndDate: Date | null | string;
    merchandiseGroup: string;
    merchandiseRemark: string;
}

export const createDefaultMerchandiseType = (): MerchandiseType => ({
    id: 0,
    merchandiseCode: '',
    merchandiseTh: '',
    merchandiseEn: '',
    merchandiseImageBannerUrl: '',
    merchandisePrice: 0,
    merchandiseDescTh: '',
    merchandiseDescEn: '',
    listMerchandiseImage: [],
    listMerchandiseOption: [],
    available: 0,
    status: 'ACTIVE',
    statusDesc: '',
    sequence: 0,
    eventCode: '',
    properties: 'INACTIVE',
    quantity: 0,
    merchandiseRemark: '',
    merchandiseStartDate: null,
    merchandiseEndDate: null,
    merchandiseGroup: ''
});