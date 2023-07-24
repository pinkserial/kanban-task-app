import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PlusIcon from "@icons/PlusIcon";
import Box from "@mui/material/Box";

export default function NoBoard() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div>
        <Typography
          variant="h5"
          align="center"
          color="grey"
          fontWeight="bold"
          paragraph
          gutterBottom
        >
          There are no boards available. <br />
          Create a new board to get started.
        </Typography>

        <Button
          variant="contained"
          sx={{
            display: "flex",
            gap: (t) => t.spacing(1),
            mx: "auto",
            padding: "15px 18px",
            borderRadius: (t) => t.shape.borderRadius,
          }}
        >
          <PlusIcon />
          <Typography
            variant="h6"
            fontWeight="bold"
            color="white"
            textTransform="capitalize"
          >
            add new board
          </Typography>
        </Button>
      </div>
    </Box>
  );
}
