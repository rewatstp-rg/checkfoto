import { createSlice } from '@reduxjs/toolkit';

import { DIALOG_MODE } from 'src/utils/constants';

import type { RootState } from 'src/store/types';

import { OrganizerModel } from 'src/types/organizer.model';
import { BasePaginateResponse } from 'src/types/base-paginate';
import type { Config, ConfigGroup, MasterDistrictModel, MasterSubDistrictModel, MasterProvinceSearchResponse } from 'src/types/master-config';

export type MasterDataState = {
    listCustomerTypeOption: Config[],
    listBranchTypeOption: Config[],
    listRoleCustomerOption: Config[],
    searchProvinceResult?: BasePaginateResponse<MasterProvinceSearchResponse>,
    listProvinceStatusOption: Config[],
    provinceDetail: MasterProvinceSearchResponse,
    provinceDetailDialogMode: DIALOG_MODE,
    districtDetail?: MasterDistrictModel,
    districtDetailDialogMode: DIALOG_MODE,
    subDistrictDetail?: MasterSubDistrictModel,
    subDistrictDetailDialogMode: DIALOG_MODE,
    searchDistrictResult?: BasePaginateResponse<MasterDistrictModel>,
    searchConfigGroupResult?: BasePaginateResponse<ConfigGroup>,
    listConfigByGroup?: Config[],
    configGroupDetail?: ConfigGroup,
    configGroupDetailDialogMode: DIALOG_MODE,
    searchSubDistrictResult?: BasePaginateResponse<MasterSubDistrictModel>,
    listProvinceOption: MasterProvinceSearchResponse[],
    listDistrictOption: MasterDistrictModel[],
    listAllListboxGroup: Config[],
    listboxDetail?: Config,
    listboxDetailDialogMode: DIALOG_MODE,
    listTemplateType: Config[],
    listInputControlType: Config[],
    listInputCol: Config[],
    listInputType: Config[],

    // New
    listDefaultStatus: Config[],
    listEventTypeOption: Config[],
    listEventStatusOption: Config[],
    listRegisterStatusOption: Config[],
    listPaymentGateWayOption: Config[],
    listPaymentGateWayUnitOption: Config[],
    listPaymentGateWayStatusOption: Config[],
    listTagOption: Config[],
    listRegisterTypeOption: Config[],
    listOrganizerOption: OrganizerModel[],
    listEventOption: Config[],
    listDistanceUnitOption: Config[],
    listTicketStatusOption: Config[],
    listPriceTypeOption: Config[],
    listAgeGroupStatusOption: Config[],
    listGenderOption: Config[],
    listEventSectionStatusOption: Config[],
    clientListDistrict: MasterDistrictModel[];
    clientAddressDistrictCode: string;
    clientListSubDistrict: MasterSubDistrictModel[];
    clientAddressProviceCode: string;
    listEventProvince: Config[];
}

const initialState: MasterDataState = {
    listCustomerTypeOption: [],
    listBranchTypeOption: [],
    listRoleCustomerOption: [],
    searchProvinceResult: undefined,
    listProvinceStatusOption: [],
    provinceDetail: {
        id: 0,
        provinceCode: '',
        provinceNameTh: '',
        provinceNameEng: '',
        geoId: '',
        seq: 0,
        status: '',
        statusDesc: '',
        lastUpdateDtm: '',
        lastUpdateBy: ''
    },
    provinceDetailDialogMode: 'add',
    districtDetail: undefined,
    districtDetailDialogMode: 'add',
    searchDistrictResult: undefined,
    searchConfigGroupResult: undefined,
    listConfigByGroup: [],
    configGroupDetail: undefined,
    configGroupDetailDialogMode: 'add',
    subDistrictDetail: undefined,
    subDistrictDetailDialogMode: 'add',
    searchSubDistrictResult: undefined,
    listProvinceOption: [],
    listDistrictOption: [],
    listAllListboxGroup: [],
    listboxDetail: undefined,
    listboxDetailDialogMode: 'add',
    listTemplateType: [],
    listInputControlType: [],
    listInputCol: [],
    listInputType: [],

    // New
    listDefaultStatus: [],
    listEventTypeOption: [],
    listEventStatusOption: [],
    listRegisterStatusOption: [],
    listPaymentGateWayOption: [],
    listPaymentGateWayUnitOption: [],
    listPaymentGateWayStatusOption: [],
    listTagOption: [],
    listRegisterTypeOption: [],
    listOrganizerOption: [],
    listEventOption: [],
    listDistanceUnitOption: [],
    listTicketStatusOption: [],
    listPriceTypeOption: [],
    listAgeGroupStatusOption: [],
    listGenderOption: [],
    listEventSectionStatusOption: [],
    clientListDistrict: [],
    clientAddressDistrictCode: '',
    clientListSubDistrict: [],
    clientAddressProviceCode: '',
    listEventProvince: []
}

