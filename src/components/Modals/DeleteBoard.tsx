// React
import { useState } from "react";

// MUI Components
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

// Icons
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";

// hooks
import useBoard from "@hooks/useBoard";
import useBoardsStore from "@hooks/useBoards";

function DeleteButton({ close }: { close: () => void }) {
  const deleteBoard = useBoardsStore((state) => state.deleteBoard);

  const handleClick = () => {
    deleteBoard();
    close();
  };

  return (
    <Button
      variant="contained"
      startIcon={<DeleteIcon />}
      onClick={handleClick}
    >
      Delete
    </Button>
  );
}

function CancelButton({ close }: { close: () => void }) {
  return (
    <Button variant="contained" startIcon={<CancelIcon />} onClick={close}>
      Cancel
    </Button>
  );
}

export default function DeleteBoard() {
  const [open, setOpen] = useState(false);
  const board = useBoard() as Board;

  const close = () => setOpen(false);

  return (
    <>
      <ListItemIcon>
        <DeleteIcon color="warning" />
      </ListItemIcon>
      <ListItemText
        primary={<Typography color="warning.main">Delete Board</Typography>}
      />
      <Dialog open={open} onClose={close}>
        <DialogTitle>
          <Typography color={(t) => t.palette.warning.main}>
            Delete this board?
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the "{board.name}" board? This
            action will remove all columns and tasks and cannot be reversed.
          </Typography>
        </DialogContent>
        <DialogActions>
          <DeleteButton close={close} />
          <CancelButton close={close} />
        </DialogActions>
      </Dialog>
    </>
  );
}
