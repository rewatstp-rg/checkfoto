import type { Method, AxiosRequestConfig } from 'axios'

export type AxiosBase = {
  baseUrl: string
}

export type BaseRequest = {
  url: string
  method: Method
  body?: AxiosRequestConfig['data']
  params?: AxiosRequestConfig['params']
  overrideBaseUrl?: boolean
}

export type BaseErrorResponse = {
  code: string
  details: {
    key: string
    description: string
    value: string
  }[]
}

export type BaseDataResponse = {
  status: {
    code: string
    description: string
    details: {
      key: string
      description: string
      value: string
    }[]
  }
}

export interface UrlParamTypes {
  type: string
  id?: string
}

export type BaseOption = {
  id: string
  name: any
  value: string
}

export type BaseUploadResponse = {
  success: boolean
  name: string
  contentType: string
  file: string
}

export type ExportData = {
  fileName: string
  contentType: string
  fileData: string
}

export type ExportDataResponse = {
  data: ExportData
} & BaseDataResponse

export type UploadDataResponse = {
  data: BaseUploadResponse
} & BaseDataResponse


export type BaseResponse<T> = {
  data: T
} & BaseDataResponse
