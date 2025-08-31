import styled from "styled-components";
import { useStateContext } from "providers/ContextProvider";

interface MobileOperatingHourProps {
  type: string;
  etc?: {
    isFestival: boolean;
    isFoodTruck: boolean;
  };
};

export default function MobileOperatingHour({ type, etc }: MobileOperatingHourProps) {
  const state = useStateContext();

  const { infoData } = state;

  const isFestival = etc?.isFestival;

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
                  <MealIcon src="/img/breakfast.svg" alt="아침" />
                  <Time>{infoData.etc.operating_hours[type][0].replace('-', ' - ')}</Time>
                </Hour>
                <Hour>
                  <MealIcon src="/img/lunch.svg" alt="점심" />
                  <Time>{infoData.etc.operating_hours[type][1].replace('-', ' - ')}</Time>
                </Hour>
                <Hour>
                  <MealIcon src="/img/dinner.svg" alt="저녁" />
                  <Time>{infoData.etc.operating_hours[type][2].replace('-', ' - ')}</Time>
                </Hour>
              </>
            ) : infoData.etc.operating_hours[type].length == 2 ? (
              <>
                <Hour>
                  <MealIcon src={isFestival ? "/img/lunch.svg" : "/img/lunch.svg"} alt={isFestival ? "5/13, 5/14" : "점심"} />
                  <Time>{infoData.etc.operating_hours[type][0].replace('-', ' - ')}</Time>
                </Hour>
                <Hour>
                  <MealIcon src={isFestival ? "/img/dinner.svg" : "/img/dinner.svg"} alt={isFestival ? "5/15" : "저녁"} />
                  <Time>{infoData.etc.operating_hours[type][1].replace('-', ' - ')}</Time>
                </Hour>
              </>
            ) : (
              <Hour>
                <MealIcon src="/img/lunch.svg" alt="점심" />
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
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

const LeftSide = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 102px;
  flex-shrink: 0;
`;

const Text = styled.div`
  font-family: 'NanumSquare', sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.5;
  color: #262728;
  letter-spacing: -0.3px;
  min-width: 40px;
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Hour = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: flex-end;
`;

const Meal = styled.div`
  font-size: 12px;
  line-height: 14px;
  color: #fe8c59;
  padding-top: 1px;
  font-weight: 400;
`;

const MealIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const Time = styled.div`
  font-family: 'NanumSquare', sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.5;
  color: #262728;
  letter-spacing: -0.3px;
`;
