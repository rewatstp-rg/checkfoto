import { Box, Fade, CircularProgress } from "@mui/material";

export default function FadeCircularLoading({
    loading
}: {
    loading: boolean
}) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, mt: 5, minHeight: 200, alignItems: 'center' }}>
            <Fade in={loading}>
                <CircularProgress size={32} color="primary" />
            </Fade>
        </Box>
    );
}