import { useDispatchContext, useStateContext } from "hooks/ContextProvider";
import { useCallback } from "react";
import { formatDate, formatWeekday } from "utils/FormatUtil";
import ReactCalendar from "react-calendar";
import styled from "styled-components";

export default function DesktopCalendar() {
  const state = useStateContext();
  const { date, today } = state;
  const { setDate } = useDispatchContext();

  const isToday = useCallback(
    (date) => {
      return date.toDateString() === today.toDateString();
    },
    [today],
  );

  return (
    <Container>
      <DateText>{formatDate(date)}</DateText>
      <ReactCalendar
        onChange={(day: Date) => {
          setDate(day);
        }}
        onActiveStartDateChange={({ activeStartDate }) => {
          setDate(activeStartDate as Date);
        }}
        activeStartDate={date}
        defaultActiveStartDate={today}
        value={date}
        defaultValue={today}
        showNeighboringMonth={false}
        navigationLabel={() => formatDate(date)}
        prevLabel={<Arrow src={"/img/left-arrow.svg"} height={"21px"} alt="지난달로 이동" />}
        nextLabel={<Arrow src={"/img/right-arrow.svg"} height={"21px"} alt="다음달로 이동" />}
        formatDay={(locale, date) => String(date.getDate())}
        formatShortWeekday={(locale, date) => formatWeekday(date)}
        tileClassName={({ date }) => (isToday(date) ? "today" : null)}
        locale={"ko"}
      />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  border-radius: 8px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const DateText = styled.div`
  font-weight: 800;
  font-size: 20px;
  line-height: 22.7px;
  color: #ff9522;
  position: absolute;
  top: 40px;
  white-space: nowrap;
`;

const Arrow = styled.img`
  cursor: pointer;
`;
