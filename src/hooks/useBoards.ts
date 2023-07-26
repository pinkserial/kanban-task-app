import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import data from "@assets/data.json";

type State = {
  boards: Board[];
  activeBoard: Board | null;
};

type Actions = {
  // board actions
  setActive: (idx: number) => void;
  addBoard: (board: Board) => void;
  editBoard: (name: string, columns: Column[]) => void;
  deleteBoard: () => void;

  // task actions
  addTask: (task: Task) => void;
  editTask: (columnIdx: number, taskIdx: number, newTask: Task) => void;
  // deleteTask: (idx: number) => void;

  changeSubTasks: (
    columnIdx: number,
    taskIdx: number,
    subtasks: SubTask[]
  ) => void;

  changeColumn: (prevColIdx: number, colIdx: number, taskIdx: number) => void;
};

const initialState = {
  boards: data.boards,
  activeBoard: null,
};

const useBoardStore = create(
  immer<State & Actions>((set) => ({
    ...initialState,

    setActive: (idx) =>
      set((state) => {
        state.boards.forEach((board) => (board.isActive = false));
        if (state.boards[idx]) {
          state.boards[idx].isActive = true;
        }
      }),

    addBoard: (board) =>
      set((state) => {
        state.boards.push(board);
      }),

    editBoard: (name, columns) =>
      set((state) => {
        const activeBoard = state.boards.find((board) => board.isActive);
        if (activeBoard) {
          activeBoard.name = name;
          activeBoard.columns = columns;
        }
      }),

    deleteBoard: () =>
      set((state) => {
        state.boards = state.boards.filter((board) => !board.isActive);
      }),

    addTask: (task) =>
      set((state) => {
        const activeBoard = state.boards.find((board) => board.isActive);
        const column = activeBoard?.columns.find(
          (column) => column.name === task.status
        );
        if (column) {
          column.tasks.push(task);
        }
      }),

    editTask: (columnIdx, taskIdx, newTask) =>
      set((state) => {
        const activeBoard = state.boards.find(
          (board) => board.isActive
        ) as Board;
        const column = activeBoard.columns[columnIdx];
        // todo
      }),

    // deleteTask: (idx) => set((state) => {}),

    changeSubTasks: (columnIdx, taskIdx, subtasks) =>
      set((state) => {
        const activeBoard = state.boards.find(
          (board) => board.isActive
        ) as Board;
        const column = activeBoard.columns[columnIdx];
        column.tasks[taskIdx].subtasks = subtasks;
      }),

    changeColumn: (prevColIdx, colIdx, taskIdx) =>
      set((state) => {
        const activeBoard = state.boards.find(
          (board) => board.isActive
        ) as Board;

        const prevColumn = activeBoard.columns[prevColIdx];
        const column = activeBoard.columns[colIdx];

        const task = prevColumn.tasks[taskIdx];

        column.tasks.push(task);
        prevColumn.tasks.splice(taskIdx, 1);
      }),
  }))
);

export default useBoardStore;
