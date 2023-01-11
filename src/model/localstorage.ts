import { IToDoState } from "./atoms";

export const LOCAL_TODOS = "recoil_todos";

export const loadTodos = () => {
  const localTodos = localStorage.getItem(LOCAL_TODOS);
  if (!localTodos) return;
  return JSON.parse(localTodos);
};

export const saveTodos = (todos: IToDoState) => {
  localStorage.setItem(LOCAL_TODOS, JSON.stringify(todos));
};
