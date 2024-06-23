import styled from "styled-components";
import { useDispatchContext, useStateContext } from "../hooks/ContextProvider";
import { formatDate, getTomorrow, getYesterday } from "../utils/FormatUtil";

export default function Date() {
  const state = useStateContext();
  const { date, showCal } = state;

  const { setDate, toggleShowCal } = useDispatchContext();

  return (
    <Container>
      <Arrow
        src={showCal ? "/img/left-arrow-grey.svg" : "/img/left-arrow.svg"}
        onClick={() => {
          !showCal && setDate(getYesterday(date));
        }}
      />
      <FlexBox onClick={() => toggleShowCal()}>
        <DateText>{formatDate(date)}</DateText>
      </FlexBox>
      <Arrow
        src={showCal ? "/img/right-arrow-grey.svg" : "/img/right-arrow.svg"}
        onClick={() => {
          !showCal && setDate(getTomorrow(date));
        }}
      />
    </Container>
  );
}

const Container = styled.div`
  height: 53px;
  width: 100%;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    position: absolute;
    top: 60px;
  }
`;

const Arrow = styled.img`
  width: 10px;
  height: 16px;
  cursor: pointer;
  padding: 0 16px 0 16px;
`;

const DateText = styled.div`
  font-weight: 700;
  font-size: 15px;
  line-height: 17px;
  color: #ff9522;
  white-space: nowrap;
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
