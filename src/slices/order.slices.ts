import { createSlice } from '@reduxjs/toolkit';

import { ORDER_PACKAGE_TYPE } from 'src/utils/constants';

import type { RootState } from 'src/store/types';

import { OrderModel } from 'src/types/order.model';
import { OrderPhotoModel } from 'src/types/order-photo.type';
import { DiscountCodeModel } from 'src/types/discount.model';
import { PaymentGatewayModel } from 'src/types/payment-gateway.model';

export type PhotoCart = {
    id: string,
    url: string,
    type: string,
    photoTypeDescTh: string,
    photoTypeDescEn: string,
    photoPrice: number,
    photoPriceCode: string,
    uid: string,
    imageType: string
}

export type PhotoCartDetailModel = {
    totalOrder: number,
    listPhoto: PhotoCart[],
    paymentModel?: PaymentGatewayModel,
    totalAmount: number,
    beforeNetAmount: number,
    netAmount: number,
    paymentGatewayAmount: number,
    discountAmount: number,
    realDiscounts: number,
    discountModel?: DiscountCodeModel,
    orderPackageType: string
}

export type orderState = {
    orderModel?: OrderPhotoModel,
    listUserOrder: OrderModel[],
    photoCart: PhotoCartDetailModel,
    listPaymentGateway: PaymentGatewayModel[],
    photoCartDetail: PhotoCartDetailModel
}

