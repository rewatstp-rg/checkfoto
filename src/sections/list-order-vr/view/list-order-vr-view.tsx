// import orderBy from 'lodash/orderBy';
import { orderBy } from 'lodash';
import { useState, useEffect, useCallback } from "react";

import { Stack, Container, Typography } from "@mui/material";

import { paths } from "src/routes/paths";
import { useSearchParams } from 'src/routes/hooks';

// import { useBoolean } from "src/hooks/use-boolean";
import { useDebounce } from "src/hooks/use-debounce";
import { getStorage } from 'src/hooks/use-local-storage';

import { STORAGE_KEYS } from 'src/utils/constants';
import { checkServiceResponse, PropsCheckServiceResponse } from 'src/utils/check-service-response';
import { enqueueSnackbarErrorComponent, enqueueSnackbarSuccessComponent } from 'src/utils/enqueueSnackbarComponent';

import { useLocales, useTranslate } from "src/locales";
import { jwtDecode } from 'src/auth/context/jwt/utils';
import { selectAuthenSlice } from 'src/slices/authen.slices';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { useListUserOrderMutation, useDeleteOrderByUserMutation } from 'src/api/order.api';
import { setLoadingState, setDialogMessage, closeDialogMessage } from 'src/slices/error-message.slices';

import EmptyContent from 'src/components/empty-content';
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";

import { OrderModel } from 'src/types/order.model';

import OrderList from '../order-list';
import OrdersSort from '../orders-sort';
import OrdersSearch from "../orders-search";

export const PRODUCT_SORT_OPTIONS = [
    { value: 'orderNumber', label: 'หมายเลขการสั่งซื้อ', labelEn: 'Order Number' },
    { value: 'status', label: 'สถานะการสั่งซื้อ', labelEn: 'Order Status' },
    { value: 'createDtm', label: 'วันที่สั่งซื้อ', labelEn: 'Order Date' },
];

export default function ListOrdersVrView() {

    const { t } = useTranslate();
    const dispatch = useAppDispatch();
    const { currentLang } = useLocales();

    const key = STORAGE_KEYS.USER_INFO;
    const userProfile = getStorage(key);

    const searchParams = useSearchParams();
    const [sortBy, setSortBy] = useState('createDtm');
    const [searchQuery, setSearchQuery] = useState('');
    const [listOrderResult, setListOrderResult] = useState<OrderModel[]>([]);
    const [userProfileState, setUserProfileState] = useState<any>();

    const { userAuthen } = useAppSelector(selectAuthenSlice);

    const debouncedQuery = useDebounce(searchQuery);

    const [searchResults, { isLoading: searchLoading }] = useListUserOrderMutation();
    const [deleteByUser, { isLoading: deleteLoading }] = useDeleteOrderByUserMutation();

    const handleSearch = useCallback((inputValue: string) => {
        setSearchQuery(inputValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const dataFiltered = applyFilter({
        inputData: listOrderResult || [],
        sortBy,
    });

    const notFound = !dataFiltered.length;

    const handleSortBy = useCallback((newValue: string) => {
        setSortBy(newValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderFilters = (
        <Stack
            spacing={3}
            justifyContent="space-between"
            alignItems={{ xs: 'center', sm: 'center' }}
            direction={{ xs: 'column', sm: 'row' }}
        >
            <OrdersSearch
                query={debouncedQuery}
                results={dataFiltered || []}
                onSearch={handleSearch}
                loading={false}
                hrefItem={(orderNumber: string) => paths.order.details(orderNumber)}
            />

            <OrdersSort sort={sortBy} onSort={handleSortBy} sortOptions={PRODUCT_SORT_OPTIONS} />
        </Stack>
    );

    const renderNotFound = <EmptyContent filled title="No Data" sx={{ py: 10 }} />;

    const handleDeleteOrder = (order: OrderModel) => {
        try {
            dispatch(setDialogMessage({
                title: '',
                message: currentLang.value === 'en' ? 'Are you sure to delete this order?' : 'คุณต้องการลบการสั่งซื้อนี้ใช่หรือไม่?',
                open: true,
                showSave: true,
                showCancel: true,
                labelOk: t('saveBtn'),
                labelCancel: t('cancelBtn'),
                type: 'alert',
                onOk: async () => {

                    dispatch(setLoadingState(true));

                    let dataResponse: PropsCheckServiceResponse = {} as PropsCheckServiceResponse;

                    dataResponse = await deleteByUser(order).unwrap();

                    if (checkServiceResponse(dataResponse)) {
                        const { data } = dataResponse;
                        setTimeout(() => {
                            setListOrderResult(data);
                            enqueueSnackbarSuccessComponent();
                            dispatch(closeDialogMessage());
                            dispatch(setLoadingState(false));
                        }, 500);
                    } else {
                        dispatch(setLoadingState(false));
                        enqueueSnackbarErrorComponent();
                    }
                },
            }));
        } catch (error) {
            console.error(error);
        }
    }

    const loadContent = async () => {

        const filterModel : any = {
            filterOrder: 'VIRTUAL_RUN',
            eventUrl: searchParams?.get('eventUrl') || ''
        }

        await searchResults(filterModel).unwrap().then((response: OrderModel[]) => {
            setListOrderResult(response);
        })
    }

    useEffect(() => {
        if (userProfileState) {
            loadContent();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userProfileState, searchParams])

    useEffect(() => {
        const token = userProfile;
        if (token) {
            setUserProfileState(jwtDecode(token));
        }

        if (userAuthen && userAuthen?.accessToken) {
            setUserProfileState(jwtDecode(userAuthen.accessToken));
        }

        if (!token && !userAuthen) {
            setUserProfileState(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userProfile, userAuthen]);

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
                    { name: t('common.home'), href: 'https://vr.checkrace.com' },
                    { name: 'Virtual Run Orders' }
                ]}
                sx={{ mb: 2 }}
            />

            <Typography
                variant="h4"
                sx={{
                    my: { xs: 1, md: 2 },
                }}
            >
                {t('orders.selectEventToSubmit')}
            </Typography>
            <Stack
                spacing={2.5}
                sx={{
                    mb: { xs: 0, md: 5 },
                }}
            >
                {renderFilters}
            </Stack>

            {(notFound) && renderNotFound || searchLoading}

            {
                !searchLoading && <OrderList orders={dataFiltered} loading={searchLoading || deleteLoading} handleDeleteOrder={(order) => handleDeleteOrder(order)} />
            }

        </Container>
    )
}

function applyFilter({
    inputData,
    sortBy,
}: {
    inputData: any[];
    sortBy: string;
}) {

    // SORT BY
    if (sortBy === 'orderNumber') {
        inputData = orderBy(inputData, ['orderNumber'], ['desc']);
    }

    if (sortBy === 'status') {
        inputData = orderBy(inputData, ['status'], ['desc']);
    }

    if (sortBy === 'createDtm') {
        inputData = orderBy(inputData, ['createDtm'], ['desc']);
    }

    return inputData;
}
