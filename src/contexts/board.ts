import { createContext } from "react";

const BoardContext = createContext<Board | undefined>(undefined);

export default BoardContext;
