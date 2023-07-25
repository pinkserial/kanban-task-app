import Typography from "@mui/material/Typography";
import MuiButton from "@mui/material/Button";
import styled from "@mui/material/styles/styled";
import PlusIcon from "@icons/PlusIcon";

const Button = styled(MuiButton)(({ theme }) => ({
  borderRadius: "24px",
  fontWeight: "bold",
  textTransform: "none",
  marginRight: theme.spacing(1),
  paddingInline: theme.spacing(2),
}));

export default function AddNewTaskButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="contained"
      sx={{
        gap: "5px",
        paddingBlock: (t) => t.spacing(1),
      }}
      onClick={onClick}
    >
      <PlusIcon fontSize="small" />
      <Typography fontWeight="bold" color="white" textTransform="capitalize">
        add new task
      </Typography>
    </Button>
  );
}
