import { create } from "zustand";

const defaultBoards: Board[] = [
  {
    id: 0,
    columns: [
      { title: "Todo", tasks: [] },
      { title: "Doing", tasks: [] },
      { title: "Done", tasks: [] },
    ],
    name: "Platform Launch",
  },
  {
    id: 1,
    columns: [
      { title: "Todo", tasks: [] },
      { title: "Doing", tasks: [] },
      { title: "Done", tasks: [] },
    ],
    name: "Marketing Plan",
  },
  {
    id: 2,
    columns: [
      { title: "Todo", tasks: [] },
      { title: "Doing", tasks: [] },
      { title: "Done", tasks: [] },
    ],
    name: "Roadmap",
  },
];

export const useBoardStore = create<BoardState>((set) => ({
  currentBoard: 0,
  boards: defaultBoards,
  create: (b: Board) => set((state) => ({ boards: [...state.boards, b] })),
  edit: (b: Board) =>
    set((state) => ({
      boards: state.boards.map((board) => (board.id === b.id ? b : board)),
    })),
  delete: (id: number) =>
    set((state) => ({
      boards: state.boards.filter((board) => board.id !== id),
    })),
}));
