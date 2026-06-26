import { Box } from "@mui/material";

import Markdown from 'src/components/markdown';

import Scrollbar from "../scrollbar";

type Props = {
    message: string;
}
const Content = ({ message }: Props) => (
    <Box
        sx={{
            py: 3,
            flexGrow: 1,
            overflow: { xs: 'auto', md: 'hidden' },
        }}
    >
        <Scrollbar>
            <Markdown
                children={message}
                sx={{
                    px: 2,
                    '& p': {
                        typography: 'body2',
                    },
                }}
            />
        </Scrollbar>
    </Box>
)

export default Content;