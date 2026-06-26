import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from 'src/store/types';

import { UserProfileModel } from 'src/types/authen.model';

export type DialogLoginState = {
    open: boolean,
    urlRedirct: string,
    dialogNoneEmailOpen: boolean,
    userProfileNoneEmail?: UserProfileModel
}

const initialState: DialogLoginState = {
    open: false,
    urlRedirct: '',
    dialogNoneEmailOpen: false,
    userProfileNoneEmail: undefined
}

const dialogLoginSlices = createSlice({
    name: 'dialogLogin',
    initialState,
    reducers: {
        showDialogLogin: (state, action) => {
            state.open = true;
            state.urlRedirct = action.payload;
            // console.log("🚀 ~ file: dialog-login.slices.ts:28 ~ action.payload:", action.payload)
        },
        closeDialogLogin: (state) => {
            state.open = false;
            state.urlRedirct = '';
        },
        setUrlRedirct: (state, action) => {
            state.urlRedirct = action.payload
        },
        setNoneEmailDialog: (state, action) => {
            state.dialogNoneEmailOpen = true;
            state.userProfileNoneEmail = action.payload;
        },
        setNoneEmailDialogClose: (state) => {
            state.dialogNoneEmailOpen = false;
        },
    },
})

export const { showDialogLogin, closeDialogLogin, setUrlRedirct, setNoneEmailDialog, setNoneEmailDialogClose } = dialogLoginSlices.actions;

export const selectDialogLogin = (state: RootState) => state.dialogLogin;

export default dialogLoginSlices.reducer;
