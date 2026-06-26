import { createSlice } from '@reduxjs/toolkit';

import { DIALOG_MODE } from 'src/utils/constants';

import type { RootState } from 'src/store/types';

import { InputFieldModel } from 'src/types/input-column.model';
import { InputFieldOptionModel } from 'src/types/input-column-option.model';

export type InputColumnState = {
    inputColumnMode: DIALOG_MODE,
    inputColumnDetail?: InputFieldModel,
    listInputColumnOption: InputFieldOptionModel[]
}

const initialState: InputColumnState = {
    inputColumnMode: 'add',
    inputColumnDetail: undefined,
    listInputColumnOption: []
}

const inputColumnSlice = createSlice({
    name: 'import',
    initialState,
    reducers: {
        setInputColumnMode: (state, action) => {
            state.inputColumnMode = action.payload
        },
        setInputColumnDetail: (state, action) => {
            state.inputColumnDetail = action.payload
        },
        setInputColumnOption: (state, action) => {
            state.listInputColumnOption = action.payload
        },
    },
})

export const { setInputColumnMode, setInputColumnDetail, setInputColumnOption } = inputColumnSlice.actions;

export const selectInputColumn = (state: RootState) => state.inputColumn;

export default inputColumnSlice.reducer;
