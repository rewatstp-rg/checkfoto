import { current, createSlice } from '@reduxjs/toolkit';

import uuidChar from 'src/utils/uuidv-char';
import { HTML_KEY, STEP_CODE } from 'src/utils/constants';
import { localStorageGetItem } from 'src/utils/storage-available';

import type { RootState } from 'src/store/types';
import { listProvince, listNationality } from 'src/_mock';

import { HotelType } from 'src/types/hotel.type';
import { ItemFriendModel } from 'src/types/user';
import { OrderModel } from 'src/types/order.model';
import { TicketModel } from 'src/types/ticket.model';
import { EventModel } from 'src/types/event-config.model';
import { MerchandiseType } from 'src/types/merchandise.type';
import { PaymentGatewayModel } from 'src/types/payment-gateway.model';
import { InputFieldOptionModel } from 'src/types/input-column-option.model';
import { InputFieldModel, DynamicFormType } from 'src/types/input-column.model';
import { StepModel, StepShippingModel, StepPaymentGatewayModel } from 'src/types/register-form.model';

const { REGISTER_CODE, RUNNER_CODE, SHIPPING_CODE, PAYMENT_CODE, MERCHANDISE_CODE, HOTEL_CODE } = STEP_CODE;
const {
    FNAME,
    LNAME,
    BIRTH,
    TEL,
    GENDER,
    EMAIL,
    TICKET_CODE,
    TICKET_PRICE,
    NATIONALITY,
    PROVINCE,
    DISCOUNT_AMOUNT,
    PROMOTION,
    ID_CARD,
    USER_TYPE,
    SICK,
    BIB_NAME,
    BLOOD_GROUP,
    EM_CONTACT,
    EM_TEL,
    FOOD,
    VACCINE_COVID,
    FILE_NAME,
    PROMOTION_DISCOUNT
} = HTML_KEY;

type FileUpload = File & { key?: string, preview?: string };

type CartProps = {
    totalItems: number,
    items: any[]
}

const langStorage = localStorageGetItem('i18nextLng');

export type RegisterState = {
    registerFormDetail: EventModel & OrderModel;
    stepInfo: {
        stepCode: string;
        activeStep: number;
        totalItems: number;
        completed: boolean;
    },
    birthKey: string;
    genderKey: string;
    firstNameKey: string;
    lastNameKey: string;
    telKey: string;
    emailKey: string;
    idCardKey: string;
    nationalityKey: string;
    provinceKey: string;
    sickKey: string;
    listGenderFormOption: InputFieldOptionModel[];
    listInputField: DynamicFormType[];
    listTicketInputField: DynamicFormType[];
    listTicketOptionInputField: DynamicFormType[];
    listTicketOptionInputFieldAllSelect: DynamicFormType[];
    currentLang: string;
    listFileFormRegister: FileUpload[],
    listStep: StepModel[],
    listPaymentGateway: PaymentGatewayModel[],
    listFriend: ItemFriendModel[],
    listRegisterForm: InputFieldModel[],
    listTicketOptionDefault: InputFieldModel[],
    listMerchandise: MerchandiseType[],
    myCart: CartProps,
    bibNameKey: string;
    listHotel: HotelType[];
    myHotelCart: CartProps;
    bloodGroupKey: string;
    emergencyContactKey: string;
    emergencytelKey: string;
    fileNameKey: string;
    foodKey: string;
    vaccineCovidKey: string;
    summaryModel?: any;
}

