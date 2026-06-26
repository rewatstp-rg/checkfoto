import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

import { RouterLink } from 'src/routes/components';

import Label from 'src/components/label';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
    card: any;
};

export default function CardItem({ card }: Props) {

    const { name, coverUrl, available, newLabel, saleLabel } = card;

    const linkTo = '/';

    const renderLabels = (newLabel.enabled || saleLabel.enabled) && (
        <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ position: 'absolute', zIndex: 9, top: 16, right: 16 }}
        >
            {newLabel.enabled && (
                <Label variant="filled" color="info">
                    {newLabel.content}
                </Label>
            )}
            {saleLabel.enabled && (
                <Label variant="filled" color="error">
                    {saleLabel.content}
                </Label>
            )}
        </Stack>
    );

    const renderImg = (
        <Box sx={{ position: 'relative', p: 1 }}>
            <Tooltip title={!available && 'Out of stock'} placement="bottom-end">
                <Image
                    alt={name}
                    src={coverUrl}
                    ratio="1/1"
                    sx={{
                        borderRadius: 1.5,
                        ...(!available && {
                            opacity: 0.48,
                            // filter: 'grayscale(1)',
                        }),
                    }}
                />
            </Tooltip>
        </Box>
    );

    const renderContent = (
        <Stack spacing={2.5} sx={{ p: 3, pt: 2, textAlign: 'left' }}>
            <Link
                component={RouterLink}
                href={linkTo}
                color="inherit"
                variant="subtitle1"
                noWrap
                fontSize={20}
                fontWeight="bold"
            >
                {name}
            </Link>
            <Stack>
                กิจกรรมส่งเสริมการดูแลสุขภาพ ให้กับบุคลากรของคุณ กิจกรรมกลุ่ม ในรูปแบบ New Normal ถึงอยู่ไกล แต่ใจเราใกล้กันสมาชิกในองค์กรสามารถเข้าร่วมกิจกรรมได้ทุกที่
                ทุกเวลา เข้าร่วมกิจกรรมพร้อมกันได้หลายคนผ่านอุปกรณ์สมาร์ทโฟน สนับสนุนทุกระบบปฏิบัติการ iOS และ Android
            </Stack>
            <Button
                fullWidth
                size="large"
                color="inherit"
                variant="outlined"
                startIcon={<Iconify icon="ph:person-simple-run" width={30} />}
                // onClick={handleAddCart}
                sx={{ whiteSpace: 'nowrap' }}
            >
                เข้าสู่เว็บไซต์
            </Button>
        </Stack>
    );

    return (
        <Card
            sx={{
                '&:hover .add-cart-btn': {
                    opacity: 1,
                },
            }}
        >
            {renderLabels}

            {renderImg}

            {renderContent}
        </Card>
    );
}
