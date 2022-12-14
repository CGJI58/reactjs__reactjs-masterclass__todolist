import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

function ToDo({ text, category }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (newCategory: IToDo["category"]) => {
    console.log("Category is changed to: ", newCategory);
  };
  return (
    <li>
      <span>{text}</span>
      {category !== "DOING" && (
        <button onClick={() => onClick("DOING")}>Doing</button>
      )}
      {category !== "TO_DO" && (
        <button onClick={() => onClick("TO_DO")}>To Do</button>
      )}
      {category !== "DONE" && (
        <button onClick={() => onClick("DONE")}>Done</button>
      )}
    </li>
  );
}

export default ToDo;
