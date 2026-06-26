import { BaseDataResponse } from "src/api/base/types";

// import { BasePaginateRequest } from "./base-paginate";

export type LandingPageModel = {
    id?: number | 0;
    title?: string | '';
    imageFileName?: string | '';
    imageFileId?: number | 0;
    imageFileUrl?: string | '';
    content?: string | '';
    url?: string | '';
    seq?: number | 0;
    status?: string | '';
    createDtm?: string | '';
    createBy?: string | '';
    lastUpdateDtm?: string | '';
    lastUpdateBy?: string | '';
    imageType?: string | '';
    actionBy?: string | '';
}


export type LandingPageModelResponse = {
    data: LandingPageModel
} & BaseDataResponse

export type LandingPageModelResponseList = {
    data: LandingPageModel[]
} & BaseDataResponse


export type LandingPageAnnouncementModel = {
    id: number | null;
    announcementName: string;
    imageId: number | null;
    instagramUrl: string;
    instagramStatus: string;
    facebookUrl: string;
    facebookStatus: string;
    status: string;
    statusDesc: string;
    createDtm: Date | null;
    createBy: string;
    lastUpdateDtm: Date | null;
    lastUpdateBy: string;
    imageFileName: string;
    actionBy: string;
    imageFileUrl: string;
    listAttachFile: any[];
    announcementType: string;
};

export const createDefaultLandingPageAnnouncementModel = (): LandingPageAnnouncementModel => ({
    id: 0,
    announcementName: '',
    imageId: 0,
    instagramUrl: '',
    instagramStatus: 'INACTIVE',
    facebookUrl: '',
    facebookStatus: 'INACTIVE',
    status: 'ACTIVE',
    statusDesc: 'เปิดการใช้งาน',
    createDtm: null,
    createBy: '',
    lastUpdateDtm: null,
    lastUpdateBy: '',
    imageFileName: '',
    actionBy: '',
    imageFileUrl: '',
    listAttachFile: [],
    announcementType: ''
})

export type LandingPageAnnouncementModelResponse = {
    data: LandingPageAnnouncementModel
} & BaseDataResponse

export type LandingPageAnnouncementModelResponseList = {
    data: LandingPageAnnouncementModel[]
} & BaseDataResponse


export type LandingStatCounterModel = {
    id: number;
    title: string;
    statCounterValue1: string;
    statCounterValue2: string;
    statCounterValue3: string;
    statCounterValue4: string;
    statType: string;
    status: string;
    statusDesc: string;
    createDtm?: Date | null | string;
    createBy: string;
    lastUpdateDtm?: Date | null | string;
    lastUpdateBy: string;
    actionBy: string;
}

export type LandingStatCounterModelResponse = {
    data: LandingStatCounterModel
} & BaseDataResponse