const masterDataSlice = createSlice({
    name: 'MasterData',
    initialState,
    reducers: {
        setListCustomerTypeOption: (state, action) => {
            state.listCustomerTypeOption = action.payload
        },
        setListRoleCustomerOption: (state, action) => {
            state.listRoleCustomerOption = action.payload
        },
        setSearchProvinceResult: (state, action) => {
            state.searchProvinceResult = action.payload
        },
        setProvinceStatusOption: (state, action) => {
            state.listProvinceStatusOption = action.payload
        },
        setProvinceDetail: (state, action) => {
            state.provinceDetail = action.payload
        },
        setProvinceDetailDialogMode: (state, action) => {
            state.provinceDetailDialogMode = action.payload
        },
        setDistrictDetail: (state, action) => {
            state.districtDetail = action.payload
        },
        setDistrictDetailDialogMode: (state, action) => {
            state.districtDetailDialogMode = action.payload
        },
        setSearchDetailResult: (state, action) => {
            state.searchDistrictResult = action.payload
        },
        setSearchConfigGroupResult: (state, action) => {
            state.searchConfigGroupResult = action.payload
        },
        setListConfigByGroup: (state, action) => {
            state.listConfigByGroup = action.payload
        },
        setConfigGroupDetail: (state, action) => {
            state.configGroupDetail = action.payload
        },
        setConfigGroupDetailDialogMode: (state, action) => {
            state.configGroupDetailDialogMode = action.payload
        },
        setSubDistrictDetail: (state, action) => {
            state.subDistrictDetail = action.payload
        },
        setSubDistrictDetailDialogMode: (state, action) => {
            state.subDistrictDetailDialogMode = action.payload
        },
        searchSubDistrictResult: (state, action) => {
            state.searchSubDistrictResult = action.payload
        },
        setListProvinceOption: (state, action) => {
            state.listProvinceOption = action.payload;
        },
        setListDistrictOption: (state, action) => {
            state.listDistrictOption = action.payload
        },
        setListAllListboxGroup: (state, action) => {
            state.listAllListboxGroup = action.payload
        },
        setListboxDetail: (state, action) => {
            state.listboxDetail = action.payload
        },
        setListboxDetailDialogMode: (state, action) => {
            state.listboxDetailDialogMode = action.payload
        },
        setTemplateTypeOption: (state, action) => {
            state.listTemplateType = action.payload
        },
        setInputControlTypeOption: (state, action) => {
            state.listInputControlType = action.payload
        },
        setListInputColOption: (state, action) => {
            state.listInputCol = action.payload
        },
        setListInputTypeOption: (state, action) => {
            state.listInputType = action.payload
        },

        setListDefaultStatus: (state, action) => {
            state.listDefaultStatus = action.payload
        },
        setListEventTypeOption: (state, action) => {
            state.listEventTypeOption = action.payload
        },
        setListEventStatusOption: (state, action) => {
            state.listEventStatusOption = action.payload
        },
        setListRegisterStatusOption: (state, action) => {
            state.listRegisterStatusOption = action.payload
        },
        setlistPaymentGateWayOption: (state, action) => {
            state.listPaymentGateWayOption = action.payload
        },
        setlistPaymentGateWayUnitOption: (state, action) => {
            state.listPaymentGateWayUnitOption = action.payload
        },
        setListPaymentGateWayStatusOption: (state, action) => {
            state.listPaymentGateWayStatusOption = action.payload
        },
        setListTagOption: (state, action) => {
            state.listTagOption = action.payload
        },
        setListRegisterTypeOption: (state, action) => {
            state.listRegisterTypeOption = action.payload
        },
        setListOrganizerOption: (state, action) => {
            state.listOrganizerOption = action.payload
        },
        setListEventOption: (state, action) => {
            state.listEventOption = action.payload
        },
        setListDistanceUnitOption: (state, action) => {
            state.listDistanceUnitOption = action.payload
        },
        setListTicketStatusOption: (state, action) => {
            state.listTicketStatusOption = action.payload
        },
        setListPriceTypeOption: (state, action) => {
            state.listPriceTypeOption = action.payload
        },
        setListAgeGroupStatusOption: (state, action) => {
            state.listAgeGroupStatusOption = action.payload
        },
        setListGenderOption: (state, action) => {
            state.listGenderOption = action.payload
        },
        setListEventSectionStatusOption: (state, action) => {
            state.listEventSectionStatusOption = action.payload
        },
        setClientListDistrict: (state, action) => {
            state.clientListDistrict = action.payload
        },
        setClientAddressDistrictCode: (state, action) => {
            state.clientAddressDistrictCode = action.payload
        },
        setClientListSubDistrict: (state, action) => {
            state.clientListSubDistrict = action.payload
        },
        setClientAddressProviceCode: (state, action) => {
            state.clientAddressProviceCode = action.payload
        },
        setListEventProvince: (state, action) => {
            state.listEventProvince = action.payload
        }

    },
})

export const {
    setListCustomerTypeOption,
    setListRoleCustomerOption,
    setSearchProvinceResult,
    setProvinceStatusOption,
    setProvinceDetail,
    setProvinceDetailDialogMode,
    setDistrictDetail,
    setDistrictDetailDialogMode,
    setSearchDetailResult,
    setSearchConfigGroupResult,
    setListConfigByGroup,
    setConfigGroupDetail,
    setConfigGroupDetailDialogMode,
    setSubDistrictDetail,
    setSubDistrictDetailDialogMode,
    searchSubDistrictResult,
    setListProvinceOption,
    setListDistrictOption,
    setListAllListboxGroup,
    setListboxDetail,
    setListboxDetailDialogMode,
    setInputControlTypeOption,
    setListInputColOption,
    setListInputTypeOption,

    setListDefaultStatus,
    setListEventTypeOption,
    setListEventStatusOption,
    setListRegisterStatusOption,
    setlistPaymentGateWayOption,
    setlistPaymentGateWayUnitOption,
    setListPaymentGateWayStatusOption,
    setListTagOption,
    setListRegisterTypeOption,
    setListOrganizerOption,
    setListEventOption,
    setListDistanceUnitOption,
    setListTicketStatusOption,
    setListPriceTypeOption,
    setListAgeGroupStatusOption,
    setListGenderOption,
    setListEventSectionStatusOption,
    setClientListDistrict,
    setClientAddressDistrictCode,
    setClientListSubDistrict,
    setClientAddressProviceCode,
    setListEventProvince
} = masterDataSlice.actions;

export const selectMasterData = (state: RootState) => state.masterData;

export default masterDataSlice.reducer;
