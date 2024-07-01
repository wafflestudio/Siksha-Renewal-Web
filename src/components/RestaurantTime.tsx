import styled from "styled-components";
import OperatingHour from "./OperatingHour";

export default function RestaurantTime({ hours }) {
  return (
    <Container>
      {hours && hours.weekdays.length != 0 && (
        <Time>
          <TimeText>주중</TimeText>
          {hours.weekdays.length == 3 ? (
            <Times>
              <OperatingHour type={"BR"} hour={hours.weekdays[0]} />
              <OperatingHour type={"LU"} hour={hours.weekdays[1]} />
              <OperatingHour type={"DN"} hour={hours.weekdays[2]} />
            </Times>
          ) : hours.weekdays.length == 2 ? (
            <Times>
              <OperatingHour type={"LU"} hour={hours.weekdays[0]} />
              <OperatingHour type={"DN"} hour={hours.weekdays[1]} />
            </Times>
          ) : (
            <Times>
              <OperatingHour type={"LU"} hour={hours.weekdays[0]} />
            </Times>
          )}
        </Time>
      )}
      {hours && hours.saturday.length != 0 && (
        <>
          <VLine />
          <Time>
            <TimeText>토요일</TimeText>
            {hours.saturday.length == 3 ? (
              <Times>
                <OperatingHour type={"BR"} hour={hours.saturday[0]} />
                <OperatingHour type={"LU"} hour={hours.saturday[1]} />
                <OperatingHour type={"DN"} hour={hours.saturday[2]} />
              </Times>
            ) : hours.saturday.length == 2 ? (
              <Times>
                <OperatingHour type={"LU"} hour={hours.saturday[0]} />
                <OperatingHour type={"DN"} hour={hours.saturday[1]} />
              </Times>
            ) : (
              <Times>
                <OperatingHour type={"LU"} hour={hours.saturday[0]} />
              </Times>
            )}
          </Time>
        </>
      )}
      {hours && hours.holiday.length != 0 && (
        <>
          <VLine />
          <Time>
            <TimeText>휴일</TimeText>
            {hours.holiday.length == 3 ? (
              <Times>
                <OperatingHour type={"BR"} hour={hours.holiday[0]} />
                <OperatingHour type={"LU"} hour={hours.holiday[1]} />
                <OperatingHour type={"DN"} hour={hours.holiday[2]} />
              </Times>
            ) : hours.holiday.length == 2 ? (
              <Times>
                <OperatingHour type={"LU"} hour={hours.holiday[0]} />
                <OperatingHour type={"DN"} hour={hours.holiday[1]} />
              </Times>
            ) : (
              <Times>
                <OperatingHour type={"LU"} hour={hours.holiday[0]} />
              </Times>
            )}
          </Time>
        </>
      )}
      {!hours && (
        <Time>
          <TimeText>운영 시간 정보가 없습니다.</TimeText>
        </Time>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 188px;
`;

const Time = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
`;

const TimeText = styled.div`
  font-family: NanumSquare, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: black;
  padding-top: 2px;
`;

const Times = styled.div`
  display: flex;
  flex-direction: column;
`;

const VLine = styled.div`
  width: 188px;
  height: 1px;
  background: #ececec;
  margin-top: 3px;
`;
