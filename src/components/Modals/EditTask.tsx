import useBoardStore from "@hooks/useBoards";
import Box from "@mui/material/Box";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
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

interface Props {
  task: Task;
  close: () => void;
}

export default function EditTask({ task, close }: Props) {
  const board = useBoard() as Board;
  const [open, setOpen] = useState(false);
  const editTask = useBoardStore((state) => state.editTask);

  return (
    <>
      <Box>
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        <ListItemText>Edit Task</ListItemText>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
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
          {board.columns.length > 0 && (
            <FormControl fullWidth margin="dense">
              <InputLabel>Current Status</InputLabel>
              <Select
                label="Current Status"
                value={status}
                onChange={handleChange}
                name="status"
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
          <Button variant="contained" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              const subtasks = subtitles.map((t) => ({
                title: t,
                isCompleted: false,
              }));
              onEdit({ title, description, subtasks, status });
              close();
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function SubTaskList({
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
      <Button onClick={handleClose}></Button>
    </ListItem>
  );
}
