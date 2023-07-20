import ShowIcon from "@icons/ShowIcon";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

export default function FabButton({
  open,
  handleClick,
}: {
  open: boolean;
  handleClick: () => void;
}) {
  return (
    <Zoom in={!open}>
      <Fab
        sx={{
          position: "absolute",
          left: 0,
          bottom: 0,
          margin: (t) => t.spacing(2),
        }}
        color="primary"
        onClick={handleClick}
      >
        <ShowIcon />
      </Fab>
    </Zoom>
  );
}
