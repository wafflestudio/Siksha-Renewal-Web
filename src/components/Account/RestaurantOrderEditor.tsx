import { DragDropContext, Draggable, DropResult, Droppable } from "@hello-pangea/dnd";
import { useRouter } from "next/router";
import styled from "styled-components";
import { RestaurantPreview } from "types";

interface RestaurantOrderEditorProps {
  order: RestaurantPreview[];
  reorder: (dragStartIndex: number, dragEndIndex: number) => void;
}

export default function RestaurantOrderEditor({ order, reorder }: RestaurantOrderEditorProps) {
  const router = useRouter();
  const isFavorite = router.pathname.includes("favorite");

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (source && destination && source !== destination) {
      reorder(source?.index, destination?.index);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <Title>{`${isFavorite ? "즐겨찾기 " : ""}식당 순서 변경`}</Title>
        <Description>우측 손잡이를 드래그하여 순서를 바꿔보세요.</Description>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <DragZone {...provided.droppableProps} ref={provided.innerRef}>
              {order.map(({ id, nameKr }, index) => (
                <Draggable key={id} draggableId={id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <DragContainer
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      dragging={snapshot.isDragging}
                    >
                      <DragBox>
                        <Restaurant>{nameKr}</Restaurant>
                        <DragButton dragging={snapshot.isDragging}>
                          <Line />
                          <Line />
                          <Line />
                        </DragButton>
                      </DragBox>
                    </DragContainer>
                  )}
                </Draggable>
              ))}
            </DragZone>
          )}
        </Droppable>
      </Container>
    </DragDropContext>
  );
}

const Container = styled.div`
  width: 544px;
  font-family: NanumSquare;
  padding-bottom: 12.68px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  background-color: #ffffff;

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    border: none;
    background: none;
  }
`;

const Title = styled.h2`
  margin-top: 24.57px;
  margin-left: 22.45px;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  color: #ff9522;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Description = styled.p`
  margin-top: 7.92px;
  margin-left: 22.49px;
  margin-bottom: 11.66px;
  font-weight: 400;
  font-size: 11px;
  line-height: 19px;
  color: #a6a6a6;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    width: 100%;
    height: 50px;
    margin: 0;
    background-color: #ffffff;
    z-index: 1;
  }
`;

const DragZone = styled.div`
  @media (max-width: 768px) {
    height: 100%;
    overflow: scroll;
  }
`;
const DragContainer = styled.div<{ dragging: boolean }>`
  &:hover {
    background-color: #f2f2f2;
  }
`;

const DragBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 499.04px;
  height: 49px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  margin: 7.92px 22.15px;

  @media (max-width: 768px) {
    width: calc(100% - 40px);
    margin: 7.92px 0px 0px 20px;
    background-color: white;
  }
`;

const Restaurant = styled.p`
  margin: 13px 0 13px 14.65px;
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const DragButton = styled.div<{ dragging: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  background-color: ${(props) => (props.dragging ? "#ff9522" : "#dfdfdf")};
  border-radius: 8px;
  margin: 7.5px;
`;

const Line = styled.div`
  width: 19px;
  height: 0px;
  border: 1px solid #ffffff;
  margin: 2.08px 0;
`;