const initialState: RegisterState = {
    registerFormDetail: {
        registerStep: {
            listStep: []
        }
    },
    stepInfo: {
        stepCode: '',
        activeStep: 0,
        totalItems: 0,
        completed: false
    },
    birthKey: '',
    genderKey: '',
    listGenderFormOption: [],
    firstNameKey: '',
    lastNameKey: '',
    telKey: '',
    emailKey: '',
    idCardKey: '',
    nationalityKey: '',
    provinceKey: '',
    sickKey: '',
    listInputField: [],
    listTicketInputField: [],
    listTicketOptionInputField: [],
    listTicketOptionInputFieldAllSelect: [],
    currentLang: langStorage || 'th',
    listFileFormRegister: [],
    listStep: [],
    listPaymentGateway: [],
    listFriend: [],
    listRegisterForm: [],
    listMerchandise: [],
    myCart: {
        totalItems: 0,
        items: []
    },
    listTicketOptionDefault: [],
    listHotel: [],
    myHotelCart: {
        totalItems: 0,
        items: []
    },
    bibNameKey: '',
    bloodGroupKey: '',
    emergencyContactKey: '',
    emergencytelKey: '',
    fileNameKey: '',
    foodKey: '',
    vaccineCovidKey: '',
    summaryModel: undefined
}

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        setListInputField: (state, action) => {
            state.listInputField = action.payload;
        },
        setcurrentLang: (state, action) => {
            state.currentLang = action.payload;
        },
        setRegisterFormDetail: (state, action) => {
            state.registerFormDetail = action.payload;

            if (state?.registerFormDetail && state?.registerFormDetail?.registerStep && state?.registerFormDetail?.registerStep?.listStep?.length > 0) {

                const { listStep } = state.registerFormDetail.registerStep;
                state.listStep = listStep;
                state.stepInfo = { activeStep: 0, totalItems: 0, completed: false, stepCode: listStep[0].stepCode };
                const { listTicket, listMerchandise, listHotel } = state.registerFormDetail;

                //  set step register input field
                const form: StepModel | undefined = listStep?.find((x: StepModel) => x.stepCode === REGISTER_CODE);
                if (form && form?.data && form.data?.listRegisterForm && form.data.listRegisterForm?.length > 0) {
                    const { listRegisterForm } = form.data;
                    if (listRegisterForm && listRegisterForm?.length > 0) {
                        state.listRegisterForm = listRegisterForm;
                        const applyForFrield = {
                            id: 99999,
                            key: USER_TYPE,
                            labelTh: '',
                            labelEn: '',
                            placeholderTh: '',
                            placeholderEn: '',
                            required: true,
                            type: '',
                            sequence: 0,
                            col: 12,
                            colLayout: '',
                            htmlInputKey: USER_TYPE,
                            status: 'ACTIVE',
                            controlType: 'applyForFrield',
                            specialInputType: 'FORM_INPUT',
                            eventCode: state?.registerFormDetail?.eventCode
                        }

                        if (state?.registerFormDetail?.applyForFriend) {
                            const listDynamicForm: DynamicFormType[] = setListInputFieldModel([applyForFrield, ...listRegisterForm], state.currentLang, state);
                            state.listInputField = listDynamicForm;
                        } else {
                            const listDynamicForm: DynamicFormType[] = setListInputFieldModel(listRegisterForm, state.currentLang, state);
                            state.listInputField = listDynamicForm;
                        }

                    } else {
                        console.log("Form Not found");
                    }
                    //  set step register list ticket

                    if (listTicket && listTicket?.length > 0) {
                        state.listTicketInputField = [...setListTicketToInputFieldModel(listTicket, state.currentLang)]
                    } else {
                        console.log("Ticket Form Not found");
                    }
                }

                //  set step register merchandise
                const merchandiseForm: StepModel | undefined = listStep?.find((x: StepModel) => x.stepCode === MERCHANDISE_CODE);
                if (merchandiseForm && merchandiseForm?.data && listMerchandise && listMerchandise?.length > 0) {
                    state.listMerchandise = listMerchandise?.map((x) => ({
                        ...x,
                        available: x?.listMerchandiseOption?.find((item: any) => item?.stock === 'ACTIVE')?.available || 0,
                        listMerchandiseOption: x?.listMerchandiseOption?.map((item: any) => ({
                            ...item,
                            listOption: item?.listOption?.map((res: any) => ({
                                ...res,
                                disabled: Boolean(item?.stock === 'ACTIVE' && (res?.stockAvailable === 0)),
                                stockAvailableDefault: res?.stockAvailable
                            }))
                        }))
                    }));
                }
                //  set step register merchandise

                //  set step register hotel
                const hotelForm: StepModel | undefined = listStep?.find((x: StepModel) => x.stepCode === HOTEL_CODE);
                if (hotelForm && hotelForm?.data && listHotel && listHotel?.length > 0) {
                    state.listHotel = listHotel?.map((x) => ({
                        ...x,
                        available: x?.listHotelOption?.find((item: any) => item?.stock === 'ACTIVE')?.available || 0,
                        listHotelOption: x?.listHotelOption?.map((item: any) => ({
                            ...item,
                            listOption: item?.listOption?.map((res: any) => ({
                                ...res,
                                disabled: Boolean(item?.stock === 'ACTIVE' && (res?.stockAvailable === 0)),
                                stockAvailableDefault: res?.stockAvailable
                            }))
                        }))
                    }));
                }
                //  set step register hotel

                const summaryModel = countSummary(state?.registerFormDetail);
                state.summaryModel = summaryModel;
                state.listPaymentGateway = summaryModel.listPaymentGateway;
            }
        },
        setStepInfo: (state, action) => {
            if (state?.registerFormDetail && state?.registerFormDetail?.registerStep && state?.registerFormDetail?.registerStep?.listStep?.length > 0) {
                const { listStep } = state.registerFormDetail.registerStep;
                const goto = { activeStep: action.payload, totalItems: 0, completed: false, stepCode: listStep[action.payload].stepCode };
                state.stepInfo = goto;
            }
        },
        setStepInfoComplate: (state, action) => {
            state.stepInfo = { ...state.stepInfo, completed: action.payload };
        },
        setGenderKey: (state, action) => {
            state.genderKey = action.payload;
        },
        setFirstNameKey: (state, action) => {
            state.firstNameKey = action.payload;
        },
        setLastNameKey: (state, action) => {
            state.lastNameKey = action.payload;
        },
        setBirthKey: (state, action) => {
            state.birthKey = action.payload;
        },
        setListGenderFormOption: (state, action) => {
            state.listGenderFormOption = action.payload;
        },
        setListRunner: (state, action) => {
            if (state?.registerFormDetail && state?.registerFormDetail?.registerStep && state?.registerFormDetail?.registerStep?.listStep?.length > 0) {
                const { listStep } = state.registerFormDetail.registerStep;
                const { listTicket } = state.registerFormDetail;
                if (listStep && listStep?.length > 0 && listTicket && listTicket?.length > 0) {

                    const listTicketOnChange: TicketModel[] = [...listTicket];
                    const ticketByTicketKey = listTicketOnChange?.find((x: TicketModel) => x?.ticketCode === action.payload[TICKET_CODE]);

                    if (ticketByTicketKey && ticketByTicketKey?.listTicketOption && ticketByTicketKey.listTicketOption?.length > 0) {
                        const { listTicketOption } = ticketByTicketKey;
                        const listInputByTicket: DynamicFormType[] = [...setListInputFieldModel([...listTicketOption], state.currentLang, state)];

                        const listTicketOptionInputFieldAllSelect = [...state.listTicketOptionInputFieldAllSelect];

                        const checkDuplicateReturn = checkDuplicates(listTicketOptionInputFieldAllSelect, listInputByTicket, action.payload);


                        if (checkDuplicateReturn?.payload) {
                            action.payload = checkDuplicateReturn.payload;
                        }

                    } else {

                        const listTicketOptionInputFieldAllSelect = [...state.listTicketOptionInputFieldAllSelect];

                        const checkDuplicateReturn = checkDuplicates(listTicketOptionInputFieldAllSelect, [], action.payload);


                        if (checkDuplicateReturn?.payload) {
                            action.payload = checkDuplicateReturn.payload;
                        }
                    }

                    const listRunner: any[] = listStep?.find((x: StepModel) => x.stepCode === RUNNER_CODE)?.data?.listRunner || [];
                    if (listRunner && listRunner?.length > 0) {
                        const currentIndex = listRunner.findIndex(x => x.UID === action.payload?.UID);
                        if (currentIndex === -1) {

                            action.payload.UID = uuidChar(30);
                            action.payload.FNAME = action.payload[state.firstNameKey];
                            action.payload.LNAME = action.payload[state.lastNameKey];
                            action.payload.EVENT_URL = state.registerFormDetail?.eventUrl;
                            action.payload.EVENT_CODE = state.registerFormDetail?.eventCode;

                            action.payload = setHtmlKey({ state, payload: action.payload });

                            listRunner.push(action.payload);
                        } else {

                            action.payload.FNAME = action.payload[state.firstNameKey];
                            action.payload.LNAME = action.payload[state.lastNameKey];
                            action.payload.EVENT_URL = state.registerFormDetail?.eventUrl;
                            action.payload.EVENT_CODE = state.registerFormDetail?.eventCode;

                            action.payload = setHtmlKey({ state, payload: action.payload });

                            listRunner[currentIndex] = action.payload;
                        }
                    } else {
                        action.payload.UID = uuidChar(30);
                        action.payload.FNAME = action.payload[state.firstNameKey];
                        action.payload.LNAME = action.payload[state.lastNameKey];
                        action.payload.EVENT_URL = state.registerFormDetail?.eventUrl;
                        action.payload.EVENT_CODE = state.registerFormDetail?.eventCode;

                        action.payload = setHtmlKey({ state, payload: action.payload });

                        listRunner.push(action.payload);
                    }

                    const paymentStepIndex = listStep.findIndex((x: StepModel) => x.stepCode === PAYMENT_CODE);
                    const shippingIndex = listStep.findIndex((x: StepModel) => x.stepCode === SHIPPING_CODE);

                    const summaryModel = countSummary(state?.registerFormDetail);
                    state.summaryModel = summaryModel;

                    if (paymentStepIndex > -1) {
                        listStep[paymentStepIndex] = {
                            ...listStep[paymentStepIndex], data: {
                                paymentGateway: summaryModel.genenratePaymentGateway,
                                listRegisterForm: [],
                                listRunner: [],
                                shippingStatus: '',
                                shippingFee: 0,
                                additionalShippingFee: 0,
                                userAddress: '',
                                shipping: {
                                    userAddress: undefined,
                                    userAddressCode: undefined,
                                    shippingStatus: undefined,
                                    shippingAmount: undefined,
                                    totalOrder: undefined
                                },
                                merchandise: {
                                    items: [],
                                    totalItems: 0
                                },
                                hotel: {
                                    items: [],
                                    totalItems: 0
                                }
                            }
                        };
                    }

                    if (shippingIndex > -1) {
                        listStep[shippingIndex].data.shipping = summaryModel.genenrateShipping;
                    }

                    state.listPaymentGateway = summaryModel.listPaymentGateway;
                }
            }
        },
        setEditRunner: (state, action) => {
            if (state?.registerFormDetail && state?.registerFormDetail?.registerStep && state?.registerFormDetail?.registerStep?.listStep?.length > 0) {
                const { listStep } = state.registerFormDetail.registerStep;
                //  set step register input field
                const form: StepModel | undefined = listStep?.find((x: StepModel) => x.stepCode === REGISTER_CODE);
                if (form && form?.data && form.data?.listRegisterForm && form.data.listRegisterForm?.length > 0) {
                    const { listRegisterForm } = form.data;
                    const { listTicket } = state.registerFormDetail;
                    if (listRegisterForm && listRegisterForm?.length > 0) {

                        const applyForFrield = {
                            id: 99999,
                            key: USER_TYPE,
                            labelTh: '',
                            labelEn: '',
                            placeholderTh: '',
                            placeholderEn: '',
                            required: true,
                            type: '',
                            sequence: 0,
                            col: 12,
                            colLayout: '',
                            htmlInputKey: USER_TYPE,
                            status: 'ACTIVE',
                            controlType: 'applyForFrield',
                            specialInputType: 'FORM_INPUT',
                            eventCode: state?.registerFormDetail?.eventCode
                        }

                        let listDynamicForm: DynamicFormType[] = [];

                        if (state?.registerFormDetail?.applyForFriend) {
                            listDynamicForm = setListInputFieldModel([applyForFrield, ...listRegisterForm], state.currentLang, state);
                            state.listInputField = listDynamicForm;
                        } else {
                            listDynamicForm = setListInputFieldModel(listRegisterForm, state.currentLang, state);
                            state.listInputField = listDynamicForm;
                        }

                        // const objKey = Object.keys(action.payload);
                        let birthDate: any = null;
                        Object.keys(action.payload).forEach(key => {
                            const inputIndex = listDynamicForm.findIndex((x) => x.key === key);

                            if (inputIndex > -1) {
                                if (key === state.birthKey) {
                                    birthDate = action.payload[key];
                                }

                                if (key === state.provinceKey) {
                                    listDynamicForm[inputIndex].defaultValue = action.payload[key];
                                }
                                listDynamicForm[inputIndex].defaultValue = action.payload[key];
                            } else {
                                const modelIsNotForm = {
                                    col: "",
                                    colLayout: "",
                                    defaultValue: action.payload[key],
                                    disabled: false,
                                    inputType: "",
                                    key,
                                    label: "",
                                    labelEn: "",
                                    maxDate: undefined,
                                    minDate: undefined,
                                    name: key,
                                    option: [],
                                    placeholder: "",
                                    placeholderEn: "",
                                    rules: undefined,
                                    type: "noneDisplay"
                                }
                                listDynamicForm.push(modelIsNotForm);

                                if (key.toString() === TICKET_CODE.toString()) {
                                    // setTicketOnChange(action.payload[key]);

                                    if (listTicket && listTicket?.length > 0) {
                                        const listTicketOnChange: TicketModel[] = [...listTicket];
                                        const ticketByTicketKey = listTicketOnChange?.find((x: TicketModel) => x?.ticketCode === action.payload[key]);
                                        if (ticketByTicketKey && ticketByTicketKey?.listTicketOption && ticketByTicketKey.listTicketOption?.length > 0) {
                                            const { listTicketOption } = ticketByTicketKey;
                                            const listInputByTicket: DynamicFormType[] = [...setListInputFieldModel([...listTicketOption], state.currentLang, state)];
                                            state.listTicketOptionInputField = listInputByTicket;
                                        } else {
                                            state.listTicketOptionInputField = [];
                                            console.log("Ticket Form Not found");
                                        }

                                        if (state?.registerFormDetail?.listTicket && state.registerFormDetail.listTicket?.length > 0) {
                                            if (birthDate) {
                                                const words: any = birthDate.split('-');
                                                const year = new Date().getFullYear();
                                                const age = year - words[0];
                                                const listTicketForAge = state.registerFormDetail.listTicket.filter((x) => (age >= (x?.minAge || 0) && age <= (x?.maxAge || 999)));
                                                state.listTicketInputField = [...setListTicketToInputFieldModelForEdit(listTicketForAge, state.currentLang, action.payload[key])]
                                            } else {
                                                state.listTicketInputField = [...setListTicketToInputFieldModelForEdit(listTicket, state.currentLang, action.payload[key])]
                                            }
                                        }

                                    } else {
                                        console.log("Ticket Form Not found");
                                    }
                                }
                            }
                        })

                        // defaultValue
                        state.listInputField = listDynamicForm;
                        const indexForm = listStep?.findIndex((x: StepModel) => x.stepCode === REGISTER_CODE);
                        state.stepInfo = { activeStep: indexForm, completed: false, stepCode: REGISTER_CODE, totalItems: state.stepInfo.totalItems };

                    } else {
                        console.log("Form Not found");
                    }


                }
            }
        },
        setTicketOnChange: (state, action) => {
            if (state?.registerFormDetail && state?.registerFormDetail?.listTicket && state?.registerFormDetail?.listTicket?.length > 0) {
                const { listTicket } = state.registerFormDetail;
                if (listTicket && listTicket?.length > 0) {
                    const listTicketOnChange: TicketModel[] = [...listTicket];
                    const ticketByTicketKey = listTicketOnChange?.find((x: TicketModel) => x?.ticketCode === action.payload);
                    if (ticketByTicketKey && ticketByTicketKey?.listTicketOption && ticketByTicketKey.listTicketOption?.length > 0) {
                        const { listTicketOption } = ticketByTicketKey;

                        const listInputByTicket: DynamicFormType[] = [...setListInputFieldModel([...listTicketOption], state.currentLang, state)];
                        // console.log("🚀 ~ listInputByTicket:", listInputByTicket)
                        state.listTicketOptionInputField = listInputByTicket;
                        state.listTicketOptionDefault = listTicketOption;
                        state.listTicketOptionInputFieldAllSelect = [...state.listTicketOptionInputFieldAllSelect, ...listInputByTicket];
                    } else {
                        state.listTicketOptionInputField = [];
                        console.log("Ticket Form Not found");
                    }
                } else {
                    state.listTicketOptionInputField = [];
                    console.log("Ticket Form Not found");
                }
            } else {
                state.listTicketOptionInputField = [];
                console.log("Ticket Form Not found");
            }

            // console.log("Ticket Form Not found", state.listTicketOptionInputField);
        },
        setListTicketOptionInputField: (state, action) => {
            state.listTicketOptionInputField = action.payload;
            state.listTicketOptionInputFieldAllSelect = action.payload;
        },
        setListTicketOptionDefault: (state, action) => {
            state.listTicketOptionDefault = action.payload;
        },
        setAddRunner: (state, action) => {
            state.listTicketOptionInputField = [];
            if (state?.registerFormDetail && state?.registerFormDetail?.registerStep && state?.registerFormDetail?.registerStep?.listStep?.length > 0) {

                const { listStep } = state.registerFormDetail.registerStep;
                const { listTicket } = state.registerFormDetail;

                //  set step register input field
                const form: StepModel | undefined = listStep?.find((x: StepModel) => x.stepCode === REGISTER_CODE);
                if (form && form?.data && form.data?.listRegisterForm && form.data.listRegisterForm?.length > 0) {
                    const { listRegisterForm } = form.data;

                    if (listRegisterForm && listRegisterForm?.length > 0) {
                        const applyForFrield = {
                            id: 99999,
                            key: USER_TYPE,
                            labelTh: '',
                            labelEn: '',
                            placeholderTh: '',
                            placeholderEn: '',
                            required: true,
                            type: '',
                            sequence: 0,
                            col: 12,
                            colLayout: '',
                            htmlInputKey: USER_TYPE,
                            status: 'ACTIVE',
                            controlType: 'applyForFrield',
                            specialInputType: 'FORM_INPUT',
                            eventCode: state?.registerFormDetail?.eventCode
                        }

                        let listDynamicForm: DynamicFormType[] = [];

                        if (state?.registerFormDetail?.applyForFriend) {
                            listDynamicForm = setListInputFieldModel([applyForFrield, ...listRegisterForm], state.currentLang, state);
                            state.listInputField = listDynamicForm;
                        } else {
                            listDynamicForm = setListInputFieldModel(listRegisterForm, state.currentLang, state);
                            state.listInputField = listDynamicForm;
                        }
                    } else {
                        console.log("Form Not found");
                    }
                    //  set step register list ticket

                    if (listTicket && listTicket?.length > 0) {
                        state.listTicketInputField = [...setListTicketToInputFieldModel(listTicket, state.currentLang)]
                    } else {
                        console.log("Ticket Form Not found");
                    }
                }
                const indexForm = listStep?.findIndex((x: StepModel) => x.stepCode === REGISTER_CODE);
                state.stepInfo = { activeStep: indexForm, completed: false, stepCode: action.payload, totalItems: state.stepInfo.totalItems };
            }
        },
        setDeleteRunner: (state, action) => {
            if (state?.registerFormDetail && state?.registerFormDetail?.registerStep && state?.registerFormDetail?.registerStep?.listStep?.length > 0) {
                //  Delete runner
                const { listStep } = state.registerFormDetail.registerStep;
                if (listStep && listStep?.length > 0) {
                    const listRunner: any[] = listStep?.find((x: StepModel) => x.stepCode === RUNNER_CODE)?.data?.listRunner || [];
                    if (listRunner && listRunner?.length > 0) {
                        const currentIndex = listRunner.findIndex(x => x.UID === action.payload?.UID);
                        if (currentIndex > -1) {
                            listRunner.splice(currentIndex, 1);
                        } else {
                            console.log("Runner Not found");
                        }
                    }

                    const paymentStepIndex = listStep.findIndex((x: StepModel) => x.stepCode === PAYMENT_CODE);
                    const shippingIndex = listStep.findIndex((x: StepModel) => x.stepCode === SHIPPING_CODE);

                    const summaryModel = countSummary(state?.registerFormDetail);
                    state.summaryModel = summaryModel;

                    if (paymentStepIndex > -1) {
                        listStep[paymentStepIndex].data.paymentGateway = summaryModel.genenratePaymentGateway;
                    }

                    if (shippingIndex > -1) {
                        listStep[shippingIndex].data.shipping = summaryModel.genenrateShipping;
                    }
                    // setPaymentGatewayStepSetListRunner(state);

                    state.listPaymentGateway = summaryModel.listPaymentGateway || [];
                }
            }
        },
        setListFileFormRegister: (state, action) => {
            state.listFileFormRegister = action.payload
        },
        addListFileFormRegister: (state, action) => {
            state.listFileFormRegister.push(action.payload);
        },
        editListFileFormRegister: (state, action) => {
            state.listFileFormRegister[action.payload.fileIndex] = action.payload.file;
        },
        setShippingStatus: (state, action) => {
            if (state?.registerFormDetail && state?.registerFormDetail?.registerStep && state?.registerFormDetail?.registerStep?.listStep?.length > 0) {
                const { listStep } = state.registerFormDetail.registerStep;
                const shippingIndex = listStep.findIndex((x: StepModel) => x.stepCode === SHIPPING_CODE);
                if (shippingIndex > -1) {
                    listStep[shippingIndex].data.shipping.shippingStatus = action.payload.shippingStatus;
                    if (action.payload.shippingStatus === 'ACTIVE') {
                        listStep[shippingIndex].data.shipping.userAddress = action.payload.address
                    } else {
                        listStep[shippingIndex].data.shipping.userAddress = undefined;
                    }
                }
            }
        },
        setShippingAddress: (state, action) => {
            if (state?.registerFormDetail && state?.registerFormDetail?.registerStep && state?.registerFormDetail?.registerStep?.listStep?.length > 0) {
                const { listStep } = state.registerFormDetail.registerStep;
                const shippingIndex = listStep.findIndex((x: StepModel) => x.stepCode === SHIPPING_CODE);
                const genenrateShipping: StepShippingModel = { ...listStep[shippingIndex]?.data?.shipping };
                genenrateShipping.userAddress = action.payload;
                listStep[shippingIndex].data.shipping = genenrateShipping;
            }
        },
        setPaymentFee: (state) => {
            if (state?.registerFormDetail && state?.registerFormDetail?.registerStep && state?.registerFormDetail?.registerStep?.listStep?.length > 0) {

                const { listStep } = state.registerFormDetail.registerStep;

                const paymentStepIndex = listStep.findIndex((x: StepModel) => x.stepCode === PAYMENT_CODE);
                const shippingIndex = listStep.findIndex((x: StepModel) => x.stepCode === SHIPPING_CODE);

                const summaryModel = countSummary(state?.registerFormDetail);
                state.summaryModel = summaryModel;

                if (paymentStepIndex > -1) {
                    listStep[paymentStepIndex].data.paymentGateway = summaryModel.genenratePaymentGateway;
                }

                if (shippingIndex > -1) {
                    listStep[shippingIndex].data.shipping = summaryModel.genenrateShipping;
                }

                state.listPaymentGateway = summaryModel.listPaymentGateway || [];

            }
        },
        setPaymentMethod: (state, action) => {
            if (state?.registerFormDetail && state?.registerFormDetail?.registerStep && state?.registerFormDetail?.registerStep?.listStep?.length > 0) {
                const { listStep } = state.registerFormDetail.registerStep;
                const paymentStepIndex = listStep.findIndex((x: StepModel) => x.stepCode === PAYMENT_CODE);
                const genenratePaymentGateway: StepPaymentGatewayModel = { ...listStep[paymentStepIndex].data.paymentGateway };
                genenratePaymentGateway.paymentGatewayFee = action.payload.paymentGatewayFee;
                genenratePaymentGateway.paymentGatewayFeeUnit = action.payload.paymentGatewayFeeUnit;
                genenratePaymentGateway.paymentMethod = action.payload.paymentMethod;
                genenratePaymentGateway.paymentGatewayAmount = Number(action.payload.amountFee);
                genenratePaymentGateway.netAmount = genenratePaymentGateway.totalAmount + genenratePaymentGateway.shippingAmount + Number(action.payload.amountFee);
                listStep[paymentStepIndex].data.paymentGateway = genenratePaymentGateway;

                const summaryModel = countSummary(state?.registerFormDetail);
                state.summaryModel = summaryModel;
                if (paymentStepIndex > -1) {
                    listStep[paymentStepIndex].data.paymentGateway = summaryModel.genenratePaymentGateway;
                }

                state.listPaymentGateway = summaryModel.listPaymentGateway || [];
            }
        },
        filterTicketByAge: (state, action) => {
            if (state?.registerFormDetail && state?.registerFormDetail?.listTicket && state.registerFormDetail.listTicket?.length > 0) {
                const listTicket = state.registerFormDetail.listTicket.filter((x) => (action.payload >= (x?.minAge || 0) && action.payload <= (x?.maxAge || 999)));
                state.listTicketInputField = [...setListTicketToInputFieldModel(listTicket, state.currentLang)];
                state.listTicketOptionInputField = [];
            }
        },
        setListFriend: (state, action) => {
            state.listFriend = action.payload;
        },
        setAddCart: (state, action) => {
            const currentState = current(state);
            const { listMerchandise } = currentState;
            let listMerchandiseReNew = [];

            const oldCart: any[] = [...state.myCart.items];
            const modelToSave: any[] = [...state.myCart.items];

            if (!oldCart.some((item: any) => item.uid === action.payload.uid)) {
                const arrFilter = [...currentState.myCart.items];
                const itemDuplicatesMerchandise = arrFilter.filter((item: any) => item.id === action.payload.id);
                if (itemDuplicatesMerchandise && itemDuplicatesMerchandise?.length > 0 && oldCart?.length > 0) {
                    let keyDuplicates = '';
                    currentState.myCart.items?.forEach((x) => {
                        const result = filterDuplicates(x.listOption, action.payload.listOption);
                        if (result.duplicates?.length === action.payload.listOption?.length) {
                            keyDuplicates = x.uid;
                        }
                    });

                    const indexDuplicates = currentState.myCart.items.findIndex((item: any) => item.uid === keyDuplicates);

                    if (keyDuplicates) {
                        modelToSave[indexDuplicates].quantity += action.payload.quantity;
                        listMerchandiseReNew = handleMerchandise({ listMerchandise, payload: action.payload });
                    } else {
                        modelToSave.push(action.payload);
                        listMerchandiseReNew = handleMerchandise({ listMerchandise, payload: action.payload });
                    }
                } else {
                    modelToSave.push(action.payload);
                    listMerchandiseReNew = handleMerchandise({ listMerchandise, payload: action.payload });
                }
            } else {
                const isInMyCartIndex = oldCart.findIndex(x => x.uid === action.payload.uid);
                modelToSave[isInMyCartIndex] = action.payload;
                listMerchandiseReNew = handleMerchandise({ listMerchandise, payload: action.payload });
            }

            state.myCart.totalItems = modelToSave.reduce((sum, currentValue) => sum + currentValue.quantity, 0);
            state.myCart.items = modelToSave;
            state.listMerchandise = listMerchandiseReNew;

            if (state?.registerFormDetail?.registerStep) {
                const { listStep } = state.registerFormDetail.registerStep;
                const merchandiseIndex = listStep?.findIndex((x: StepModel) => x.stepCode === MERCHANDISE_CODE);
                if (merchandiseIndex > -1) {
                    const merchandise: any = { ...listStep[merchandiseIndex], data: { merchandise: state.myCart } };
                    listStep[merchandiseIndex] = merchandise;
                }
            }
        },
        setCart: (state, action) => {
            const oldCart: any[] = action.payload;
            state.myCart.totalItems = oldCart.reduce((sum, currentValue) => sum + currentValue.quantity, 0);
            state.myCart.items = oldCart;

            if (state?.registerFormDetail?.registerStep) {
                const { listStep } = state.registerFormDetail.registerStep;
                const merchandiseIndex = listStep?.findIndex((x: StepModel) => x.stepCode === MERCHANDISE_CODE);
                if (merchandiseIndex > -1) {
                    const merchandise: any = { ...listStep[merchandiseIndex], data: { merchandise: state.myCart } };
                    listStep[merchandiseIndex] = merchandise;
                }
            }
        },
        setDecreaseQuantity: (state, action) => {
            const currentState = current(state);
            const list = [...currentState.listMerchandise];

            const stockItem = action.payload?.listOption?.find((x: any) => x?.stock === "ACTIVE");
            const merchandise: any = list.find((x) => x.id === action.payload.id);
            const merchandiseIndex = list.findIndex((x) => x.id === action.payload.id);
            let { available, listMerchandiseOption } = merchandise;

            if (stockItem) {
                const indexMerchandise = listMerchandiseOption?.findIndex((x: any) => x?.key === stockItem?.inputFieldKey);
                if (indexMerchandise > -1 && listMerchandiseOption[indexMerchandise]?.listOption?.length > 0) {
                    const indexMerchandiseOption = listMerchandiseOption[indexMerchandise].listOption.findIndex((x: any) => x?.key === stockItem?.optionKey);
                    if (indexMerchandiseOption > -1) {
                        const option = { ...listMerchandiseOption[indexMerchandise]?.listOption[indexMerchandiseOption] };
                        option.stockAvailable += 1;
                        const newListMerchandise = [...listMerchandiseOption];
                        const newMerchandise = { ...newListMerchandise[indexMerchandise] };
                        const newListOption = [...newMerchandise.listOption];
                        newListOption[indexMerchandiseOption] = option;
                        newListMerchandise[indexMerchandise] = { ...newMerchandise, listOption: newListOption };
                        listMerchandiseOption = newListMerchandise;
                    }
                }
            }

            if (merchandiseIndex > -1) {
                available += 1;
                list[merchandiseIndex] = { ...merchandise, available, listMerchandiseOption };
            }

            state.listMerchandise = list;

        },
        setIncreaseQuantity: (state, action) => {
            const currentState = current(state);
            const list = [...currentState.listMerchandise];

            const stockItem = action.payload?.listOption?.find((x: any) => x?.stock === "ACTIVE");
            const merchandise: any = list.find((x) => x.id === action.payload.id);
            const merchandiseIndex = list.findIndex((x) => x.id === action.payload.id);
            let { available, listMerchandiseOption } = merchandise;

            if (stockItem) {
                const indexMerchandise = listMerchandiseOption?.findIndex((x: any) => x?.key === stockItem?.inputFieldKey);
                if (indexMerchandise > -1 && listMerchandiseOption[indexMerchandise]?.listOption?.length > 0) {
                    const indexMerchandiseOption = listMerchandiseOption[indexMerchandise].listOption.findIndex((x: any) => x?.key === stockItem?.optionKey);
                    if (indexMerchandiseOption > -1) {
                        const option = { ...listMerchandiseOption[indexMerchandise]?.listOption[indexMerchandiseOption] };
                        option.stockAvailable -= 1;
                        const newListMerchandise = [...listMerchandiseOption];
                        const newMerchandise = { ...newListMerchandise[indexMerchandise] };
                        const newListOption = [...newMerchandise.listOption];
                        newListOption[indexMerchandiseOption] = option;
                        newListMerchandise[indexMerchandise] = { ...newMerchandise, listOption: newListOption };
                        listMerchandiseOption = newListMerchandise;
                    }
                }
            }

            if (merchandiseIndex > -1) {
                available -= 1;
                list[merchandiseIndex] = { ...merchandise, available, listMerchandiseOption };
            }

            state.listMerchandise = list;
        },
        setDeleteCart: (state, action) => {
            const currentState = current(state);
            const list = [...currentState.listMerchandise];

            const stockItem = action.payload?.listOption?.find((x: any) => x?.stock === "ACTIVE");
            const merchandise: any = list.find((x) => x.id === action.payload.id);
            const merchandiseIndex = list.findIndex((x) => x.id === action.payload.id);
            let { available, listMerchandiseOption } = merchandise;

            if (stockItem) {
                const indexMerchandise = listMerchandiseOption?.findIndex((x: any) => x?.key === stockItem?.inputFieldKey);
                if (indexMerchandise > -1 && listMerchandiseOption[indexMerchandise]?.listOption?.length > 0) {
                    const indexMerchandiseOption = listMerchandiseOption[indexMerchandise].listOption.findIndex((x: any) => x?.key === stockItem?.optionKey);
                    if (indexMerchandiseOption > -1) {
                        const option = { ...listMerchandiseOption[indexMerchandise]?.listOption[indexMerchandiseOption] };
                        option.stockAvailable += action.payload.quantity;
                        const newListMerchandise = [...listMerchandiseOption];
                        const newMerchandise = { ...newListMerchandise[indexMerchandise] };
                        const newListOption = [...newMerchandise.listOption];
                        newListOption[indexMerchandiseOption] = option;
                        newListMerchandise[indexMerchandise] = { ...newMerchandise, listOption: newListOption };
                        listMerchandiseOption = newListMerchandise;
                    }
                }
            }

            if (merchandiseIndex > -1) {
                available += action.payload.quantity;
                list[merchandiseIndex] = { ...merchandise, available, listMerchandiseOption };
            }

            state.listMerchandise = list;

        },
        setPaymentGateWay: (state) => {
            if (state?.registerFormDetail && state?.registerFormDetail?.registerStep && state?.registerFormDetail?.registerStep?.listStep?.length > 0) {
                const { listStep } = state.registerFormDetail.registerStep;
                const paymentStepIndex = listStep.findIndex((x: StepModel) => x.stepCode === PAYMENT_CODE);
                const summaryModel = countSummary(state?.registerFormDetail);
                state.summaryModel = summaryModel;
                if (summaryModel) {

                    if (paymentStepIndex > -1) {
                        listStep[paymentStepIndex].data.paymentGateway = summaryModel.genenratePaymentGateway;
                    }

                    state.listPaymentGateway = summaryModel.listPaymentGateway || [];

                }
            }
        },
        setListRegisterForm: (state, action) => {
            state.listRegisterForm = action.payload;
        },
        setListTicketInputField: (state, action) => {
            state.listTicketInputField = action.payload;
        },
        setListMerchandise: (state, action) => {
            state.listMerchandise = action.payload;
        },
        setGetShirtStock: (state, action) => {
            const currentState = current(state);
            const { listTicketOptionInputField, listInputField } = currentState;
            if (action.payload?.specialInputType === "TICKET_INPUT") {
                const listInputByTicket = setListInputFieldModel([action.payload], state.currentLang, state);
                if (listInputByTicket && listInputByTicket?.length > 0 && listTicketOptionInputField?.length > 0) {
                    const inputStockByTicketIndex = listTicketOptionInputField?.findIndex((x: any) => x?.key === listInputByTicket[0]?.key);
                    if (inputStockByTicketIndex > -1) {
                        const itemStock = { ...listInputByTicket[0] };
                        state?.registerFormDetail?.listTicket?.forEach((x) => {
                            x.listTicketOption?.forEach(o => {
                                if (itemStock.key === o.key) {
                                    o.listOption?.forEach((lo) => {
                                        itemStock?.option.forEach(to => {
                                            if (lo?.key === to?.key) {
                                                lo.stockAvailable = to?.stockAvailable || 0;
                                            }
                                        });
                                    })
                                }
                            });
                        });
                        const cloneListTicketOptionInputField = [...listTicketOptionInputField];
                        cloneListTicketOptionInputField[inputStockByTicketIndex] = itemStock;
                        state.listTicketOptionInputField = cloneListTicketOptionInputField;
                        state.listTicketOptionInputFieldAllSelect = [...state.listTicketOptionInputFieldAllSelect, ...cloneListTicketOptionInputField];
                    }
                }
                console.log("is in ticket option");
            } else {
                console.log("is in form input");
                const listInputFieldPayload = setListInputFieldModel([action.payload], state.currentLang, state);
                if (listInputFieldPayload && listInputFieldPayload?.length > 0 && listInputField?.length > 0) {
                    const inputStockByFieldIndex = listInputField?.findIndex((x: any) => x?.key === listInputFieldPayload[0]?.key);
                    if (inputStockByFieldIndex > -1) {
                        const itemStock = { ...listInputFieldPayload[0] };
                        if (state?.registerFormDetail?.registerStep) {
                            const { listStep } = state.registerFormDetail.registerStep;
                            const form: StepModel | undefined = listStep?.find((x: StepModel) => x.stepCode === REGISTER_CODE);
                            if (form?.data) {
                                const { listRegisterForm } = form.data;
                                listRegisterForm?.forEach((lf) => {
                                    if (lf.key === itemStock?.key) {
                                        lf?.listOption?.forEach((lo) => {
                                            itemStock?.option.forEach(to => {
                                                if (lo?.key === to?.key) {
                                                    lo.stockAvailable = to?.stockAvailable || 0;
                                                }
                                            });
                                        })
                                    }
                                });
                            }
                        }
                        const cloneListInputField = [...listInputField];
                        cloneListInputField[inputStockByFieldIndex] = itemStock;
                        state.listInputField = cloneListInputField;
                    }
                }
            }
        },
        setGetMerchandiseStock: (state, action) => {
            const currentState = current(state);
            const { listMerchandise, myCart } = currentState;
            let clonemyCart = { ...myCart };
            const listMerchandiseClone = [...listMerchandise];
            action.payload?.forEach((m: MerchandiseType) => {
                const indexMerchanStock = listMerchandise?.findIndex((x) => x.merchandiseCode === m.merchandiseCode);
                if (indexMerchanStock > -1) {
                    m?.listMerchandiseOption?.forEach((lm: any) => {
                        const indexInput = listMerchandise[indexMerchanStock]?.listMerchandiseOption?.findIndex((x) => x.key === lm.key);
                        if (indexInput > -1) {
                            lm?.listOption?.forEach((lo: any) => {
                                let merchandise = { ...listMerchandise[indexMerchanStock] };
                                let merchandiseOption = { ...listMerchandise[indexMerchanStock]?.listMerchandiseOption[indexInput] };
                                const clmoResponse = listMerchandise[indexMerchanStock]?.listMerchandiseOption[indexInput]?.listOption?.map(clmo => {

                                    const myOptionIndex = myCart.items?.findIndex(mi => mi.merchandiseCode === m.merchandiseCode);
                                    if (myOptionIndex > -1) {
                                        const cloneMyItems: any = [...clonemyCart.items];
                                        let cloneMyItem = { ...clonemyCart.items[myOptionIndex] };
                                        clonemyCart.items[myOptionIndex]?.listOption?.forEach((cim: any) => {
                                            if (cim?.stock === 'ACTIVE' && cim?.optionKey === lo?.key) {
                                                cloneMyItem = { ...clonemyCart.items[myOptionIndex], stockAvailableStatus: 'SOLD_OUT' };
                                            }
                                        })
                                        cloneMyItems[myOptionIndex] = cloneMyItem;
                                        clonemyCart = { ...clonemyCart, items: cloneMyItems }
                                    }

                                    if (lo?.key === clmo?.key) {

                                        clmo = {
                                            ...clmo,
                                            stockAvailable: lo?.stockAvailable || 0,
                                            disabled: true,
                                        };
                                    }
                                    return { ...clmo };
                                });

                                merchandiseOption = { ...merchandiseOption, listOption: clmoResponse };
                                const a = merchandise?.listMerchandiseOption?.map((element) => {
                                    if (merchandiseOption?.key === element?.key) {
                                        element = { ...merchandiseOption }
                                    }

                                    return { ...element }
                                });

                                const availableStock = a?.find(x => x.stock === 'ACTIVE')?.listOption?.reduce((sum, currentValue: any) => sum + Number(currentValue?.stockAvailable || 0), 0);

                                merchandise = { ...merchandise, available: availableStock || 0, listMerchandiseOption: a }
                                listMerchandiseClone[indexMerchanStock] = merchandise;

                            });

                        }
                    });
                }
            })

            state.listMerchandise = listMerchandiseClone;
            state.myCart = clonemyCart;

        },
        setAddHotelCart: (state, action) => {
            const currentState = current(state);
            const { listHotel } = currentState;
            let listHotelReNew = [];

            const oldCart: any[] = [...state.myHotelCart.items];
            const modelToSave: any[] = [...state.myHotelCart.items];

            if (!oldCart.some((item: any) => item.uid === action.payload.uid)) {
                const arrFilter = [...currentState.myHotelCart.items];
                const itemDuplicatesHotel = arrFilter.filter((item: any) => item.id === action.payload.id);
                if (itemDuplicatesHotel && itemDuplicatesHotel?.length > 0 && oldCart?.length > 0) {
                    let keyDuplicates = '';
                    currentState.myHotelCart.items?.forEach((x) => {
                        const result = filterDuplicates(x.listOption, action.payload.listOption);
                        if (result.duplicates?.length === action.payload.listOption?.length) {
                            keyDuplicates = x.uid;
                        }
                    });

                    const indexDuplicates = currentState.myHotelCart.items.findIndex((item: any) => item.uid === keyDuplicates);

                    if (keyDuplicates) {
                        modelToSave[indexDuplicates].quantity += action.payload.quantity;
                        listHotelReNew = handleHotel({ listHotel, payload: action.payload });
                    } else {
                        modelToSave.push(action.payload);
                        listHotelReNew = handleHotel({ listHotel, payload: action.payload });
                    }
                } else {
                    modelToSave.push(action.payload);
                    listHotelReNew = handleHotel({ listHotel, payload: action.payload });
                }
            } else {
                const isInMyHotelCartIndex = oldCart.findIndex(x => x.uid === action.payload.uid);
                modelToSave[isInMyHotelCartIndex] = action.payload;
                listHotelReNew = handleHotel({ listHotel, payload: action.payload });
            }

            state.myHotelCart.totalItems = modelToSave.reduce((sum, currentValue) => sum + currentValue.quantity, 0);
            state.myHotelCart.items = modelToSave;
            state.listHotel = listHotelReNew;

            if (state?.registerFormDetail?.registerStep) {
                const { listStep } = state.registerFormDetail.registerStep;
                const hotelIndex = listStep?.findIndex((x: StepModel) => x.stepCode === HOTEL_CODE);
                if (hotelIndex > -1) {
                    const hotel: any = { ...listStep[hotelIndex], data: { hotel: state.myHotelCart } };
                    listStep[hotelIndex] = hotel;
                }
            }
        },
        setHotelCart: (state, action) => {
            const oldCart: any[] = action.payload;
            state.myHotelCart.totalItems = oldCart.reduce((sum, currentValue) => sum + currentValue.quantity, 0);
            state.myHotelCart.items = oldCart;

            if (state?.registerFormDetail?.registerStep) {
                const { listStep } = state.registerFormDetail.registerStep;
                const hotelIndex = listStep?.findIndex((x: StepModel) => x.stepCode === HOTEL_CODE);
                if (hotelIndex > -1) {
                    const hotel: any = { ...listStep[hotelIndex], data: { hotel: state.myHotelCart } };
                    listStep[hotelIndex] = hotel;
                }
            }
        },
        setHotelDecreaseQuantity: (state, action) => {
            const currentState = current(state);
            const list = [...currentState.listHotel];

            const stockItem = action.payload?.listOption?.find((x: any) => x?.stock === "ACTIVE");
            const hotel: any = list.find((x) => x.id === action.payload.id);
            const hotelIndex = list.findIndex((x) => x.id === action.payload.id);
            let { available, listHotelOption } = hotel;

            if (stockItem) {
                const indexHotel = listHotelOption?.findIndex((x: any) => x?.key === stockItem?.inputFieldKey);
                if (indexHotel > -1 && listHotelOption[indexHotel]?.listOption?.length > 0) {
                    const indexHotelOption = listHotelOption[indexHotel].listOption.findIndex((x: any) => x?.key === stockItem?.optionKey);
                    if (indexHotelOption > -1) {
                        const option = { ...listHotelOption[indexHotel]?.listOption[indexHotelOption] };
                        option.stockAvailable += 1;
                        const newListHotel = [...listHotelOption];
                        const newHotel = { ...newListHotel[indexHotel] };
                        const newListOption = [...newHotel.listOption];
                        newListOption[indexHotelOption] = option;
                        newListHotel[indexHotel] = { ...newHotel, listOption: newListOption };
                        listHotelOption = newListHotel;
                    }
                }
            }

            if (hotelIndex > -1) {
                available += 1;
                list[hotelIndex] = { ...hotel, available, listHotelOption };
            }

            state.listHotel = list;

        },
        setHotelIncreaseQuantity: (state, action) => {
            const currentState = current(state);
            const list = [...currentState.listHotel];

            const stockItem = action.payload?.listOption?.find((x: any) => x?.stock === "ACTIVE");
            const hotel: any = list.find((x) => x.id === action.payload.id);
            const hotelIndex = list.findIndex((x) => x.id === action.payload.id);
            let { available, listHotelOption } = hotel;

            if (stockItem) {
                const indexHotel = listHotelOption?.findIndex((x: any) => x?.key === stockItem?.inputFieldKey);
                if (indexHotel > -1 && listHotelOption[indexHotel]?.listOption?.length > 0) {
                    const indexHotelOption = listHotelOption[indexHotel].listOption.findIndex((x: any) => x?.key === stockItem?.optionKey);
                    if (indexHotelOption > -1) {
                        const option = { ...listHotelOption[indexHotel]?.listOption[indexHotelOption] };
                        option.stockAvailable -= 1;
                        const newListHotel = [...listHotelOption];
                        const newHotel = { ...newListHotel[indexHotel] };
                        const newListOption = [...newHotel.listOption];
                        newListOption[indexHotelOption] = option;
                        newListHotel[indexHotel] = { ...newHotel, listOption: newListOption };
                        listHotelOption = newListHotel;
                    }
                }
            }

            if (hotelIndex > -1) {
                available -= 1;
                list[hotelIndex] = { ...hotel, available, listHotelOption };
            }

            state.listHotel = list;
        },
        setHotelDeleteCart: (state, action) => {
            const currentState = current(state);
            const list = [...currentState.listHotel];

            const stockItem = action.payload?.listOption?.find((x: any) => x?.stock === "ACTIVE");
            const hotel: any = list.find((x) => x.id === action.payload.id);
            const hotelIndex = list.findIndex((x) => x.id === action.payload.id);
            let { available, listHotelOption } = hotel;

            if (stockItem) {
                const indexHotel = listHotelOption?.findIndex((x: any) => x?.key === stockItem?.inputFieldKey);
                if (indexHotel > -1 && listHotelOption[indexHotel]?.listOption?.length > 0) {
                    const indexHotelOption = listHotelOption[indexHotel].listOption.findIndex((x: any) => x?.key === stockItem?.optionKey);
                    if (indexHotelOption > -1) {
                        const option = { ...listHotelOption[indexHotel]?.listOption[indexHotelOption] };
                        option.stockAvailable += action.payload.quantity;
                        const newListHotel = [...listHotelOption];
                        const newHotel = { ...newListHotel[indexHotel] };
                        const newListOption = [...newHotel.listOption];
                        newListOption[indexHotelOption] = option;
                        newListHotel[indexHotel] = { ...newHotel, listOption: newListOption };
                        listHotelOption = newListHotel;
                    }
                }
            }

            if (hotelIndex > -1) {
                available += action.payload.quantity;
                list[hotelIndex] = { ...hotel, available, listHotelOption };
            }

            state.listHotel = list;

        },
        setListHotel: (state, action) => {
            state.listHotel = action.payload;
        },
        setGetHotelStock: (state, action) => {
            const currentState = current(state);
            const { listHotel, myHotelCart } = currentState;
            let clonemyCart = { ...myHotelCart };
            const listHotelClone = [...listHotel];
            action.payload?.forEach((m: HotelType) => {
                const indexMerchanStock = listHotel?.findIndex((x) => x.hotelCode === m.hotelCode);
                if (indexMerchanStock > -1) {
                    m?.listHotelOption?.forEach((lm: any) => {
                        const indexInput = listHotel[indexMerchanStock]?.listHotelOption?.findIndex((x) => x.key === lm.key);
                        if (indexInput > -1) {
                            lm?.listOption?.forEach((lo: any) => {
                                let hotel = { ...listHotel[indexMerchanStock] };
                                let hotelOption = { ...listHotel[indexMerchanStock]?.listHotelOption[indexInput] };
                                const clmoResponse = listHotel[indexMerchanStock]?.listHotelOption[indexInput]?.listOption?.map(clmo => {

                                    const myOptionIndex = myHotelCart.items?.findIndex(mi => mi.hotelCode === m.hotelCode);
                                    if (myOptionIndex > -1) {
                                        const cloneMyItems: any = [...clonemyCart.items];
                                        let cloneMyItem = { ...clonemyCart.items[myOptionIndex] };
                                        clonemyCart.items[myOptionIndex]?.listOption?.forEach((cim: any) => {
                                            if (cim?.stock === 'ACTIVE' && cim?.optionKey === lo?.key) {
                                                cloneMyItem = { ...clonemyCart.items[myOptionIndex], stockAvailableStatus: 'SOLD_OUT' };
                                            }
                                        })
                                        cloneMyItems[myOptionIndex] = cloneMyItem;
                                        clonemyCart = { ...clonemyCart, items: cloneMyItems }
                                    }

                                    if (lo?.key === clmo?.key) {

                                        clmo = {
                                            ...clmo,
                                            stockAvailable: lo?.stockAvailable || 0,
                                            disabled: true,
                                        };
                                    }
                                    return { ...clmo };
                                });

                                hotelOption = { ...hotelOption, listOption: clmoResponse };
                                const a = hotel?.listHotelOption?.map((element) => {
                                    if (hotelOption?.key === element?.key) {
                                        element = { ...hotelOption }
                                    }

                                    return { ...element }
                                });

                                const availableStock = a?.find(x => x.stock === 'ACTIVE')?.listOption?.reduce((sum, currentValue: any) => sum + Number(currentValue?.stockAvailable || 0), 0);

                                hotel = { ...hotel, available: availableStock || 0, listHotelOption: a }
                                listHotelClone[indexMerchanStock] = hotel;

                            });

                        }
                    });
                }
            })

            state.listHotel = listHotelClone;
            state.myHotelCart = clonemyCart;
        },
        setReSetKey: (state) => {
            state.genderKey = '';
            state.listGenderFormOption = [];
            state.birthKey = '';
            state.firstNameKey = '';
            state.lastNameKey = '';
            state.telKey = '';
            state.emailKey = '';
            state.idCardKey = '';
            state.sickKey = '';
            state.nationalityKey = '';
            state.provinceKey = '';
            state.bibNameKey = '';
            state.bloodGroupKey = '';
            state.emergencyContactKey = '';
            state.emergencytelKey = '';
            state.fileNameKey = '';
            state.foodKey = '';
            state.vaccineCovidKey = '';
        },
        setGloodGroupKey: (state, action) => {
            state.bloodGroupKey = action.payload;
        },
        setListRunnerAfterCheckPromotion: (state, action) => {
            if (state?.registerFormDetail && state?.registerFormDetail?.registerStep && state?.registerFormDetail?.registerStep?.listStep?.length > 0) {
                const { listStep } = state.registerFormDetail.registerStep;
                if (listStep && listStep?.length > 0) {
                    // const runnersStepIndex = listStep.findIndex((x: StepModel) => x.stepCode === RUNNER_CODE);
                    // listStep[runnersStepIndex].data.listRunner = action.payload;
                    const runnersStepIndex = listStep.findIndex((x: StepModel) => x.stepCode === RUNNER_CODE);
                    const listRunner = listStep[runnersStepIndex]?.data?.listRunner || [];
                    const closeListRunner = [...listRunner];
                    const afterGetPromotion = closeListRunner?.map((r: any) => {
                        const runner = action.payload?.find((ar: any) => ar?.UID === r?.UID);
                        const selectItem = r?.PROMOTION?.find((resPromotion: any) => resPromotion?.selected);
                        const listPromotion = runner?.PROMOTION?.map((p: any) => {
                            if (p?.promotionCode === selectItem?.promotionCode) {
                                return { ...p, selected: true }
                            }
                            return { ...p, selected: false }
                        });

                        return { ...r, PROMOTION: listPromotion }
                    })
                    listStep[runnersStepIndex].data.listRunner = afterGetPromotion;
                }
            }
        },
        setSummaryModel: (state, action) => {
            state.summaryModel = action.payload;
        },
        setAfterValidTicketStock: (state, action) => {
            if (action.payload?.length > 0) {
                if (state?.registerFormDetail && state?.registerFormDetail?.registerStep && state?.registerFormDetail?.registerStep?.listStep?.length > 0) {
                    const { listTicket } = state.registerFormDetail;
                    if (listTicket && listTicket?.length > 0) {
                        const newList = listTicket.map((ticket: TicketModel) => {
                            const checkFullItem = action.payload?.find((x: any) => x?.ticketCode === ticket?.ticketCode);
                            if (checkFullItem) {
                                return { ...checkFullItem, status: 'FULL' }
                            }
                            return { ...ticket }
                        });

                        state.registerFormDetail = { ...state.registerFormDetail, listTicket: newList };
                        state.listTicketInputField = [...setListTicketToInputFieldModel(newList, state.currentLang)];
                        // console.log("🚀 ~ newList ~ newList:", [...setListTicketToInputFieldModel(newList, state.currentLang)]);

                    }

                }
            }
        }
    }
})

