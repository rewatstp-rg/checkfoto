import { Box, Button, Divider, Typography } from "@mui/material";

import { useResponsive } from "src/hooks/use-responsive";

import { useLocales } from "src/locales";

import Label from "src/components/label";
import Image from "src/components/image";

import { OrderPhotoModel } from "src/types/order-photo.type";

type Props = {
    orderPhotoModel: OrderPhotoModel;
    downloadAll: () => void;
    downloadAllFrame: () => void;
}
export default function PaymentDetailContent({
    orderPhotoModel,
    downloadAll,
    downloadAllFrame
}: Props) {

    const { currentLang } = useLocales();
    const upLg = useResponsive('up', 'lg');

    return (
        <Box
            display='flex'
            justifyContent='space-between'
            sx={{
                padding: '1rem',
                border: '1px dashed #89898929',
                borderRadius: 1,
                flexDirection: { xs: 'column', md: 'row' },
                marginBottom: '1rem'
            }}>
            <Box gap={2}>
                <Box gap={{ xs: 1, md: 2 }} sx={{ display: 'flex', justifyContent: 'flex-start', flexDirection: { xs: 'column', md: 'row' } }}>
                    <Image paddingTop='0%' src={orderPhotoModel?.imageEventBannerUrl} sx={{ borderRadius: 1, width: { xs: 'auto', md: 100 } }} />
                    <Box>
                        <Box display='flex' flexDirection='row' alignItems='center'>
                            <Typography variant="body2" sx={{ mr: 1, fontWeight: 'bold' }}>
                                {currentLang?.value === 'en' ? "Order Number" : "คําสั่งซื้อ"} : {orderPhotoModel?.orderPhotoNumber}
                            </Typography>
                            <Label variant="soft" color="success">{currentLang?.value === 'en' ? "Payment Completed" : "ชำระเงินเรียบร้อย"}</Label>
                        </Box>
                        <Typography variant="h6" mt={1}>
                            {currentLang?.value === 'en' ? orderPhotoModel?.eventNameEn : orderPhotoModel?.eventNameTh}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            {
                !upLg && <Divider sx={{ borderStyle: 'dashed', mt: 1, mb: 1 }} />
            }
            <Box display='flex' justifyContent='center' flexDirection='column' alignItems='flex-end' gap={1}>
                {/* <RenderContentDownload orderPhotoModel={orderPhotoModel} downloadAll={downloadAll} /> */}
                <RenderContentDownloadFrame orderPhotoModel={orderPhotoModel} downloadAll={downloadAllFrame} />
            </Box>
        </Box>
    );
}

// function RenderContentDownload({ orderPhotoModel, downloadAll }: { orderPhotoModel: OrderPhotoModel, downloadAll: () => void }) {

//     const { currentLang } = useLocales();

//     return (
//         <Box display='flex' flexDirection='column' gap={1} sx={{
//             width: '100%',
//             maxWidth: { xs: '100%', md: 200 },
//             textAlign: {
//                 xs: 'left',
//                 md: 'right'
//             }
//         }}>

//             {
//                 orderPhotoModel?.downloadAllStatus === 'PENDING_FILE' && (
//                     <Typography variant="body2" color='error'>{currentLang?.value === 'en' ? "Download All will be open soon" : "ปุ่มดาวน์โหลดทั้งหมดจะเปิดในไม่ช้ากรุณารอสักครู่"}</Typography>
//                 )
//             }

//             {
//                 orderPhotoModel?.downloadAllStatus === 'INACTIVE' && (
//                     <Typography variant="body2" color='error'>{currentLang?.value === 'en' ? "Download All will be open for price package only" : "ปุ่มดาวน์โหลดทั้งหมดจะเปิดให้สำหรับราคาแพ็คเกจเท่านั้น"}</Typography>
//                 )
//             }
            
//             {
//                 (orderPhotoModel?.downloadAllUrl && orderPhotoModel?.downloadAllStatus === 'SUCCESS' && orderPhotoModel?.zipForPackage !== 'INACTIVE') ? (
//                     <Button
//                         variant="outlined"
//                         size="medium"
//                         color='primary'
//                         onClick={() => downloadAll()}>
//                         Download All
//                     </Button>
//                 ) : null
//             }
//         </Box>
//     )
// }

function RenderContentDownloadFrame({ orderPhotoModel, downloadAll }: { orderPhotoModel: OrderPhotoModel, downloadAll: () => void }) {

    const { currentLang } = useLocales();

    return (
        <Box display='flex' flexDirection='column' gap={1} sx={{
            width: '100%',
            maxWidth: { xs: '100%', md: 200 },
            textAlign: {
                xs: 'left',
                md: 'right'
            }
        }}>

            {
                orderPhotoModel?.downloadFrameAllStatus === 'PENDING_FILE' && (
                    <Typography variant="body2" color='error'>{currentLang?.value === 'en' ? "Download All will be open soon" : "ปุ่มดาวน์โหลดทั้งหมดจะเปิดในไม่ช้ากรุณารอสักครู่"}</Typography>
                )
            }

            {
                orderPhotoModel?.downloadFrameAllStatus === 'INACTIVE' && (
                    <Typography variant="body2" color='error'>{currentLang?.value === 'en' ? "Download All will be open for price package only" : "ปุ่มดาวน์โหลดทั้งหมดจะเปิดให้สำหรับราคาแพ็คเกจเท่านั้น"}</Typography>
                )
            }

            {
                (orderPhotoModel?.downloadFrameAllUrl && orderPhotoModel?.downloadFrameAllStatus === 'SUCCESS' && orderPhotoModel?.zipWithFrame !== 'INACTIVE') ? (
                    <Button
                        variant="outlined"
                        size="medium"
                        color='primary'
                        onClick={() => downloadAll()}>
                        Download All
                    </Button>
                ) : null
            }
        </Box>
    )
}