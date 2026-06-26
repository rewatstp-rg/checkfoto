import { TableRow, TableCell } from "@mui/material";

import { ColumnDynamic } from "src/types/table.type";

type DynamicRowProps<T> = {
    row: T;
    columns: ColumnDynamic<T>[];
    selected?: boolean;
    onClick?: () => void;
};

export default function DynamicTableRow<T>({ row, columns, selected, onClick }: DynamicRowProps<T>) {
    return (
        <TableRow hover selected={selected} sx={{ cursor: onClick ? 'pointer' : 'unset' }} onClick={onClick}>
            {columns.map((col) => (
                <TableCell key={col.id} align={col.align ?? 'left'}>
                    {col.render ? col.render(row) : (row as any)[col.id]}
                </TableCell>
            ))}
        </TableRow>
    );
}
