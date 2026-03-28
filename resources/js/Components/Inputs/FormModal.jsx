import React, { useState } from 'react';
import {
  TextField, Modal, Box, Typography, Button,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
 const FormModal = ({
    open,
    onClose,
    title,
    children,
    onSubmit,
    mode = 'create',
    loading = false
  }) => {
    const getButtonText = () => mode === 'create' ? 'Create' : 'Update';

    return (
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{title}</DialogTitle>
        <form onSubmit={onSubmit}>
          <DialogContent>
            {children}
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} disabled={loading}>
              Close
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? 'Processing...' : getButtonText()}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  };
export default FormModal;
