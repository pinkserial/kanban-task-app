import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import { SxProps, Theme } from "@mui/material";

const boxStyle: SxProps<Theme> = {
  height: "100vh",
  display: "grid",
  placeItems: "center",
};

const textStyle: SxProps<Theme> = {
  fontSize: "1.5rem",
  color: "grey",
  fontWeight: "bold",
};

const buttonStyle: SxProps<Theme> = {
  margin: "10px",
  borderRadius: (theme) => theme.shape.borderRadius,
};

export default function NoBoard() {
  return (
    <Box sx={boxStyle}>
      <div style={{ textAlign: "center" }}>
        <Typography sx={textStyle} gutterBottom>
          There are no boards available.
        </Typography>
        <Typography sx={textStyle} gutterBottom>
          Create a new board to get started.
        </Typography>
        <Button sx={buttonStyle} variant="contained" startIcon={<AddIcon />}>
          add new board
        </Button>
      </div>
    </Box>
  );
}
