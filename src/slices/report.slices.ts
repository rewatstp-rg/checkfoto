import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from 'src/store/types';

export type ReportState = {
    reportModel?: any,
}

const initialState: ReportState = {
    reportModel: undefined,
}

const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
        setReportModel: (state, action) => {
            state.reportModel = action.payload
        },
    },
})

export const { setReportModel } = reportSlice.actions;

export const selectReport = (state: RootState) => state.report;

export default reportSlice.reducer;
