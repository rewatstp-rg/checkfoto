import { Box, Chip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
// import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { fCurrency } from 'src/utils/format-number';

import { useLocales } from 'src/locales';
import { PhotoCart } from 'src/slices/order.slices';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
    row: PhotoCart;
    onDelete: VoidFunction;
    isView?: boolean;
};

export default function CheckoutCartPhoto({ row, onDelete, isView }: Props) {

    const { currentLang } = useLocales();
    const { id, url, photoPrice, photoTypeDescTh, photoTypeDescEn, imageType } = row;
    // console.log("🚀 ~ CheckoutCartPhoto ~ imageType:", imageType)

    return (
        <TableRow>
            <TableCell onContextMenu={(e) => e.preventDefault()}>
                <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {
                        (imageType === 'VIDEO' || imageType === 'VIDEO_FINISH_LINE') && <Chip
                            size="small"
                            variant="filled"
                            color='primary'
                            label={
                                <Box display='flex' alignItems='center'>
                                    <Iconify icon="ant-design:video-camera-outlined" />
                                </Box>
                            }
                            sx={{
                                position: 'absolute',
                                top: '10%',
                                left: '26%',
                                transform: 'translate(-50%, -50%)',
                                zIndex: 1
                            }}
                        />
                    }
                    <Avatar variant="rounded" alt={id} src={url} sx={{
                        width: 100,
                        height: 'auto',
                        // mr: 2,
                        WebkitTouchCallout: "none",
                        WebkitUserSelect: "none",
                        userSelect: "none",
                        pointerEvents: "none"
                    }}
                        onContextMenu={(e) => e.preventDefault()}
                        onTouchStart={(e) => e.preventDefault()} />
                </Box>

            </TableCell>

            <TableCell align="left">
                {currentLang.value === 'en' ? photoTypeDescEn : photoTypeDescTh}
            </TableCell>

            <TableCell align="right">
                {photoPrice ? fCurrency(photoPrice) : "0.00"}
            </TableCell>
            {
                !isView && <TableCell align="right" sx={{ px: 1 }}>
                    <IconButton onClick={onDelete}>
                        <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                </TableCell>
            }
        </TableRow >
    );
}
