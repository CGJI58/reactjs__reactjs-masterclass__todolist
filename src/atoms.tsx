import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

const { persistAtom } = recoilPersist({
  key: "toDosLocal",
  storage: localStorage,
});

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos?.filter((toDo) => toDo.category === category);
  },
});

export const minutesState = atom({
  key: "minute",
  default: 0,
});

export const hourSelector = selector({
  key: "hours",
  get: ({ get }) => {
    const minutes = get(minutesState);
    return minutes / 60;
  },
  set: ({ set }, newHour) => {
    const minutes = Number(newHour) * 60;
    set(minutesState, minutes);
  },
});
