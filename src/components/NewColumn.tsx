import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import EditBoard from "./Modals/boards/EditBoard";

const style = {
  display: "grid",
  placeItems: "center",
  height: "100%",
};

export default function NewColumn() {
  const [open, setOpen] = useState(false);

  return (
    <Paper sx={style} elevation={3}>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
      >
        New Column
      </Button>
      <EditBoard isOpen={open} close={() => setOpen(false)} />
    </Paper>
  );
}
