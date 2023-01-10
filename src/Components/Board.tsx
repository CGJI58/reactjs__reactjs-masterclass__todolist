import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, toDoState } from "../atoms";
import DraggableCard from "./DraggableCard";

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}
interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

const Wrapper = styled.div`
  width: 300px;
  height: 300px;
  padding: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const RemoveBoardBtn = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 0;
  align-self: flex-end;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  cursor: pointer;
`;

export const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
  input {
    font-size: 16px;
    border: 0;
    background-color: white;
    width: 80%;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    margin: 0 auto;
  }
`;

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  border-radius: 5px;
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
  overflow-y: scroll;
`;

function Board({ toDos, boardId }: IBoardProps) {
  const setBoards = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setBoards((Boards) => {
      return {
        ...Boards,
        [boardId]: [newToDo, ...Boards[boardId]],
      };
    });
    setValue("toDo", "");
  };
  const onClickRemoveBoardBtn = () => {
    setBoards((current) => {
      const result = {
        ...current,
      };
      delete result[boardId];
      return result;
    });
  };
  return (
    <Wrapper>
      <RemoveBoardBtn onClick={onClickRemoveBoardBtn}>❌</RemoveBoardBtn>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, info) => (
          <Area
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                toDoId={toDo.id}
                toDoText={toDo.text}
                index={index}
              />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
