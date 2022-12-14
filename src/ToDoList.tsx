import { useForm } from "react-hook-form";

interface IForm {
  toDo: string;
}

function ToDoList() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = (data: IForm) => {
    console.log("One todo is added:", data.toDo);
    setValue("toDo", "");
  };
  return (
    <>
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("toDo", { required: "Please write a ToDo." })}
          placeholder="Write a ToDo"
        />
        <button>Add</button>
      </form>
    </>
  );
}

export default ToDoList;
