/* eslint-disable perfectionist/sort-imports */
import 'src/utils/highlight';

import ReactQuill from 'react-quill';

import { alpha } from '@mui/material/styles';

import { EditorProps } from './types';
import { StyledEditor } from './styles';
import Toolbar, { formats } from './toolbar';

// ----------------------------------------------------------------------
type ExpenProps = {
  isToolbar?: boolean;
}

export default function Editor({
  id = 'minimal-quill',
  error,
  simple = false,
  helperText,
  sx,
  isToolbar = false,
  ...other
}: EditorProps & ExpenProps) {
  const modules = {
    toolbar: {
      container: `#${id}`,
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true,
    },
    syntax: true,
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <>
      <StyledEditor
        sx={{
          ...(error && {
            border: (theme) => `solid 1px ${theme.palette.error.main}`,
            '& .ql-editor': {
              bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
            },
          }),
          ...sx,
        }}
      >

        <Toolbar id={id} simple={simple} isToolbar={isToolbar} />

        <ReactQuill
          modules={modules}
          formats={formats}
          placeholder="กรอกข้อมูลที่ต้องการ..."
          {...other}
        />
      </StyledEditor>

      {helperText}
    </>
  );
}
