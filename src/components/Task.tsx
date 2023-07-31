import { Box, Paper, Typography } from "@mui/material";
import DetailTask from "./Modals/DetailTask";
import { useState } from "react";

export default function Item({ task }: { task: Task }) {
  const numOfCompleted = task.subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;

  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Paper
        sx={{ p: 2, cursor: "pointer" }}
        elevation={3}
        onClick={() => setOpen(true)}
      >
        <Typography variant="subtitle1">{task.title}</Typography>
        <Typography variant="caption">{`${numOfCompleted} of ${task.subtasks.length} subtasks`}</Typography>
      </Paper>
      <DetailTask open={open} close={() => setOpen(false)} task={task} />
    </Box>
  );
}
