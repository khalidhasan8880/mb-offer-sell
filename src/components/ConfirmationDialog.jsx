import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const ConfirmationDialog = ({ open, onClose, onConfirm, action }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{`${action} Confirmation`}</DialogTitle>
      <DialogContent>
        {`Are you sure you want to ${action.toLowerCase()}?`}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="secondary">
          {action}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
