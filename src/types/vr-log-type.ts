import { BaseDataResponse } from "src/api/base/types";

export type VrLogModel = {
    id: number;
    orderNumber: string;
    orderTicketCodestring: string;
    vrId: number;
    location: string;
    distance: number;
    phour: string;
    pminute: string;
    psecond: string;
    imageFileId: number;
    fileName: string;
    actionBy: string;
    unit: string;
    status: string;
    statusDesc: string;
    statusDescEn: string;
    imageUrl: string;
    filePath: string;
    eventUrl: string;
    createDtm?: Date;
}

export const createDefaultVrLogModel = (): VrLogModel => ({
    id: 0,
    orderNumber: '',
    orderTicketCodestring: '',
    vrId: 0,
    location: '',
    distance: 0,
    phour: '',
    pminute: '',
    psecond: '',
    imageFileId: 0,
    fileName: '',
    actionBy: '',
    unit: '',
    status: '',
    statusDesc: '',
    statusDescEn: '',
    imageUrl: '',
    filePath: '',
    eventUrl: '',
});

export type VrLogModelResponse = {
    data: VrLogModel
} & BaseDataResponse;

export type VrLogModelListResponse = {
    data: VrLogModel[]
} & BaseDataResponse;


export type MedalModel = {
    medalAmount: number;
    completedMedalAmount: number;
    listMedal: {
        imageActive: string;
        imageInActive: string;
        eventNameTh: string;
        eventNameEn: string;
        ticketNameTh: string;
        ticketNameEn: string;
        bibNumber: string;
    }[]
}

export type MedalModelResponse = {
    data: MedalModel
} & BaseDataResponse;


