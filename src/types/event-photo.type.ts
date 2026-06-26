import { BaseDataResponse } from "src/api/base/types";

import { BasePaginateRequest } from "./base-paginate";
import { PaymentGatewayModel } from "./payment-gateway.model";

export type EventPhotoType = {
  id?: number;
  eventCode?: string;
  photographerRegisterStartDate?: string | Date;
  photographerRegisterEndDate?: string | Date;
  photoSaleDate?: string | Date;
  photoSaleEndDate?: string | Date;
  photographerPolicy?: string;
  discountStauts?: string;
  status?: string;
  createDtm?: string | Date | null;
  createBy?: string | null;
  lastUpdateDtm?: string | Date;
  lastUpdateBy?: string;
  photoSalePolicy?: string;
  publishedStatus?: boolean;
  listPhotoPaymentGateway?: PaymentGatewayModel[];
  eventType?: string;
  bannerFileUrl?: string;
  bannerFileId?: number;
  eventUrl?: string;
  eventNameTh?: string;
  eventNameEn?: string;
  sequence?: number;
  eventDate?: any;
  eventEndDate?: any;
  bannerFileName?: string;

  boothUploadPassword?: string;
  uploadFrameUrl?: string;
  uploadFrameThumbnailUrl?: string;
  imageWithFrameName?: string;
  idFrame?: string;
  imageUidFrame?: string;
  folderCode?: string;

  eventFree?: string;
};

export type EventPhotoResponseType = {
  data: EventPhotoType
} & BaseDataResponse;


export type PhotographerSearchResponse = {
  id: number;
  fullName: string;
  email: string;
  photographerCode: string;
  status: string;
  statusDesc: string;
  mobilePhoneNumber: string;
  joinedDate: Date;
  remark?: string;
};

export type PhotographerSearchRequest = BasePaginateRequest & {
  fullName?: string;
  email?: string;
  eventCode: string;
};

export type PhotographerSearchBaseResponse = {
  data: PhotographerSearchResponse
} & BaseDataResponse;