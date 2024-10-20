import { useDispatchContext, useStateContext } from "providers/ContextProvider";
import { useCallback } from "react";
import BackClickable from "../../components/general/BackClickable";
import { formatDate, formatMonth, formatWeekday } from "utils/FormatUtil";
import ReactCalendar from "react-calendar";
import styled from "styled-components";

interface MobileCalendarProps {
  onClose: () => void;
}

export default function MobileCalendar({ onClose }: MobileCalendarProps) {
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
    <BackClickable
      onClickBackground={onClose}
      style={`
        display: none;
        width: 100vw;
        height: calc(100vh - 113px);
        position: absolute;
        top: 113px;

        @media (max-width: 768px) {
          display: initial;
        }
      `}
    >
      <Container>
        <DateText>{formatMonth(date)}</DateText>
        <ReactCalendar
          onChange={(day: Date) => {
            setDate(day);
            onClose();
          }}
          onActiveStartDateChange={({ activeStartDate }) => setDate(activeStartDate as Date)}
          activeStartDate={date}
          defaultActiveStartDate={today}
          value={date}
          defaultValue={today}
          showNeighboringMonth={false}
          navigationLabel={() => formatDate(date)}
          prevLabel={<Arrow src={"/img/left-arrow.svg"} width={"10px"} alt="이전" />}
          nextLabel={<Arrow src={"/img/right-arrow.svg"} width={"10px"} alt="다음" />}
          formatDay={(locale, date) => String(date.getDate())}
          formatShortWeekday={(locale, date) => formatWeekday(date)}
          tileClassName={({ date }) => (isToday(date) ? "today" : null)}
          locale={"ko"}
        />
      </Container>
    </BackClickable>
  );
}

const Container = styled.div`
  display: none;
  flex-direction: column;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  @media (max-width: 768px) {
    display: flex;
  }
`;

const DateText = styled.div`
  position: absolute;
  top: 0;
  font-weight: 800;
  font-size: 15px;
  line-height: 22.7px;
  color: #ff9522;
  white-space: nowrap;
  cursor: pointer;
`;

const Arrow = styled.img`
  cursor: pointer;
`;
