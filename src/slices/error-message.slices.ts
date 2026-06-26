import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from 'src/store/types';

import { AlertDialogModel } from 'src/types/alert-dialog.model';

export type ErrorMessageState = {
  open: boolean
  message: string
  loadingState: boolean
  alertDialogModel: AlertDialogModel;
  isLoadingDailog: boolean;
  kInlineCheckoutMessageError?: string
  loadingUploadState: boolean
}

const initialState: ErrorMessageState = {
  open: false,
  message: '',
  loadingState: false,
  alertDialogModel: {},
  isLoadingDailog: false,
  kInlineCheckoutMessageError: '',
  loadingUploadState: false
}

const errorMessageSlice = createSlice({
  name: 'errorMessage',
  initialState,
  reducers: {
    showErrorMessage: (state, action) => {
      state.open = true
      state.message = action.payload
    },
    closeErrorMessage: (state) => {
      state.open = false
      state.message = ''
    },
    setLoadingState: (state, action) => {
      state.loadingState = action.payload
    },
    setDialogMessage: (state, action) => {
      state.alertDialogModel = action.payload;
    },
    closeDialogMessage: (state) => {
      state.alertDialogModel.open = false;
    },
    setIsLoadingDailog: (state, action) => {
      state.isLoadingDailog = action.payload;
    },
    setKInlineCheckoutMessageError: (state, action) => {
      state.kInlineCheckoutMessageError = action.payload;
    },
    setLoadingUploadState: (state, action) => {
      state.loadingUploadState = action.payload
    },
  },
})

export const { showErrorMessage, closeErrorMessage, setLoadingState, setDialogMessage, closeDialogMessage, setIsLoadingDailog, setKInlineCheckoutMessageError, setLoadingUploadState } = errorMessageSlice.actions;

export const selectErrorMessage = (state: RootState) => state.errorMessage;

export default errorMessageSlice.reducer;
