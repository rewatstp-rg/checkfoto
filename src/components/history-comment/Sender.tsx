import { Box, Stack, ListItemText } from "@mui/material";

type Props = {
    actionBy: string;
    position: string;
    timestamp: string;
}
const Sender = ({ actionBy, position, timestamp }: Props) => (
    <Stack
        flexShrink={0}
        direction="row"
        alignItems="center"
        sx={{
            p: (theme) => theme.spacing(2, 2, 1, 2),
        }}
    >
        <ListItemText
            primary={
                <>
                    {actionBy}
                    <Box component="span" sx={{ typography: 'body2', color: 'text.disabled' }}>
                        {` <${position}>`}
                    </Box>
                </>
            }
            secondary={
                <Box component="span" sx={{ color: 'text.secondary' }}>
                    {`${timestamp}`}
                </Box>
            }
            secondaryTypographyProps={{
                mt: 0.5,
                noWrap: true,
                component: 'span',
                typography: 'caption',
            }}
        />
    </Stack>
)

export default Sender;
