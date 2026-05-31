import { DragDropContext, Draggable, DropResult, Droppable } from "@hello-pangea/dnd";
import styled from "styled-components";
import { RestaurantPreview } from "types";
import useFavorite from "hooks/UseFavorite";
import useHiddenRestaurant from "hooks/UseHiddenRestaurant";
import StarFilledIcon from "assets/icons/star-filled.svg";
import StarOutlinedIcon from "assets/icons/star-outlined.svg";
import VisibilityIcon from "assets/icons/visibility.svg";
import VisibilityOffIcon from "assets/icons/visibility-off.svg";

interface RestaurantOrderEditorProps {
  order: RestaurantPreview[];
  reorder: (dragStartIndex: number, dragEndIndex: number) => void;
}

export default function RestaurantOrderEditor({ order, reorder }: RestaurantOrderEditorProps) {
  const { isFavorite: isFavoriteRestaurant, toggleFavorite } = useFavorite();
  const { isHidden, hideRestaurant, showRestaurant } = useHiddenRestaurant();

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (source && destination && source !== destination) {
      reorder(source?.index, destination?.index);
    }
  };

  const toggleStar = (restaurantId: number) => {
    if (!isFavoriteRestaurant(restaurantId)) {
      showRestaurant(restaurantId);
    }
    toggleFavorite(restaurantId);
  };

  const toggleVisibility = (restaurantId: number) => {
    if (isHidden(restaurantId)) {
      showRestaurant(restaurantId);
      return;
    }

    hideRestaurant(restaurantId);
    if (isFavoriteRestaurant(restaurantId)) {
      toggleFavorite(restaurantId);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <Title>식당 순서 변경</Title>
        <Description>우측 손잡이를 드래그하여 순서를 바꿔보세요.</Description>
        <Droppable droppableId="droppable">
          {(provided) => (
            <DragZone {...provided.droppableProps} ref={provided.innerRef}>
              {order.map((restaurant, index) => {
                const { id } = restaurant;
                const nameKr = restaurant.nameKr;
                const restaurantName = nameKr ?? "이름 없는 식당";
                const isStarFilled = isFavoriteRestaurant(id);
                const isVisible = !isHidden(id);

                return (
                  <Draggable key={id} draggableId={id.toString()} index={index}>
                    {(provided, snapshot) => (
                      <DragContainer
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        $dragging={snapshot.isDragging}
                      >
                        <DragBox $dragging={snapshot.isDragging}>
                          <RestaurantInfo>
                            <StarIconSlot
                              type="button"
                              $active={isStarFilled}
                              onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                toggleStar(id);
                              }}
                            >
                              {isStarFilled ? (
                                <StarFilledIcon aria-label="즐겨찾기 식당" />
                              ) : (
                                <StarOutlinedIcon aria-label="즐겨찾기하지 않은 식당" />
                              )}
                            </StarIconSlot>
                            <Restaurant>{restaurantName}</Restaurant>
                            <VisibilityIconSlot
                              type="button"
                              $active={isVisible}
                              onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                toggleVisibility(id);
                              }}
                            >
                              {isVisible ? (
                                <VisibilityIcon aria-label="표시 중인 식당" />
                              ) : (
                                <VisibilityOffIcon aria-label="숨김 처리된 식당" />
                              )}
                            </VisibilityIconSlot>
                          </RestaurantInfo>
                          <DragButton $dragging={snapshot.isDragging}>
                            <Line />
                            <Line />
                            <Line />
                          </DragButton>
                        </DragBox>
                      </DragContainer>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
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
  border: 1px solid var(--Color-Foundation-gray-200);
  border-radius: 8px;
  background-color: var(--SemanticColor-Background-Secondary);

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
  color: var(--Color-Foundation-gray-900);

  @media (max-width: 768px) {
    display: none;
  }
`;

const Description = styled.p`
  margin: 0 0 20px 20px;
  font-weight: 400;
  font-size: 11px;
  line-height: 19px;
  color: var(--Color-Foundation-gray-600);

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    width: 100%;
    height: 50px;
    margin: 0;
    background-color: var(--Color-Background-main);
    z-index: 1;
  }
`;

const DragZone = styled.div`
  @media (max-width: 768px) {
    height: 100%;
    overflow: scroll;
  }
`;
const DragContainer = styled.div<{ $dragging: boolean }>`
  &:focus {
    background-color: transparent;
  }
`;

const DragBox = styled.div<{ $dragging: boolean }>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  width: 499.04px;
  height: 49px;
  border: 1px solid var(--Color-Foundation-gray-200);
  border-radius: 12px;
  margin: 7.92px 22.15px;
  padding: 7px 7px 7px 15px;
  background-color: ${(props) =>
    props.$dragging ? "var(--Color-Foundation-gray-50)" : "var(--SemanticColor-Element-Tooltip2)"};

  @media (max-width: 768px) {
    width: calc(100% - 40px);
    margin: 7.92px 0px 0px 20px;
  }
`;

const RestaurantInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1 1 0;
  min-width: 0;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
`;

const StarIconSlot = styled(IconButton)<{ $active: boolean }>`
  width: 24px;
  height: 24px;
  color: ${(props) =>
    props.$active ? "var(--Color-Foundation-orange-500)" : "var(--Color-Foundation-gray-300)"};

  svg {
    width: 24px;
    height: 24px;
  }
`;

const VisibilityIconSlot = styled(IconButton)<{ $active: boolean }>`
  width: 30px;
  height: 30px;
  color: ${(props) =>
    props.$active ? "var(--Color-Foundation-orange-500)" : "var(--Color-Foundation-gray-300)"};

  svg {
    width: 30px;
    height: 30px;
  }
`;

const Restaurant = styled.p`
  margin: 0;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.4;
  color: var(--Color-Foundation-gray-800);

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  min-width: 0;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const DragButton = styled.div<{ $dragging: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
  width: 34px;
  height: 34px;
  background-color: ${(props) =>
    props.$dragging ? "var(--Color-Foundation-orange-500)" : "var(--Color-Foundation-gray-300)"};
  border-radius: 8px;
`;

const Line = styled.div`
  width: 19px;
  height: 0px;
  border: 1px solid var(--Color-Static-White);
  margin: 2.08px 0;
`;
