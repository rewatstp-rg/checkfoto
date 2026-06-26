import { Button, TextField, CardHeader, CardContent, InputAdornment } from "@mui/material";

import { useTranslate } from "src/locales";

type Props = {
    onApplyDiscount: (discount: number) => void;
    disabled?: boolean
};

export function DiscountCord({ onApplyDiscount, disabled }: Props) {

    const { t } = useTranslate();

    return (
        <>
            <CardHeader
                title={`${t('registerForm.payment.useDiscountTitle')}`}
            />
            <CardContent>
                <TextField
                    fullWidth
                    disabled={disabled}
                    placeholder="Discount codes / Gifts"
                    value="DISCOUNT5"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button color="primary" onClick={() => onApplyDiscount(5)} sx={{ mr: -0.5 }} disabled={disabled}>
                                    {`${t('registerForm.payment.useDiscountBtn')}`}
                                </Button>
                            </InputAdornment>
                        ),
                    }}
                />
            </CardContent>
        </>
    )
} 