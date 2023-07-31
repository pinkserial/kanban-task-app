import { useContext } from "react";
import BoardContext from "@contexts/board";

export default function useBoard() {
  return useContext(BoardContext);
}
