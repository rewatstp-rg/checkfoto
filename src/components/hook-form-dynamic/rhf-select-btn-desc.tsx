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

import Markdown from 'src/components/markdown';

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

export default function RHFSelectBtnDescDynamic({ options, rest, label = '', labelEn, field, error }: Props) {

    const theme = useTheme();
    const { currentLang } = useLocales();
    const requiredFiled: boolean = rest?.rules?.required;

    return (
        <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                {currentLang.value === 'th' ? label : labelEn} {requiredFiled && <span style={{ color: 'red' }}>*</span>}
            </Typography>
            <Box sx={{
                p: 0,
                padding: '20px',
                background: !!error && error.message ? '#ff563014' : '#919eab14',
                borderRadius: '8px',
            }}>
                <Box
                    columnGap={2}
                    rowGap={2}
                    display="grid"
                    gridTemplateColumns={{
                        xs: 'repeat(1, 1fr)',
                        sm: `repeat(4, 1fr)`,
                    }}
                    mb={3}

                >
                    {options?.map((option) => (
                        <OptionItem
                            key={currentLang.value === 'en' ? option?.labelEn : option?.labelTh}
                            option={option}
                            selected={field.value === option.key}
                            onClick={async () => {
                                field.onChange(option.value);
                            }}
                        />
                    ))}
                </Box>
                <Box sx={{
                    maxHeight: '600px',
                    overflow: 'auto',
                    background: theme.palette.background.paper,
                    padding:'1rem',
                    wordBreak: 'break-word',
                }}>
                    {
                        (
                            (rest?.descriptionTh || rest?.descriptionEn) && <Markdown
                                children={currentLang.value === 'en' ? rest.descriptionEn.toString() : rest.descriptionTh.toString() || ''}
                                sx={{
                                    p: 0,
                                    '& p, li, ol': {
                                        typography: 'body2',
                                        lineHeight: '2.2',
                                        fontSize: '1rem'
                                    },
                                    '& br': {
                                        marginTop: '1.5rem'
                                    },
                                    '& ol': {
                                        p: 0,
                                        display: { md: 'flex' },
                                        listStyleType: 'none',
                                        '& li': {
                                            '&:first-of-type': {
                                                minWidth: 240,
                                                mb: { xs: 0.5, md: 0 },
                                            },
                                        },
                                    }
                                }} />
                        )
                    }

                </Box>
            </Box>
            {
                !!error && (
                    <FormHelperText error sx={{ px: 2, textAlign: 'left' }}>
                        {error.message}
                    </FormHelperText>
                )
            }
        </Box >
    );
}

// ----------------------------------------------------------------------

type OptionItemProps = PaperProps & {
    option: any;
    selected: boolean;
    isDisabled?: boolean;
};

function OptionItem({ option, selected, isDisabled, ...other }: OptionItemProps) {

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
                    </Stack>
                }
                secondary={description}
                primaryTypographyProps={{ typography: 'subtitle1', mb: 0.5 }}
                secondaryTypographyProps={{ typography: 'body2' }}
            />
        </Paper>
    );
}