export const {
    setListInputField,
    setRegisterFormDetail,
    setStepInfo,
    setGenderKey,
    setBirthKey,
    setListGenderFormOption,
    setListRunner,
    setFirstNameKey,
    setLastNameKey,
    setcurrentLang,
    setTicketOnChange,
    setListTicketOptionInputField,
    setAddRunner,
    setEditRunner,
    setDeleteRunner,
    setListFileFormRegister,
    editListFileFormRegister,
    addListFileFormRegister,
    setShippingStatus,
    setShippingAddress,
    setPaymentFee,
    setPaymentMethod,
    setStepInfoComplate,
    filterTicketByAge,
    setListFriend,
    setAddCart,
    setCart,
    setDecreaseQuantity,
    setIncreaseQuantity,
    setPaymentGateWay,
    setListRegisterForm,
    setListTicketInputField,
    setDeleteCart,
    setListMerchandise,
    setListTicketOptionDefault,
    setGetShirtStock,
    setGetMerchandiseStock,
    setAddHotelCart,
    setHotelCart,
    setHotelDecreaseQuantity,
    setHotelIncreaseQuantity,
    setHotelDeleteCart,
    setListHotel,
    setGetHotelStock,
    setReSetKey,
    setListRunnerAfterCheckPromotion,
    setSummaryModel,
    setAfterValidTicketStock
} = registerSlice.actions;

