import { Box, Typography } from "@mui/material";

type Props = {
    label: string;
    imageSrc: string;
}
const TitleEventType = ({ label, imageSrc }: Props) => (
    <Box display="flex" justifyContent="flex-start" alignItems="center" mb={2}>
        <input type="image"  src={imageSrc} width={32} style={{ marginRight: 7 }} alt="photo"/>
        {/* <img src="/assets/logo/photo-logo.png" alt="race-checkrace-logo" /> */}
        <Typography variant="h3">{label}</Typography>
    </Box>
);

export default TitleEventType;