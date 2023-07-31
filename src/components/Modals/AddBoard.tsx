import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { produce } from "immer";
import useBoardStore from "@hooks/useBoards";

const defaultBoard = {
  name: "",
  isActive: false,
  columns: [
    { name: "", tasks: [] },
    { name: "", tasks: [] },
  ],
};

export default function AddBoard() {
  const [open, setOpen] = useState(false);
  const [board, setBoard] = useState<Board>(defaultBoard);
  const addBoard = useBoardStore((state) => state.addBoard);

  useEffect(() => {
    if (open) {
      setBoard(defaultBoard);
    }
  }, [open]);

  return (
    <>
      <ListItem>
        <ListItemButton
          sx={{ borderTopRightRadius: "20px", borderBottomRightRadius: "20px" }}
          onClick={() => setOpen(true)}
        >
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography fontWeight="bold" noWrap>
                Create New Board
              </Typography>
            }
          />
        </ListItemButton>
      </ListItem>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle align="center">Add New Board</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ marginBlock: 2 }}
            required
            fullWidth
            variant="outlined"
            label="Board Name"
            placeholder="Web Design"
            value={board.name}
            onChange={(e) =>
              setBoard(
                produce((draft) => {
                  draft.name = e.target.value;
                })
              )
            }
          />
          <Stack
            spacing={1}
            sx={{
              width: "400px",
            }}
          >
            {board.columns.map((column, idx) => (
              <Paper
                key={idx}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
                elevation={0}
              >
                <TextField
                  size="small"
                  value={column.name}
                  fullWidth
                  label="Column"
                  onChange={(e) =>
                    setBoard(
                      produce((draft) => {
                        draft.columns[idx].name = e.target.value;
                      })
                    )
                  }
                />
                <IconButton
                  onClick={() => {
                    setBoard(
                      produce((draft) => {
                        draft.columns.splice(idx, 1);
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
                setBoard(
                  produce((draft) => {
                    draft.columns.push({ name: "", tasks: [] });
                  })
                )
              }
            >
              Add New Column
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              addBoard(board);
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
