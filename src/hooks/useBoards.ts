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

  // column actions
  addColumn: (column: Column) => void;
  editColumn: (columnId: number, column: Column) => void;

  // task actions
  addTask: (columnId: number, task: Task) => void;
  editTask: (columnId: number, taskId: number, task: Task) => void;
  deleteTask: (columnId: number, taskId: number) => void;
  moveStatus: (columnId: number, nextColumnId: number, taskId: number) => void;
};

const initialState = {
  boards: data.boards,
};

const useBoardStore = create(
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

    addColumn: (column) =>
      set((state) => {
        const activeBoard = state.boards.find((board) => board.isActive);

        if (!activeBoard) {
          return new Error("No Active Board");
        }

        activeBoard.columns.push(column);
      }),

    editColumn: (columnId, column) =>
      set((state) => {
        const activeBoard = state.boards.find((board) => board.isActive);

        if (!activeBoard) {
          return new Error("No Active Board");
        }

        const currentColumn = activeBoard.columns[columnId];

        const { name, tasks } = column;

        currentColumn.name = name;
        currentColumn.tasks = tasks;
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

    moveStatus: (prevColIdx, colIdx, taskIdx) =>
      set((state) => {
        const activeBoard = state.boards.find((board) => board.isActive);

        if (!activeBoard) {
          return new Error("No Active Board");
        }

        const prevColumn = activeBoard.columns[prevColIdx];
        const column = activeBoard.columns[colIdx];
        const task = prevColumn.tasks[taskIdx];

        column.tasks.push(task);
        prevColumn.tasks.splice(taskIdx, 1);
      }),
  }))
);

export default useBoardStore;
