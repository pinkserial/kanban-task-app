import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import { DialogActions, DialogContent } from "@mui/material";

interface Props {
  title: string;
  isOpen: boolean;
  onDelete: () => void;
  onClose: () => void;
}

export default function DeleteBoard({
  title,
  isOpen,
  onDelete,
  onClose,
}: Props) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        <Typography color={(t) => t.palette.warning.main}>
          Delete this board?
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete the "{title}" board? This action will
          remove all columns and tasks and cannot be reversed.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={() => {
            onDelete();
            onClose();
          }}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          startIcon={<CancelIcon />}
          onClick={onClose}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
