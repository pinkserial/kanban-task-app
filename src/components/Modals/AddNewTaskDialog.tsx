import useBoardStore from "@hooks/useBoards";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@icons/CloseIcon";
import Divider from "@mui/material/Divider";
import {
  DialogActions,
  FormControl,
  FormGroup,
  FormLabel,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useState } from "react";
import PlusIcon from "@icons/PlusIcon";

function SubTasks() {
  const [titles, setTitles] = useState(["", ""]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <List>
        {titles.map((title, idx) => (
          <SubTask
            key={idx}
            value={title}
            name={`subtask_${idx}`}
            handleChange={(v) => {
              setTitles(titles.map((t, i) => (i === idx ? v : t)));
            }}
            handleClose={() => {
              setTitles(titles.filter((_, i) => idx !== i));
            }}
          />
        ))}
      </List>
      <Button
        sx={{ gap: 1, marginBottom: 3 }}
        variant="contained"
        onClick={() => {
          setTitles([...titles, ""]);
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
  name,
  handleClose,
  handleChange,
}: {
  value: string;
  name: string;
  handleClose: () => void;
  handleChange: (v: string) => void;
}) {
  return (
    <ListItem disableGutters>
      <TextField
        value={value}
        fullWidth
        label="Subtask"
        name={name}
        onChange={(e) => handleChange(e.target.value)}
      />
      <Button onClick={handleClose}>
        <CloseIcon />
      </Button>
    </ListItem>
  );
}

function SelectStatus({
  initStatus,
  columns,
}: {
  initStatus: string;
  columns: Column[];
}) {
  const [status, setStatus] = useState(initStatus);

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

export default function AddNewTaskDialog({
  open,
  board,
  onClose,
}: {
  open: boolean;
  board: Board;
  onClose: () => void;
}) {
  const addTask = useBoardStore((state) => state.addTask);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const { title, description, status, ...rest } = Object.fromEntries(
      formData.entries()
    );

    const subtasks: SubTask[] = [];

    for (const title in rest) {
      subtasks.push({ title, isCompleted: false });
    }

    addTask({
      title: title as string,
      description: description as string,
      status: status as string,
      subtasks: subtasks,
    });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogTitle align="center">Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            required
            fullWidth
            variant="outlined"
            margin="dense"
            label="Task Name"
            name="title"
            placeholder="Take coffee break"
          />
          <TextField
            fullWidth
            variant="outlined"
            margin="dense"
            label="Description"
            multiline
            name="description"
            rows={4}
          />
          <SubTasks />
          {board.columns.length > 0 && (
            <SelectStatus
              initStatus={board.columns[0].name}
              columns={board.columns}
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
      </Box>
    </Dialog>
  );
}
