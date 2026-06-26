import Grid from "@mui/material/Unstable_Grid2";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Paper, useTheme, Typography } from "@mui/material";

import { beteweenEventDate } from "src/utils/format-time";

import { useLocales, useTranslate } from "src/locales";

import { IPromotionType } from "src/types/promotion.type";

export default function PromotionCard({
    promotion,
    onApplyPromotion,
    promotionAmount,
    disabled,
    isNotView
}: { promotion: IPromotionType, onApplyPromotion: () => void, promotionAmount: any, disabled: boolean, isNotView: boolean }) {

    const theme = useTheme();
    const { t } = useTranslate();
    const { currentLang } = useLocales();

    const { promotionName, promotionNameEn, promotionCode, startDate, endDate, selected } = promotion;

    return (
        <Grid xs={12} md={6}>
            <Paper
                variant="outlined"
                key={promotionCode}
                sx={{
                    p: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    color: 'text.primary',
                    borderStyle: 'dashed', borderWidth: 1, borderColor: 'grey.300', borderRadius: 1, width: '100%',
                    ...(selected && {
                        boxShadow: () => `0 0 0 2px ${theme.palette.primary.main}`,
                    }),
                }}
            >
                <Box sx={{
                    p: 1,
                }}>
                    <Typography
                        variant="subtitle1"
                        noWrap
                        sx={{ fontSize: '14px' }}
                        color='text.primary'
                        mb={1} >
                        {currentLang?.value === 'en' ? promotionNameEn : promotionName}
                    </Typography>
                    {
                        !isNotView && <>
                            <Typography
                                variant="body1"
                                noWrap
                                sx={{ fontSize: '14px' }}
                                color='primary' >
                                {t('promotion.dateBeteween')}  {startDate && endDate && beteweenEventDate(new Date(startDate), new Date(endDate), 'LONG', currentLang?.value || 'th')}
                            </Typography>
                            <Box display='flex' justifyContent='flex-end' mt={1}>
                                <LoadingButton type="submit" variant="contained" color="primary" loading={false} onClick={() => onApplyPromotion()} disabled={disabled}>
                                    {selected && promotionAmount?.promotionCode === promotionCode && t('promotion.cancel')}
                                    {selected && promotionAmount?.promotionCode !== promotionCode && t('promotion.use')}
                                    {!selected && promotionAmount?.promotionCode !== promotionCode && t('promotion.use')}
                                </LoadingButton>
                            </Box>
                        </>
                    }
                </Box>
            </Paper>
        </Grid>
    )
}