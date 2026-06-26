import { Box } from "@mui/system";
import { Stack, StackProps, Typography } from "@mui/material";

import { pxToRem } from "src/theme/typography";

interface BlockProps extends StackProps {
  label?: any;
  required?: boolean;
  children: React.ReactNode;
}

export function Block({ label = 'RHFTextField', sx, required = false, children }: BlockProps) {
  return (
    <Stack spacing={1} sx={{ width: 1, ...sx }}>
      <Typography
        variant="caption"
        sx={{
          textAlign: 'left',
          width: '100%',
          maxWidth: '100%',
          fontWeight: 'Bold',
          wordBreak: 'break-word',
          wordWrap: 'break-word',
          paddingLeft: '0.4rem',
          fontSize: pxToRem(14)
        }}
      >
        {label} {required ? <Box component='span' color="#FF0000">*</Box> : ''}
      </Typography>
      {children}
    </Stack>
  );
}