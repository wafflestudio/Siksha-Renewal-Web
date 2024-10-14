import styled from "styled-components";
import { useStateContext } from "providers/ContextProvider";

export default function MobileOperatingHour({ type }) {
  const state = useStateContext();

  const { infoData } = state;

  return (
    <Container>
      <LeftSide>
        <Text>{type === "weekdays" ? "주중" : type === "saturday" ? "토요일" : "휴일"}</Text>
      </LeftSide>
      <RightSide>
        {infoData.etc.operating_hours && infoData.etc.operating_hours[type].length != 0 && (
          <>
            {infoData.etc.operating_hours[type].length == 3 ? (
              <>
                <Hour>
                  <Meal>아침</Meal>
                  <Time>{infoData.etc.operating_hours[type][0]}</Time>
                </Hour>
                <Hour>
                  <Meal>점심</Meal>
                  <Time>{infoData.etc.operating_hours[type][1]}</Time>
                </Hour>
                <Hour>
                  <Meal>저녁</Meal>
                  <Time>{infoData.etc.operating_hours[type][2]}</Time>
                </Hour>
              </>
            ) : infoData.etc.operating_hours[type].length == 2 ? (
              <>
                <Hour>
                  <Meal>점심</Meal>
                  <Time>{infoData.etc.operating_hours[type][0]}</Time>
                </Hour>
                <Hour>
                  <Meal>저녁</Meal>
                  <Time>{infoData.etc.operating_hours[type][1]}</Time>
                </Hour>
              </>
            ) : (
              <Hour>
                <Meal>점심</Meal>
                <Time>{infoData.etc.operating_hours[type][0]}</Time>
              </Hour>
            )}
          </>
        )}
      </RightSide>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 12px;
  width: 100%;
`;

const LeftSide = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Text = styled.div`
  font-size: 14px;
  line-height: 16px;
  color: black;
  justify-content: flex-start;
  padding-bottom: 8px;
  font-weight: 400;
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
`;

const Hour = styled.div`
  display: flex;
  padding-bottom: 8px;
`;

const Meal = styled.div`
  font-size: 12px;
  line-height: 14px;
  color: #fe8c59;
  padding-top: 1px;
  font-weight: 400;
`;

const Time = styled.div`
  font-size: 14px;
  line-height: 16px;
  color: #575757;
  padding-left: 10px;
  font-weight: 400;
`;
