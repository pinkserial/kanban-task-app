import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";

export default function CancelButton({ close }: { close: () => void }) {
  return (
    <Button variant="contained" startIcon={<CancelIcon />} onClick={close}>
      Cancel
    </Button>
  );
}
