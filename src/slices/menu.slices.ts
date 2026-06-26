import { createSlice, createDraftSafeSelector } from '@reduxjs/toolkit';

import type { RootState } from 'src/store/types';

import { NavItemBaseProps } from 'src/components/mega-menu';

export type MenuState = {
    listAllMenu: {
        id: string;
        subHeader: string;
        items: NavItemBaseProps[];
    }[];
    listMenuAuthority: any[];
    menuType: string
}

const initialState: MenuState = {
    listAllMenu: [],
    listMenuAuthority: [],
    menuType: '',
}

const authMenuSlice = createSlice({
    name: 'authMenu',
    initialState,
    reducers: {
        setListAllMenu: (state, action) => {
            let listMenu: any[] = [];

            action.payload.forEach((res: any) => {
                if (res?.items) {
                    listMenu = [...listMenu, ...res.items];
                }
            });

            state.listMenuAuthority = listMenu;
            state.listAllMenu = action.payload;
        },
        setMenuType: (state, action) => {
            state.menuType = action.payload;
        }
    },
})

export const { setListAllMenu, setMenuType } = authMenuSlice.actions;

export const selectAuthMenu = (state: RootState) => state.authMenu;

export const selectAuthMenuById = createDraftSafeSelector([({ authMenu }: RootState) => authMenu.listMenuAuthority, (_, id: string) => id],
    (dataState, id) => dataState.find(menu => menu.id === id)
)

//   export const selectAuthorizeByMenuId = createDraftSafeSelector(
//     [
//       ({ authMenu }: RootState) => authMenu.listAllMenu,
//       (_, menuId: string) => menuId
//     ],
//     (dataState = [], menuId) => dataState.find(menu => menu.id === menuId)?.authorize
//   )

export default authMenuSlice.reducer;
