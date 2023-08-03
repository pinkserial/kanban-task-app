import useBoardStore from "@hooks/useBoards";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import {
  DialogActions,
  IconButton,
  List,
  ListItem,
  ListSubheader,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import { produce } from "immer";
import useBoard from "@hooks/useBoard";
import CancelButton from "@components/Buttons/Cancel";

const initialTask = (status: string) => ({
  title: "",
  description: "",
  subtasks: [
    { title: "", isCompleted: false },
    { title: "", isCompleted: false },
  ],
  status,
});

export default function AddTask() {
  const board = useBoard() as Board;
  const addTask = useBoardStore((state) => state.addTask);

  const [task, setTask] = useState<Task>(() =>
    initialTask(board.columns[0].name)
  );

  useEffect(() => {
    setTask(initialTask(board.columns[0].name));
  }, [board]);

  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    const columnId = board.columns.findIndex(
      (column) => column.name === task.status
    );

    if (columnId === -1) {
      return new Error("no column");
    }

    addTask(columnId, task);
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
      >
        Add New Task
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle align="center">Add New Task</DialogTitle>
        <DialogContent dividers>
          <TextField
            required
            fullWidth
            variant="outlined"
            margin="dense"
            label="Task Name"
            value={task.title}
            onChange={(e) =>
              setTask(
                produce((draft) => {
                  draft.title = e.target.value;
                })
              )
            }
            placeholder="Take coffee break"
          />
          <TextField
            fullWidth
            variant="outlined"
            label="설명"
            margin="dense"
            multiline
            value={task.description}
            onChange={(e) =>
              setTask(
                produce((draft) => {
                  draft.description = e.target.value;
                })
              )
            }
            name="description"
            rows={4}
          />
          <List
            sx={{}}
            subheader={
              <ListSubheader sx={{ p: 0, fontSize: "1.0rem" }}>
                Subtasks
              </ListSubheader>
            }
          >
            {task.subtasks.map((subtask, idx) => (
              <ListItem
                key={idx}
                sx={{ px: 0, display: "flex", alignItems: "center", gap: 1 }}
              >
                <TextField
                  size="small"
                  value={subtask.title}
                  fullWidth
                  label="Subtask"
                  onChange={(e) =>
                    setTask(
                      produce((draft) => {
                        draft.subtasks[idx].title = e.target.value;
                      })
                    )
                  }
                />
                <IconButton
                  onClick={() => {
                    setTask(
                      produce((draft) => {
                        draft.subtasks.splice(idx, 1);
                      })
                    );
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </ListItem>
            ))}
            <ListItem sx={{ px: 0 }}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() =>
                  setTask(
                    produce((draft) => {
                      draft.subtasks.push({ title: "", isCompleted: false });
                    })
                  )
                }
              >
                Add New Subtask
              </Button>
            </ListItem>
          </List>
          {board.columns.length > 0 && (
            <Select
              fullWidth
              value={task.status}
              onChange={(e) =>
                setTask(
                  produce((draft) => {
                    draft.status = e.target.value;
                  })
                )
              }
            >
              {board.columns.map((column, idx) => (
                <MenuItem key={idx} value={column.name}>
                  {column.name}
                </MenuItem>
              ))}
            </Select>
          )}
        </DialogContent>
        <DialogActions>
          <CancelButton close={() => setOpen(false)} />
          <Button
            variant="contained"
            startIcon={<CheckIcon />}
            onClick={() => {
              handleConfirm();
              setOpen(false);
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
