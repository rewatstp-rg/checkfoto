import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';

import { DAILOG_TITLE } from 'src/utils/constants';

import { showErrorMessage } from 'src/slices/error-message.slices';

import type { BaseErrorResponse } from '../base/types';

export const errorMiddleware: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      const error = action.payload as BaseErrorResponse
      const message = getErrorMessage(error);
      api.dispatch(showErrorMessage(message));
    }

    return next(action)
  }

const getErrorMessage = (error: BaseErrorResponse) => {
  const { code, details = [] } = error

  if (code === '102' && details.length) {
    return details
      .map((detail) => `${detail.key} ${detail.description}`)
      .join('\n')
  }

  return DAILOG_TITLE.seriveUnSuccess;
}
