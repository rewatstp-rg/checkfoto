import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from 'src/store/types';

import { EventPhotoFrameModel } from 'src/types/event-photo-frame.type';

export type eventPhotoFrameState = {
    listEventPhotoFrame?: EventPhotoFrameModel[];
}

const initialState: eventPhotoFrameState = {
    listEventPhotoFrame: undefined
}

const eventPhotoFrameSlices = createSlice({
    name: 'eventPhotoFrame',
    initialState,
    reducers: {
        setDiscount: (state, action) => {
            state.listEventPhotoFrame = action.payload;
        }
    },
})

export const { setDiscount } = eventPhotoFrameSlices.actions;

export const selectEventPhotoFrameReducer = (state: RootState) => state.eventPhotoFrame;

export default eventPhotoFrameSlices.reducer;
