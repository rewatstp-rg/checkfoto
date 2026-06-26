
import { memo } from 'react';

import { Alert, Snackbar } from '@mui/material';

import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { closeErrorMessage, selectErrorMessage } from 'src/slices/error-message.slices';

const ErrorMessageModal = memo(() => {
  const dispatch = useAppDispatch()
  const { open, message } = useAppSelector(selectErrorMessage)

  const handleClose = () => {
    dispatch(closeErrorMessage())
  }

  return (
    <>
      {open && (
        <Snackbar
          open={open}
          autoHideDuration={10000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity="error" onClose={handleClose}>
            <div style={{ whiteSpace: 'pre' }}>{message}</div>
          </Alert>
        </Snackbar>
      )}
    </>
  )
})

export default ErrorMessageModal;
