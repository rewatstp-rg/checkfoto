import { BaseDataResponse } from "src/api/base/types";

export type InputFieldOptionModel = {
	id?: number;
	key?: string;
	inputFieldId?: number;
	inputOptionCode?: string;
	inputFieldCode?: string;
	valueTh?: string;
	valueEn?: string;
	sequence?: number;
	status?: string;
	checked?: boolean;
	required?: boolean;
	disabled?: boolean;
	optionDefault?: boolean;
	value1?: string;
	value2?: string;
	value3?: string;
	statusFlah?: boolean | false;
	stockAvailable?: number;
	stockAmount?: number;
	purchaseQuantity?: number;
}

export type InputColumnOptionModelResponse = {
	data: InputFieldOptionModel
} & BaseDataResponse

export type InputColumnOptionModelResponseList = {
	data: InputFieldOptionModel[]
} & BaseDataResponse

