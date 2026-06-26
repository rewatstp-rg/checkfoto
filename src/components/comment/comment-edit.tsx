import { Box, Typography } from "@mui/material";

import { RHFEditor } from "../hook-form";

type Props = {
    value: string;
    name: string;
    label: string;
    required?: boolean;
    isDetail?: boolean;
}
const CommentEdit = ({ value, name, label, required = false, isDetail }: Props) => (
    <>
        <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                {label} {required ? <span style={{ color: 'red' }}>*</span> : ''}
            </Typography>
        </Box>
        {
            isDetail ? (
                <Box
                    dangerouslySetInnerHTML={{ __html: value }}
                    sx={{
                        mb: 0.5,
                        '& p': { typography: 'body2', m: 0 },
                        '& a': { color: 'inherit', textDecoration: 'none' },
                        '& strong': { typography: 'subtitle2' },
                    }}
                />
            ) : (
                <RHFEditor
                    simple
                    name={name}
                    id={name}
                    value={value}
                />
            )
        }

    </>
)

export default CommentEdit;
