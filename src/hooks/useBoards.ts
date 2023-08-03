import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import data from "@assets/data.json";

type State = {
  boards: Board[];
};

type Actions = {
  // board actions
  setActive: (boardId: number) => void;
  addBoard: (board: Board) => void;
  editBoard: (board: Board) => void;
  deleteBoard: () => void;

  // task actions
  addTask: (columnId: number, task: Task) => void;
  editTask: (columnId: number, taskId: number, task: Task) => void;
  deleteTask: (columnId: number, taskId: number) => void;

  // dnd actions
  reorder: (columnIndex: number, startIndex: number, endIndex: number) => void;
  move: (
    srcColumnIndex: number,
    destColumnIndex: number,
    srcTaskIndex: number,
    destTaskIndex: number
  ) => void;
};

const initialState = {
  boards: data.boards,
};

const useBoardsStore = create(
  immer<State & Actions>((set) => ({
    ...initialState,

    setActive: (id) =>
      set((state) => {
        const boards = state.boards;
        if (!boards[id]) {
          return new Error("No board");
        }
        boards.forEach((b) => (b.isActive = false));
        boards[id].isActive = true;
      }),

    addBoard: (board) =>
      set((state) => {
        state.boards.push(board);
      }),

    editBoard: (board) =>
      set((state) => {
        const activeBoard = state.boards.find((board) => board.isActive);

        if (!activeBoard) {
          return new Error("No Active Board");
        }

        const { name, columns } = board;

        activeBoard.name = name;
        activeBoard.columns = columns;
      }),

    deleteBoard: () =>
      set((state) => {
        state.boards = state.boards.filter((board) => !board.isActive);
      }),

    addTask: (columnId, task) =>
      set((state) => {
        const activeBoard = state.boards.find((board) => board.isActive);

        if (!activeBoard) {
          return new Error("No Active Board");
        }

        const column = activeBoard.columns[columnId];
        column.tasks.push(task);
      }),

    editTask: (columnId, taskId, task) =>
      set((state) => {
        const activeBoard = state.boards.find((board) => board.isActive);

        if (!activeBoard) {
          return new Error("No Active Board");
        }

        const column = activeBoard.columns[columnId];
        const currentTask = column.tasks[taskId];

        const { title, status, subtasks, description } = task;

        if (status !== currentTask.status) {
          currentTask.status = status;

          // delete the task from current column.
          column.tasks.splice(taskId, 1);

          // push the task to next column.
          const nextColumn = activeBoard.columns.find(
            (column) => column.name === status
          );

          if (!nextColumn) {
            return new Error("no column");
          }

          nextColumn.tasks.push(task);
          return;
        }

        currentTask.title = title;
        currentTask.description = description;
        currentTask.subtasks = subtasks;
      }),

    deleteTask: (columnId, taskId) =>
      set((state) => {
        const activeBoard = state.boards.find((board) => board.isActive);

        if (!activeBoard) {
          return new Error("No Active Board");
        }

        const column = activeBoard.columns[columnId];

        column.tasks = column.tasks.filter((_, i) => i !== taskId);
      }),

    reorder: (columnIndex, startIndex, endIndex) =>
      set((state) => {
        const board = state.boards.find((board) => board.isActive);

        if (!board) {
          return new Error("No Active Board");
        }

        const column = board.columns[columnIndex];

        const [removed] = column.tasks.splice(startIndex, 1);
        column.tasks.splice(endIndex, 0, removed);
      }),

    move: (srcColumnIndex, destColumnIndex, srcTaskIndex, destTaskIndex) =>
      set((state) => {
        const board = state.boards.find((board) => board.isActive);

        if (!board) {
          return new Error("No Active Board");
        }

        const srcColumn = board.columns[srcColumnIndex];
        const destColumn = board.columns[destColumnIndex];

        const [removed] = srcColumn.tasks.splice(srcTaskIndex, 1);
        removed.status = destColumn.name;
        destColumn.tasks.splice(destTaskIndex, 0, removed);
      }),
  }))
);

export default useBoardsStore;
