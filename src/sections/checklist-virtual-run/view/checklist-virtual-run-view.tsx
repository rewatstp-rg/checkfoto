import { useState, useEffect, useCallback } from "react";

import { Table, TableBody, Container, Typography, TableContainer } from '@mui/material';

import { useRouter } from "src/routes/hooks";

import getQueryParam from "src/utils/getQueryParam";
import { PAGE_SIZE_DEFAULT } from "src/utils/constants";
import { setParamSearch } from 'src/utils/set-param-search';

import { useTranslate } from "src/locales";
import { useAppDispatch } from "src/store/hooks";
import { setMenuType } from "src/slices/menu.slices";
import { useSearchVrRacepackMutation } from "src/api/order.api";
import { useGetListEventCheckRegisterMutation } from "src/api/common.api";

import Scrollbar from 'src/components/scrollbar';
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
import { TableNoData, TableSkeleton, TableHeadCustom, TablePaginationCustom } from 'src/components/table';

import { getStringObj } from "../defaultValue";
import ChecklistVirtualRunTableRow from "../checklist-virtual-run-table-row";
import CheckListVirtualRunSearchCriteria from "../checklist-virtual-run-search-criteria";

export default function ChecklistVirtualRunView() {

    const router = useRouter();
    const { t } = useTranslate();
    const dispatch = useAppDispatch();

    const TABLE_HEAD = [
        { id: 'orderNumber', label: t('orders.orderNumber'), width: 120 },
        { id: 'ticketNameTh', label: t('orders.ticketNameTitle'), width: 300 },
        { id: 'fullName', label: t('orders.fullNameTitle'), width: 180 },
        { id: 'shirtSize', label: t('orders.shirtSizeTitle'), width: 100, align: 'center' },
        { id: 'bibNumber', label: t('orders.bibNumberTitle'), width: 130, align: 'center' },
        { id: 'trackingNumber', label: t('orders.trackingNumber'), width: 130, align: 'center' }
    ];

    const [getEventList] = useGetListEventCheckRegisterMutation();
    const [searchVrRacepack, { isLoading: isLoadingSearch, data: dataSearch }] = useSearchVrRacepackMutation();

    const notFound = (!dataSearch?.data?.content?.length) && !isLoadingSearch;

    // Pageging
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(PAGE_SIZE_DEFAULT);
    const [dense, setDense] = useState(false);
    const [loadingSearch, setLoadingSearch] = useState(false);
    // Pageging

    const onSubmit = (valueForm: any) => {
        const params = getQueryParam({
            pageNo: 1,
            pageSize: PAGE_SIZE_DEFAULT,
            ...valueForm,
        });
        setRowsPerPage(PAGE_SIZE_DEFAULT);
        setParamToRouter(params);
    }

    const onReset = () => {
        router.push(`/checklist-virtual-run`);
        searchAdministratorApi();
    }

    const searchAdministratorApi = useCallback(async () => {
        setLoadingSearch(true);
        const body = getStringObj();
        setRowsPerPage(Number(body.pageSize));
        try {
            await searchVrRacepack({ ...body }).unwrap();
            setTimeout(() => {
                setLoadingSearch(false);
            }, 1500);
        } catch (error) {
            console.error(error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const body = getStringObj();
        body.pageNo = 1;
        body.pageSize = parseInt(event.target.value, 10);
        const param = setParamSearch(body, setPage, setRowsPerPage, "PER_PAGE");
        setParamToRouter(param);
    }

    const onChangePage = useCallback((_: unknown, newPage: number) => {
        const body = getStringObj();
        body.pageNo = newPage;
        const param = setParamSearch(body, setPage, setRowsPerPage);
        setParamToRouter(param);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeDense = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    }, []);


    const setParamToRouter = (params: string) => {
        router.push(`/checklist-virtual-run${params}`);
        searchAdministratorApi();
    }

    const listOption = async () => {
        await getEventList({
            eventStatus: 'ACTIVE',
            registerStep: {
                listStep: []
            }
        }).unwrap();
    }

    useEffect(() => {
         dispatch(setMenuType('VR'));
        listOption();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <Container
            maxWidth="lg"
            sx={{
                mt: 10,
                mb: 2,
            }}
        >

            <CustomBreadcrumbs
                links={[
                    { name: t('common.home'), href: '/' },
                    { name: t('orders.checkListVrTitle') }
                ]}
                sx={{ mb: 2 }}
            />

            <Typography
                variant="h4"
                sx={{ mb: 2 }}
            >
                {t('orders.checkListVrTitle')}
            </Typography>

            <CheckListVirtualRunSearchCriteria onSearch={onSubmit} onReset={onReset} isLoading={isLoadingSearch} />

            <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                <Scrollbar>
                    <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                        <TableHeadCustom
                            headLabel={TABLE_HEAD}
                            rowCount={dataSearch?.data?.numberOfElements}
                        />
                        <TableBody>
                            {dataSearch?.data?.content?.map((row: any) => (
                                <ChecklistVirtualRunTableRow
                                    key={row.id}
                                    row={row}
                                />
                            ))}
                            {
                                (!isLoadingSearch) && <TableNoData notFound={notFound} />
                            }
                            {
                                (isLoadingSearch || loadingSearch) && <TableSkeleton />
                            }
                        </TableBody>
                    </Table>
                </Scrollbar>
            </TableContainer>
            <TablePaginationCustom
                count={dataSearch?.data?.totalElements || 0}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={onChangePage}
                totalPages={dataSearch?.data?.totalPages}
                onRowsPerPageChange={onChangeRowsPerPage}
                dense={dense}
                onChangeDense={onChangeDense}
            />

        </Container>
    )
}