export const selectRegister = (state: RootState) => state.register;

function setListInputFieldModel(listRegisterForm: TicketModel[], currentLang: string, state: any) {
    return listRegisterForm?.filter(x => x.status === 'ACTIVE').map((x: InputFieldModel) => {

        let defaultValue: string = '';
        const isDisabled: boolean = false;
        let listOption: InputFieldModel[] = [];

        const getLabelTh = (optionItem: any) => {
            if (x.stock === 'ACTIVE') {
                if (optionItem?.stockAvailable === 0) {
                    return `${optionItem.valueTh} (หมด)`
                }
                // return `${optionItem.valueTh} (${optionItem?.stockAvailable} ตัว)`
                return `${optionItem.valueTh}`
            }

            return `${optionItem.valueTh}`
        }

        const getLabelEn = (optionItem: any) => {
            if (x.stock === 'ACTIVE') {
                if (optionItem?.stockAvailable === 0) {
                    return `${optionItem.valueEn} (Sold out)`
                }
                // return `${optionItem.valueEn} (${optionItem?.stockAvailable} Item)`
                return `${optionItem.valueEn}`
            }
            return `${optionItem.valueEn}`
        }

        if (x?.htmlInputKey === GENDER && !!x.key) {
            state.genderKey = x.key;
            state.listGenderFormOption = x.listOption || [];
            listOption = x?.listOption?.map((res: any) => ({
                id: res.key,
                value: res.key,
                key: res.key,
                labelTh: res.valueTh,
                labelEn: res.valueEn
            })) || [];
        } else if (x.htmlInputKey === BIRTH && !!x.key) {
            state.birthKey = x.key;
        } else if (x.htmlInputKey === FNAME && !!x.key) {
            state.firstNameKey = x.key;
        } else if (x.htmlInputKey === LNAME && !!x.key) {
            state.lastNameKey = x.key;
        } else if (x.htmlInputKey === TEL && !!x.key) {
            state.telKey = x.key;
        } else if (x.htmlInputKey === EMAIL && !!x.key) {
            state.emailKey = x.key;
        } else if (x.htmlInputKey === ID_CARD && !!x.key) {
            state.idCardKey = x.key;
        } else if (x.htmlInputKey === SICK && !!x.key) {
            state.sickKey = x.key;
        } else if (x.htmlInputKey === USER_TYPE && !!x.key) {
            defaultValue = '';
        } else if (x.htmlInputKey === NATIONALITY && !!x.key) {
            state.nationalityKey = x.key;
            listOption = listNationality?.map((res: any) => ({
                id: res.value1,
                value: res.value1,
                key: res.value1,
                labelTh: res.valueTh,
                labelEn: res.valueEn,
                keyOld: res.key,
            })) || [];;
        } else if (x.htmlInputKey === PROVINCE && !!x.key) {
            state.provinceKey = x.key;
            listOption = listProvince?.map((res: any) => ({
                id: res.key,
                value: res.value1,
                key: res.value1,
                labelTh: res.valueTh,
                labelEn: res.valueEn,
                keyOld: res.key,
            })) || [];
        } else if (x.htmlInputKey === BIB_NAME && !!x.key) {
            state.bibNameKey = x.key;
        } else if (x.htmlInputKey === BLOOD_GROUP && !!x.key) {
            state.bloodGroupKey = x.key;
            listOption = x?.listOption?.map((res: any) => ({
                id: res.key,
                value: res.key,
                key: res.key,
                labelTh: res.valueTh,
                labelEn: res.valueEn
            })) || [];
        } else if (x.htmlInputKey === EM_CONTACT && !!x.key) {
            state.emContactKey = x.key;
        } else if (x.htmlInputKey === EM_TEL && !!x.key) {
            state.emTelKey = x.key;
        } else if (x.htmlInputKey === FOOD && !!x.key) {
            state.foodKey = x.key;
        } else if (x.htmlInputKey === VACCINE_COVID && !!x.key) {
            state.vaccineCovidKey = x.key;
        } else if (x.htmlInputKey === FILE_NAME && !!x.key) {
            state.fileNameKey = x.key;
        } else {
            // (หมด)
            listOption = x?.listOption?.map((res: any) => ({
                id: res.key,
                value: res.key,
                key: res.key,
                labelTh: getLabelTh(res),
                labelEn: getLabelEn(res),
                stockAmount: res.stockAmount || 0,
                stockAvailable: res.stockAvailable || 0,
                purchaseQuantity: res.purchaseQuantity || 0
            })) || [];
        }

        let isIdCardEn: boolean = false;
        if (x.htmlInputKey === ID_CARD && currentLang === 'en') {
            isIdCardEn = true;
        }

        const rules: any = x.required ? {
            required: currentLang === 'en' ? (x.placeholderTh || 'This is required.') : 'กรุณาระบุ',
            minDate: x.minDate,
            maxDate: x.maxDate,
            limitChar: x.limitChar,
            maxLength: isIdCardEn || x.maxLength === 255 ? null : x.maxLength,
            minLength: isIdCardEn || x.minLength === 0 ? null : x.minLength,
            pattern: x.inputType === 'EMAIL' ? {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address"
            } : undefined
        } : undefined;

        const model: DynamicFormType = {
            label: x?.labelTh || '',
            labelEn: x?.labelEn || '',
            name: x?.key || '',
            key: x?.key || '',
            type: x?.controlType || '',
            placeholder: currentLang === 'en' ? (x?.labelEn || 'This is required.') : x?.labelTh || '',
            placeholderEn: x?.labelEn || 'This is required.',
            defaultValue,
            stock: x?.stock || '',
            disabled: isDisabled,
            rules,
            colLayout: x?.colLayout || '',
            col: x?.col || '',
            inputType: x?.inputType,
            minDate: x.minDate,
            maxDate: x.maxDate,
            maxLength: x.limitChar,
            option: listOption || [],
            htmlInputKey: x.htmlInputKey,
            descriptionTh: x?.descriptionTh || '',
            descriptionEn: x?.descriptionEn || '',
        }
        return model;
    });
}

