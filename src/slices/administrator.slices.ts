import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from 'src/store/types';

import { AdminUserModel } from 'src/types/administrator.model';
import { BasePaginateResponse } from 'src/types/base-paginate';

export type AdministratorState = {
    administratorDetail?: AdminUserModel,
    searchAdministratorResult?: BasePaginateResponse<AdminUserModel>
}

const initialState: AdministratorState = {
    administratorDetail: undefined,
    searchAdministratorResult: undefined
}

const administratorSlice = createSlice({
    name: 'administrator',
    initialState,
    reducers: {
        setAdministratorDetail: (state, action) => {
            state.administratorDetail = action.payload
        },
        setSearchAdministratorResult: (state, action) => {
            state.searchAdministratorResult = action.payload
        },
    },
})

export const { setAdministratorDetail, setSearchAdministratorResult } = administratorSlice.actions;

export const selectAdministrator = (state: RootState) => state.administrator;

export default administratorSlice.reducer;
