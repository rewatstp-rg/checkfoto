import React, { ReactNode } from 'react';

import {
    Table,
    TableBody,
    TableContainer,
    LinearProgress
} from '@mui/material';

import { ColumnDynamic } from 'src/types/table.type';

import Scrollbar from '../scrollbar';
import TableNoData from './table-no-data';
import TableSkeleton from './table-skeleton';
import TableHeadCustom from './table-head-custom';

type DynamicTableProps<T> = {
    columns: ColumnDynamic<T>[];
    rows: T[];
    isLoading?: boolean;
    notFound?: boolean;
    renderRow: (row: T, index?: number) => ReactNode;
    order?: 'asc' | 'desc';
    orderBy?: string;
    onSort?: (id: string) => void;
    rowId: any;
    overflow?: string;
    maxHeight?: string;
    minHeight?: string;
};

export default function DynamicTable<T>({
    columns,
    rows,
    isLoading,
    notFound,
    renderRow,
    order,
    orderBy,
    onSort,
    rowId,
    overflow = 'unset',
    maxHeight,
    minHeight
}: DynamicTableProps<T>) {
    return (
        <>
            {isLoading && <LinearProgress />}
            <TableContainer sx={{ position: 'relative', overflow, maxHeight, minHeight }}>
                <Scrollbar>
                    <Table size="medium" >
                        <TableHeadCustom
                            order={order}
                            orderBy={orderBy}
                            headLabel={columns}
                            rowCount={rows.length}
                            onSort={(e: string) => onSort?.(e)}
                        />
                        <TableBody>
                            {rows.map((row : any, index) => (
                                <React.Fragment key={row[rowId]}>{renderRow(row, index)}</React.Fragment>
                            ))}
                            {notFound && <TableNoData notFound={notFound} />}
                            {isLoading && <TableSkeleton />}
                        </TableBody>
                    </Table>
                </Scrollbar>
            </TableContainer>
        </>
    );
}
