import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import { Theme, SxProps } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import TablePagination, { TablePaginationProps } from '@mui/material/TablePagination';

import { ROW_PER_PAGE } from 'src/utils/constants';

// ----------------------------------------------------------------------

type Props = {
  dense?: boolean;
  onChangeDense?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sx?: SxProps<Theme>;
  pageModel?: any;
  totalPages?: any;
};

export default function TablePaginationCustom({
  dense,
  onChangeDense,
  sx,
  pageModel,
  rowsPerPageOptions = ROW_PER_PAGE,
  totalPages = 1,
  ...other
}: Props & TablePaginationProps) {
  return (
    <Box sx={{ position: 'relative', ...sx }}>
      <TablePagination
        labelDisplayedRows={(page) =>
          `หน้าที่ ${page.page + 1} จาก ${totalPages}  รายการที่ ${page.from} ถึง ${page.to === -1 ? page.count : page.to} จากทั้งหมด ${page.count} รายการ`
        }
        labelRowsPerPage='แสดงหน้าละ'
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        {...other}
        sx={{
          borderTopColor: 'transparent',
        }}
      />
      {onChangeDense && (
        <FormControlLabel
          label="ปรับขนาดตาราง"
          control={<Switch checked={dense} onChange={onChangeDense} />}
          sx={{
            pl: 2,
            py: 1.5,
            top: 0,
            position: {
              sm: 'absolute',
            },
          }}
        />
      )}
    </Box>
  );
}
