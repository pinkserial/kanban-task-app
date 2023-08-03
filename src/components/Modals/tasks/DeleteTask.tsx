import useBoardsStore from "@hooks/useBoards";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  colIndex: number;
  index: number;
  title: string;
}

export default function DeleteTask({
  isOpen,
  onClose,
  onConfirm,
  colIndex,
  index,
  title,
}: Props) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle color="warning.main">Delete this task?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the "{title}" task and its subtasks?
          This action cannot be reversed.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <CancelButton close={onClose} />
        <DeleteButton
          colIndex={colIndex}
          index={index}
          close={() => {
            onClose();
            onConfirm();
          }}
        />
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
