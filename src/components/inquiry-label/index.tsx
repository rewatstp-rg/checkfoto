import { useTheme } from '@mui/material/styles';
import { Box, Typography } from "@mui/material";

type Proptype = {
    label: string
    value: any
}
const InquiryLabel = ({ label, value }: Proptype) => {

    const theme = useTheme();

    return (
        <Box>
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                {label}
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.primary.main, fontFamily: 'line-seedsans-bold' }}>
                {value || '-'}
            </Typography>
        </Box>
    );
};
export default InquiryLabel