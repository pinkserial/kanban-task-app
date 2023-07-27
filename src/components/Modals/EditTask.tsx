import useBoardStore from "@hooks/useBoards";
import CloseIcon from "@icons/CloseIcon";
import PlusIcon from "@icons/PlusIcon";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function EditTask({
  open,
  task,
  onClose,
}: {
  open: boolean;
  task: Task;
  onClose: () => void;
}) {
  const boards = useBoardStore((state) => state.boards);
  const activeBoard = boards.find((board) => board.isActive) as Board;
  const editTask = useBoardStore((state) => state.editTask);

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [subtitles, setSubTitles] = useState<string[]>(
    task.subtasks.map((subtask) => subtask.title)
  );
  const [status, setStatus] = useState(task.status);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <TextField
          required
          fullWidth
          variant="outlined"
          margin="dense"
          label="Task Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Take coffee break"
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="dense"
          label="Description"
          multiline
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
        <SubTasks subTitles={subtitles} setSubTitles={setSubTitles} />
        {activeBoard.columns.length > 0 && (
          <SelectStatus
            status={status}
            setStatus={setStatus}
            columns={activeBoard.columns}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function SubTasks({
  subTitles,
  setSubTitles,
}: {
  subTitles: string[];
  setSubTitles: (v: string[]) => void;
}) {
  const handleChange = (v: string, idx: number) => {
    setSubTitles(subTitles.map((t, i) => (i === idx ? v : t)));
  };

  const handleClose = (idx: number) => {
    setSubTitles(subTitles.filter((_, i) => idx !== i));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <List>
        {subTitles.map((title, idx) => (
          <SubTask
            key={idx}
            value={title}
            handleChange={(v) => handleChange(v, idx)}
            handleClose={() => handleClose(idx)}
          />
        ))}
      </List>
      <Button
        sx={{ gap: 1, marginBottom: 3 }}
        variant="contained"
        onClick={() => {
          setSubTitles([...subTitles, ""]);
        }}
      >
        <PlusIcon />
        <Typography variant="h6" textTransform="capitalize">
          add new subtask
        </Typography>
      </Button>
    </Box>
  );
}

function SubTask({
  value,
  handleClose,
  handleChange,
}: {
  value: string;
  handleClose: () => void;
  handleChange: (v: string) => void;
}) {
  return (
    <ListItem disableGutters>
      <TextField
        value={value}
        fullWidth
        label="Subtask"
        onChange={(e) => handleChange(e.target.value)}
      />
      <Button onClick={handleClose}>
        <CloseIcon />
      </Button>
    </ListItem>
  );
}

function SelectStatus({
  status,
  setStatus,
  columns,
}: {
  status: string;
  setStatus: (v: string) => void;
  columns: Column[];
}) {
  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };

  return (
    <FormControl fullWidth margin="dense">
      <InputLabel>Current Status</InputLabel>
      <Select
        label="Current Status"
        value={status}
        onChange={handleChange}
        name="status"
      >
        {columns.map((column, idx) => (
          <MenuItem key={idx} value={column.name}>
            {column.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
