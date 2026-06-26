import Paper from '@mui/material/Paper';
import CardHeader from '@mui/material/CardHeader';
import Stack, { StackProps } from '@mui/material/Stack';
import { Theme, alpha, SxProps } from '@mui/material/styles';

// ----------------------------------------------------------------------

type BlockProps = StackProps & {
  title?: React.ReactNode;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  minHeight?: number;
};

export default function ComponentBlock({ title, sx, children,minHeight = 180, ...other }: BlockProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 1.5,
        borderStyle: 'dashed',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
      }}
    >
      {title && <CardHeader title={title} />}

      <Stack
        spacing={3}
        direction="row"
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
        sx={{
          p: 1,
          minHeight,
          ...sx,
        }}
        {...other}
      >
        {children}
      </Stack>
    </Paper>
  );
}
