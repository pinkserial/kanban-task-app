import { Box, Paper, Typography } from "@mui/material";
import DetailTask from "./Modals/tasks/DetailTask";
import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";

interface Props {
  colIndex: number;
  index: number;
  task: Task;
}

export default function Task({ colIndex, index, task }: Props) {
  const numOfCompleted = task.subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;

  const [open, setOpen] = useState(false);
  const dialogOpen = () => setOpen(true);
  const dialogClose = () => setOpen(false);

  return (
    <Box>
      <Draggable draggableId={`${colIndex}_${index}`} index={index}>
        {(provided, snapshot) => (
          <Paper
            ref={provided.innerRef}
            sx={{
              p: 2,
              bgcolor: snapshot.isDragging
                ? "lightgreen"
                : (t) => t.palette.background.paper,
              ...provided.draggableProps.style,
            }}
            elevation={3}
            onClick={dialogOpen}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            <Typography variant="subtitle1">{task.title}</Typography>
            <Typography variant="caption">{`${numOfCompleted} of ${task.subtasks.length} subtasks`}</Typography>
          </Paper>
        )}
      </Draggable>
      <DetailTask
        open={open}
        close={dialogClose}
        colIndex={colIndex}
        index={index}
        task={task}
      />
    </Box>
  );
}
