import { useDispatchContext, useStateContext } from "providers/ContextProvider";
import { useCallback } from "react";
import { formatMonth, formatWeekday } from "utils/FormatUtil";
import ReactCalendar from "react-calendar";
import styled from "styled-components";
import "styles/calendar.css";

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

  const movePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1));
  };

  const moveNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1));
  };

  return (
    <Container>
      <Header>
        <DateText>{formatMonth(date)}</DateText>
        <Arrow
          onClick={movePrevMonth}
          src={"/img/left-arrow.svg"}
          height={"21px"}
          alt="지난달로 이동"
        />
        <Arrow
          onClick={moveNextMonth}
          src={"/img/right-arrow.svg"}
          height={"21px"}
          alt="다음달로 이동"
        />
      </Header>
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
        navigationLabel={() => formatMonth(date)}
        prevLabel={<></>}
        showNavigation={false}
        nextLabel={<></>}
        formatDay={(locale, date) => String(date.getDate())}
        formatShortWeekday={(locale, date) => formatWeekday(date)}
        tileClassName={({ date }) => (isToday(date) ? "today" : null)}
        locale={"ko"}
      />
    </Container>
  );
}

const Container = styled.div`
  display: inline-flex;
  padding: 20px 0px 26px 0px;
  flex-direction: column;
  align-items: center;
  gap: 34px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.1);
  max-width: 378px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Header = styled.div`
  display: flex;
  padding: 0px 24px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const DateText = styled.div`
  color: var(--Color-Foundation-orange-500, #ff9522);
  font-size: var(--Font-size-16, 16px);
  font-weight: var(--Font-weight-extrabold, 800);
`;

const Arrow = styled.img`
  cursor: pointer;
`;