const initialState: orderState = {
    orderModel: undefined,
    listUserOrder: [],
    photoCart: {
        totalOrder: 0,
        listPhoto: [],
        paymentModel: undefined,
        totalAmount: 0,
        beforeNetAmount: 0,
        netAmount: 0,
        paymentGatewayAmount: 0,
        discountAmount: 0,
        realDiscounts: 0,
        discountModel: undefined,
        orderPackageType: ''
    },
    listPaymentGateway: [],
    photoCartDetail: {
        totalOrder: 0,
        listPhoto: [],
        paymentModel: undefined,
        totalAmount: 0,
        beforeNetAmount: 0,
        netAmount: 0,
        paymentGatewayAmount: 0,
        discountAmount: 0,
        realDiscounts: 0,
        orderPackageType: ''
    }
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrderModel: (state, action) => {
            const summaryModel = countSummary(
                action.payload.listPaymentGateway,
                action.payload.totalAmount || 0,
                action.payload.paymentMethod,
                action.payload.discountModel
            );
            state.listPaymentGateway = summaryModel.listPaymentGateway || [];
            state.orderModel = {
                ...action.payload,
                beforeNetAmount: summaryModel.beforeNetAmount,
                paymentModel: { ...action.payload.paymentModel, paymentGatewayAmount: Number(summaryModel?.paymentGatewayAmount || 0) },
                netAmount: summaryModel.netAmount
            };
        },
        setListOrderUser: (state, action) => {
            state.listUserOrder = action.payload
        },
        setPhotoCart: (state, action) => {
            const newItem: PhotoCart = action.payload;
            // หา index ของ item ที่ทำการเพิ่ม/อัปเดต
            const existingIndex = state.photoCart.listPhoto.findIndex(item => item.id === newItem.id);

            if (existingIndex === -1) {
                state.photoCart.listPhoto.push(newItem);
            } else {
                state.photoCart.listPhoto[existingIndex] = newItem;
            }

            const updatedList = state.photoCart.listPhoto;
            // คำนวณ totalOrder และ totelAmount
            state.photoCart.totalOrder = updatedList.length;
            state.photoCart.totalAmount = updatedList.reduce((sum, currentValue) => sum + currentValue.photoPrice, 0);
            state.photoCart.orderPackageType = ORDER_PACKAGE_TYPE.NORMAL;

            const summaryModel = countSummary(
                state.listPaymentGateway,
                Number(state.photoCart.totalAmount || 0),
                (state.photoCart?.paymentModel?.paymentMethod || ''),
                state.photoCart?.discountModel
            );

            const paymentGatewayModel: PaymentGatewayModel = {
                "id": 0,
                "eventCode": "",
                "sequence": 0,
                "paymentMethod": "D",
                "paymentDescTh": "โอนผ่านบัญชี",
                "paymentDescEn": "Direct Payment",
                "paymentGatewayFeeUnit": "P",
                "paymentGatewayFee": "0.00",
                "status": "ACTIVE",
                "amountFee": 0,
                "paymentGatewayAmount": 0
            };

            state.listPaymentGateway = summaryModel.listPaymentGateway || [];
            state.photoCart.discountAmount = Number(summaryModel?.discountAmount || 0);
            state.photoCart.beforeNetAmount = summaryModel.beforeNetAmount;
            state.photoCart.netAmount = summaryModel.netAmount;
            state.photoCart.paymentGatewayAmount = Number(summaryModel?.paymentGatewayAmount || 0);

            if (summaryModel.netAmount > 0) {
                state.photoCart.paymentModel = {
                    ...state.photoCart.paymentModel,
                    paymentGatewayAmount: Number(summaryModel?.paymentGatewayAmount || 0),
                };
            } else {
                state.photoCart.paymentModel = paymentGatewayModel;
            }

        },
        setListPaymentGateway: (state, action) => {
            state.listPaymentGateway = action.payload
        },
        setPaymentMethod: (state, action) => {
            const summaryModel = countSummary(
                state.listPaymentGateway,
                Number(state.photoCart.totalAmount || 0),
                (action.payload?.paymentMethod || ''),
                state.photoCart?.discountModel
            );

            state.listPaymentGateway = summaryModel.listPaymentGateway || [];
            state.photoCart.discountAmount = Number(summaryModel?.discountAmount || 0);
            state.photoCart.beforeNetAmount = summaryModel.beforeNetAmount;
            state.photoCart.netAmount = summaryModel.netAmount;
            state.photoCart.paymentGatewayAmount = Number(summaryModel?.paymentGatewayAmount || 0);
            state.photoCart.paymentModel = {
                ...action.payload,
                paymentGatewayAmount: Number(summaryModel?.paymentGatewayAmount || 0),
            };
        },
        clearPhotoCart: (state) => {
            state.photoCart = {
                totalOrder: 0,
                listPhoto: [],
                paymentModel: undefined,
                totalAmount: 0,
                beforeNetAmount: 0,
                netAmount: 0,
                paymentGatewayAmount: 0,
                discountAmount: 0,
                realDiscounts: 0,
                discountModel: undefined,
                orderPackageType: ''
            }
        },
        deletePhotoCart: (state, action) => {

            const paymentMethod = state.photoCart.paymentModel?.paymentMethod;
            const oldCart: PhotoCart[] = [...state.photoCart.listPhoto];
            const updatedList = oldCart.filter((item: PhotoCart) => item.id !== action.payload.id);
            state.photoCart.totalOrder = updatedList.length;
            state.photoCart.listPhoto = updatedList;

            const { totalAmount: currentTotalAmount } = state.photoCart;

            let totalAmount = 0;
            if (state.photoCart.orderPackageType !== ORDER_PACKAGE_TYPE.ALL && state.photoCart.orderPackageType !== ORDER_PACKAGE_TYPE.LIMIT_LENGTH_PHOTO) {
                totalAmount = updatedList.reduce((sum, currentValue) => sum + currentValue.photoPrice, 0);
                state.photoCart.totalAmount = totalAmount;
            } else {
                totalAmount = currentTotalAmount;
            }

            const summaryModel = countSummary(
                state.listPaymentGateway,
                totalAmount,
                paymentMethod,
                state.photoCart?.discountModel
            );

            const paymentGatewayModel: PaymentGatewayModel = {
                "id": 0,
                "eventCode": "",
                "sequence": 0,
                "paymentMethod": "D",
                "paymentDescTh": "โอนผ่านบัญชี",
                "paymentDescEn": "Direct Payment",
                "paymentGatewayFeeUnit": "P",
                "paymentGatewayFee": "0.00",
                "status": "ACTIVE",
                "amountFee": 0,
                "paymentGatewayAmount": 0
            };

            state.listPaymentGateway = summaryModel.listPaymentGateway || [];
            state.photoCart.discountAmount = Number(summaryModel?.discountAmount || 0);
            state.photoCart.beforeNetAmount = summaryModel.beforeNetAmount;
            state.photoCart.netAmount = summaryModel.netAmount;
            state.photoCart.paymentGatewayAmount = Number(summaryModel?.paymentGatewayAmount || 0);

            if (summaryModel.netAmount > 0) {
                state.photoCart.paymentModel = {
                    ...state.photoCart.paymentModel,
                    paymentGatewayAmount: Number(summaryModel?.paymentGatewayAmount || 0),
                };
            } else {
                state.photoCart.paymentModel = paymentGatewayModel;
            }

            if (state.photoCart.totalOrder === 0) {
                state.photoCart = {
                    totalOrder: 0,
                    listPhoto: [],
                    paymentModel: undefined,
                    totalAmount: 0,
                    beforeNetAmount: 0,
                    netAmount: 0,
                    paymentGatewayAmount: 0,
                    discountAmount: 0,
                    realDiscounts: 0,
                    discountModel: undefined,
                    orderPackageType: ''
                }
            }
        },
        setPaymentMethodDetail: (state, action) => {

            if (!state.orderModel) return;

            state.orderModel.paymentModel = action.payload;

            const summaryModel = countSummary(
                state.listPaymentGateway,
                state.orderModel?.totalAmount || 0,
                action.payload.paymentMethod,
                state.orderModel?.discountModel
            );

            state.listPaymentGateway = summaryModel.listPaymentGateway || [];
            state.orderModel.beforeNetAmount = summaryModel.beforeNetAmount;
            state.orderModel = {
                ...state.orderModel,
                paymentModel: {
                    ...action.payload,
                    paymentGatewayFee: Number(summaryModel?.paymentGatewayAmount || 0),
                    paymentGatewayAmount: Number(summaryModel?.paymentGatewayAmount || 0),
                    netAmount: summaryModel.netAmount
                },
                netAmount: summaryModel.netAmount
            }
        },
        setUseDiscount: (state, action) => {

            state.photoCart.discountModel = action.payload;
            const paymentMethod = state.photoCart.paymentModel?.paymentMethod;

            const summaryModel = countSummary(
                state.listPaymentGateway,
                Number(state.photoCart.totalAmount || 0),
                paymentMethod,
                action.payload
            );

            console.log("summaryModel + ", summaryModel);

            state.listPaymentGateway = summaryModel.listPaymentGateway || [];

            const paymentGatewayModel: PaymentGatewayModel = {
                "id": 0,
                "eventCode": "",
                "sequence": 0,
                "paymentMethod": "D",
                "paymentDescTh": "โอนผ่านบัญชี",
                "paymentDescEn": "Direct Payment",
                "paymentGatewayFeeUnit": "P",
                "paymentGatewayFee": "0.00",
                "status": "ACTIVE",
                "amountFee": 0,
                "paymentGatewayAmount": 0
            };

            state.photoCart.beforeNetAmount = summaryModel.beforeNetAmount;
            state.photoCart.netAmount = summaryModel.netAmount;
            state.photoCart.paymentGatewayAmount = Number(summaryModel?.paymentGatewayAmount || 0);
            state.photoCart.discountAmount = Number(summaryModel?.discountAmount || 0);

            if (summaryModel.netAmount > 0) {
                state.photoCart.paymentModel = {
                    ...state.photoCart.paymentModel,
                    paymentGatewayAmount: Number(summaryModel?.paymentGatewayAmount || 0),
                };
            } else {
                state.photoCart.paymentModel = paymentGatewayModel;
            }

        },
        setUsePackagePhotoToCart: (state, action) => {
            const newItem: PhotoCart[] = action.payload.listPhoto;
            const { pricetModel } = action.payload;

            if (pricetModel.priceType === ORDER_PACKAGE_TYPE.ALL ||
                pricetModel.priceType === ORDER_PACKAGE_TYPE.ALL_VIDEO ||
                pricetModel.priceType === ORDER_PACKAGE_TYPE.ALL_VIDEO_AND_PHOTO) {

                state.photoCart.listPhoto = newItem;
                const updatedList = state.photoCart.listPhoto;
                state.photoCart.totalOrder = updatedList.length;
                state.photoCart.totalAmount = pricetModel.price;
                state.photoCart.orderPackageType = ORDER_PACKAGE_TYPE.ALL;

                const summaryModel = countSummary(
                    state.listPaymentGateway,
                    Number(state.photoCart.totalAmount || 0),
                    (state.photoCart?.paymentModel?.paymentMethod || ''),
                    state.photoCart?.discountModel
                );

                const paymentGatewayModel: PaymentGatewayModel = {
                    "id": 0,
                    "eventCode": "",
                    "sequence": 0,
                    "paymentMethod": "D",
                    "paymentDescTh": "โอนผ่านบัญชี",
                    "paymentDescEn": "Direct Payment",
                    "paymentGatewayFeeUnit": "P",
                    "paymentGatewayFee": "0.00",
                    "status": "ACTIVE",
                    "amountFee": 0,
                    "paymentGatewayAmount": 0
                };

                state.listPaymentGateway = summaryModel.listPaymentGateway || [];
                state.photoCart.discountAmount = Number(summaryModel?.discountAmount || 0);
                state.photoCart.beforeNetAmount = summaryModel.beforeNetAmount;
                state.photoCart.netAmount = summaryModel.netAmount;
                state.photoCart.paymentGatewayAmount = Number(summaryModel?.paymentGatewayAmount || 0);

                if (summaryModel.netAmount > 0) {
                    state.photoCart.paymentModel = {
                        ...state.photoCart.paymentModel,
                        paymentGatewayAmount: Number(summaryModel?.paymentGatewayAmount || 0),
                    };
                } else {
                    state.photoCart.paymentModel = paymentGatewayModel;
                }

            }

        },
        setPaymentModel: (state, action) => {
            state.photoCart.paymentModel = action.payload;
        },
        setPhotoCartLocalStorage: (state, action) => {
            state.photoCart = action.payload;
        },
        setUsePackageLimitPhotoToCart: (state, action) => {
            const newItem: PhotoCart[] = action.payload.listPhoto;
            const { pricetModel } = action.payload;

            if (pricetModel.priceType === ORDER_PACKAGE_TYPE.LIMIT_LENGTH_PHOTO) {

                state.photoCart.listPhoto = newItem;
                const updatedList = state.photoCart.listPhoto;
                state.photoCart.totalOrder = updatedList.length;
                state.photoCart.totalAmount = pricetModel.price;
                state.photoCart.orderPackageType = ORDER_PACKAGE_TYPE.LIMIT_LENGTH_PHOTO;

                const summaryModel = countSummary(
                    state.listPaymentGateway,
                    Number(state.photoCart.totalAmount || 0),
                    (state.photoCart?.paymentModel?.paymentMethod || ''),
                    state.photoCart?.discountModel
                );

                const paymentGatewayModel: PaymentGatewayModel = {
                    "id": 0,
                    "eventCode": "",
                    "sequence": 0,
                    "paymentMethod": "D",
                    "paymentDescTh": "โอนผ่านบัญชี",
                    "paymentDescEn": "Direct Payment",
                    "paymentGatewayFeeUnit": "P",
                    "paymentGatewayFee": "0.00",
                    "status": "ACTIVE",
                    "amountFee": 0,
                    "paymentGatewayAmount": 0
                };

                state.listPaymentGateway = summaryModel.listPaymentGateway || [];
                state.photoCart.discountAmount = Number(summaryModel?.discountAmount || 0);
                state.photoCart.beforeNetAmount = summaryModel.beforeNetAmount;
                state.photoCart.netAmount = summaryModel.netAmount;
                state.photoCart.paymentGatewayAmount = Number(summaryModel?.paymentGatewayAmount || 0);

                if (summaryModel.netAmount > 0) {
                    state.photoCart.paymentModel = {
                        ...state.photoCart.paymentModel,
                        paymentGatewayAmount: Number(summaryModel?.paymentGatewayAmount || 0),
                    };
                } else {
                    state.photoCart.paymentModel = paymentGatewayModel;
                }

            }

        },
    },
})

