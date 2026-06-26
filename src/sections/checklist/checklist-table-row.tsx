import { memo } from 'react';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { useLocales } from "src/locales";

type Props = {
    selected?: boolean;
    row: any;
};

const ChecklistTableRow = memo(({
    row,
    selected
}: Props) => {

    const { currentLang } = useLocales();

    const { orderNumber, ticketNameTh, ticketNameEn, fullName, shippingStatus, shippingStatusEn, ageGroup, shirtSize, bibNumber, trackingNumber } = row;

    return (
        <TableRow hover selected={selected}>
            <TableCell sx={{ whiteSpace: 'nowrap' }}>{orderNumber}</TableCell>
            <TableCell sx={{ whiteSpace: 'nowrap' }}>{currentLang.value === 'en' ? ticketNameEn || '-' : ticketNameTh || '-'}</TableCell>
            <TableCell sx={{ whiteSpace: 'nowrap' }}>{fullName}</TableCell>
            <TableCell sx={{ whiteSpace: 'nowrap', textAlign: 'center' }}>{currentLang.value === 'en' ? shippingStatusEn || '-' : shippingStatus}</TableCell>
            <TableCell sx={{ whiteSpace: 'nowrap', textAlign: 'center' }}>{ageGroup}</TableCell>
            <TableCell sx={{ whiteSpace: 'nowrap', textAlign: 'center' }}>{shirtSize}</TableCell>
            <TableCell sx={{ whiteSpace: 'nowrap', textAlign: 'center' }}>{bibNumber || '-'}</TableCell>
            <TableCell sx={{ whiteSpace: 'nowrap', textAlign: 'center' }}>{trackingNumber || '-'}</TableCell>
        </TableRow>
    );
})

export default ChecklistTableRow;