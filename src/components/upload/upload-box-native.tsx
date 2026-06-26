import React, { useRef } from 'react';

import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';

import Iconify from '../iconify';

interface UploadBoxNativeProps {
  placeholder?: React.ReactNode;
  error?: boolean;
  disabled?: boolean;
  sx?: any;
  onChange?: (file: File) => void;
}

export default function UploadBoxNative({
  placeholder,
  error,
  disabled,
  sx,
  onChange,
}: UploadBoxNativeProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onChange) {
      onChange(file);
    }
  };

  const hasError = !!error;

  return (
    <Box
      onClick={handleClick}
      sx={{
        width: 64,
        height: 64,
        flexShrink: 0,
        display: 'flex',
        borderRadius: 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        alignItems: 'center',
        color: hasError ? 'error.main' : 'text.disabled',
        justifyContent: 'center',
        bgcolor: (theme) =>
          hasError
            ? alpha(theme.palette.error.main, 0.08)
            : alpha(theme.palette.grey[500], 0.08),
        border: (theme) =>
          `dashed 1px ${
            hasError
              ? theme.palette.error.main
              : alpha(theme.palette.grey[500], 0.16)
          }`,
        opacity: disabled ? 0.48 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
        '&:hover': {
          opacity: 0.72,
        },
        ...sx,
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        style={{ display: 'none' }}
      />
      {placeholder || <Iconify icon="eva:cloud-upload-fill" width={28} />}
    </Box>
  );
}
