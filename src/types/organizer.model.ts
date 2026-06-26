import { BaseDataResponse } from "src/api/base/types";

export type OrganizerModel = {
    id?: number;
    organizerCode?: string;
    name?: string;
    status?: string;
    createDtm?: Date;
    createBy?: string;
    lastUpdateDtm?: Date;
    lastUpdateBy?: string;
}

export type OrganizerResponseListModel = {
    data :OrganizerModel[]
}& BaseDataResponse;
