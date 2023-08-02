import useBoardsStore from "@hooks/useBoards";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

interface Props {
  colIndex: number;
  index: number;
  title: string;
  close: () => void;
}

export default function DeleteTask({ colIndex, index, title, close }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box sx={{ display: "flex" }} onClick={() => setOpen(true)}>
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText>Delete Task</ListItemText>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Delete this task?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the "{title}" task and its subtasks?
            This action cannot be reversed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CancelButton close={() => setOpen(false)} />
          <DeleteButton
            colIndex={colIndex}
            index={index}
            close={() => {
              setOpen(false);
              close();
            }}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}

function CancelButton({ close }: { close: () => void }) {
  return (
    <Button variant="contained" onClick={close}>
      Cancel
    </Button>
  );
}

function DeleteButton({
  colIndex,
  index,
  close,
}: {
  colIndex: number;
  index: number;
  close: () => void;
}) {
  const deleteTask = useBoardsStore((state) => state.deleteTask);

  const handleClick = () => {
    deleteTask(colIndex, index);
    close();
  };

  return (
    <Button variant="contained" onClick={handleClick}>
      Delete
    </Button>
  );
}
