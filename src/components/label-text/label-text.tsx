
import { useTheme } from '@mui/material/styles';
import { Box, Typography, TypographyProps } from "@mui/material"

type LabelTextProps = {
    label: string;
    value: string | number | undefined;
} & TypographyProps;

const LabelText = ({ label, value, ...other }: LabelTextProps) => {

    const theme = useTheme();

    return (
        <Box>
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                {label}
            </Typography>
            <Typography variant="body2" {...other} style={{color: theme.palette.primary.main, fontFamily: 'line-seedsans-bold'}}>
                {value}
            </Typography>
        </Box>
    )
};

export default LabelText;