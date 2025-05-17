import styled from "styled-components";
import { useDispatchContext, useStateContext } from "providers/ContextProvider";
import BreakfastIcon from "assets/icons/breakfast.svg";
import LunchIcon from "assets/icons/lunch.svg";
import DinnerIcon from "assets/icons/dinner.svg";

const MEALS = [
  { key: "BR", label: "아침", Icon: BreakfastIcon },
  { key: "LU", label: "점심", Icon: LunchIcon },
  { key: "DN", label: "저녁", Icon: DinnerIcon },
];

export default function Meal() {
  const { meal } = useStateContext();
  const { setMeal } = useDispatchContext();

  return (
    <Container>
      {MEALS.map(({ key, label, Icon }) => {
        const isActive = meal === key;
        return (
          <MealButton key={key} onClick={() => setMeal(key)}>
            <MealIcon isActive={isActive}>
              <Icon aria-label={label} />
            </MealIcon>
            <MealText active={isActive}>{label}</MealText>
          </MealButton>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 400px;
  padding: 0px 50px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;

  @media (max-width: 768px) {
    justify-content: center;
    align-items: flex-end;
    padding: 15.28px 0 17px;
    margin-bottom: 0;
  }
`;

const MealButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 0 6%;

  @media (max-width: 768px) {
    padding: 0 13px 0 13px;
  }
`;

const MealIcon = styled.div<{ isActive: boolean }>`
  width: 30px;
  height: 30px;
  padding-bottom: 2px;
  color: ${({ isActive }) =>
    isActive ? "var(--Color-Foundation-orange-500)" : "var(--Color-Foundation-gray-600)"};

  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
    padding-bottom: 4px;
  }
`;

const MealText = styled.div`
  color: ${(props: { active: boolean }) =>
    props.active ? "var(--Color-Foundation-orange-500)" : "var(--Color-Foundation-gray-600)"};

  text-align: center;
  font-size: 13px;
  font-weight: 700;

  font-size: 15px;
  line-height: 17px;

  @media (max-width: 768px) {
    font-size: 10px;
    line-height: 11px;
    font-weight: 400;
  }
`;
