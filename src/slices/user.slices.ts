import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from 'src/store/types';

import { UserAddressModel } from 'src/types/user';

export type userState = {
    listUserAddressByUserId: UserAddressModel[]
}

const initialState: userState = {
    listUserAddressByUserId: []
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setListUserAddressByUserId: (state, action) => {
            state.listUserAddressByUserId = action.payload
        },
        saveUserAddressById: (state, action) => {
            state.listUserAddressByUserId = action.payload
            const addressIndex = state.listUserAddressByUserId.findIndex((x) => x.id === action.payload.id);
            if (addressIndex >= 0) {
                state.listUserAddressByUserId[addressIndex] = action.payload;
            } else {
                state.listUserAddressByUserId.push(action.payload);
            }
        },
        setSelectAddress: (state, action) => {
            const addressIndex = state.listUserAddressByUserId.findIndex((x) => x.id === action.payload.id);
            if (addressIndex >= 0) {
                state.listUserAddressByUserId = state.listUserAddressByUserId.map((x, index) => ({ ...x, status: index !== addressIndex ? 'ACTIVE' : 'USED' }));
            }
        }
    },
})

export const { setListUserAddressByUserId, saveUserAddressById, setSelectAddress } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
