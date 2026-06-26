import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export function asterisk(theme: Theme) {
  return {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: theme.palette.error.main,
          "&$error": {
            color: theme.palette.error.main,
          },
        },
      },
    },
  };
}
