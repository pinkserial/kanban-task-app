import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

import { useEffect, useState } from "react";

import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";
import useBoard from "@hooks/useBoard";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SaveIcon from "@mui/icons-material/Save";
import DialogContentText from "@mui/material/DialogContentText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { produce } from "immer";
import CancelButton from "@components/Buttons/Cancel";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import useBoardsStore from "@hooks/useBoards";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  open: boolean;
  close: () => void;
  colIndex: number;
  index: number;
  task: Task;
}

export default function DetailTask({
  open,
  close,
  colIndex,
  index,
  task,
}: Props) {
  const board = useBoard() as Board;

  const editTask = useBoardsStore((state) => state.editTask);
  const [subtasks, setSubtasks] = useState(task.subtasks);
  const [status, setStatus] = useState(task.status);

  useEffect(() => {
    setSubtasks(task.subtasks);
    setStatus(task.status);
  }, [task]);

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography sx={{ flex: 1, fontSize: "1.5rem" }}>
          {task.title}
        </Typography>
        <MoreMenu task={task} close={close} colIndex={colIndex} index={index} />
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText>{task.description}</DialogContentText>
        <FormControl sx={{ my: 2, width: "100%" }} component="fieldset">
          <FormLabel>Subtasks</FormLabel>
          <FormGroup>
            {subtasks.map((subtask, idx) => (
              <SubTaskCheckbox
                key={idx}
                subtask={subtask}
                onChange={(v) => {
                  setSubtasks(
                    produce((draft) => {
                      draft[idx].isCompleted = v;
                    })
                  );
                }}
              />
            ))}
          </FormGroup>
        </FormControl>
        {board.columns.length > 0 && (
          <FormControl fullWidth margin="dense">
            <InputLabel>Current Status</InputLabel>
            <Select
              label="Current Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
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
        <CancelButton close={close} />
        <SaveButton
          onChange={() => {
            editTask(colIndex, index, { ...task, subtasks, status });
            close();
          }}
        />
      </DialogActions>
    </Dialog>
  );
}

function MoreMenu({
  task,
  close,
  colIndex,
  index,
}: {
  task: Task;
  close: () => void;
  colIndex: number;
  index: number;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        open={menuOpen}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            setIsEditOpen(true);
            setAnchorEl(null);
          }}
        >
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText>Edit Task</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setIsDeleteOpen(true);
            setAnchorEl(null);
          }}
        >
          <ListItemIcon>
            <DeleteIcon color="warning" />
          </ListItemIcon>
          <ListItemText
            primary={<Typography color="warning.main">Delete Board</Typography>}
          />
        </MenuItem>
      </Menu>
      <EditTask
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onConfirm={close}
        task={task}
        colIndex={colIndex}
        index={index}
      />
      <DeleteTask
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={close}
        title={task.title}
        colIndex={colIndex}
        index={index}
      />
    </>
  );
}

function SubTaskCheckbox({
  subtask,
  onChange,
}: {
  subtask: SubTask;
  onChange: (v: boolean) => void;
}) {
  const checkbox = (
    <Checkbox
      checked={subtask.isCompleted}
      onChange={(e) => onChange(e.target.checked)}
    />
  );
  return <FormControlLabel label={subtask.title} control={checkbox} />;
}

function SaveButton({ onChange }: { onChange: () => void }) {
  return (
    <Button variant="contained" startIcon={<SaveIcon />} onClick={onChange}>
      Save Change
    </Button>
  );
}
