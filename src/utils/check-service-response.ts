import { RESPONSE_STATUS } from "./constants";

export type PropsCheckServiceResponse = {
    data: any,
    status: {
        code: string,
        description: string
    }
}
export const checkServiceResponse = (response: PropsCheckServiceResponse) => {

    if (response?.status?.description === RESPONSE_STATUS.SUCCESS) {
        return response.data;
    }

    return null;
}