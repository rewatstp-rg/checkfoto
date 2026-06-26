import { BaseDataResponse } from "src/api/base/types";

export type AuthenUserModel = {
    userId: number | 0,
    firstname: string | '';
    lastname: string | '';
    username: string | '';
    password?: string;
    email: string | '';
    tel?: string,
    accessToken: string | '';
    imageProfile?: string | '';
}

export type AuthResponse = {
    data: AuthenUserModel
} & BaseDataResponse;

export type UserProfileModel = {
    userId?: number | 0;
    adminUserId?: number | 0;
    username?: string | '';
    email?: string | '';
    firstName?: string | '';
    middleName?: string | '';
    lastName?: string | '';
    password?: string | '';
    newPassword?: string | '';
    oldPassword?: string | '';
    tel?: string | '';
    birthDate?: string | '';
    gender?: string | '';
    address?: string | '';
    province?: string | '';
    district?: string | '';
    subDistrict?: string | '';
    zipcode?: string | '';
    imageProfile?: string | '';
    imageProfileUrl?: string | '';
    idpsNumber?: string | '';
    remark?: string | '';
    userProviderId?: number | 0;
    providerName?: string | '';
    providerId?: string | '';
    roleId?: string | '';
    roleName?: string | '';
    roleType?: string | '';
    invalidUser?: boolean | false;
    userStatus?: string | '';
    status?: string | '';
    actionBy?: string | '';
    systemProviderKey?: string | '';
    code?: number | 0;
    refreshToken?: string | '';
    photoUrl?: string | '';
    authenType?: string | '';
    policyAccept?: boolean | false;
    listProvider?: UserProviderModel[] | [];
    synProvider?: UserProviderModel;
}

export type UserProviderModel = {
    userProviderId: number | 0;
    userId: number | 0;
    providerName: string | '';
    providerId: string | '';
    email: string | '';
    password: string | '';
    imageProfile: string | '';
    systemProviderKey: string | '';
    status: string | '';
    createDtm?: Date;
    createBy: string | '';
    lastUpdateDtm?: Date;
    lastUpdateBy: string | '';
    actionBy: string | '';
}