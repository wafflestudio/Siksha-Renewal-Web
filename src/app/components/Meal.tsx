import styled from "styled-components";
import { useDispatchContext, useStateContext } from "providers/ContextProvider";
import { useEffect, useState } from "react";

export default function Meal() {
  const state = useStateContext();
  const { meal } = state;

  const { setMeal } = useDispatchContext();

  const [isBR, setIsBR] = useState(false);
  const [isLU, setIsLU] = useState(false);
  const [isDN, setIsDN] = useState(false);

  useEffect(() => {
    if (meal == "BR") {
      setIsBR(true);
      setIsLU(false);
      setIsDN(false);
    } else if (meal == "LU") {
      setIsBR(false);
      setIsLU(true);
      setIsDN(false);
    } else if (meal == "DN") {
      setIsBR(false);
      setIsLU(false);
      setIsDN(true);
    }
  }, [meal]);

  return (
    <Container>
      <MealButton onClick={() => setMeal("BR")}>
        <MealIcon src={isBR ? "/img/breakfast-active.svg" : "/img/breakfast.svg"} alt="아침" />
        <MealText active={isBR}>아침</MealText>
      </MealButton>
      <MealButton onClick={() => setMeal("LU")}>
        <MealIcon src={isLU ? "/img/lunch-active.svg" : "/img/lunch.svg"} alt="점심" />
        <MealText active={isLU}>점심</MealText>
      </MealButton>
      <MealButton onClick={() => setMeal("DN")}>
        <MealIcon src={isDN ? "/img/dinner-active.svg" : "/img/dinner.svg"} alt="저녁" />
        <MealText active={isDN}>저녁</MealText>
      </MealButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-self: center;
  padding: 0px 50px;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 769px) {
    max-width: 400px;
    align-self: center;
    margin-bottom: 14px;
  }

  @media (max-width: 768px) {
    justify-content: center;
    align-items: flex-end;
    padding-top: 11px;
    padding-bottom: 11px;
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

const MealIcon = styled.img`
  width: 30px;
  height: 30px;
  padding-bottom: 2px;

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

    color: ${(props: { active: boolean }) =>
      props.active ? "var(--Color-Foundation-orange-500)" : "#919191"};
  }
`;
