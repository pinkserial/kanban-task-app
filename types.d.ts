interface SubTask {
  title: string;
  completed: boolean;
}

interface Task {
  name: string;
  desc: string;
  subtasks: SubTask[];
  // status: string;
}

interface Column {
  title: string;
  tasks: Task[];
}

interface Board {
  id: number;
  name: string;
  columns: Column[];
}

interface BoardState {
  currentBoard: number;
  boards: Board[];
  create: (b: Board) => void;
  edit: (b: Board) => void;
  delete: (id: number) => void;
}