const countSummary = (listPaymentGateway: PaymentGatewayModel[], total: number, paymentMethod?: string, discountModel?: DiscountCodeModel) => {

    let discountAmount = 0;

    if (discountModel?.discountMode === 'FREE_PHOTO') {
        discountAmount = total;
        paymentMethod = "D";
    } else {
        discountAmount = (discountModel?.unitRate === 'BAHT' ? discountModel?.discountValue : ((discountModel?.discountValue || 0) / 100) * total) || 0;
    }

    if (discountAmount > total) {
        total = 0;
        paymentMethod = "D";
    } else {
        total = Number(total) - Number(discountAmount);
    }

    // payment gateway
    const childArray: PaymentGatewayModel[] = listPaymentGateway?.map((arrayElement: any) => {
        if (arrayElement.paymentGatewayFeeUnit === "P") {
            const netFee = (Number(total) * (Number(arrayElement?.paymentGatewayFee || 0) / 100))
            arrayElement = { ...arrayElement, amountFee: netFee.toFixed(2) };
        } else {
            arrayElement = { ...arrayElement, amountFee: Number(arrayElement.paymentGatewayFee).toFixed(2) };
        }
        return arrayElement;
    }) || [];

    // payment gateway fee
    const fee = (paymentMethod ? childArray.find((x: PaymentGatewayModel) => x.paymentMethod === paymentMethod)?.amountFee : 0) || 0;

    const beforeNetAmount = Number(total);
    const netAmount = Number(beforeNetAmount) + Number(fee);
    const netFixed = Number(netAmount.toFixed(2));

    return {
        listPaymentGateway: childArray,
        paymentGatewayAmount: fee,
        beforeNetAmount,
        paymentMethod,
        netAmount: Number(netFixed),
        discountAmount
    }
}

export const { setOrderModel, setListOrderUser, setPhotoCart, setListPaymentGateway, setPaymentMethod, clearPhotoCart, deletePhotoCart, setPaymentMethodDetail, setUseDiscount, setUsePackagePhotoToCart, setPaymentModel, setPhotoCartLocalStorage, setUsePackageLimitPhotoToCart } = orderSlice.actions;

export const selectOrder = (state: RootState) => state.order;

export default orderSlice.reducer;
