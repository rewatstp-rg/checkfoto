import { BaseDataResponse } from "src/api/base/types";

import { InputFieldModel } from "./input-column.model";
import { TicketPriceModel } from "./ticket-price.model";
import { TicketAgeGroupModel } from "./ticket-age-group.model";

export type TicketModel = {
    id?: number | 0;
    eventCode?: string;
    ticketCode?: string;
    ticketNameTh?: string;
    ticketNameEn?: string;
    sequence?: number | 0;
    ticketBalance?: number | 0;
    distance?: number | 0;
    updateTicketPrice?: number | 0;
    status?: string;
    statusDesc?: string;
    statusDescEn?: string;
    createDtm?: Date;
    createBy?: string;
    lastUpdateDtm?: Date;
    lastUpdateBy?: string;
    distanceUnit?: string;
    distanceUnitDesc?: string;
    ticketAgeGroup?: TicketAgeGroupModel[];
    listPrice?: TicketPriceModel[];
    ticketPriceActive?: TicketPriceModel;
    listTicketOption?: InputFieldModel[];
    maxAge?: number | 0;
    minAge?: number | 0;
}

export type TicketModelResponse = {
    data: TicketModel
} & BaseDataResponse;

export type TicketModelListResponse = {
    data: TicketModel[]
} & BaseDataResponse;
