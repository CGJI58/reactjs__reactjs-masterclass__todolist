import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100px;
  height: 100px;
  background-color: white;
  border-radius: 5px;
`;

function TrashBin() {
  return (
    <Wrapper>
      {/* <Droppable droppableId="trashBin">
        {(magic) => console.log(magic)}
      </Droppable> */}
    </Wrapper>
  );
}

export default TrashBin;
