/* eslint-disable perfectionist/sort-imports */
import { configureStore } from '@reduxjs/toolkit';

// API 
import { vrApi } from 'src/api/vr.api';
import { userApi } from 'src/api/user.api';
import { menuApi } from 'src/api/menu.api';
import { fileApi } from 'src/api/file.api';
import { photoApi } from 'src/api/photo.api';
import { orderApi } from 'src/api/order.api';
import { authenApi } from 'src/api/auth.api';
import { eventApi } from 'src/api/event.api';
import { commonApi } from 'src/api/common.api';
import { reportApi } from 'src/api/report.api';
import { importApi } from 'src/api/import.api';
import { discountApi } from 'src/api/discount.api';
import { promotionApi } from 'src/api/promotion.api';
import { uploadFileApi } from 'src/api/upload-file.api';
import { masterDataApi } from 'src/api/master-data.api';
import { eventPhotoAPi } from 'src/api/event-photo.api';
import { inputColumnApi } from 'src/api/input-column.api';
import { landingPageApi } from 'src/api/landing-page.api';
import { administratorApi } from 'src/api/administrator.api';
import { eventPhotoFrameApi } from 'src/api/event-photo-frame';
import { errorMiddleware } from 'src/api/middleware/error-middleware';

import { eventPhotoBoothApi } from 'src/api/event-photo-booth.api';

// REDUCER
import FileReducer from 'src/slices/file.slices';
import UserReducer from 'src/slices/user.slices';
import EventReducer from 'src/slices/event.slices';
import OrderReducer from 'src/slices/order.slices';
import AuthMenuReducer from 'src/slices/menu.slices';
import ReportReducer from 'src/slices/report.slices';
import ImportReducer from 'src/slices/import.slices';
import commonReducer from 'src/slices/common.slices';
import UserAuthenReducer from 'src/slices/authen.slices';
import RegisterReducer from 'src/slices/register.slices';
import discountReducer from 'src/slices/discount.slices';
import PromotionReducer from 'src/slices/promotion.slices';
import MasterDataReducer from 'src/slices/master-data.slices';
import EventPhotoReducer from 'src/slices/event-photo.slices';
import LandingPageReducer from 'src/slices/landing-page.slices';
import InputColumnReducer from 'src/slices/input-column.slices';
import DialogLoginReducer from 'src/slices/dialog-login.slices';
import errorMessageReducer from 'src/slices/error-message.slices';
import administratorReducer from 'src/slices/administrator.slices';
import EventPhotoFrameReducer from 'src/slices/event-photo-frame.slices';


export const store = configureStore({
    reducer: {
        errorMessage: errorMessageReducer,
        masterData: MasterDataReducer, [masterDataApi.reducerPath]: masterDataApi.reducer,
        administrator: administratorReducer, [administratorApi.reducerPath]: administratorApi.reducer,
        report: ReportReducer, [reportApi.reducerPath]: reportApi.reducer,
        import: ImportReducer, [importApi.reducerPath]: importApi.reducer,
        file: FileReducer, [fileApi.reducerPath]: fileApi.reducer,
        inputColumn: InputColumnReducer, [inputColumnApi.reducerPath]: inputColumnApi.reducer,
        authMenu: AuthMenuReducer, [menuApi.reducerPath]: menuApi.reducer,
        event: EventReducer, [eventApi.reducerPath]: eventApi.reducer,
        dialogLogin: DialogLoginReducer,
        userAuthen: UserAuthenReducer, [authenApi.reducerPath]: authenApi.reducer,
        register: RegisterReducer,
        user: UserReducer, [userApi.reducerPath]: userApi.reducer,
        order: OrderReducer, [orderApi.reducerPath]: orderApi.reducer,
        discount: discountReducer, [discountApi.reducerPath]: discountApi.reducer,
        common: commonReducer, [commonApi.reducerPath]: commonApi.reducer,
        vr: vrApi.reducer, [vrApi.reducerPath]: vrApi.reducer,
        promotion: PromotionReducer, [promotionApi.reducerPath]: promotionApi.reducer,
        uploadFile: uploadFileApi.reducer, [uploadFileApi.reducerPath]: uploadFileApi.reducer,
        landingPage: LandingPageReducer, [landingPageApi.reducerPath]: landingPageApi.reducer,
        photo: photoApi.reducer, [photoApi.reducerPath]: photoApi.reducer,
        eventPhotoFrame: EventPhotoFrameReducer, [eventPhotoFrameApi.reducerPath]: eventPhotoFrameApi.reducer,
        eventPhoto: EventPhotoReducer, [eventPhotoAPi.reducerPath]: eventPhotoAPi.reducer,
        eventPhotoBooth: eventPhotoBoothApi.reducer,[eventPhotoBoothApi.reducerPath]: eventPhotoBoothApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(
            errorMiddleware,
            masterDataApi.middleware,
            administratorApi.middleware,
            reportApi.middleware,
            importApi.middleware,
            fileApi.middleware,
            inputColumnApi.middleware,
            menuApi.middleware,
            eventApi.middleware,
            authenApi.middleware,
            userApi.middleware,
            orderApi.middleware,
            discountApi.middleware,
            commonApi.middleware,
            vrApi.middleware,
            promotionApi.middleware,
            uploadFileApi.middleware,
            landingPageApi.middleware,
            photoApi.middleware,
            eventPhotoFrameApi.middleware,
            eventPhotoAPi.middleware,
            eventPhotoBoothApi.middleware
        ),
});