const setListTicketToInputFieldModel = (list: TicketModel[], currentLang: string) => {

    const defaultValue: string = '';
    let isDisabled: boolean = false;

    const rules = {
        required: currentLang === 'en' ? 'This is required.' : 'กรุณาระบุ',
    };

    if (defaultValue !== '') {
        isDisabled = true;
    }

    const model: DynamicFormType = {
        label: 'ประเภทการแข่งขัน',
        labelEn: 'Race',
        name: 'TICKET_CODE',
        key: 'TICKET_CODE',
        type: 'dropdownTicket',
        placeholder: currentLang === 'en' ? 'Race' : 'ประเภทการแข่งขัน',
        defaultValue,
        disabled: isDisabled,
        rules,
        colLayout: '',
        col: '98',
        inputType: 'dropdown',
        option: list?.map((res: any) => ({
            id: res.ticketCode,
            value: res.ticketCode,
            key: res.ticketCode,
            ticketPriceActive: res?.ticketPriceActive,
            labelTh: res.ticketNameTh,
            labelEn: res.ticketNameEn,
            listTicketAgeGroup: res?.listTicketAgeGroup,
            ticketImageFileUrl: res?.ticketImageFileUrl,
            status: res?.status,
            statusDesc: res?.statusDesc
        }
        )) || []
    }

    const listDynamicForm: DynamicFormType[] = [model];
    return listDynamicForm;
}

