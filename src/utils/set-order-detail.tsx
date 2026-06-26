import { OrderDetailViewObj } from "src/types/order-detail-view-obj.model";

import { dateEnFormat, dateThFormat } from "./format-time";

export function setOptionDetail(element: any, runnerItem: any, nationalityKey?: string, provinceKey?: string) {
    // console.log("🚀 ~ file: set-order-detail.tsx:6 ~ setOptionDetail ~ runnerItem:", runnerItem)
    return element?.filter((x: any) => x.type !== 'noneDisplay' || x.controlType === 'imageUpload')?.map((obj: any) => {
     
        const orderDetailObj: OrderDetailViewObj = {
            labelEn: '',
            labelTh: '',
            key: '',
            valueDescTh: '',
            valueDescEn: '',
            sequence: 0,
            listCheckbox: []
        };

        if (obj.specialInputType === 'TICKET_INPUT') {
            orderDetailObj.labelEn = obj.labelEn;
            orderDetailObj.labelTh = obj.labelTh;

            // console.log("🚀 ~ file: set-order-detail.tsx:6 ~ setOptionDetail ~ runnerItem:", runnerItem)
            // console.log("🚀 ~ file: set-order-detail.tsx:6 ~ setOptionDetail ~ element:", element)

            orderDetailObj.key = obj.key;
            // orderDetailObj.valueDescTh = obj.listOption?.find((x: any) => x.key === runnerItem[obj.key])?.valueTh;
            // orderDetailObj.valueDescEn = obj.listOption?.find((x: any) => x.key === runnerItem[obj.key])?.valueEn;
            if (obj.controlType === 'dropdown' || obj.controlType === 'radioGroupBtnRow' || obj.controlType === 'radioGroupBtnRowDesc' || obj.controlType === 'radioGroupRow') {
                orderDetailObj.valueDescTh = obj.listOption?.find((x: any) => x.key === runnerItem[obj.key])?.valueTh;
                orderDetailObj.valueDescEn = obj.listOption?.find((x: any) => x.key === runnerItem[obj.key])?.valueEn;
            } else if (obj.controlType === 'datepicker') {
                orderDetailObj.valueDescTh = dateThFormat(runnerItem[obj.key], 'LONG');
                orderDetailObj.valueDescEn = dateEnFormat(runnerItem[obj.key], 'LONG');
            } else {
                orderDetailObj.valueDescTh = runnerItem[obj.key];
                orderDetailObj.valueDescEn = runnerItem[obj.key];
            }
            // console.log("🚀 ~ file: set-order-detail.tsx:27 ~ returnelement?.map ~ orderDetailObj:", orderDetailObj)

        } else {

            orderDetailObj.labelEn = obj.labelEn;
            orderDetailObj.labelTh = obj.label;

            orderDetailObj.key = obj.key;
            if (obj.type === 'dropdown' || obj.type === 'radioGroupBtnRow' || obj.type === 'radioGroupBtnRowDesc' || obj.type === 'radioGroupRow') {
                orderDetailObj.valueDescTh = obj.option?.find((x: any) => x.key === runnerItem[obj.key])?.labelTh;
                orderDetailObj.valueDescEn = obj.option?.find((x: any) => x.key === runnerItem[obj.key])?.labelEn;
            } else if (obj.type === 'datepicker') {
                orderDetailObj.valueDescTh = dateThFormat(runnerItem[obj.key], 'LONG');
                orderDetailObj.valueDescEn = dateEnFormat(runnerItem[obj.key], 'LONG');
            } else {
                orderDetailObj.valueDescTh = runnerItem[obj.key];
                orderDetailObj.valueDescEn = runnerItem[obj.key];
            }

            if (obj.key === nationalityKey || obj.key === provinceKey) {

                orderDetailObj.labelEn = obj.labelEn;
                orderDetailObj.labelTh = obj.label;
                orderDetailObj.key = obj.key;
                
                if (obj.option?.find((x: any) => x.key === runnerItem[obj.key])?.labelTh) {
                    orderDetailObj.valueDescTh = obj.option?.find((x: any) => x.key === runnerItem[obj.key])?.labelTh;
                } else {
                    orderDetailObj.valueDescTh = obj.option?.find((x: any) => x.keyOld === runnerItem[obj.key])?.labelTh;
                }
              
                if (obj.option?.find((x: any) => x.key === runnerItem[obj.key])?.labelTh) { 
                    orderDetailObj.valueDescEn = obj.option?.find((x: any) => x.key === runnerItem[obj.key])?.labelEn;
                } else {
                    orderDetailObj.valueDescEn = obj.option?.find((x: any) => x.keyOld === runnerItem[obj.key])?.labelEn;
                }

            }     

        }

        return orderDetailObj;
    })
}