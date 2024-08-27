import styled from "styled-components";
import { useDispatchContext, useStateContext } from "../hooks/ContextProvider";
import { formatDate, formatMonth, formatWeekday } from "../utils/FormatUtil";
import ReactCalendar from "react-calendar";
import { useCallback } from "react";
import BackClickable from "./general/BackClickable";

export default function Calendar({ onClose }: { onClose: () => {}}) {
  const state = useStateContext();
  const { date, today } = state;

  const { setDate, toggleShowCal } = useDispatchContext();

  const isToday = useCallback(
    (date) => {
      return date.toDateString() === today.toDateString();
    },
    [today],
  );

  return (
    <>
      <DesktopContainer>
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
          prevLabel={<Arrow src={"/img/left-arrow.svg"} height={"21px"} />}
          nextLabel={<Arrow src={"/img/right-arrow.svg"} height={"21px"} />}
          formatDay={(locale, date) => String(date.getDate())}
          formatShortWeekday={(locale, date) => formatWeekday(date)}
          tileClassName={({ date }) => (isToday(date) ? "today" : null)}
        />
      </DesktopContainer>
      <BackClickable
          onClickBackground={toggleShowCal}
          style={`
            z-index: auto;
            width: 100vw;
            height: calc(100vh - 113px);
            position: initial;
          `}
        >
        <MobileContainer>
          <DateText>{formatMonth(date)}</DateText>
            <ReactCalendar
              onChange={(day: Date) => {
                setDate(day);
                toggleShowCal();
              }}
              onActiveStartDateChange={({ activeStartDate }) => setDate(activeStartDate as Date)}
              activeStartDate={date}
              defaultActiveStartDate={today}
              value={date}
              defaultValue={today}
              showNeighboringMonth={false}
              navigationLabel={() => formatDate(date)}
              prevLabel={<Arrow src={"/img/left-arrow.svg"} width={"10px"} />}
              nextLabel={<Arrow src={"/img/right-arrow.svg"} width={"10px"} />}
              formatDay={(locale, date) => String(date.getDate())}
              formatShortWeekday={(locale, date) => formatWeekday(date)}
              tileClassName={({ date }) => (isToday(date) ? "today" : null)}
            />
        </MobileContainer>
      </BackClickable>
    </>
  );
}

const DesktopContainer = styled.div`
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

const MobileContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    left: 0;
    right: 0;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;

const Arrow = styled.img`
  cursor: pointer;
`;

const DateText = styled.div`
  font-weight: 800;
  font-size: 20px;
  line-height: 22.7px;
  color: #ff9522;
  position: absolute;
  top: 40px;
  white-space: nowrap;

  @media (max-width: 768px) {
    cursor: pointer;
    top: 0;
    font-size: 15px;
  }
`;

const ClickArea = styled.div`
  width: 100vw;
  flex: 1;
`;
