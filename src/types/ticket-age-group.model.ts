import { BaseDataResponse } from "src/api/base/types";

export type TicketAgeGroupModel = {
    id?: number | 0;
    ticketCode?: string;
    seq?: number | 0;
    gender?: string;
    genderDesc?: string;
    minAgeRange?: number | 0;
    maxAgeRange?: number | 0;
    ageGroupDesc?: string;
    status?: string;
    statusDesc?: string;
}


export type TicketAgeGroupModelListResponse = {
    data: TicketAgeGroupModel[]
} & BaseDataResponse;

export type TicketAgeGroupModelResponse = {
    data: TicketAgeGroupModel
} & BaseDataResponse;
