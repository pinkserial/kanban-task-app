import { Box, Paper, Typography, Stack } from "@mui/material";

export default function ColumnStack({ column }: { column: Column }) {
  return (
    <Box
      sx={{
        margin: (t) => t.spacing(1),
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: "bold",
          letterSpacing: (t) => t.spacing(0.2),
        }}
        gutterBottom
      >
        {column.name} ({column.tasks.length})
      </Typography>
      <Stack spacing={2.5}>
        {column.tasks.map((task, idx) => (
          <Item key={idx} task={task} />
        ))}
      </Stack>
    </Box>
  );
}

function Item({ task }: { task: Task }) {
  const numOfCompleted = task.subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;

  return (
    <Paper sx={{ padding: (t) => t.spacing(2) }} elevation={3}>
      <Typography variant="subtitle1">{task.title}</Typography>
      <Typography variant="caption">{`${numOfCompleted} of ${task.subtasks.length} subtasks`}</Typography>
    </Paper>
  );
}
