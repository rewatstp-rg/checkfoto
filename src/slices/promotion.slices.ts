import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from 'src/store/types';

import { TicketModel } from 'src/types/ticket.model';
import { IPromotionType } from 'src/types/promotion.type';

export type promotionState = {
    promotionDetail?: IPromotionType;
    listTicketSelectedOption: TicketModel[]
}

const initialState: promotionState = {
    promotionDetail: undefined,
    listTicketSelectedOption: []
}

const promotionSlice = createSlice({
    name: 'promotion',
    initialState,
    reducers: {
        setPromotionDetail: (state, action) => {
            state.promotionDetail = action.payload
        },
        setListTicketSelectedOption: (state, action) => {
            state.listTicketSelectedOption = action.payload
        },
    },
})

export const { setPromotionDetail, setListTicketSelectedOption } = promotionSlice.actions;

export const selectPromotion = (state: RootState) => state.promotion;

export default promotionSlice.reducer;
