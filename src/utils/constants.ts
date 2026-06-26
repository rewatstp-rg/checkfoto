/* eslint-disable no-template-curly-in-string */

export const ENV_NAME_ADMIN = Object.freeze('ADMIN');
export const ENV_NAME_CUSTOMER = Object.freeze('CUSTOMER');

export const AUTH_INVALID_MESSAGE: any = Object.freeze({
  VALIDATION_FAILED: 'ชื่อหรือรหัสผ่านไม่ถูกต้อง',
  UNAUTHORIZED: 'กรุณาติดต่อผู้ดูแลระบบ',
  USER_EMAIL_DUPLICATE: 'อีเมลของท่านถูกใช้งานแล้ว กรุณาติดต่อผู้ดูแลระบบ'
});

export const AUTH_INVALID_MESSAGE_EN: any = Object.freeze({
  VALIDATION_FAILED: 'The name or password is incorrect.',
  UNAUTHORIZED: 'Please contact the system administrator.',
  USER_EMAIL_DUPLICATE: 'Your email address is already in use. Please contact the system administrator.',
});

export const AUTH_TYPE: any = Object.freeze({
  NEW_USER: 'NEW_USER',
  ACTIVE: 'ACTIVE',
  USER_VALID: 'USER_VALID'
})


export const STORAGE_KEYS = Object.freeze({
  USER_INFO: 'user-photo',
  PACKAGE_PHOTO: 'package-photo'
});

export const MASTER_CONFIG_GROUP = Object.freeze({
  REGISTER_STATUS: 'REGISTER_STATUS',
  CUSTOMER_TYPE: 'CUSTOMER_TYPE',
  EVENT_STATUS: 'EVENT_STATUS',
  ADMIN_STATUS: 'ADMIN_STATUS',
  PROVINCE_STATUS: 'PROVINCE_STATUS',
  INPUT_CONTROL_TYPE: 'INPUT_CONTROL_TYPE',
  INPUT_COL: 'INPUT_COL',
  INPUT_TYPE: 'INPUT_TYPE',
  EVENT_RACE_TYPE: 'EVENT_RACE_TYPE',
  DEFAULT_STATUS: 'DEFAULT_STATUS',
  PAYMENT_GATEWAY: 'PAYMENT_GATEWAY',
  PAYMENT_GATEWAY_UNIT: 'PAYMENT_GATEWAY_UNIT',
  PAYMENT_GATEWAY_STATUS: 'PAYMENT_GATEWAY_STATUS',
  TAG: 'TAG',
  EVENT_REGISTER_TYPE: 'EVENT_REGISTER_TYPE',
  DISTANCE_UNIT: 'DISTANCE_UNIT',
  TICKET_STATUS_OPTION: 'TICKET_STATUS',
  PRICE_TYPE: 'PRICE_TYPE',
  TICKET_AGE_GROUP_STATUS: 'TICKET_AGE_GROUP_STATUS',
  GENDER: 'GENDER',
  EVENT_SECTION_STATUS: 'EVENT_SECTION_STATUS'
});


export const DATA_TYPE_KEY = Object.freeze({
  CUSTOMER_NAME: 'CUSTOMER_FULL_NAME',
  CUSTOMER_CODE: 'CUSTOMER_NO',
  CLIENT_TAX_BRANCH_CODE: 'CUSTOMER_TAX_BRANCH_CODE', /** BRANCH */
  CLIENT_TAX_ID: 'CUSTOMER_TAX_ID'
});

export const CUSTOMER_TYPE = Object.freeze({
  CORPORATION: 'CORPORATION',
  INDIVIDUAL: 'INDIVIDUAL',
});

export const RESPONSE_STATUS = Object.freeze({
  SUCCESS: 'SUCCESS',
});

export const ERROR_MESSAGE = Object.freeze({
  REQUIRED: 'กรุณาระบุ',
  REQUIRED_REJECT: 'กรุณาระบุเหตุผลที่ไม่ผ่านการอนุมัติ',
  MIN: 'ต้องมีอย่างน้อย ${min} ตัวอักษร',
  MAX: 'ต้องไม่เกิน ${max} ตัวอักษร',
  PATTERN: 'รูปแบบไม่ถูกต้อง',
  PATTERN_DATE: 'รูปแบบไม่ถูกต้อง (ตัวอย่าง วัน/เดือน/ปี , 01/01/25xx)',
  EMAIL: 'รูปแบบของ อีเมล ไม่ถูกต้อง'
})

export const PAGE_SIZE_DEFAULT = Object.freeze(25);
export const ROW_PER_PAGE = Object.freeze([10, 25, 50, 100]);

export const PAGE_EDIT = Object.freeze('edit');
export const PAGE_MODIFY = Object.freeze('modify');
export const PAGE_ADD = Object.freeze('add');
export const PAGE_INQUIRY = Object.freeze('inquiry');

