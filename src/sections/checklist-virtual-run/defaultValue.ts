import { PAGE_SIZE_DEFAULT } from "src/utils/constants";
import getQueryStringObj from "src/utils/getQueryStringObj";

export const getStringObj = () => {
    const queryString = getQueryStringObj(window.location);
    const {
        pageNo = 1,
        pageSize = PAGE_SIZE_DEFAULT,
        eventCode = '',
        keyword = '',
        sortBy = 'id',
        orderType = 'asc',
    } = queryString;

    const body = {
        pageNo: pageNo as number,
        pageSize: pageSize as number,
        eventCode: eventCode as string,
        keyword: keyword as string,
        sortBy: sortBy as string,
        orderType: orderType as string,
    };

    return body;
};
