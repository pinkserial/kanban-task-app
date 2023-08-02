import ShowIcon from "@icons/ShowIcon";
import MuiFab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

export default function Fab({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  return (
    <Zoom in={!open}>
      <MuiFab
        sx={{
          position: "fixed",
          left: 0,
          bottom: 0,
          margin: 2,
        }}
        color="primary"
        onClick={onClick}
      >
        <ShowIcon />
      </MuiFab>
    </Zoom>
  );
}
