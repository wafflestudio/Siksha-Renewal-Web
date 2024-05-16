import { DragDropContext, Draggable, DropResult, Droppable } from "@hello-pangea/dnd";
import styled from "styled-components";

export default function RestaurantOrderEdit({
  orderData,
  setNewOrderData,
}: {
  orderData: { id: number; name_kr: string; name_en: string }[];
  setNewOrderData: (dragStartIndex: number, dragEndIndex: number) => void;
}) {
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    console.log(destination?.index);
    console.log(source?.index);

    if (source && destination && source !== destination) {
      setNewOrderData(source?.index, destination?.index);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <Title>즐겨찾기 순서 변경</Title>
        <Description>우측 손잡이를 드래그하여 순서를 바꿔보세요.</Description>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {orderData.map(({ id, name_kr, name_en }, index) => (
                <Draggable key={id} draggableId={id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <DragContainer
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <DragBox>
                        <Restaurant>{name_kr}</Restaurant>
                        <DragButton dragging={false}>
                          <Line />
                          <Line />
                          <Line />
                        </DragButton>
                      </DragBox>
                    </DragContainer>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </Container>
    </DragDropContext>
  );
}

const Container = styled.div`
  width: 544px;
  font-family: NanumSquare;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
`;

const Title = styled.h2`
  margin-top: 24.57px;
  margin-left: 22.45px;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  color: #ff9522;
`;

const Description = styled.p`
  margin-top: 7.92px;
  margin-left: 22.49px;
  margin-bottom: 11.66px;
  font-weight: 400;
  font-size: 11px;
  line-height: 19px;
  color: #a6a6a6;
`;

const DragContainer = styled.div`
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
`;

const Restaurant = styled.p`
  margin: 13px 0 13px 14.65px;
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;
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
