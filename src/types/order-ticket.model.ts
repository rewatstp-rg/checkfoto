import { OrderTicketObjectModel } from "./order-ticket-object.model";

export type OrderTicketModel = {
    id?: number | null;
    orderDetailCode?: string;
    orderNumber?: string;
    uid?: string;
    ticketCode?: string;
    priceCode?: string;
    bibNumber?: string;
    ageGroup?: string;
    qrCode?: string;
    insuranceStatus?: string;
    status?: string;
    createDtm?: Date | null;
    createBy?: string;
    lastUpdateDtm?: Date | null;
    lastUpdateBy?: string;

    listObject?: OrderTicketObjectModel[] | [];
};