import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState, IToDoState, IToDo } from "./atoms";
import Board from "./Components/Board";
import TrashBin from "./Components/TrashBin";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-width: 1000px;
  margin: 0 auto;
  justify-content: space-around;
  align-items: center;
  min-height: 100vh;
  padding: 5px;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(auto, 1fr);
  justify-content: center;
  align-items: center;
  gap: 10px;
  place-items: center;
`;

interface IForm {
  category: string;
}

const Form = styled.form`
  display: flex;
  width: 100%;
  * {
    border-radius: 5px;
    margin-right: 5px;
  }
  input {
    padding: 10px 10px;
  }
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ category }: IForm) => {
    setToDos((Boards) => ({ ...Boards, [category]: [] }));
    setValue("category", "");
  };
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination) return;
    if (destination.droppableId === "trashBin") {
      console.log(info);
      setToDos((Boards) => {
        const copiedBoard = [...Boards[source.droppableId]];
        copiedBoard.splice(source.index, 1);
        return {
          ...Boards,
          [source.droppableId]: copiedBoard,
        };
      });
      return;
    }
    if (destination.droppableId === source.droppableId) {
      setToDos((Boards) => {
        const copiedBoard = [...Boards[source.droppableId]];
        const taskObj = copiedBoard[source.index];
        copiedBoard.splice(source.index, 1);
        copiedBoard.splice(destination.index, 0, taskObj);
        return {
          ...Boards,
          [source.droppableId]: copiedBoard,
        };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      setToDos((Boards) => {
        const sourceBoard = [...Boards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...Boards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, taskObj);
        return {
          ...Boards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
    console.log(info);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Form onSubmit={handleSubmit(onValid)}>
            <input
              {...register("category", { required: true })}
              type="text"
              placeholder="New Category"
            />
          </Form>
          <Boards>
            {Object.keys(toDos).map((boardId) => (
              <Board toDos={toDos[boardId]} boardId={boardId} key={boardId} />
            ))}
            <TrashBin />
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
