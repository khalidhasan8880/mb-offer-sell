
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertModal({open, handleAlertCancel, children,  title}) {
  

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleAlertCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description">
       {description}
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          {children}
        </DialogActions>
      </Dialog>
    </div>
  );
}