import { Box, Typography, Stack, SxProps, Theme } from "@mui/material";
import Task from "./Task";

const style: SxProps<Theme> = {
  fontWeight: "bold",
  letterSpacing: (t) => t.spacing(0.2),
};

export default function ColumnStack({
  colIdx,
  column,
}: {
  colIdx: number;
  column: Column;
}) {
  return (
    <Box
      sx={{
        margin: (t) => t.spacing(1),
      }}
    >
      <Typography variant="subtitle1" sx={style} gutterBottom>
        {column.name} ({column.tasks.length})
      </Typography>
      <Stack spacing={2.5}>
        {column.tasks.map((task, idx) => (
          <Task key={idx} colIdx={colIdx} taskIdx={idx} task={task} />
        ))}
      </Stack>
    </Box>
  );
}
