import styled from "styled-components";
import {useDispatchContext, useStateContext} from "../utils/hooks/ContextProvider";
import {formatDate, formatMonth, formatWeekday} from "../utils/hooks/FormatUtil";
import ReactCalendar from "react-calendar";
import {useCallback} from "react";

const DesktopContainer = styled.div`
  width: 100%;
  height: 302px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`

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
`

const Arrow = styled.img`
    cursor: pointer;
`

const DateText = styled.div`
  font-weight: 700;
  font-size: 15px;
  line-height: 17px;
  color: #F0976C;
  position: absolute;
  top: 93px;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    color: #FE8C59;
    cursor: pointer;
    top: 4px;
  }
`

const ClickArea = styled.div`
  width: 100vw;
  flex: 1;
`

export default function Calendar() {
    const state = useStateContext();
    const dispatch = useDispatchContext();

    const { date, today, initDate } = state;
    const setDate = (date) => dispatch({ type: 'SET_DATE', date: date })
    const toggleShowCal = () => dispatch({ type: 'TOGGLE_SHOWCAL' })

    const isToday = useCallback((date) => {
        return date.toDateString() === today.toDateString()
    }, [today])

    return (
        <>
            <DesktopContainer>
                <DateText>{formatDate(date)}</DateText>
                <ReactCalendar
                    onChange={(day) => setDate(day)}
                    onActiveStartDateChange={({ activeStartDate }) => setDate(activeStartDate)}
                    defaultActiveStartDate={today}
                    value={date}
                    defaultValue={today}
                    showNeighboringMonth={false}
                    navigationLabel={() => formatDate(date)}
                    prevLabel={<Arrow src={"/img/left-arrow.svg"} width={"10px"}/>}
                    nextLabel={<Arrow src={"/img/right-arrow.svg"} width={"10px"}/>}
                    formatDay={(locale, date) => date.getDate()}
                    formatShortWeekday={(locale, date) => formatWeekday(date)}
                    tileClassName={({ date }) => isToday(date) ? 'today' : null}
                    key={initDate.toDateString()}
                />
            </DesktopContainer>
            <MobileContainer>
                <DateText>{formatMonth(date)}</DateText>
                <ReactCalendar
                    onChange={(day) => {setDate(day); toggleShowCal()}}
                    onActiveStartDateChange={({ activeStartDate }) => setDate(activeStartDate)}
                    defaultActiveStartDate={today}
                    value={date}
                    defaultValue={today}
                    showNeighboringMonth={false}
                    navigationLabel={() => formatDate(date)}
                    prevLabel={<Arrow src={"/img/left-arrow.svg"} width={"10px"}/>}
                    nextLabel={<Arrow src={"/img/right-arrow.svg"} width={"10px"}/>}
                    formatDay={(locale, date) => date.getDate()}
                    formatShortWeekday={(locale, date) => formatWeekday(date)}
                    tileClassName={({ date }) => isToday(date) ? 'today' : null}
                    key={initDate.toDateString()}
                />
                <ClickArea onClick={() => toggleShowCal()}/>
            </MobileContainer>
        </>
    );
}
