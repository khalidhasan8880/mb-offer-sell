
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const ErrorModal = ({ open, onClose, error }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h5" component="div" gutterBottom>
          Error
        </Typography>
        <Typography variant="body1" gutterBottom>
          {error?.message}
        </Typography>
        <Button variant="contained" onClick={onClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default ErrorModal;
