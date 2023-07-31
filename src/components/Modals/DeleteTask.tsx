import useBoard from "@hooks/useBoard";
import useBoardsStore from "@hooks/useBoards";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";

interface Props {
  task: Task;
}

export default function DeleteTask({ task }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Delete this task?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the "{task.title}" task and its
          subtasks? This action cannot be reversed.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <CancelButton close={() => setOpen(false)} />
        <DeleteButton task={task} close={() => setOpen(false)} />
      </DialogActions>
    </Dialog>
  );
}

function CancelButton({ close }: { close: () => void }) {
  return (
    <Button variant="contained" onClick={close}>
      Cancel
    </Button>
  );
}

function DeleteButton({ task, close }: { task: Task; close: () => void }) {
  const board = useBoard() as Board;
  const deleteTask = useBoardsStore((state) => state.deleteTask);

  const handleClick = () => {
    const columnId = board.columns.findIndex(
      (column) => column.name === task.status
    );
    const taskId = board.columns[columnId].tasks.findIndex((t) => t === task);
    deleteTask(columnId, taskId);
    close();
  };

  return (
    <Button variant="contained" onClick={handleClick}>
      Delete
    </Button>
  );
}
