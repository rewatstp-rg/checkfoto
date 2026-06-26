import { AxiosError, AxiosResponse } from 'axios'

import { BaseDataResponse, BaseErrorResponse } from './types'

export const createErrorMessageWithAxiosResponse = (
  res: AxiosResponse<BaseDataResponse, any>
) => ({error: { ...res.data.status } as BaseErrorResponse})

export const createErrorMessageWithAxiosError = (
  error: AxiosError<BaseDataResponse, any>
) => ({error: { ...error.response?.data } as BaseErrorResponse})
