import { createSlice, createDraftSafeSelector } from '@reduxjs/toolkit';

import type { RootState } from 'src/store/types';

import { EventPhoto } from 'src/types/photo.type';

export type eventState = {
    listEventByType: EventPhoto[];
    eventDetail?: EventPhoto;
}

const initialState: eventState = {
    listEventByType: [],
    eventDetail: undefined
}

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        setListEventByType: (state, action) => {
            state.listEventByType = action.payload
        },
        setEventDetail: (state, action) => {
            state.eventDetail = action.payload
        }
    },
})

export const {
    setListEventByType,
    setEventDetail
} = eventSlice.actions;

export const selectEvent = (state: RootState) => state.event;

export const selectEventByEventType = createDraftSafeSelector([({ event }: RootState) => event.listEventByType, (_, eventType: string) => eventType],
    (dataState, eventType) => dataState?.filter(eventModel => eventModel.eventType === eventType)
)

export default eventSlice.reducer;
