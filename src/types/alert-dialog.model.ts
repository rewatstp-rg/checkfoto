export type AlertDialogModel = {
    open?: boolean;
    onOk?: () => void;
    onCancel?: () => void;
    message?: string;
    labelCancel?: string;
    labelOk?: string;
    title?: string;
    type?: string;
    showSave?: boolean;
    showCancel?: boolean;
  };