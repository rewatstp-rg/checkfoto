import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from 'src/store/types';

import { DiscountCodeModel } from 'src/types/discount.model';

export type discountState = {
    discountModel?: DiscountCodeModel
}

const initialState: discountState = {
    discountModel: undefined
}

const discountSlices = createSlice({
    name: 'discount',
    initialState,
    reducers: {
        setDiscount: (state, action) => {
            state.discountModel = action.payload;
        }
    },
})

export const { setDiscount } = discountSlices.actions;

export const selectDiscount = (state: RootState) => state.discount;

export default discountSlices.reducer;
