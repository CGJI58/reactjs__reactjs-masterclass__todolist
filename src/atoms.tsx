import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export const toDoState = atom({
  key: "toDo",
  default: ["a", "b", "c", "d", "e", "f"],
});
