import useBoard from "@hooks/useBoard";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import { produce } from "immer";
import Button from "@mui/material/Button";
import { DialogActions } from "@mui/material";
import CancelButton from "@components/Buttons/Cancel";
import useBoardsStore from "@hooks/useBoards";

interface Props {
  isOpen: boolean;
  close: () => void;
}

export default function EditBoard({ isOpen, close }: Props) {
  const board = useBoard() as Board;
  const editBoard = useBoardsStore((state) => state.editBoard);
  const [editedboard, setEditedboard] = useState<Board>({ ...board });

  useEffect(() => {
    setEditedboard({ ...board });
  }, [board]);

  return (
    <Dialog fullWidth open={isOpen} onClose={close}>
      <DialogTitle align="center">Edit board</DialogTitle>
      <DialogContent dividers>
        <Box marginBottom={2}>
          <Typography marginBottom={1} variant="subtitle2">
            Board Name
          </Typography>
          <TextField
            fullWidth
            size="small"
            value={editedboard.name}
            onChange={(e) => {
              setEditedboard(
                produce((draft) => {
                  draft.name = e.target.value;
                })
              );
            }}
          />
        </Box>
        <Box>
          <List
            subheader={
              <Typography variant="subtitle2">Board Columns</Typography>
            }
          >
            {editedboard.columns.map((column, index) => (
              <ListItem key={index} sx={{ px: 0 }}>
                <TextField
                  fullWidth
                  size="small"
                  value={column.name}
                  onChange={(e) => {
                    setEditedboard(
                      produce((draft) => {
                        draft.columns[index].name = e.target.value;
                      })
                    );
                  }}
                />
                <IconButton
                  onClick={() => {
                    setEditedboard(
                      produce((draft) => {
                        draft.columns.splice(index, 1);
                      })
                    );
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <Button
            fullWidth
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setEditedboard(
                produce((draft) => {
                  draft.columns.push({ name: "", tasks: [] });
                })
              );
            }}
          >
            Add New Column
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <CancelButton close={close} />
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={() => {
            editBoard(editedboard);
            close();
          }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
