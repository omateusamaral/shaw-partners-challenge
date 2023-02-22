import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface ErrorDialogProps {
  error: Error | undefined;
  title?: string;
  customMessage?: string;
  onClose: () => void;
}
export function ErrorDialog({
  onClose,
  error,
  customMessage,
  title,
}: ErrorDialogProps) {
  return (
    <Dialog
      open={Boolean(error)}
      onClose={onClose}
      maxWidth="md"
      sx={{
        width: `100%`,
      }}
    >
      <DialogTitle id="alert-dialog-title">
        {Boolean(title) ? title : `An error happened`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {Boolean(customMessage)
            ? customMessage
            : `An error happened. Please try again`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
