import { memo } from "react";

import { Divider, Typography } from "@mui/material";

const TitleLable = memo(({ title }: { title: string }) => (
    <>
        <Typography variant="h4" sx={{ mb: 1 }} color='primary'>
            {title}
        </Typography>
        <Divider sx={{ borderStyle: 'dashed', mb: 2 }} />
    </>
));

export default TitleLable