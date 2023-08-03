import useBoardStore from "@hooks/useBoards";

import { useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import useBoard from "@hooks/useBoard";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { produce } from "immer";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import CancelButton from "@components/Buttons/Cancel";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  task: Task;
  colIndex: number;
  index: number;
}

export default function EditTask({
  isOpen,
  onClose,
  onConfirm,
  task,
  colIndex,
  index,
}: Props) {
  const board = useBoard() as Board;
  const editTask = useBoardStore((state) => state.editTask);
  const [editedTask, setEditedTask] = useState(task);

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <TextField
          required
          fullWidth
          variant="outlined"
          margin="dense"
          label="Task Name"
          value={editedTask.title}
          onChange={(e) =>
            setEditedTask(
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
          value={editedTask.description}
          onChange={(e) =>
            setEditedTask(
              produce((draft) => {
                draft.description = e.target.value;
              })
            )
          }
          rows={4}
        />
        <Stack>
          {editedTask.subtasks.map((subtask, idx) => (
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
                  setEditedTask(
                    produce((draft) => {
                      draft.subtasks[idx].title = e.target.value;
                      draft.subtasks[idx].isCompleted = false;
                    })
                  )
                }
              />
              <IconButton
                onClick={() => {
                  setEditedTask(
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
              setEditedTask(
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
          <FormControl fullWidth margin="dense">
            <InputLabel>Current Status</InputLabel>
            <Select
              label="Current Status"
              value={editedTask.status}
              onChange={(e) => {
                setEditedTask(
                  produce((draft) => {
                    draft.status = e.target.value;
                  })
                );
              }}
            >
              {board.columns.map((column, idx) => (
                <MenuItem key={idx} value={column.name}>
                  {column.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </DialogContent>
      <DialogActions>
        <CancelButton close={onClose} />
        <Button
          variant="contained"
          onClick={() => {
            editTask(colIndex, index, editedTask);
            onClose();
            onConfirm();
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