const setListTicketToInputFieldModelForEdit = (list: TicketModel[], currentLang: string, ticketCode: string) => {

    const isDisabled: boolean = false;

    const rules = {
        required: currentLang === 'en' ? 'This is required.' : 'กรุณาระบุ',
    }

    const model: DynamicFormType = {
        label: 'ประเภทการแข่งขัน',
        labelEn: 'Race',
        name: 'TICKET_CODE',
        key: 'TICKET_CODE',
        type: 'dropdownTicket',
        placeholder: currentLang === 'en' ? 'Race' : 'ประเภทการแข่งขัน',
        defaultValue: ticketCode,
        disabled: isDisabled,
        rules,
        colLayout: '',
        col: '98',
        inputType: 'dropdown',
        option: list?.map((res: any) => ({
            id: res.ticketCode,
            value: res.ticketCode,
            key: res.ticketCode,
            ticketPriceActive: res?.ticketPriceActive,
            labelTh: res.ticketNameTh,
            labelEn: res.ticketNameEn,
            listTicketAgeGroup: res?.listTicketAgeGroup,
            ticketImageFileUrl: res?.ticketImageFileUrl,
            status: res?.status,
            statusDesc: res?.statusDesc
        }
        )) || []
    }

    const listDynamicForm: DynamicFormType[] = [model];
    return listDynamicForm;
}

