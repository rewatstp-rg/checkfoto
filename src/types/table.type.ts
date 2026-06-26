export interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align: "center" | "left" | "right" | "inherit" | "justify";
    format?: (value: number) => string;
}

export type ColumnDynamic<T> = {
    id: string;
    label: string;
    flex?: number;
    width?: number | string;
    align?: 'left' | 'right' | 'center';
    render?: (row: T) => React.ReactNode;
};