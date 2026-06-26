import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from 'src/store/types';

import { FileModel } from 'src/types/file.model';
import { PhotoType } from 'src/types/photo.type';

export type PromotionPhoto = {
    id: number,
    name: string,
    price: number,
    listPhoto: any[]
}

export type fileState = {
    fileModel?: FileModel;
    selectImagePhoto?: PhotoType;
    openDialogSelectImage?: boolean;
    resultSearchMyFace: PhotoType[];
    isSearchMyFace?: boolean;
    searchErrorStatus?: string;
    fileForSearchMyFace?: File;
}

const initialState: fileState = {
    fileModel: undefined,
    selectImagePhoto: undefined,
    openDialogSelectImage: false,
    resultSearchMyFace: [],
    isSearchMyFace: false,
    searchErrorStatus: '',
    fileForSearchMyFace: undefined
}

const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        setFileModel: (state, action) => {
            state.fileModel = action.payload;
        },
        setSelectImagePhoto: (state, action) => {
            state.openDialogSelectImage = true;
            state.selectImagePhoto = action.payload;
        },
        setOpenDialogSelectImage: (state, action) => {
            state.openDialogSelectImage = action.payload;
        },
        setResultSearchMyFace: (state, action) => {
            state.resultSearchMyFace = action.payload;
        },
        setIsSearchMyFace: (state, action) => {
            state.isSearchMyFace = action.payload
        },
        setSearchErrorStatus: (state, action) => {
            state.searchErrorStatus = action.payload
        },
        setFileForsearchMyFace: (state, action) => {
            state.fileForSearchMyFace = action.payload
        },
    },
})

export const { setFileModel, setSelectImagePhoto, setOpenDialogSelectImage, setResultSearchMyFace, setIsSearchMyFace, setSearchErrorStatus, setFileForsearchMyFace} = fileSlice.actions;

export const seleceFileModel = (state: RootState) => state.file;

export default fileSlice.reducer;
