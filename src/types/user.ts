import { BaseDataResponse } from 'src/api/base/types';

// ----------------------------------------------------------------------

export type IUserTableFilterValue = string | string[];

export type IUserTableFilters = {
  name: string;
  role: string[];
  status: string;
};

// ----------------------------------------------------------------------

export type IUserSocialLink = {
  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
};

export type IUserProfileCover = {
  name: string;
  role: string;
  coverUrl: string;
  avatarUrl: File | string | null;
  handleDropCallBack: (file: File) => void;
  color?: any;
  disabled?: boolean;
};

export type IUserProfile = {
  id: string;
  role: string;
  quote: string;
  email: string;
  school: string;
  country: string;
  company: string;
  totalFollowers: number;
  totalFollowing: number;
  socialLinks: IUserSocialLink;
};

export type IUserProfileFollower = {
  id: string;
  name: string;
  country: string;
  avatarUrl: string;
};

export type IUserProfileGallery = {
  id: string;
  title: string;
  imageUrl: string;
  postedAt: Date;
};

export type IUserProfileFriend = {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
};

export type IUserProfilePost = {
  id: string;
  media: string;
  message: string;
  createdAt: Date;
  personLikes: {
    name: string;
    avatarUrl: string;
  }[];
  comments: {
    id: string;
    message: string;
    createdAt: Date;
    author: {
      id: string;
      name: string;
      avatarUrl: string;
    };
  }[];
};

export type IUserCard = {
  id: string;
  name: string;
  role: string;
  coverUrl: string;
  avatarUrl: string;
  totalPosts: number;
  totalFollowers: number;
  totalFollowing: number;
};

export type IUserItem = {
  id: string;
  name: string;
  city: string;
  role: string;
  email: string;
  state: string;
  status: string;
  address: string;
  country: string;
  zipCode: string;
  company: string;
  avatarUrl: string;
  phoneNumber: string;
  isVerified: boolean;
};

export type IUserAccount = {
  userId?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  tel?: string;
  email?: string;
  birthDate?: string | Date | null;
  gender?: string;
  imageProfile?: string;
  idCard?: string;
  idpsNumber?: string;
  bloodGroup?: string;
  refreshToken?: string;
  userCode?: string;
  status?: string;
  password?: string;
  newPassword?: string;
  oldPassword?: string;

  address?: string;
  province?: string;
  district?: string;
  subDistrict?: string;
  zipcode?: string;
  policyAccept?: boolean;
  remark?: string;
  createDtm?: string;
  createBy?: string;
  lastUpdateDtm?: string;
  lastUpdateBy?: string;
  imageProfileUrl?: string;
};

export type IUserAccountBillingHistory = {
  id: string;
  price: number;
  createdAt: Date;
  invoiceNumber: string;
};

export type IUserAccountChangePassword = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};


export type UserAddressModel = {
  id?: number | 0;
  userCode?: string;
  userId?: number;
  userAddressCode?: string;
  fullName?: string;
  tel?: string;
  address?: string;

  provinceCode?: string;
  provinceDesc?: string;
  provinceNameTh?: string;
  provinceNameEng?: string;

  districtCode?: string;
  districtDesc?: string;
  districtNameTh?: string;
  districtNameEng?: string;

  subDistrictCode?: string;
  subDistrictDesc?: string;
  subDistrictNameTh?: string;
  subDistrictNameEng?: string;

  zipcode?: string;
  status?: string;
  statusDesc?: string;
  createDtm?: Date | null | string;
  createBy?: string;
  lastUpdateDtm?: Date | null | string;
  lastUpdateBy?: string;

  fullAddress?: string;
  actionBy?: string;
}

export type UserAddressModelResponse = {
  data: UserAddressModel
} & BaseDataResponse;

export type UserAddressModelListResponse = {
  data: UserAddressModel[]
} & BaseDataResponse;

export type FriendModel = {
  invalidUser?: boolean,
  code?: string,
  userCode?: string,
  listFriend?: ItemFriendModel[]
}

export type ItemFriendModel = {
  invalidUser?: boolean,
  code?: string,
  userType?: string,
  fullName?: string,
  listObject?: any[];
}

export type FriendModelResponse = {
  data: FriendModel
} & BaseDataResponse;

export type IUserAccountResponse = {
  data: IUserAccount
} & BaseDataResponse;
