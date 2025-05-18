import { useDispatchContext, useStateContext } from "providers/ContextProvider";
import { useCallback, useState } from "react";
import { formatDate, formatMonth, formatWeekday } from "utils/FormatUtil";
import ReactCalendar from "react-calendar";
import styled from "styled-components";
import "styles/calendar.css";
import CalendarIcon from "assets/icons/calendar.svg";
import LeftArrowIcon from "assets/icons/left-arrow.svg";
import RightArrowIcon from "assets/icons/right-arrow.svg";

export default function DesktopCalendar() {
  const state = useStateContext();
  const { date, today } = state;
  const { setDate } = useDispatchContext();
  const [isCalOpened, setIsCalOpened] = useState(false);
  const toggleCal = () => setIsCalOpened(!isCalOpened);

  const isToday = useCallback(
    (date) => {
      return date.toDateString() === today.toDateString();
    },
    [today],
  );

  const movePrevDay = () => {
    setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1));
  };

  const moveNextDay = () => {
    setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1));
  };
  const movePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1));
  };

  const moveNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1));
  };

  return (
    <Container>
      <Navigation isCalOpened={isCalOpened}>
        <StyledLeftArrowIcon onClick={movePrevDay} aria-label="지난날로 이동" />
        <DateBox onClick={toggleCal}>
          <StyledCalendarIcon />
          <DateText color={"var(--Color-Foundation-gray-900)"} lineHeight={"150%"}>
            {formatDate(date)}
          </DateText>
        </DateBox>
        <StyledRightArrowIcon onClick={moveNextDay} aria-label="다음날로 이동" />
      </Navigation>
      {isCalOpened && (
        <Calendar>
          <Header>
            <DateText color={"var(--Color-Foundation-orange-500)"} lineHeight={"140%"}>
              {formatMonth(date)}
            </DateText>
            <ArrowBox>
              <StyledLeftArrowIcon
                onClick={movePrevMonth}
                aria-label="지난달로 이동"
                color="orange"
              />
              <StyledRightArrowIcon
                onClick={moveNextMonth}
                aria-label="다음달로 이동"
                color="orange"
              />
            </ArrowBox>
          </Header>
          <ReactCalendar
            onChange={(day: Date) => {
              setDate(day);
            }}
            onActiveStartDateChange={({ activeStartDate }) => {
              setDate(activeStartDate as Date);
            }}
            calendarType={"gregory"}
            activeStartDate={date}
            defaultActiveStartDate={today}
            value={date}
            defaultValue={today}
            showNeighboringMonth={true}
            navigationLabel={() => formatMonth(date)}
            prevLabel={<></>}
            showNavigation={false}
            nextLabel={<></>}
            formatDay={(locale, date) => String(date.getDate())}
            formatShortWeekday={(locale, date) => formatWeekday(date)}
            tileClassName={({ date }) => (isToday(date) ? "today" : null)}
            locale={"ko"}
          />
        </Calendar>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 378px;
  gap: 10px;
`;

const Navigation = styled.div<{ isCalOpened: boolean }>`
  display: flex;
  padding: 13px 16px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-radius: 10px;
  background: var(--Color-Foundation-base-white-5);
  box-shadow: ${(props) => (props.isCalOpened ? "0px 0px 10px 0px rgba(0, 0, 0, 0.1)" : "none")};
`;

const Calendar = styled.div`
  position: absolute;
  z-index: 1;
  top: 60px;
  max-width: 378px;
  display: inline-flex;
  padding: 20px 0px 28px 0px;
  flex-direction: column;
  align-items: center;
  gap: 34px;
  border-radius: 10px;
  background: var(--Color-Foundation-base-white-5);
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.1);
`;

const DateBox = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const StyledCalendarIcon = styled(CalendarIcon)`
  width: 24px;
  height: 24px;
  color: var(--Color-Foundation-gray-900);
`;

const Header = styled.div`
  display: flex;
  padding: 0px 24px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const DateText = styled.div<{ color: string; lineHeight: string }>`
  color: ${(props) => props.color};
  font-size: var(--Font-size-16, 16px);
  font-weight: var(--Font-weight-extrabold, 800);
  line-height: ${(props) => props.lineHeight};
`;

const ArrowBox = styled.div`
  display: flex;
  gap: 20px;
`;

const StyledLeftArrowIcon = styled(LeftArrowIcon)`
  cursor: pointer;
  height: 21px;
  color: ${({ color }) =>
    color === "orange" ? "var(--Color-Foundation-orange-500)" : "var(--Color-Foundation-gray-700)"};
`;

const StyledRightArrowIcon = styled(RightArrowIcon)<{ color: string }>`
  cursor: pointer;
  height: 21px;
  color: ${({ color }) =>
    color === "orange" ? "var(--Color-Foundation-orange-500)" : "var(--Color-Foundation-gray-700)"};
`;