export const DAILOG_KEY = Object.freeze({
  add: 'add',
  modify: 'modify',
  inquiry: 'inquiry',
  delete: 'delete',
  alert: 'alert',
  upload: 'upload',
  uploadUnSuccess: 'uploadUnSuccess',
  success: 'success',
  unSuccess: 'unSuccess',
  fileSizeInvalid: 'fileSizeInvalid',
  fileInvalid: 'fileInvalid',
  submit: 'submit',
});

export const DAILOG_TITLE = Object.freeze({
  add: 'ยืนยันการเพิ่มข้อมูล',
  modify: 'ยืนยันการแก้ไขข้อมูล',
  delete: 'ยืนยันการลบข้อมูล',
  alert: 'แจ้งเตือนจากระบบ',
  upload: 'ยืนยันการอัพโหลดข้อมูล',
  uploadUnSuccess: 'ไฟล์ข้อมูลผิดผลาด',
  success: 'บันทึกข้อมูลเรียบร้อยแล้ว',
  unSuccess: 'บันทึกข้อมูลไม่สำเร็จแล้ว',
  fileSizeInvalid: 'ไฟล์ขนาดต้องไม่เกิน 5 MB',
  fileInvalid: 'ชนิดไฟล์ไม่ถูกต้อง',
  seriveUnSuccess: 'เกิดข้อผิดพลาด กรุณาติดต่อผู้ดูแลระบบ',
  submit: 'ยืนยันการส่งคำขอ',
});

export const DAILOG_MESSAGE = Object.freeze({
  add: 'ท่านต้องการเพิ่มข้อมูลหรือไม่ ?',
  modify: 'ท่านต้องการแก้ไขข้อมูลหรือไม่ ?',
  delete: 'ท่านต้องการลบข้อมูลหรือไม่ ?',
  success: 'บันทึกข้อมูลเรียบร้อยแล้ว',
  unSuccess: 'บันทึกข้อมูลไม่สำเร็จแล้ว',
  submit: 'ท่านต้องการส่งคำขอหรือไม่ ?',
});

export type DIALOG_MODE = 'add' | 'modify' | 'inquiry' | 'upload' | 'export';

export const DIALOG_MODE_KEY = Object.freeze({
  ADD: 'add',
  MODIFY: 'modify',
  INQUIRY: 'inquiry',
  UPLOAD: 'upload',
  EXPORT: 'export'
});

export const DIALOG_MODE_TITLE = Object.freeze({
  add: 'เพิ่มข้อมูล',
  modify: 'แก้ไขข้อมูล',
  inquiry: 'เรียกดูข้อมูล',
  upload: 'อัพโหลดข้อมูล',
  export: 'นำข้อมูลออก'
});

export const BRANCH_STATUS = Object.freeze({
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  DELETE: 'DELETE'
});

export const CUSTOMER_STATUS = Object.freeze({
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  DELETE: 'DELETE'
});

export const USER_STATUS = Object.freeze({
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  DELETE: 'DELETE'
});

export const ADMIN_USER_STATUS = Object.freeze({
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  DELETE: 'DELETE'
});

export const PROVINCE_STATUS = Object.freeze({
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
});

export const DEFAULT_STATUS = Object.freeze({
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
});

export const CUSTOMER_USER_DUPLICATE = Object.freeze('CUSTOMER_USER_DUPLICATE');
export const CUSTOMER_USER_EMAIL_DUPLICATE = Object.freeze('CUSTOMER_USER_EMAIL_DUPLICATE');

export const ALREADY_REGISTERED_EMAIL = Object.freeze('ALREADY_REGISTERED_EMAIL');
export const ADMIN_USER_DUPLICATE = Object.freeze('ADMIN_USER_DUPLICATE');


export const EVENT_RACE_TYPE = Object.freeze({
  RUNNING: 'RUNNING',
  TRAIL: 'TRAIL',
  BIKE: 'BIKE',
  SWIM: 'SWIM',
  KAYAK: 'KAYAK',
  TRI: 'TRI',
  SERVE_SKATE: 'SERVE_SKATE',
  VIRTUAL_RUN: 'VIRTUAL_RUN'
});

export const STEP_CODE = Object.freeze({
  REGISTER_CODE: 'STEP01',
  RUNNER_CODE: 'STEP02',
  SHIPPING_CODE: 'STEP03',
  MERCHANDISE_CODE: 'STEP50',
  PAYMENT_CODE: 'STEP90',
  HOTEL_CODE: 'STEP70'
});

