import { m, AnimatePresence } from 'framer-motion';

import Stack from '@mui/material/Stack';
import { CircularProgress } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import { alpha, SxProps, useTheme } from '@mui/material/styles';

import { fData } from 'src/utils/format-number';

import { FileModel } from 'src/types/file.model';

import { varFade } from '../animate';
import FileThumbnailCustom from '../file-thumbnail/file-thumbnail-custom';

// ----------------------------------------------------------------------

type FileCustomProps = {
  files: FileModel[];
  sx?: SxProps<any>;
  onDownload?: any;
  tooltip?: boolean;
  thumbnail?: boolean;
  loading?: boolean;
};

export default function MultiFilePreviewCustom({ files, sx, onDownload, tooltip, thumbnail, loading = false }: FileCustomProps) {

  const theme = useTheme();

  return (
    <AnimatePresence initial={false}>
      {files?.map((file: FileModel) => {

        const { fileId, fileName = '', fileSize = 0, fileUrl } = file;

        const isNotFormatFile = typeof fileUrl === 'string';


        if (thumbnail) {
          return (
            <Stack
              key={fileId}
              component={m.div}
              {...varFade().inUp}
              alignItems="center"
              display="inline-flex"
              justifyContent="center"
              sx={{
                m: 0.5,
                width: 80,
                height: 80,
                borderRadius: 1.25,
                overflow: 'hidden',
                position: 'relative',
                border: (themeIn) => `solid 1px ${alpha(themeIn.palette.grey[500], 0.16)}`,
                ...sx,
              }}
            >

              {
                !loading && (
                  <FileThumbnailCustom
                    onDownload={onDownload}
                    tooltip
                    imageView
                    file={file}
                    sx={{ position: 'absolute' }}
                    imgSx={{ position: 'absolute' }}
                  />
                )
              }

              {
                loading && (
                  <CircularProgress color="inherit" size={24} style={{ color: theme.palette.primary.main }} />
                )
              }

            </Stack>
          );
        }

        return (
          <Stack
            key={fileId}
            component={m.div}
            {...varFade().inUp}
            spacing={2}
            direction="row"
            alignItems="center"
            sx={{
              my: 1,
              py: 1,
              px: 1.5,
              borderRadius: 1.25,
              overflow: 'hidden',
              position: 'relative',
              border: (themeIn) => `solid 1px ${alpha(themeIn.palette.grey[500], 0.16)}`,
              ...sx,
            }}
          >


            {
              !loading && (
                <FileThumbnailCustom file={file} onDownload={onDownload} />
              )
            }

            {
              loading && (
                <CircularProgress color="inherit" size={24} style={{ color: theme.palette.primary.main }} />
              )
            }

            <ListItemText
              primary={isNotFormatFile ? fileUrl : fileName}
              secondary={isNotFormatFile ? '' : fData(fileSize)}
              secondaryTypographyProps={{
                component: 'span',
                typography: 'caption',
              }}
            />
          </Stack>
        );
      })}
    </AnimatePresence>
  );
}
