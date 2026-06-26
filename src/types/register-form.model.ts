import { UserAddressModel } from "./user";
import { TicketModel } from "./ticket.model";
import { InputFieldModel } from "./input-column.model";
import { PaymentGatewayModel } from "./payment-gateway.model";

export type RegisterFormModel = {
    eventDesc?: string;
    eventNameTh?: string;
    eventNameEn?: string;
    eventUrl?: string;
    organizerName?: string;
    eventProvinceCode?: string;
    eventProvinceEn?: string;
    eventProvinceTh?: string;
    eventDate?: Date | null | undefined;
    eventLocationTh?: string;
    eventLocationEn?: string;
    registerStartDate?: Date | null | undefined;
    registerEndDate?: Date | null | undefined;
    registerType?: string;
    shippingStatus?: string;
    shippingFee?: number;
    additionalShippingFee?: number;
    status?: string;
    sequence?: number;
    applyForFriend?: string;
    lineAccessToken?: string;
    racepackLocationTh?: string;
    racepackLocationEn?: string;
    eventImgBanner?: string;
    eventType?: string;
    eventStatus?: string;
    viewType?: string;
    weaverInfo?: string;
    organizerCode?: string;
    eventCode?: string;
    registerLimit?: string;
    registerStatus?: string;
    registerUrl?: string;
    registerPrivateUrl?: string;
    testUrl?: string;
    testRegisterUrl?: string;
    createDtm?: string;
    createBy?: string;
    lastUpdateDtm?: string;
    lastUpdateBy?: string;
    imageEventFileName?: string;
    statusDesc?: string;
    imageEventBannerUrl?: string;
    eventImageId?: number;
    imageEventFileId?: number;
    listTicket?: TicketModel[];
    listTicketDistance?: string[];
    registerStep: {
        listStep: StepModel[];
    };
    discountWithPromotion?: string;
    eventPromotion?: string;
}

export type StepModel = {
    stepCode: string,
    stepDesc: string,
    stepDescEn: string,
    stepIcon: string,
    submitStatus: string,
    data: {
        listRegisterForm: InputFieldModel[];
        listRunner: any[];
        shippingStatus: string;
        shippingFee: number;
        additionalShippingFee: number;
        userAddress: string;
        shipping: StepShippingModel;
        paymentGateway: StepPaymentGatewayModel;
        merchandise: StepMerchandiseModel;
        hotel: StepMerchandiseModel;
    }
}

export type StepMerchandiseModel = {
    items: any[];
    totalItems: number;
}

export type StepRegisterModel = {
    listRegisterForm: InputFieldModel[]
}

export type StepRunnerDetailModel = {
    listRunner: []
}

export type StepShippingModel = {
    userAddress?: UserAddressModel;
    userAddressCode?: string;
    shippingStatus?: string;
    shippingAmount?: number;
    totalOrder?: number;
}

export type StepPaymentGatewayModel = {
    listPaymentGateway: PaymentGatewayModel[];
    eventCode: string | '';
    shippingStatus: string;
    totalOrder: number | 0;
    totalAmount: number | 0;
    shippingAmount: number | 0;
    paymentGatewayFee: number | 0;
    paymentGatewayFeeUnit: string;
    paymentMethod: string;
    couponCode: string;
    discountAmount: number | 0;
    netAmount: number | 0;
    status: string;
    paymentGatewayAmount: number | 0;
    merchandiseTotalPrice: number | 0;
    merchandiseTotalItems: number | 0;
    qrImage?: string;
    paymentExpiredDate?: string;
    referenceOrder?: string;
    hotelTotalPrice: number | 0;
    hotelTotalItems: number | 0;
    realDiscounts: number | 0;
    beforeNetAmount: number | 0;
}

export type RegisterValue = {
    total: number;
    subTotal: number;
    discount: number;
    shipping: number;
    activeStep: number;
    totalItems: number;
    items: any[];
    billing: any | null;
};
export type RegisterStepProps = RegisterValue & {
    completed: boolean;
    //
    onAddToCart: (newItem: Omit<any, 'subTotal'>) => void;
    onDeleteCart: (itemId: string) => void;
    //
    onIncreaseQuantity: (itemId: string) => void;
    onDecreaseQuantity: (itemId: string) => void;
    //
    onBackStep: VoidFunction;
    onNextStep: VoidFunction;
    onGotoStep: (step: number) => void;
    //
    onCreateBilling: (billing: any) => void;
    onApplyDiscount: (discount: number) => void;
    onApplyShipping: (discount: number) => void;
    //
    canReset: boolean;
    onReset: VoidFunction;
};

export type CartOption = {
    valueEn: string;
    valueTh: string;
    optionKey: string;
    labelEn: string;
    labelTh: string;
    inputFieldKey: string;
    stock: string;
    optionValue: string;
    displayInput?: string
};

export const defaultCartOptionValue = {
    valueEn: '',
    valueTh: '',
    optionKey: '',
    labelEn: '',
    labelTh: '',
    inputFieldKey: '',
    stock: 'INACTIVE',
    optionValue: ''
}