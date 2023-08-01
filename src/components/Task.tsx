import { Box, Paper, Typography } from "@mui/material";
import DetailTask from "./Modals/tasks/DetailTask";
import { useState } from "react";

interface Props {
  colId: number;
  id: number;
  task: Task;
}

export default function Task({ colId, id, task }: Props) {
  const numOfCompleted = task.subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;

  const [open, setOpen] = useState(false);
  const dialogOpen = () => setOpen(true);
  const dialogClose = () => setOpen(false);

  return (
    <Box>
      <Paper
        sx={{ p: 2, cursor: "pointer" }}
        elevation={3}
        onClick={dialogOpen}
      >
        <Typography variant="subtitle1">{task.title}</Typography>
        <Typography variant="caption">{`${numOfCompleted} of ${task.subtasks.length} subtasks`}</Typography>
      </Paper>
      <DetailTask
        open={open}
        close={dialogClose}
        colId={colId}
        id={id}
        task={task}
      />
    </Box>
  );
}
