import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from 'src/store/types';

import { LandingPageModel, LandingPageAnnouncementModel } from 'src/types/landing-page.model';

export type landingPageState = {
    listLandingCard?: LandingPageModel[],
    listLandingImage?: LandingPageModel[],
    listLandingContent?: LandingPageModel[],
    listAnnouncement: LandingPageAnnouncementModel[],
    activeSection: string
}

const initialState: landingPageState = {
    listLandingCard: [],
    listLandingImage: [],
    listLandingContent: [],
    listAnnouncement: [],
    activeSection: ''
}

const landingPageSlice = createSlice({
    name: 'landingPage',
    initialState,
    reducers: {
        // setCustomerDetail: (state, action) => {
        //     state.customerDetail = action.payload
        // },
        // setSearchCustomerResult: (state, action) => {
        //     state.searchCustomerResult = action.payload
        // },
        setListLandingCard: (state, action) => {
            state.listLandingCard = action.payload
        },
        setListLandingImage: (state, action) => {
            state.listLandingImage = action.payload
        },
        setListLandingContent: (state, action) => {
            state.listLandingContent = action.payload
        },
        setListAnnouncement: (state, action) => {
            state.listAnnouncement = action.payload
        },
        setActiveSection: (state, action) => {
            state.activeSection = action.payload
        }
    },
})

export const { setListLandingCard, setListLandingContent, setListLandingImage, setListAnnouncement, setActiveSection } = landingPageSlice.actions;

export const selectLandingPage = (state: RootState) => state.landingPage;

export default landingPageSlice.reducer;