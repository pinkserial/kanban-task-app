import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import data from "@assets/data.json";

type State = {
  boards: Board[];
};

type Actions = {
  // board actions
  setActive: (idx: number) => void;
  addBoard: (board: Board) => void;
  editBoard: (name: string, columns: Column[]) => void;
  deleteBoard: () => void;

  // task actions
  addTask: (task: Task) => void;
  // editTask: (idx: number, newTask: Task) => void;
  // deleteTask: (idx: number) => void;
};

const initialState = {
  boards: data.boards,
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

    // editTask: (idx, newTask) => set((state) => {}),

    // deleteTask: (idx) => set((state) => {}),
  }))
);

export default useBoardStore;
