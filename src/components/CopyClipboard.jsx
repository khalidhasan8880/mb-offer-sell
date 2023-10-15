import  { useState } from 'react';
import { IconButton, Snackbar } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';

const CopyToClipboard = ({ textToCopy }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(textToCopy).then(
      function() {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500); // Reset the copied state after 1.5 seconds
      },
      function(err) {
        console.error('Unable to copy text to clipboard', err);
      }
    );
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
      <IconButton color="primary" aria-label="Copy to Clipboard" onClick={copyToClipboard}>
        <FileCopyIcon />
      </IconButton>
      <Snackbar
        open={isCopied}
        message="Copied"
        autoHideDuration={1500}
        onClose={() => setIsCopied(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)' }}
      />
    </div>
  );
};

export default CopyToClipboard;
