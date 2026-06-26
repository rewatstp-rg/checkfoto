import {
    Box,
    Stack,
    Paper,
    useTheme,
    PaperProps,
    Typography,
    ListItemText,
    FormHelperText
} from "@mui/material";

import { useLocales } from "src/locales";
import { useCheckShirtBalanceMutation } from "src/api/order.api";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { selectRegister, setGetShirtStock } from "src/slices/register.slices";

import { InputFieldModel } from "src/types/input-column.model";

type Props = {
    options?: any[];
    // onApplyShipping?: (shipping: string) => void;
    // type?: string;
    label: string;
    labelEn: string;
    rest?: any;
    field?: any;
    error?: any;
};

export default function RHFSelectBtnDynamic({ options, rest, label = '', labelEn, field, error }: Props) {

    const dispatch = useAppDispatch();
    const { currentLang } = useLocales();
    const { listRegisterForm, listTicketOptionDefault } = useAppSelector(selectRegister);

    const [checkShirtBalance] = useCheckShirtBalanceMutation();

    const requiredFiled: boolean = rest?.rules?.required;

    return (
        <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                {currentLang.value === 'th' ? label : labelEn} {requiredFiled && <span style={{ color: 'red' }}>*</span>}
            </Typography>
            <div data-name={rest?.name}>
                <Box
                    columnGap={2}
                    rowGap={2}
                    display="grid"
                    gridTemplateColumns={{
                        xs: 'repeat(1, 1fr)',
                        sm: `repeat(${options && options?.length > 2 ? 4 : options?.length}, 1fr)`,
                    }}
                    sx={{
                        p: 0,
                        padding: '20px',
                        background: !!error && error.message ? '#ff563014' : '#919eab14',
                        borderRadius: '8px'
                    }}
                >
                    {options?.map((option) => (
                        <OptionItem
                            key={currentLang.value === 'en' ? option?.labelEn : option?.labelTh}
                            option={option}
                            isDisabled={(rest?.stock === 'ACTIVE' && option?.stockAvailable === 0)}
                            selected={field.value === option.key}
                            onClick={async () => {
                                if (rest && rest?.htmlInputKey === "SHIRT" && rest?.name && rest?.stock === 'ACTIVE') {
                                    if (option?.stockAvailable !== 0) {
                                        let shirtStockField: InputFieldModel = {};
                                        let shirtStockTicketField: InputFieldModel = {};
                                        shirtStockField = listRegisterForm?.find((res: InputFieldModel) => res.key === rest?.name) || {};
                                        shirtStockTicketField = listTicketOptionDefault?.find((res: InputFieldModel) => res.key === rest?.name) || {};
                                        if (shirtStockField?.key) {
                                            await checkShirtBalance(shirtStockField).unwrap().then((res) => {
                                                if (res) {
                                                    dispatch(setGetShirtStock(res));
                                                    const itemSelect = res?.listOption?.find((x: any) => x?.key === option?.value);
                                                    if (itemSelect && itemSelect?.stockAvailable && itemSelect.stockAvailable > 0) {
                                                        field.onChange(option.value);
                                                    }
                                                }
                                            })
                                        }

                                        if (shirtStockTicketField?.key) {
                                            await checkShirtBalance(shirtStockTicketField).unwrap().then((res) => {
                                                if (res) {
                                                    dispatch(setGetShirtStock(res));
                                                    const itemSelect = res?.listOption?.find((x: any) => x?.key === option?.value);
                                                    if (itemSelect && itemSelect?.stockAvailable && itemSelect.stockAvailable > 0) {
                                                        field.onChange(option.value);
                                                    }
                                                }
                                            })
                                        }
                                    }
                                } else {
                                    field.onChange(option.value);
                                }
                            }}
                        />
                    ))}
                </Box>
            </div>

            {!!error && (
                <FormHelperText error sx={{ px: 2, textAlign: 'left' }}>
                    {error.message}
                </FormHelperText>
            )}
        </Box>
    );
}

// ----------------------------------------------------------------------

type OptionItemProps = PaperProps & {
    option: any;
    selected: boolean;
    isDisabled?: boolean;
};

function OptionItem({ option, selected, isDisabled, ...other }: OptionItemProps) {
    // console.log("🚀 ~ OptionItem ~ disabled:", isDisabled)

    const theme = useTheme();

    const { currentLang } = useLocales();

    const { value, description } = option;

    return (
        <Paper
            variant="outlined"
            key={value}
            sx={{
                p: 1,
                cursor: 'pointer',
                display: 'flex',
                ...(selected && {
                    boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
                }),
                ...(isDisabled && {
                    opacity: 0.48,
                    backgroundColor: '#f5f5f5',
                    color: '#b7b7b7',
                    cursor: 'not-allowed',
                }),
            }}
            {...other}
        >
            {/* {key === 'ALL' && <Iconify icon="carbon:star" width={32} />}
            {key === 'SHIPPING' && <Iconify icon="carbon:delivery" width={32} />}
            {key === 'PICK_UP' && <Iconify icon="carbon:box" width={32} />} */}

            <ListItemText
                sx={{ ml: 2 }}
                primary={
                    <Stack direction="row" alignItems="center">
                        <Box component="span" sx={{
                            fontSize: '0.8rem',
                            flexGrow: 1, ...(selected && {
                                color: theme.palette.primary.main,
                            })
                        }}>
                            {currentLang.value === 'en' ? option?.labelEn : option?.labelTh}
                        </Box>
                        {/* <Box component="span" sx={{ typography: 'h6' }}>{`$${value}`}</Box> */}
                    </Stack>
                }
                secondary={description}
                primaryTypographyProps={{ typography: 'subtitle1', mb: 0.5 }}
                secondaryTypographyProps={{ typography: 'body2' }}
            />
        </Paper>
    );
}
