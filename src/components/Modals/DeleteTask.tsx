import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface Props {
  title: string;
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}

export default function DeleteTask({
  title,
  open,
  handleClose,
  handleDelete,
}: Props) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete this task?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the "{title}" task and its subtasks?
          This action cannot be reversed.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
