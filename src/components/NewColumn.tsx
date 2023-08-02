import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";

const style = {
  display: "grid",
  placeItems: "center",
  height: "100%",
};

export default function NewColumn() {
  return (
    <Paper sx={style} elevation={3}>
      <Button variant="contained" startIcon={<AddIcon />}>
        New Column
      </Button>
    </Paper>
  );
}
