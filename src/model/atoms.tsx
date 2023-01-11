import { atom } from "recoil";
import { loadTodos } from "./localstorage";

export interface IToDo {
  id: number;
  text: string;
}

export interface IToDoState {
  [key: string]: IToDo[];
}

export const defaultTodos: IToDoState = {
  "To Do": [],
  doing: [],
  done: [],
};

export const toDoState = atom<IToDoState>({
  key: "todostate",
  default: loadTodos() ?? defaultTodos,
});
