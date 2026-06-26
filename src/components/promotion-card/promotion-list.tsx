import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { HTML_KEY } from "src/utils/constants";

import { useTranslate } from "src/locales";
import { useAppSelector } from "src/store/hooks";
import { selectRegister } from "src/slices/register.slices";

import PromotionCard from "./promotion-card";

export default function PromotionList({ customer, onApplyPromotion, promotionAmount }: { customer: any, onApplyPromotion: (e: any) => void, promotionAmount: any }) {

    const { t } = useTranslate();
    const { registerFormDetail } = useAppSelector(selectRegister);
    const disabled = Boolean(customer[HTML_KEY.COUPON_CODE]) && registerFormDetail?.discountWithPromotion === 'INACTIVE';
    const isNotView = Boolean(registerFormDetail?.orderNumber);

    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontSize: 16 }}>
                {t('promotion.title')}
            </Typography>
            <Grid container spacing={3}>
                {customer?.PROMOTION && customer?.PROMOTION?.length > 0 && customer?.PROMOTION.map((item: any, index: number) => (
                    <PromotionCard key={index} promotion={item} onApplyPromotion={() => onApplyPromotion(item)} promotionAmount={promotionAmount} disabled={disabled} isNotView={isNotView} />
                ))}
            </Grid>

        </Box>
    )
}