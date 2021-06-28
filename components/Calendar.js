import styled from "styled-components";
import {useDispatchContext, useStateContext} from "../utils/hooks/ContextProvider";
import {formatDate, formatWeekday, getNextMonth, getPrevMonth} from "../utils/hooks/FormatUtil";
import ReactCalendar from "react-calendar";

const Container = styled.div`
  width: 100%;
  height: 302px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  top: 95px;
  white-space: nowrap;
`

export default function Calendar() {
    const state = useStateContext();
    const dispatch = useDispatchContext();

    const { date, today } = state;
    const setDate = (date) => dispatch({ type: 'SET_DATE', date: date })

    return (
        <Container>
            <DateText>{formatDate(date)}</DateText>
            <ReactCalendar
                onChange={(day) => setDate(day)}
                onActiveStartDateChange={({ activeStartDate }) => setDate(activeStartDate)}
                value={date}
                showNeighboringMonth={false}
                navigationLabel={() => formatDate(date)}
                prevLabel={<Arrow src={"/img/left-arrow.svg"} width={"10px"}/>}
                nextLabel={<Arrow src={"/img/right-arrow.svg"} width={"10px"}/>}
                formatDay={(locale, date) => date.getDate()}
                formatShortWeekday={(locale, date) => formatWeekday(date)}
                tileClassName={({ date }) => date.toDateString() === today.toDateString() ? 'today' : null}
            />
        </Container>
    );
}