export const HTML_KEY = Object.freeze({
  FNAME: 'FNAME',
  LNAME: 'LNAME',
  BIRTH: 'BIRTH',
  TEL: 'TEL',
  GENDER: 'GENDER',
  TICKET_CODE: 'TICKET_CODE',
  EMAIL: 'EMAIL',
  SHIRT: 'SHIRT',
  FOOD: 'FOOD',
  VACCINE_COVID: 'VACCINE_COVID',
  EM_CONTACT: 'EM_CONTACT',
  EM_TEL: 'EM_TEL',
  SICK: 'SICK',
  TICKET_NAME_TH: 'TICKET_NAME_TH',
  TICKET_NAME_EN: 'TICKET_NAME_EN',
  TICKET_PRICE: 'TICKET_PRICE',
  AGE_GROUP: 'AGE_GROUP',
  PRICE_CODE: 'PRICE_CODE',
  FILE_NAME: 'FILE_NAME',
  DISCOUNT: 'DISCOUNT',
  NATIONALITY: 'NATIONALITY',
  PROVINCE: 'PROVINCE',
  COUPON_CODE: 'COUPON_CODE',
  DISCOUNT_STATUS: 'DISCOUNT_STATUS',
  DISCOUNT_AMOUNT: 'DISCOUNT_AMOUNT',
  AMOUNT: 'AMOUNT',
  TOTAL_AMOUNT: 'TOTAL_AMOUNT',
  ID_CARD: 'ID_CARD',
  URL_RACE_PACK: 'URL_RACE_PACK',
  USER_TYPE: 'USER_TYPE',
  FILE_URL: 'FILE_URL',
  BIB_NAME: 'BIB_NAME',
  BLOOD_GROUP: 'BLOOD_GROUP',
  PROMOTION: 'PROMOTION',
  PROMOTION_DISCOUNT: 'PROMOTION_DISCOUNT',
  DISCOUNT_CODE: 'DISCOUNT_CODE'
});

export const SHIPPING_STATUS_CODE = Object.freeze({
  ALL: 'ALL',
  SHIPPING: 'SHIPPING',
  PICK_UP: 'PICK_UP'
});


export const ERROR_MESSAGE_EN = Object.freeze({
  REQUIRED: 'Please specify',
  REQUIRED_REJECT: 'Please specify the reason for disapproval.',
  MIN: 'There must be at least ${min} character',
  MAX: 'Must not exceed ${max} character',
  PATTERN: 'Invalid format',
  PATTERN_DATE: 'Invalid format (Example: Day/month/year, 01/01/20xx)',
  EMAIL: 'The email format is invalid.'
})

export const DAILOG_TITLE_EN = Object.freeze({
  add: 'Confirm adding data',
  modify: 'Confirm editing data',
  delete: 'Confirm deleting data',
  alert: 'System alert',
  upload: 'Confirm uploading data',
  uploadUnSuccess: 'Invalid data file',
  success: 'Data saved successfully',
  unSuccess: 'Data saved unsuccessfully',
  fileSizeInvalid: 'File size must not exceed 5 MB',
  fileInvalid: 'Invalid file type',
  seriveUnSuccess: 'An error occurred. Please contact the administrator',
  submit: 'Confirm sending request',
});

export const DAILOG_MESSAGE_EN = Object.freeze({
  add: 'Do you want to add information?',
  modify: 'Do you want to edit information?',
  delete: 'Do you want to delete the information?',
  success: 'Data has been recorded successfully.',
  unSuccess: 'Failed to save data.',
  submit: 'Do you want to send a request?',
});

export const AGE_GROUP_NOT_FOUND = Object.freeze({
  EN: 'Not found age group',
  TH: 'ไม่พบรุ่นอายุ'
});

export const PAYMENT_GATEWAY_TYPE = Object.freeze({
  CDC: 'C',
  TQR: 'Q',
  DIR: 'D',
  KC: 'KC'
});

export const EVENT_SHOP_CODE = Object.freeze(
  [
    {
      CODE: 'E94',
    }
  ]
);

export const ORDER_PACKAGE_TYPE = Object.freeze({
  NORMAL: 'NORMAL',
  ALL: 'ALL',
  ALL_VIDEO_AND_PHOTO: 'ALL_VIDEO_AND_PHOTO',
  ALL_VIDEO: 'ALL_VIDEO',
  VIDEO_ORIGINAL: 'VIDEO_ORIGINAL',
  LIMIT_LENGTH_PHOTO: 'LIMIT_LENGTH_PHOTO'
});

export const PRICE_TYPE = Object.freeze({
  ALL_VIDEO_AND_PHOTO: 'ALL_VIDEO_AND_PHOTO',
  ALL_VIDEO: 'ALL_VIDEO',
  ALL: 'ALL',
  VIDEO_ORIGINAL: 'VIDEO_ORIGINAL',
  LIMIT_LENGTH_PHOTO: 'LIMIT_LENGTH_PHOTO'
});

export const PRICE_TYPE_SHOW = Object.freeze({
  ALL_VIDEO_AND_PHOTO: 'ALL_VIDEO_AND_PHOTO',
  ALL_VIDEO: 'ALL_VIDEO',
  ALL: 'ALL'
});