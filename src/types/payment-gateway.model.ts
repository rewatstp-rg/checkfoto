export type PaymentGatewayModel = {
	id?: number | 0;
	eventCode?: string | '';
	sequence?: number | 0;
	paymentMethod?: string | '';
	paymentMethodDesc?: string | '';
	paymentMethodDescEn?: string | '';
	paymentMethodEn?: string | '';
	paymentDescTh?: string | '';
	paymentDescEn?: string | '';
	paymentGatewayFeeUnit?: string;
	paymentGatewayFee?: string | '0.00';
	status?: string | '';
	createDtm?: string | '';
	createBy?: string | '';
	lastUpdateDtm?: string | '';
	lastUpdateBy?: string | '';
	statusDesc?: string | '';
	statusDescEn?: string | '';
	statusFlah?: boolean | false;
	amountFee?: number | 0;
	paymentGatewayAmount?: number | 0;
	referenceOrder?: string | '';
	orderPhotoNumber?: string | '';
	qrImage?: string | '';
	paymentExpiredDate?: string | '';
	netAmount?: number | 0;
}