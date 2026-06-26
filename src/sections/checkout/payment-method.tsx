import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import Paper, { PaperProps } from '@mui/material/Paper';

import { PAYMENT_GATEWAY_TYPE } from 'src/utils/constants';

import { useLocales } from 'src/locales';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { selectOrder, setPaymentMethod, setPaymentMethodDetail } from 'src/slices/order.slices';

import Iconify from 'src/components/iconify';

import { PaymentGatewayModel } from 'src/types/payment-gateway.model';

// ----------------------------------------------------------------------

export default function PaymentMethod({
    pageType,
    paymentMethod
}: {
    pageType?: string,
    paymentMethod?: string
}) {

    const dispatch = useAppDispatch();
    const { currentLang } = useLocales();

    const { listPaymentGateway } = useAppSelector(selectOrder);

    const [selectPaymentGateway, setSelectPaymentGateway] = useState<string>(paymentMethod || '');
    const [listPaymentMethod, setListPaymentMethod] = useState<PaymentGatewayModel[]>([]);

    const handleApplyPaymentMethod = (value: PaymentGatewayModel) => {
        setSelectPaymentGateway(value?.paymentMethod || '');
        if (pageType === 'ORDER_DETAIL') {
            dispatch(setPaymentMethodDetail(value));
        } else {
            dispatch(setPaymentMethod(value));
        }
    };

    useEffect(() => {
        setListPaymentMethod(listPaymentGateway);
    }, [listPaymentGateway]);
     

    return (
        <Box
            columnGap={2}
            rowGap='12px'
            display="grid"
            gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
            }}
        >
            {
                listPaymentMethod && listPaymentMethod?.length > 0 &&
                listPaymentMethod.filter(x => x.status === 'ACTIVE').map((item) => (
                    <OptionItem
                        key={item.paymentMethod}
                        option={{
                            value: item?.paymentMethod || '',
                            label: currentLang.value === 'en' ? item.paymentDescEn || '' : item.paymentDescTh || '',
                            description: currentLang.value === 'en' ? `${item?.amountFee || "0.00"} THB fee applied` || '' : `*ค่าธรรมเนียม ${item?.amountFee || "0.00"}฿`
                        }}
                        selected={selectPaymentGateway === item.paymentMethod}
                        onClick={() => {
                            handleApplyPaymentMethod(item);
                        }}
                    />
                ))
            }
        </Box>
    );
}

// ----------------------------------------------------------------------

type OptionItemProps = PaperProps & {
    option: {
        value: string;
        label: string;
        description: string;
    };
    selected: boolean;
};

function OptionItem({ option, selected, ...other }: OptionItemProps) {
    const { value, label, description } = option;
    const theme = useTheme();

    return (
        <Paper
            variant="outlined"
            key={value}
            sx={{
                p: '6px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: 'text.primary',
                borderStyle: 'dashed', borderWidth: 1, borderColor: 'grey.300', borderRadius: 1, width: '100%',
                ...(selected && {
                    boxShadow: () => `0 0 0 2px ${theme.palette.primary.main}`,
                }),
            }}
            {...other}
        >

            {value === PAYMENT_GATEWAY_TYPE.DIR && <Iconify icon="mdi:bank-outline" width={40} sx={{
                ...(selected && {
                    color: theme.palette.primary.main,
                })
            }} />}

            {
                value === PAYMENT_GATEWAY_TYPE.CDC && <Stack spacing={1} direction="row" alignItems="center">
                    {/* <Iconify icon="logos:mastercard" width={40} sx={{
            ...(selected && {
              color: theme.palette.primary.main,
            })
          }} />
          <Iconify icon="logos:visa" width={40} sx={{
            ...(selected && {
              color: theme.palette.primary.main,
            })
          }} /> */}
                    <img src="/assets/logo/2C2P_Logo_RGB_Dark_Green-01.png" alt="2C2P_Logo_RGB_Dark_Green-logo" width={100} />
                </Stack>
            }
            {
                value === PAYMENT_GATEWAY_TYPE.KC && <Stack spacing={1} direction="row" alignItems="center">
                    <Iconify icon="logos:mastercard" width={40} sx={{
                        ...(selected && {
                            color: theme.palette.primary.main,
                        })
                    }} />
                    <Iconify icon="logos:visa" width={40} sx={{
                        ...(selected && {
                            color: theme.palette.primary.main,
                        })
                    }} />
                </Stack>
            }
            {value === PAYMENT_GATEWAY_TYPE.TQR && <Iconify icon="tabler:qrcode" width={40} sx={{
                ...(selected && {
                    color: theme.palette.primary.main,
                })
            }} />}
            <ListItemText
                sx={{ textAlign: 'center' }}
                primary={
                    <Stack direction="row" alignItems="center">
                        <Box component="span" sx={{
                            flexGrow: 1, ...(selected && {
                                color: theme.palette.primary.main,
                            })
                        }}>
                            {label}
                        </Box>
                        {/* <Box component="span" sx={{ typography: 'h6' }}>{`$${value}`}</Box> */}
                    </Stack>
                }
                secondary={description}
                primaryTypographyProps={{ typography: 'subtitle1'}}
                secondaryTypographyProps={{ typography: 'body2' }}
            />
        </Paper>
    );
}
