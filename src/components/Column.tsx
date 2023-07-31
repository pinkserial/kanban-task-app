import { Box, Typography, Stack, SxProps, Theme } from "@mui/material";
import Task from "./Task";

const style: SxProps<Theme> = {
  fontWeight: "bold",
  letterSpacing: (t) => t.spacing(0.2),
};

export default function Column({
  idx,
  column,
}: {
  idx: number;
  column: Column;
}) {
  return (
    <Box sx={{ m: 1 }}>
      <Typography variant="subtitle1" sx={style} gutterBottom>
        {column.name} ({column.tasks.length})
      </Typography>
      <Stack spacing={2.5}>
        {column.tasks.map((task) => (
          <Task key={idx} task={task} />
        ))}
      </Stack>
    </Box>
  );
}
