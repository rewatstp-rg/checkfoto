import { orderBy } from 'lodash';
import { useState, useEffect, useCallback } from "react";

import { Stack, Container, Typography } from "@mui/material";

import { paths } from "src/routes/paths";
import { useSearchParams } from 'src/routes/hooks';

import { useDebounce } from "src/hooks/use-debounce";
// import { getStorage } from 'src/hooks/use-local-storage';

// import { STORAGE_KEYS } from 'src/utils/constants';
import { checkServiceResponse, PropsCheckServiceResponse } from 'src/utils/check-service-response';
import { enqueueSnackbarErrorComponent, enqueueSnackbarSuccessComponent } from 'src/utils/enqueueSnackbarComponent';

import { useAppDispatch } from 'src/store/hooks';
import { useLocales, useTranslate } from "src/locales";
import { clearPhotoCart } from 'src/slices/order.slices';
import { setResultSearchMyFace } from 'src/slices/file.slices';
import { useListUserOrderMutation, useDeleteOrderByUserMutation } from 'src/api/order.api';
import { setLoadingState, setDialogMessage, closeDialogMessage } from 'src/slices/error-message.slices';

import EmptyContent from 'src/components/empty-content';
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";

import { OrderModel } from 'src/types/order.model';

import OrderList from '../order-list';
import OrdersSort from '../orders-sort';
import OrdersSearch from "../orders-search";

export const PRODUCT_SORT_OPTIONS = [
    { value: 'orderPhotoNumber', label: 'หมายเลขการสั่งซื้อ', labelEn: 'Order Number' },
    { value: 'status', label: 'สถานะการสั่งซื้อ', labelEn: 'Order Status' },
    { value: 'orderDate', label: 'วันที่สั่งซื้อ', labelEn: 'Order Date' },
];

export default function OrdersView() {

    const { t } = useTranslate();
    const dispatch = useAppDispatch();
    const { currentLang } = useLocales();
    // const token = getStorage(STORAGE_KEYS.USER_INFO);

    const searchParams = useSearchParams();
    const [sortBy, setSortBy] = useState('createDtm');
    const [searchQuery, setSearchQuery] = useState('');
    const [listOrderResult, setListOrderResult] = useState<OrderModel[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const debouncedQuery = useDebounce(searchQuery);

    const [searchResults] = useListUserOrderMutation();
    const [deleteByUser] = useDeleteOrderByUserMutation();

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
        setIsLoading(true);
        setTimeout(() => {
            setSortBy(newValue);
            setIsLoading(false);
        }, 500);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderFilters = (
        <Stack
            spacing={0}
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
                    setIsLoading(true);

                    let dataResponse: PropsCheckServiceResponse = {} as PropsCheckServiceResponse;

                    dataResponse = await deleteByUser(order).unwrap();

                    if (checkServiceResponse(dataResponse)) {
                        const { data } = dataResponse;
                        setTimeout(() => {
                            setListOrderResult(data);
                            enqueueSnackbarSuccessComponent();
                            dispatch(closeDialogMessage());
                            dispatch(setLoadingState(false));
                            setIsLoading(false);
                        }, 500);
                    } else {
                        dispatch(setLoadingState(false));
                        setIsLoading(false);
                        enqueueSnackbarErrorComponent();
                    }
                },
            }));
        } catch (error) {
            console.error(error);
        }
    }

    const loadContent = async () => {
        const filterModel: any = {
            filterOrder: searchParams?.get('type') || 'RACE',
            eventUrl: searchParams?.get('eventUrl') || ''
        }
        setIsLoading(true);
        dispatch(clearPhotoCart());
        dispatch(setResultSearchMyFace(undefined));
        await searchResults(filterModel).unwrap().then((response: OrderModel[]) => {
            setListOrderResult(response);
            setIsLoading(false);
        })
    }

    useEffect(() => {
         loadContent();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ searchParams]);

    return (
        <Container
            maxWidth="lg"
            sx={{
                my: { xs: 1, md: 1 },
            }}
        >

            <CustomBreadcrumbs
                links={[
                    { name: t('common.home'), href: '/' },
                    { name: 'Orders' }
                ]}
                sx={{ mb: 0 }}
            />
            <Typography
                variant="h4"
                sx={{
                    my: { xs: 1, md: 1 },
                }}
            >
                {t('orders.title')}
            </Typography>
            <Stack
                spacing={2.5}
                sx={{
                    mb: { xs: 2, md: 2 },
                }}
            >
                {renderFilters}

                {/* {canReset && renderResults} */}
            </Stack>

            {(notFound && !isLoading) && renderNotFound}

            <OrderList orders={dataFiltered} loading={isLoading} handleDeleteOrder={(order) => handleDeleteOrder(order)} />

        </Container>
    )
}

function applyFilter({
    inputData,
    filters,
    sortBy,
}: {
    inputData: any[];
    filters?: any;
    sortBy: string;
}) {

    // SORT BY
    if (sortBy === 'orderPhotoNumber') {
        inputData = orderBy(inputData, ['orderPhotoNumber'], ['desc']);
    }

    if (sortBy === 'status') {
        inputData = orderBy(inputData, ['status'], ['desc']);
    }

    if (sortBy === 'orderDate') {
        inputData = orderBy(inputData, ['orderDate'], ['desc']);
    }

    return inputData;
}
