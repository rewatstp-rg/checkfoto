import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from 'src/store/types';

import { AuthenUserModel } from 'src/types/authen.model';

export type AuthenState = {
    userAuthen?: AuthenUserModel;
    userImageUrl: string;
}

const initialState: AuthenState = {
    userAuthen: undefined,
    userImageUrl: ''
}

const userAuthenSlice = createSlice({
    name: 'userAuthen',
    initialState,
    reducers: {
        setUserAuthen: (state, action) => {
            state.userAuthen = action.payload
        },
        setUserImageUrl: (state, acton) => {
            state.userImageUrl = acton.payload
        }
    },
})

export const { setUserAuthen, setUserImageUrl } = userAuthenSlice.actions;

export const selectAuthenSlice = (state: RootState) => state.userAuthen;

export default userAuthenSlice.reducer;
