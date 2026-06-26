import { BaseDataResponse } from "src/api/base/types";

import { InputFieldOptionModel } from "./input-column-option.model";

export type InputFieldModel = {
    id?: number;
    eventId?: number;
    key?: string;
    labelTh?: string;
    labelEn?: string;
    placeholderTh?: string;
    placeholderEn?: string;
    minDate?: Date | null | undefined;
    maxDate?: Date | null | undefined;
    required?: boolean;
    type?: string;
    sequence?: number;
    col?: string;
    colLayout?: string;
    limitChar?: number;
    colIn?: string;
    disabled?: boolean;
    option?: boolean;
    htmlInputKey?: string;
    status?: string;
    statusDesc?: string;
    controlType?: string;
    controlTypeDesc?: string;
    inputType?: string;
    inputTypeDesc?: string;
    specialInputType?: string;
    specialInputTypeDesc?: string;
    inputFieldCode?: string;
    eventCode?: string;
    htmlInputKeyDesc?: string;
    listOption?: InputFieldOptionModel[];
    maxLength?: number;
    minLength?: number;
    stock?: string;
    available?: number;
    descriptionTh?: string;
    descriptionEn?: string;
}

export type InputFieldModelResponse = {
    data: InputFieldModel
} & BaseDataResponse;


export type InputFieldModelListResponse = {
    data: InputFieldModel[]
} & BaseDataResponse;


export type DynamicFormType = {
    label: string,
    labelEn: string,
    name: string,
    type: string,
    placeholder: string,
    placeholderEn?: string,
    defaultValue: string,
    key: string,
    rules?: {
        required?: string | boolean,
        limitChar?: number,
        maxLength?: number,
        minLength?: number | null,
        minDate?: any,
        maxDate?: any,
        pattern?: any
    },
    colLayout: string,
    mapParameter?: string,
    reference?: string,
    htmlSeq?: number,
    maxLength?: number,
    inputType?: string,
    disabled?: boolean,
    option: any[],
    minLength?: number,
    minDate?: any;
    maxDate?: any;
    col?: string;
    stock?: string;
    htmlInputKey?: string;
    descriptionTh?: string;
    descriptionEn?: string;
}
