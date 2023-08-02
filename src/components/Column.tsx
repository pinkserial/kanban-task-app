import { Typography, Stack, SxProps, Theme } from "@mui/material";
import Task from "./Task";
import { Droppable } from "@hello-pangea/dnd";

const style: SxProps<Theme> = {
  fontWeight: "bold",
  letterSpacing: (t) => t.spacing(0.2),
};

interface Props {
  index: number;
  column: Column;
}

export default function Column({ index: colIndex, column }: Props) {
  return (
    <Droppable droppableId={`${colIndex}`}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{ height: "100%" }}
        >
          <Typography variant="subtitle1" sx={style} gutterBottom>
            {column.name} ({column.tasks.length})
          </Typography>
          <Stack spacing={2.5}>
            {column.tasks.map((task, index) => (
              <Task key={index} colIndex={colIndex} index={index} task={task} />
            ))}
          </Stack>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
