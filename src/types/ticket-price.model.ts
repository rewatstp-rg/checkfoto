import { BaseDataResponse } from "src/api/base/types";

export type TicketPriceModel = {
    id?: number | 0;
    eventCode?: string;
    ticketCode?: string;
    priceCode?: string;
    priceType?: string;
    priceTypeDesc?: string | '';
    sequence?: number | 0;
    price?: number | 0;
    balance?: number | 0;
    releaseDate?: Date | null | undefined;
    endDate?: Date | null | undefined;
    status?: string;
    stautsDesc?: string;
    statusDescEn?: string;
    createDtm?: Date;
    createBy?: string;
    lastUpdateDtm?: Date;
    lastUpdateBy?: string;
    amount?: number | 0;
    soldOut?: number | 0;
    statusDesc?: string;
};

export type TicketPriceModelListResponse = {
    data: TicketPriceModel[]
} & BaseDataResponse;

export type TicketPriceModelResponse = {
    data: TicketPriceModel
} & BaseDataResponse;
