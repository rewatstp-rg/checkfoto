import getQueryParam from "./getQueryParam";

export const setParamSearch = (body: any, setPage: any, setRowsPerPage: any, type?: string) => {
    if (type === 'PER_PAGE') {
        setPage(0);
    } else {
        setPage(body.pageNo);
    }
    setRowsPerPage(body.pageSize);
    const params = getQueryParam({
        ...body,
        pageNo: type === 'PER_PAGE' ? 0 : body.pageNo + 1
    });
    return params;
}
