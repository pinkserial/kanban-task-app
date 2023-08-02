import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

import { useState } from "react";

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

  const [subtasks, setSubtasks] = useState(task.subtasks);
  const [status, setStatus] = useState(task.status);

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
        <CancelButton close={close} />
        <SaveButton
          onChange={() => {
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
        <MenuItem>
          <EditTask
            task={task}
            close={close}
            colIndex={colIndex}
            index={index}
          />
        </MenuItem>
        <MenuItem>
          <DeleteTask
            title={task.title}
            colIndex={colIndex}
            index={index}
            close={close}
          />
        </MenuItem>
      </Menu>
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