const countSummary = (registerFormDetail: EventModel & OrderModel) => {
    const { listPaymentGateway, orderNumber } = registerFormDetail;
    const { listStep } = registerFormDetail.registerStep;

    const listRunner: any[] = listStep?.find((x: StepModel) => x.stepCode === RUNNER_CODE)?.data?.listRunner || [];
    const genenrateMerchandise: any = listStep?.find((x: StepModel) => x.stepCode === MERCHANDISE_CODE)?.data?.merchandise;
    const genenrateHotel: any = listStep?.find((x: StepModel) => x.stepCode === HOTEL_CODE)?.data?.hotel;
    const paymentStepIndex = listStep.findIndex((x: StepModel) => x.stepCode === PAYMENT_CODE);
    const shippingIndex = listStep.findIndex((x: StepModel) => x.stepCode === SHIPPING_CODE);

    // Summary Ticket price
    const sumPrice = listRunner?.reduce((sum, currentValue) => sum + Number(currentValue[TICKET_PRICE]), 0);
    const sumDiscount = listRunner?.reduce((sum, currentValue) => sum + Number(currentValue[DISCOUNT_AMOUNT]), 0);
    // Summary Ticket price

    // Summary Discount and Promotion
    let totalDiscountAndPromotionAmount = 0;
    if (listRunner && listRunner?.length > 0) {
        totalDiscountAndPromotionAmount = listRunner.reduce((sum, currentValue) => {
            const discountAmount = Number(currentValue[DISCOUNT_AMOUNT]);
            let promotionDiscount = 0;
            if (orderNumber) {
                promotionDiscount = Number(currentValue[PROMOTION_DISCOUNT]) || 0;
            } else {
                promotionDiscount = Number(currentValue[PROMOTION]?.find((promotion: any) => Boolean(promotion?.selected))?.promotionDiscount) || 0;

            }

            const oldSum = Number(discountAmount) + Number(promotionDiscount);
            sum += oldSum > Number(currentValue[TICKET_PRICE]) ? Number(currentValue[TICKET_PRICE]) : Number(oldSum);
            return sum;
        }, 0);
    }
    // Summary Discount and Promotion

    // Summary Merchandise
    const merchandiseTotalPrice = genenrateMerchandise?.items?.reduce((sum: any, currentValue: any) => sum + Number(currentValue.quantity * currentValue.merchandisePrice), 0);
    const merchandiseTotalItems = genenrateMerchandise?.totalItems || 0;
    // Summary Merchandise

    // Summary Hotel
    const hotelTotalPrice = genenrateHotel?.items?.reduce((sum: any, currentValue: HotelType) => sum + Number(currentValue.quantity * currentValue.hotelPrice), 0);
    const hotelTotalItems = genenrateHotel?.totalItems || 0;
    // Summary Hotel

    let genenratePaymentGateway: StepPaymentGatewayModel = {
        eventCode: registerFormDetail.eventCode || '',
        totalOrder: 0,
        totalAmount: 0,
        shippingStatus: '',
        shippingAmount: 0,
        paymentGatewayFee: 0,
        paymentGatewayFeeUnit: '',
        paymentMethod: '',
        couponCode: '',
        discountAmount: 0,
        netAmount: 0,
        status: 'ACTIVE',
        listPaymentGateway: [],
        paymentGatewayAmount: 0,
        merchandiseTotalPrice: 0,
        merchandiseTotalItems: 0,
        hotelTotalPrice: 0,
        hotelTotalItems: 0,
        realDiscounts: 0,
        beforeNetAmount: 0
    }

    if (listStep[paymentStepIndex]?.data?.paymentGateway) {
        genenratePaymentGateway = { ...listStep[paymentStepIndex].data.paymentGateway };
    }

    const genenrateShipping: StepShippingModel = { ...listStep[shippingIndex]?.data?.shipping };

    genenrateShipping.totalOrder = listRunner.length;
    genenratePaymentGateway.totalOrder = listRunner.length;
    genenratePaymentGateway.discountAmount = sumDiscount;
    genenratePaymentGateway.realDiscounts = totalDiscountAndPromotionAmount;
    genenratePaymentGateway.shippingAmount = 0;

    genenratePaymentGateway.totalAmount = sumPrice;
    genenratePaymentGateway.merchandiseTotalPrice = merchandiseTotalPrice || 0;
    genenratePaymentGateway.merchandiseTotalItems = merchandiseTotalItems || 0;
    genenratePaymentGateway.hotelTotalPrice = hotelTotalPrice || 0;
    genenratePaymentGateway.hotelTotalItems = hotelTotalItems || 0;

    if (genenrateShipping?.shippingStatus) {
        // กรณีมีจัดส่ง
        if (genenrateShipping.shippingStatus === 'ACTIVE') {
            if (listRunner && listRunner?.length > 1) {
                // เช็คว่ามีส่วนลดที่รวมค่าจัดส่งกี่คน
                const countRunnerFreeShipping = listRunner?.filter(x => x?.DISCOUNT_MODE === 'FREE_AND_SHIPPING')?.length || 0;
                // ลบจำนวนคนที่มีส่วนลด
                const count = (listRunner.length - 1) - Number(countRunnerFreeShipping);

                // คิดค่าจัดส่งทั้งหมดก่อนมาลบส่วนลดที่รวมค่าจัดส่ง
                let amount = 0;
                // คิดค่าจัดส่งพื้นฐาน
                const shippingFee = registerFormDetail?.shippingFee || 0;
                // คิดค่าจัดส่งคนถัดไป
                const additionalShippingFee = registerFormDetail?.additionalShippingFee || 0;

                amount += shippingFee;

                // เช็คว่าจำนวนคนที่มีส่วนลดค่าจัดส่งเท่ากับจำนวนคนที่สมัครเข้ามาหรือไม่
                if (Number(countRunnerFreeShipping) === Number(listRunner.length)) {
                    // ใช่ set 0 บาท
                    amount = 0;
                } else {
                    // ไม่ใช่  นำค่าจัดส่ง additionalShippingFee * กับจำนวนคนที่ไม่มีส่วนลดจัดส่ง
                    amount += additionalShippingFee * count;
                }

                genenratePaymentGateway.shippingAmount = amount;
                genenrateShipping.shippingAmount = amount;

            } else {
                const countRunnerFreeShipping = listRunner?.filter(x => x?.DISCOUNT_MODE === 'FREE_AND_SHIPPING')?.length || 0;
                let amount = 0;
                if (listRunner?.length > 0) {
                    const shippingFee = Number(countRunnerFreeShipping) === 0 ? (registerFormDetail?.shippingFee || 0) : 0;
                    amount += shippingFee
                }
                genenratePaymentGateway.shippingAmount = amount;
                genenrateShipping.shippingAmount = amount;
            }

            genenratePaymentGateway.shippingStatus = 'ACTIVE';
            genenrateShipping.shippingStatus = 'ACTIVE';

        } else {
            genenrateShipping.shippingStatus = 'INACTIVE';
            genenratePaymentGateway.shippingStatus = 'INACTIVE';
            genenrateShipping.shippingAmount = 0;
            genenratePaymentGateway.shippingAmount = 0;
            genenrateShipping.shippingAmount = 0;
            genenrateShipping.userAddress = undefined;
        }
    } else {
        genenrateShipping.shippingStatus = '';
        genenratePaymentGateway.shippingStatus = '';
        genenrateShipping.shippingAmount = 0;
        genenratePaymentGateway.shippingAmount = 0;
        genenrateShipping.shippingAmount = 0;
        genenrateShipping.userAddress = undefined;
    }

    const total = (Number(genenratePaymentGateway?.totalAmount || 0) +
        Number(genenratePaymentGateway?.merchandiseTotalPrice || 0) +
        Number(genenratePaymentGateway?.hotelTotalPrice || 0));

    // คำนวนเงิน และ ส่วนลด เพื่อนำไปคิด ค่าธรรมเนียม
    const beforeNetAmount = Number(total) - (totalDiscountAndPromotionAmount || 0);
    genenratePaymentGateway.beforeNetAmount = beforeNetAmount;

    const beforeNetAmountAndShipping = Number(beforeNetAmount) + Number(genenrateShipping?.shippingAmount || 0);

    // คิดค่าธรรมเนียม
    const childArray: PaymentGatewayModel[] = listPaymentGateway?.map((arrayElement: any) => {
        if (arrayElement.paymentGatewayFeeUnit === "P") {
            const netFee = (Number(beforeNetAmountAndShipping) * (Number(arrayElement?.paymentGatewayFee || 0) / 100))
            arrayElement = { ...arrayElement, amountFee: netFee.toFixed(2) };
        } else if (arrayElement.paymentGatewayFeeUnit === "B") {
            arrayElement = { ...arrayElement, amountFee: Number(arrayElement.paymentGatewayFee).toFixed(2) };
        } else {
            const netFee = (Number(beforeNetAmountAndShipping) * (Number(arrayElement?.paymentGatewayFee || 0) / 100))
            arrayElement = { ...arrayElement, amountFee: netFee.toFixed(2) };
        }

        return arrayElement;
    }) || [];

    if (genenratePaymentGateway?.paymentMethod) {
        const usePaymentMethod = childArray.find((x) => x.paymentMethod === genenratePaymentGateway?.paymentMethod);
        genenratePaymentGateway.paymentGatewayAmount = Number(usePaymentMethod?.amountFee) || 0;
    }

    // ยอดรวมทั้งหมด
    genenratePaymentGateway.netAmount = Number(beforeNetAmountAndShipping || 0) + Number(genenratePaymentGateway?.paymentGatewayAmount || 0);

    return {
        genenratePaymentGateway,
        genenrateShipping,
        listPaymentGateway: childArray
    }

}

