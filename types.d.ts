interface Board {
  name: string;
  isActive: boolean;
  columns: Column[];
}

interface Column {
  name: string;
  tasks: Task[];
}

interface Task {
  title: string;
  description?: string;
  status: string;
  subtasks: SubTask[];
}

interface SubTask {
  title: string;
  isCompleted: boolean;
}
