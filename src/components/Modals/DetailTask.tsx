import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {
  IconButton,
  DialogContentText,
  Typography,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  DialogActions,
  Button,
  Menu,
  Box,
} from "@mui/material";
import MoreIcon from "@icons/MoreIcon";
import { useState } from "react";
import useBoardStore from "@hooks/useBoards";

function MoreMenu({
  open,
  anchor,
  onClose,
}: {
  open: boolean;
  anchor: HTMLElement | null;
  onClose: () => void;
}) {
  return (
    <Menu open={open} anchorEl={anchor} onClose={onClose}>
      <MenuItem>Edit Task</MenuItem>
      <MenuItem>Delete Task</MenuItem>
    </Menu>
  );
}

export default function DetailTask({
  open,
  task,
  onClose,
  colIdx,
  taskIdx,
}: {
  open: boolean;
  onClose: () => void;
  task: Task;
  colIdx: number;
  taskIdx: number;
}) {
  const [boards, changeColumn, changeSubTasks] = useBoardStore((state) => [
    state.boards,
    state.changeColumn,
    state.changeSubTasks,
  ]);
  const activeBoard = boards.find((board) => board.isActive) as Board;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const [subtasks, setSubtasks] = useState([...task.subtasks]);
  const [status, setStatus] = useState(task.status);

  const handleClick = () => {
    const nextColIdx = activeBoard.columns.findIndex(
      (column) => column.name === status
    );

    changeSubTasks(colIdx, taskIdx, subtasks);
    changeColumn(colIdx, nextColIdx, taskIdx);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography sx={{ flex: 1, fontSize: (t) => t.typography.h5 }}>
          {task.title}
        </Typography>
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <MoreIcon />
        </IconButton>
        <MoreMenu
          open={menuOpen}
          anchor={anchorEl}
          onClose={() => {
            setAnchorEl(null);
          }}
        />
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText>{task.description}</DialogContentText>
        <FormControl sx={{ my: 2, width: "100%" }}>
          <FormLabel>Subtasks</FormLabel>
          <FormGroup>
            {subtasks.map((subtask, idx) => (
              <FormControlLabel
                key={idx}
                sx={{ margin: 0, marginBottom: 1, bgcolor: "lightblue" }}
                control={
                  <Checkbox
                    checked={subtask.isCompleted}
                    onChange={(e) => {
                      setSubtasks(
                        subtasks.map((subtask, i) =>
                          i === idx
                            ? {
                                title: subtask.title,
                                isCompleted: e.target.checked,
                              }
                            : subtask
                        )
                      );
                    }}
                  />
                }
                label={subtask.title}
              />
            ))}
          </FormGroup>
        </FormControl>
        {activeBoard.columns.length > 0 && (
          <FormControl fullWidth margin="dense">
            <InputLabel>Current Status</InputLabel>
            <Select
              label="Current Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              name="status"
            >
              {activeBoard.columns.map((column, idx) => (
                <MenuItem key={idx} value={column.name}>
                  {column.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose}>
          cancel
        </Button>
        <Button variant="contained" onClick={handleClick}>
          save change
        </Button>
      </DialogActions>
    </Dialog>
  );
}
