import styled from "styled-components";
import { useDispatchContext, useStateContext } from "../hooks/ContextProvider";
import { formatDate, formatWeekday } from "../utils/FormatUtil";
import ReactCalendar from "react-calendar";
import { useCallback, useEffect, useState } from "react";

export default function Calendar() {
  const state = useStateContext();
  const dispatch = useDispatchContext();

  const { date, today } = state;
  const [yesterday, setYesterday] = useState(new Date(date.valueOf() - 86400000));
  const [tomorrow, setTomorrow] = useState(new Date(date.valueOf() + 86400000));
  const setDate = useCallback((date) => dispatch({ type: "SET_DATE", date: date }), [dispatch]);

  const toggleShowCal = () => dispatch({ type: "TOGGLE_SHOWCAL" });

  const isToday = useCallback(
    (date) => {
      return date.toDateString() === today.toDateString();
    },
    [today],
  );

  useEffect(() => {
    const current = new Date();
    setDate(current);
  }, [setDate]);
  useEffect(() => {
    yesterday.setFullYear(date.getFullYear());
    tomorrow.setFullYear(date.getFullYear());
    yesterday.setDate(1); // date initialize
    tomorrow.setDate(1);
    yesterday.setMonth(date.getMonth());
    tomorrow.setMonth(date.getMonth());
    yesterday.setDate(date.getDate() - 1);
    tomorrow.setDate(date.getDate() + 1);
  }, [date]);

  return (
    <>
      <DesktopContainer>
        <DateNavi>
          {formatDate(yesterday)}
          {formatDate(date)}
          {formatDate(tomorrow)}
        </DateNavi>
        <DateText>{formatDate(date)}</DateText>
        <ReactCalendar
          onChange={(day: Date) => setDate(day)}
          onActiveStartDateChange={({ activeStartDate }) => setDate(activeStartDate)}
          defaultActiveStartDate={today}
          value={date}
          defaultValue={today}
          showNeighboringMonth={false}
          navigationLabel={() => formatDate(date)}
          prevLabel={<Arrow src={"/img/left-arrow.svg"} width={"10px"} />}
          nextLabel={<Arrow src={"/img/right-arrow.svg"} width={"10px"} />}
          formatDay={(locale, date) => date.getDate()}
          formatShortWeekday={(locale, date) => formatWeekday(date)}
          tileClassName={({ date }) => (isToday(date) ? "today" : null)}
        />
      </DesktopContainer>
      <MobileContainer>
        <ReactCalendar
          onChange={(day) => {
            setDate(day);
            toggleShowCal();
          }}
          onActiveStartDateChange={({ activeStartDate }) => setDate(activeStartDate)}
          defaultActiveStartDate={today}
          value={date}
          defaultValue={today}
          showNeighboringMonth={false}
          navigationLabel={() => formatDate(date)}
          prevLabel={<Arrow src={"/img/left-arrow.svg"} width={"10px"} />}
          nextLabel={<Arrow src={"/img/right-arrow.svg"} width={"10px"} />}
          formatDay={(locale, date) => date.getDate()}
          formatShortWeekday={(locale, date) => formatWeekday(date)}
          tileClassName={({ date }) => (isToday(date) ? "today" : null)}
        />
        <ClickArea onClick={() => toggleShowCal()} />
      </MobileContainer>
    </>
  );
}

const DesktopContainer = styled.div`
  width: 100%;
  height: 302px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    width: 100vw;
    height: calc(100vh - 113px);
    background: rgba(0, 0, 0, 0.5);
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

const DateNavi = styled.div`
  font-weight: 700;
  font-size: 15px;
  line-height: 17px;
  color: black;
  position: absolute;
  top: -30px;
  left: 1000px;
  white-space: nowrap;

  @media (max-width: 768px) {
    color: #fe8c59;
    cursor: pointer;
    top: 4px;
  }
`;

const DateText = styled.div`
  font-weight: 700;
  font-size: 15px;
  line-height: 17px;
  color: #f0976c;
  position: absolute;
  top: 31px;
  white-space: nowrap;

  @media (max-width: 768px) {
    color: #fe8c59;
    cursor: pointer;
    top: 4px;
  }
`;

const ClickArea = styled.div`
  width: 100vw;
  flex: 1;
`;
