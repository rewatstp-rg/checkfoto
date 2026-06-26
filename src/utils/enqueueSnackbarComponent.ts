import { enqueueSnackbar } from "notistack";

import { localStorageGetItem } from "./storage-available";
import { DAILOG_TITLE, DAILOG_MESSAGE, DAILOG_TITLE_EN, DAILOG_MESSAGE_EN } from "./constants";

export const enqueueSnackbarSuccessComponent = (message?: string) => {

    const langStorage = localStorageGetItem('i18nextLng');
    const langMessage = message || (langStorage === 'en' ? DAILOG_MESSAGE_EN.success : DAILOG_MESSAGE.success);

    enqueueSnackbar(langMessage, {
        variant: 'success',
    });
}


export const enqueueSnackbarErrorComponent = (message?: string) => {

    const langStorage = localStorageGetItem('i18nextLng');
    const langMessage = message || (langStorage === 'en' ? DAILOG_TITLE_EN.seriveUnSuccess : DAILOG_TITLE.seriveUnSuccess);

    enqueueSnackbar(langMessage, {
        variant: 'error',
    });
}