const checkDuplicates = (listTicketOptionInputFieldAllSelect: DynamicFormType[], listInputByTicket: DynamicFormType[], payload: any) => {
    const duplicates: DynamicFormType[] = [];
    if (listTicketOptionInputFieldAllSelect?.length > 0) {
        listTicketOptionInputFieldAllSelect.forEach((x) => {
            const indexSelectInput = listInputByTicket?.findIndex((ticketKey) => ticketKey.key === x.key);
            if (indexSelectInput === -1) {
                duplicates.push(x);
            }
        });

        Object.keys(payload).forEach(key => {
            const indexInputNotHas = duplicates?.findIndex((ticketKey) => ticketKey.key === key);
            if (indexInputNotHas >= 0) {
                delete payload[key];
            }
        })
        return { payload, duplicates };
    }

    return { payload, duplicates };
}

function filterDuplicates(arr1: any[], arr2: any[]) {

    const duplicates: any[] = [];

    arr1?.forEach((v) => {

        if (v?.optionKey) {
            if (arr2.find(x => x?.optionKey === v?.optionKey)) {
                duplicates.push(v);
            }
        }

        if (v?.optionValue) {
            if (arr2.find(x => x?.optionValue === v?.optionValue)) {
                duplicates.push(v);
            }
        }

    });


    return { duplicates }
}

function handleMerchandise({ listMerchandise, payload }: { listMerchandise: any[], payload: any }) {

    const stockItem = payload?.listOption?.find((x: any) => x?.stock === "ACTIVE");

    const list = [...listMerchandise];
    const merchandise = list.find((x) => x.id === payload.id);
    const merchandiseIndex = list.findIndex((x) => x.id === payload.id);
    let { available, listMerchandiseOption } = merchandise;

    if (stockItem) {
        const indexMerchandise = listMerchandiseOption?.findIndex((x: any) => x?.key === stockItem?.inputFieldKey);
        if (indexMerchandise > -1 && listMerchandiseOption[indexMerchandise]?.listOption?.length > 0) {
            const indexMerchandiseOption = listMerchandiseOption[indexMerchandise].listOption.findIndex((x: any) => x?.key === stockItem?.optionKey);
            if (indexMerchandiseOption > -1) {
                const option = { ...listMerchandiseOption[indexMerchandise]?.listOption[indexMerchandiseOption] };
                option.stockAvailable -= payload.quantity;
                const newListMerchandise = [...listMerchandiseOption];
                const newMerchandise = { ...newListMerchandise[indexMerchandise] };
                const newListOption = [...newMerchandise.listOption];
                newListOption[indexMerchandiseOption] = option;
                newListMerchandise[indexMerchandise] = { ...newMerchandise, listOption: newListOption };
                listMerchandiseOption = newListMerchandise;
            }
        }
    }

    if (merchandiseIndex > -1) {
        available -= payload.quantity;
        list[merchandiseIndex] = { ...merchandise, available, listMerchandiseOption };
    }

    return list;
}

function handleHotel({ listHotel, payload }: { listHotel: any[], payload: any }) {

    const stockItem = payload?.listOption?.find((x: any) => x?.stock === "ACTIVE");

    const list = [...listHotel];
    const hotel = list.find((x) => x.id === payload.id);
    const hotelIndex = list.findIndex((x) => x.id === payload.id);
    let { available, listHotelOption } = hotel;

    if (stockItem) {
        const indexHotel = listHotelOption?.findIndex((x: any) => x?.key === stockItem?.inputFieldKey);
        if (indexHotel > -1 && listHotelOption[indexHotel]?.listOption?.length > 0) {
            const indexHotelOption = listHotelOption[indexHotel].listOption.findIndex((x: any) => x?.key === stockItem?.optionKey);
            if (indexHotelOption > -1) {
                const option = { ...listHotelOption[indexHotel]?.listOption[indexHotelOption] };
                option.stockAvailable -= payload.quantity;
                const newListHotel = [...listHotelOption];
                const newHotel = { ...newListHotel[indexHotel] };
                const newListOption = [...newHotel.listOption];
                newListOption[indexHotelOption] = option;
                newListHotel[indexHotel] = { ...newHotel, listOption: newListOption };
                listHotelOption = newListHotel;
            }
        }
    }

    if (hotelIndex > -1) {
        available -= payload.quantity;
        list[hotelIndex] = { ...hotel, available, listHotelOption };
    }

    return list;
}

function setHtmlKey({ state, payload }: { state: any, payload: any }) {

    delete payload[""];

    if (state.birthKey) {
        payload.BIRTH = payload[state.birthKey];
    }

    if (state.telKey) {
        payload.TEL = payload[state.telKey];
    }

    if (state.genderKey) {
        payload.GENDER = payload[state.genderKey];
    }

    if (state.emailKey) {
        payload.EMAIL = payload[state.emailKey];
    }

    if (state.emergencyContactKey) {
        payload.EM_CONTACT = payload[state.emergencyContactKey];
    }

    if (state.emergencytelKey) {
        payload.EM_TEL = payload[state.emergencytelKey];
    }

    if (state.nationalityKey) {
        payload.NATIONALITY = payload[state.nationalityKey];
    }

    if (state.provinceKey) {
        payload.PROVINCE = payload[state.provinceKey];
    }

    if (state.idCardKey) {
        payload.ID_CARD = payload[state.idCardKey];
    }

    if (state.fileNameKey) {
        payload.FILE_NAME = payload[state.fileNameKey];
    }

    if (!payload[state.fileNameKey]) {
        delete payload.FILE_NAME;
    }

    if (state.sickKey) {
        payload.SICK = payload[state.sickKey];
    }

    if (state.bibNameKey) {
        payload.BIB_NAME = payload[state.bibNameKey];
    }

    if (state.foodKey) {
        payload.FOOD = payload[state.foodKey];
    }

    if (state.vaccineCovidKey) {
        payload.VACCINE_COVID = payload[state.vaccineCovidKey];
    }

    if (state.bloodGroupKey) {
        payload.BLOOD_GROUP = payload[state.bloodGroupKey];
    }

    return payload
}
export default registerSlice.reducer;
