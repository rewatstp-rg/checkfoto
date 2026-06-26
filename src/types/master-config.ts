import { BaseDataResponse } from "src/api/base/types";

import { BasePaginateRequest } from "./base-paginate";

export type ConfigGroup = {
  id?: number;
  listboxGroup?: string;
  listboxGroupDesc?: string;
  configStatus?: string;
  status?: string;
  statusDesc?: string;
  createDtm?: string;
  createBy?: string;
  lastUpdateDtm?: string;
  lastUpdateBy?: string;
}

export type ConfigGroupResponse = {
  data: ConfigGroup[]
} & BaseDataResponse;

export type ConfigGroupSearchRequest = {
  listboxGroupDesc: string;
  listboxGroup: string;
  status: string;
} & BasePaginateRequest;

export type Config = {
  listboxType?: string;
  listboxGroup: string;
  value1?: string;
  value2?: string;
  value3?: string;
  value4?: string;
  status?: string;
  id?: number;
  name?: string;
  nameEn?: string;
  sequence?: number;
  description?: string;
  configStatus?: string;
  lastUpdateDtm?: string;
  lastUpdateBy?: string;
  collectType?: string;
  key?: any;
}

export type ConfigResponse = {
  data: Config[]
} & BaseDataResponse;


export type MasterProvinceSearchRequest = {
  provinceName: string;
  provinceCode: string;
  status: string;
} & BasePaginateRequest;

export type MasterProvinceSearchResponse = {
  id?: number;
  provinceCode?: string;
  provinceNameTh?: string;
  provinceNameEng?: string;
  geoId?: string;
  seq?: number;
  status?: string;
  statusDesc?: string;
  lastUpdateDtm?: string;
  lastUpdateBy?: string;
};

export type ProvinceResponse = {
  data: MasterProvinceSearchResponse
} & BaseDataResponse

export type ProvinceResponseList = {
  data: MasterProvinceSearchResponse[]
} & BaseDataResponse


export type MasterDistrictSearchRequest = {
  provinceName?: string;
  provinceCode?: string;
  status?: string;
  districtCode?: string;
  districtName?: string;
  postcode?: string;
} & BasePaginateRequest;


export type MasterDistrictModel = {
  id?: number;
  provinceCode?: string;
  districtCode?: string;
  districtNameTh?: string;
  districtNameEng?: string;
  geoId?: string;
  status?: string;
  statusDesc?: string;
  lastUpdateDtm?: string;
  lastUpdateBy?: string;
}

export type MasterSubDistrictSearchRequest = {
  subDistrictCode?: string;
  provinceCode?: string;
  status?: string;
  districtCode?: string;
  subDistrictName?: string;
  zipcode?: string;
} & BasePaginateRequest;

export type MasterSubDistrictModel = {
  id?: number;
  provinceCode?: string;
  districtCode?: string;
  subDistrictCode?: string;
  subDistrictNameTh?: string;
  subDistrictNameEng?: string;
  zipcode?: string;
  status?: string;
  statusDesc?: string;
  lastUpdateDtm?: string;
  lastUpdateBy?: string;
}

export type MasterDistrictResponse = {
  data: MasterDistrictModel
} & BaseDataResponse

export type MasterDistrictResponseList = {
  data: MasterDistrictModel[]
} & BaseDataResponse


export type MasterSubDistrictResponse = {
  data: MasterSubDistrictModel
} & BaseDataResponse

export type MasterSubDistrictResponseList = {
  data: MasterSubDistrictModel[]
} & BaseDataResponse