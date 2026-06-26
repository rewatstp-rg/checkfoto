import axios, { AxiosRequestConfig } from 'axios';

import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const headers = { 'Accept-Language': 'th' }
const axiosInstance = axios.create({ baseURL: HOST_API, headers });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    root: '/api/authen',
    authenticate: '/user/authenticate',
    register: '/user/register',
    lineAuthentication: '/user/lineAuthentication',
    facebookAuthentication: '/user/facebookAuthentication',
    loginCustomer: '/api/authen/customer/authenticate',
    verifyUser: '/api/authen/customer/verifyUser',
    verifyAdminUser: '/api/authen/admin/verifyAdminUser',
    changePasswordAdminUser: '/api/app/adminUser/resetPassword',
    changePasswordCustomer: '/api/app/customerUserController/resetPassword',
    verifyUserProvider: '/user/verifyUserProvider',
    forgotPassword: 'api/authen/user/forgotPassword',
    forgotPasswordVerif: '/api/app/forgotPasswordCodeController/getByValue',
    resetForgotPassword: '/api/app/forgotPasswordCodeController/resetForgotPassword',
    googleValidateToken: '/user/googleValidateToken',
    refreshToken: '/user/refreshToken'
  },
  masterData: {
    root: '/api/app/masterDataController/',
    listboxByGroup: 'listboxByGroup',
    searchProvince: 'searchProvince',
    saveProvince: 'saveProvince',
    getProvinceByCode: 'getProvinceByCode',
    searchDistrict: 'searchDistrict',
    getByDistrictCode: 'listDistrictByDistrictCode',
    saveDistrict: 'saveDistrict',
    searchConfig: 'searchListboxGroup',
    getByConfigGroup: 'getListboxGroupMaster',
    searchSubDistrict: 'searchSubDistrict',
    getBySubDistrictCode: 'getBySubDistrictCode',
    listProvince: 'listProvince',
    listDistrictByProvinceCode: 'listDistrictByProvinceCode',
    saveSubDistrict: 'saveSubDistrict',
    listSubDistrictByDistrictCode: 'listSubDistrictByDistrictCode',
    listAllListboxGroup: 'listAllListboxGroup',
    listboxGroupMaster: 'listboxGroupMaster',
    saveListBoxGroupMaster: 'saveListBoxGroupMaster',
    saveListBoxMaster: 'saveListBoxMaster',
    getDocumentTypeByCustomer: 'getDocumentTypeByCustomer',
    getListboxMapRdByKey: 'getListboxMapRdByKey',
    listEventProvince: 'listEventProvince',
    listEventDropdown: 'listEventDropdown'
  },
  administrator: {
    root: '/api/app/adminUser/',
    searchAdminUser: 'search',
    getAdminByCode: 'getAdminByCode',
    createAdminUser: 'create',
    updateAdminUser: 'update',
    deleteAdminUser: 'delete'
  },
  report: {
    root: '/api/app/reportController/',
    demo: 'demo',
  },
  file: {
    root: '/api/app/fileController/',
    downloadFileById: 'downloadFileById'
  },
  inputColumn: {
    root: '/api/app/inputColumnController/',
    createInputColumn: 'createInputColumn',
    updateInputColumn: 'updateInputColumn',
    listInputColumnByTemplateCode: 'listInputColumnByTemplateCode',
    createInputColumnOption: 'createInputColumnOption',
    updateInputColumnOption: 'updateInputColumnOption',
    listInputColumnOption: 'listInputColumnOption',
    listInputColumnByTemplateCodeFromRedis: 'listInputColumnByTemplateCodeFromRedis',
    createListInputColumn: 'createListInputColumn',
    updateListInputColumn: 'updateListInputColumn'
  },
  menus: {
    root: '/api/v1/menus/',
    listAllMenu: 'listAllMenu'
  },
  event: {
    root: '/api/app/eventController/',
    listEventByEventType: 'listEventByEventType',
    getEventByEventUrlWeb: 'getEventByEventUrlWeb',
    getEventRegisterFormByUrl: 'getEventRegisterFormByUrl',
    getMerchandiseRegisterFormByUrl: 'getMerchandiseRegisterFormByUrl'
  },
  user: {
    root: '/api/app/userController/',
    saveUserAddress: 'saveUserAddress',
    listUserAddressByUserId: 'listUserAddressByUserId',
    listUserFriends: 'listUserFriends',
    saveUserProfile: 'saveUserProfile',
    resetPassword: 'resetPassword',
    saveUserProfileImage: 'saveUserProfileImage'
  },
  order: {
    root: '/api/app/orderPhotoController/',
    saveOrder: 'saveOrderPhoto',
    getOrderDetail: 'getOrderPhotoDetail',
    uploadPaymentSlip: 'uploadPaymentSlip',
    listUserOrder: 'listUserOrderPhoto',
    deleteOrderByUser: 'deleteOrderByUser',
    changePaymentGateway: 'changePaymentGateway',
    searchRacepack: 'searchRacepack',
    inquiryThaiQr: 'inquiryThaiQr',
    checkShirtBalance: 'checkShirtBalance',
    validateShirtRunner: 'validateShirtRunner',
    validateMerchandsie: 'validateMerchandsie',
    validateHotel: 'validateHotel',
    searchVrRacepack: 'searchVrRacepack',
    saveOrderPhotoForFree: 'saveOrderPhotoForFree',
  },
  discount: {
    root: '/api/app/discountController/',
    checkDiscountCode: 'checkDiscountCode'
  },
  common: {
    root: '/api/app/commonController/',
    listEventCheckRegister: 'listEventCheckRegister',
    uploadImageFrame: 'uploadImageFrame',
    countPhoto: 'countPhoto'
  },
  vr: {
    root: '/api/app/vrController/',
    uploadVrLog: 'uploadVrLog',
    viewVrHistoryLog: 'viewVrHistoryLog',
    getOrderVr: 'getOrderVr',
    searchRanking: 'searchRanking',
    listMedal: 'listMedal'
  },
  promotion: {
    root: '/api/app/promotionController/',
    getByPromotionCode: 'getByPromotionCode',
    checkPromotion: 'checkPromotion'
  },
  uploadFile: {
    root: '/api/app/uploadFileController/',
    saveFolder: 'saveFolder',
    validateFolderName: 'validateFolderName',
    listAllFolderByEventAndPhotographer: 'listAllFolderByEventAndPhotographer',
    listFileInFolder: 'listFileInFolder',
    downloadFile: 'downloadFile',
    uploadFile: 'uploadFile',
    getFolderByCode: 'getFolderByCode',
    downloadImageFile: 'downloadImageFile'
  },
  landingPage: {
    root: '/api/app/landingPageController/',
    createProduct: 'createProduct',
    updateProduct: 'updateProduct',
    listProduct: 'listProduct',
    createBanner: 'createBanner',
    updateBanner: 'updateBanner',
    listBanner: 'listBanner',
    createAboutUs: 'createAboutUs',
    updateAboutUs: 'updateAboutUs',
    listAboutUs: 'listAboutUs',
    listAnnouncement: 'listAnnouncement',
    getStatCounterById: 'getStatCounterById'
  },
  photo: {
    root: '/api/app/photoController/',
    searchImageByFace: 'searchImageByFace',
    listPhotoByOrder: 'listPhotoByOrder'
  },
  eventPhotoFrame: {
    root: '/api/app/eventPhotoFrameController/',
    listEventPhotoFrameByEventCode: 'listEventPhotoFrameByEventCode',
    getEventPhotoFrameByCode: 'getEventPhotoFrameByCode'
  },
  eventPhoto: {
    root: '/api/app/eventPhotoController/',
    getEventPhotoByEventUrlWeb: 'getEventPhotoByEventUrlWeb',
    checkEventByBoothPass: 'checkEventByBoothPass'
  },
  photoBooth: {
    root: '/api/app/photoboothController/',
    checkEventByBoothPass: 'checkEventByBoothPass',
    searchImageFrameByType: 'searchImageFrameByType',
    generatePresignedUrlForPhotobooth: 'generatePresignedUrlForPhotobooth',
    uploadFileSuccessForPhotobooth: 'uploadFileSuccessForPhotobooth'
  }
};
