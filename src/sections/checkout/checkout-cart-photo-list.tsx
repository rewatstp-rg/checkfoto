import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

import { useLocales } from 'src/locales';
import { PhotoCart } from 'src/slices/order.slices';

import { TableNoData, TableHeadCustom } from 'src/components/table';

import CheckoutCartPhoto from './checkout-cart-photo';

// ----------------------------------------------------------------------

type Props = {
    products: any[];
    onDelete?: (photo: PhotoCart) => void;
    isView?: boolean;
};

export default function CheckoutCartPhotoList({
    products,
    onDelete,
    isView
}: Props) {

    const { currentLang } = useLocales();

    const TABLE_HEAD_VIEW = [
        { id: 'url', label: currentLang.value === 'th' ? 'รูป' : 'Photo', width: 150 },
        { id: 'type', label: currentLang.value === 'th' ? 'ประเภทรูป' : 'Photo Type' },
        { id: 'price', label: currentLang.value === 'th' ? 'ราคา' : 'Price', width: 100, align: 'right' },
    ];

    const TABLE_HEAD = [
        { id: 'url', label: currentLang.value === 'th' ? 'รูป' : 'Photo', width: 150 },
        { id: 'type', label: currentLang.value === 'th' ? 'ประเภทรูป' : 'Photo Type' },
        { id: 'price', label: currentLang.value === 'th' ? 'ราคา' : 'Price', width: 100, align: 'right' },
        { id: '', width: 100 },
    ];

    return (
        <TableContainer sx={{ maxHeight: 500, overflow: 'auto', position: 'relative' }}>
            {/* <Scrollbar > */}
                <Table stickyHeader sx={{ minWidth:  680 }}>
                    <TableHeadCustom headLabel={isView ? TABLE_HEAD_VIEW : TABLE_HEAD} />
                    <TableBody>
                        {products?.map((row) => (
                            <CheckoutCartPhoto
                                key={`${row.id}-${new Date().getTime().toString()}`}
                                row={row}
                                isView={isView}
                                onDelete={() => onDelete?.(row)}
                            />
                        ))}
                        <TableNoData notFound={products?.length === 0} />
                    </TableBody>
                </Table>
            {/* </Scrollbar> */}
        </TableContainer>
    );
}
