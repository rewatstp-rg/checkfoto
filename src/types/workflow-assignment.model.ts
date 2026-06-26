export type WorkflowAssignmentModel = {
    id?: number;
    customerFileUploadId?: number;
    transactionNo?: string;
    actionBy?: string;
    assignToRole?: string;
    comment?: string;
    status?: string;
    createBy?: string;
    createDtm?: string;
    updateBy?: string;
    updateDtm?: string;
    approveStatus?: string;
    documentSignDateTime?: any;
    documentSignDateTimeStr?: any;
};
