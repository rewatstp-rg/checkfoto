import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from 'src/store/types';

import { EventPhotoType } from 'src/types/event-photo.type';

export type EventPhotoState = {
    eventPhotoDetail?: EventPhotoType,
}

const initialState: EventPhotoState = {
    eventPhotoDetail: undefined,
}

const eventPhotoSlice = createSlice({
    name: 'eventPhoto',
    initialState,
    reducers: {
        setEventPhotoDetail: (state, action) => {
            state.eventPhotoDetail = action.payload
        },
    },
})

export const { setEventPhotoDetail } = eventPhotoSlice.actions;

export const selectEventPhotoSlice = (state: RootState) => state.eventPhoto;

export default eventPhotoSlice.reducer;
