import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Title } from "./Board";
interface ITrashBinAreaProps {
  isDraggingOver: boolean;
}

const Wrapper = styled.div`
  width: 300px;
  height: 300px;
  padding: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;

const TrashBinArea = styled.div<ITrashBinAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver ? "#dfe6e9" : props.theme.boardColor};
  transition: background-color 0.3s ease-in-out;
  width: 100%;
  height: 100%;
  padding: 20px;
  border-radius: 5px;
  font-size: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function TrashBin() {
  return (
    <Wrapper>
      <Title>Trash Bin</Title>
      <Droppable droppableId="trashBin">
        {(magic, info) => (
          <TrashBinArea
            isDraggingOver={info.isDraggingOver}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {magic.placeholder}
          </TrashBinArea>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default TrashBin;
