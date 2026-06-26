import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from 'src/store/types';

export type ImportState = {
    importModel?: any,
    importSearchResult?: any,
    pageType?: string,
    importFileDetail?: any,
    importFileDetailTempResult?: any
}

const initialState: ImportState = {
    importModel: undefined,
    importSearchResult: undefined,
    pageType: '',
    importFileDetail: undefined,
    importFileDetailTempResult: undefined
}

const importSlice = createSlice({
    name: 'import',
    initialState,
    reducers: {
        setImportModel: (state, action) => {
            state.importModel = action.payload
        },
        setImportSearchResult: (state, action) => {
            state.importSearchResult = action.payload
        },
        setPageType: (state, action) => {
            state.pageType = action.payload
        },
        setImportFileDetail: (state, action) => {
            state.importFileDetail = action.payload
        },
        setImportFileDetailTempResult: (state, action) => {
            state.importFileDetailTempResult = action.payload
        },
    },
})

export const { setImportModel, setImportSearchResult, setPageType, setImportFileDetail, setImportFileDetailTempResult } = importSlice.actions;

export const selectImport = (state: RootState) => state.import;

export default importSlice.reducer;
