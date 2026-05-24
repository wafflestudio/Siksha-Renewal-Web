import { DragDropContext, Draggable, DropResult, Droppable } from "@hello-pangea/dnd";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import { Restaurant } from "types";
import StarOrange from "assets/icons/star-orange.svg";
import StarGray from "assets/icons/star-gray.svg";
import EyeShow from "assets/icons/eye-show.svg";
import EyeHide from "assets/icons/eye-hide.svg";

interface RestaurantOrderEditorProps {
  order: Restaurant[];
  reorder: (dragStartIndex: number, dragEndIndex: number) => void;
  onToggleLiked?: (id: number) => void;
  onToggleVisible?: (id: number) => void;
}

export default function RestaurantOrderEditor({
  order,
  reorder,
  onToggleLiked,
  onToggleVisible,
}: RestaurantOrderEditorProps) {
  const pathname = usePathname();
  const isFavorite = pathname?.includes("favorite");

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (source && destination && source !== destination) {
      reorder(source?.index, destination?.index);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <HeaderGroup>
          <Title>{`${isFavorite ? "즐겨찾기 " : ""}식당 순서 변경`}</Title>
          <Description>원하는 식당을 숨기거나 우측 손잡이를 드래그하여 순서를 바꿀 수 있어요.</Description>
        </HeaderGroup>
        <MobileDescriptionWrapper>
          <MobileDescription>
            {"원하는 식당을 숨기거나\n우측 손잡이를 드래그하여 순서를 바꿀 수 있어요."}
          </MobileDescription>
        </MobileDescriptionWrapper>
        <Droppable droppableId="droppable">
          {(provided) => (
            <DragZone {...provided.droppableProps} ref={provided.innerRef}>
              {order.map(({ id, nameKr, liked, visible }, index) => (
                <Draggable key={id} draggableId={id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <DragContainer
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      $dragging={snapshot.isDragging}
                    >
                      <DragBox $dragging={snapshot.isDragging} $visible={visible ?? true}>
                        <LeftContent $visible={visible ?? true}>
                          <StarWrapper onClick={() => onToggleLiked?.(id)}>
                            {liked ? <StarOrange /> : <StarGray />}
                          </StarWrapper>
                          <RestaurantName $visible={visible ?? true}>{nameKr}</RestaurantName>
                          <EyeWrapper onClick={() => onToggleVisible?.(id)}>
                            {visible !== false ? <EyeShow /> : <EyeHide />}
                          </EyeWrapper>
                        </LeftContent>
                        <DragButton {...provided.dragHandleProps} $dragging={snapshot.isDragging}>
                          <Line />
                          <Line />
                          <Line />
                        </DragButton>
                      </DragBox>
                    </DragContainer>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </DragZone>
          )}
        </Droppable>
      </Container>
    </DragDropContext>
  );
}

const Container = styled.div`
  display: flex;
  width: 544px;
  padding: 24px 0;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-radius: 10px;
  background: var(--SementicColor-Background-Secondary, #fff);
  font-family: NanumSquare;

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    background: none;
    align-items: center;
    gap: 20px;
    padding: 0;
  }
`;

const HeaderGroup = styled.div`
  display: flex;
  padding: 0 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  align-self: stretch;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Title = styled.p`
  margin: 0;
  color: var(--Color-Foundation-gray-900, #262728);
  font-size: var(--Font-size-18, 18px);
  font-style: normal;
  font-weight: 800;
  line-height: 140%;
  letter-spacing: var(--Font-letter-spacing-0, -0.3px);

  @media (max-width: 768px) {
    display: none;
  }
`;

const Description = styled.p`
  color: var(--Color-Foundation-gray-600, #989aa0);
  font-family: var(--Font-family-sans, NanumSquareOTF);
  font-size: var(--Font-size-12, 12px);
  font-style: normal;
  font-weight: var(--Font-weight-regular, 400);
  line-height: 140%;
  letter-spacing: var(--Font-letter-spacing-0, -0.3px);
`;

const MobileDescriptionWrapper = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    padding: 16px 70px 12px 70px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    background: var(--SementicColor-Background-Secondary, #fff);
  }
`;

const MobileDescription = styled.p`
  margin: 0;
  color: var(--Color-Foundation-gray-700, #727478);
  text-align: center;
  font-family: var(--Font-family-sans, NanumSquareOTF);
  font-size: var(--Font-size-13, 13px);
  font-style: normal;
  font-weight: var(--Font-weight-regular, 400);
  line-height: 140%;
  letter-spacing: var(--Font-letter-spacing-0, -0.3px);
  white-space: pre-line;
`;

const DragZone = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  @media (max-width: 768px) {
    gap: 0;
    height: 100%;
    overflow: scroll;
  }
`;

const DragContainer = styled.div<{ $dragging: boolean }>`
  &:focus {
    background-color: transparent;
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    padding: 6px 16px;
  }
`;

const DragBox = styled.div<{ $dragging: boolean; $visible: boolean }>`
  display: flex;
  align-items: center;
  gap: 14px;
  border: 1px solid var(--Color-Foundation-gray-200);
  border-radius: 12px;
  padding: 8px 8px 8px 16px;
  margin: 0 20px;
  background-color: ${(props) => {
    if (props.$dragging) return "var(--Color-Foundation-gray-50)";
    if (!props.$visible) return "var(--Color-Foundation-gray-100, #F4F4F5)";
    return "var(--SemanticColor-Element-Tooltip2)";
  }};

  @media (max-width: 768px) {
    flex: 1;
    border: none;
    border-radius: 0;
    background: transparent;
    margin: 0;
    padding: 0;
    gap: 10px;
  }
`;

const LeftContent = styled.div<{ $visible: boolean }>`
  display: flex;
  flex: 1;
  gap: 6px;
  align-items: center;
  min-width: 0;

  @media (max-width: 768px) {
    background-color: ${(props) =>
      props.$visible
        ? "var(--SemanticColor-Element-Tooltip2, white)"
        : "var(--Color-Foundation-gray-50, #F4F4F5)"};
    border-radius: 12px;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.16);
    padding: 8px 12px;
    gap: 4px;
    align-self: stretch;
  }
`;

const StarWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const RestaurantName = styled.p<{ $visible: boolean }>`
  margin: 0;
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  color: ${(props) =>
    props.$visible ? "inherit" : "var(--Color-Foundation-gray-600, #989AA0)"};

  @media (max-width: 768px) {
    font-size: 13px;
    font-weight: 400;
    line-height: 140%;
    white-space: normal;
    overflow: visible;
    text-overflow: clip;
  }
`;

const EyeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  cursor: pointer;

  svg {
    width: 30px;
    height: 30px;
  }

  @media (max-width: 768px) {
    width: 24px;
    height: 24px;

    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

const DragButton = styled.div<{ $dragging: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  background-color: ${(props) =>
    props.$dragging ? "var(--Color-Foundation-orange-500)" : "var(--Color-Foundation-gray-200)"};
  border-radius: 8px;
  flex-shrink: 0;
  cursor: grab;

  @media (max-width: 768px) {
    background-color: transparent;
    width: 24px;
    height: 24px;
    border-radius: 0;
  }
`;

const Line = styled.div`
  width: 19px;
  height: 0px;
  border: 1px solid var(--Color-Static-White);
  margin: 2.08px 0;

  @media (max-width: 768px) {
    border-color: var(--Color-Foundation-gray-400, #bec1c8);
    width: 16px;
  }
`;
