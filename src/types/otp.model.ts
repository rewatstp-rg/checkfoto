import { BaseDataResponse } from "src/api/base/types";

export type OTPModel = {
    id?: number;
    otpType?: string;
    otpValue?: string;
    actionBy?: string;
    status?: string;
    lastUpdateDtm: Date | null;
};

export type OTPModelResponse = {
    data: OTPModel[]
  } & BaseDataResponse;
