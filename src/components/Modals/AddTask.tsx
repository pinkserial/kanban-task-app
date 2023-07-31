import useBoardStore from "@hooks/useBoards";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import {
  DialogActions,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { produce } from "immer";
import useBoard from "@hooks/useBoard";

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
      <Button variant="contained" startIcon={<AddIcon />}>
        Add New Task
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle align="center">Add New Task</DialogTitle>
        <DialogContent>
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
            margin="dense"
            label="Description"
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
          <Stack>
            {task.subtasks.map((subtask, idx) => (
              <Paper
                key={idx}
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
                elevation={0}
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
              </Paper>
            ))}
            <Button
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
          </Stack>
          {board.columns.length > 0 && (
            <Select
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
          <Button variant="contained" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
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
