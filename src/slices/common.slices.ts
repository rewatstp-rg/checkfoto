import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from 'src/store/types';

import { Config } from 'src/types/master-config';

export type CommonState = {
    listEventCheckRegister: Config[]
}

const initialState: CommonState = {
    listEventCheckRegister: []
}

const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setListEventCheckRegister: (state, action) => {
            state.listEventCheckRegister = action.payload
        },
    },
})

export const { setListEventCheckRegister } = commonSlice.actions;

export const selectCommonSlice = (state: RootState) => state.common;

export default commonSlice.reducer;
