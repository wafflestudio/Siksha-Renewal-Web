import styled from "styled-components";
import {useDispatchContext, useStateContext} from "../utils/hooks/ContextProvider";
import {formatDate, getTomorrow, getYesterday} from "../utils/hooks/FormatUtil";

const Container = styled.div`
  height: 53px;
  width: 100%;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Arrow = styled.img`
  width: 10px;
  height: 16px;
  cursor: pointer;
  padding: 0 16px 0 16px;
`

const DateText = styled.div`
  font-weight: 700;
  font-size: 15px;
  line-height: 17px;
  color: #F0976C;
  white-space: nowrap;
  cursor: pointer;
`

export default function Date() {
    const state = useStateContext();
    const dispatch = useDispatchContext();

    const { date, showCal } = state;
    const setDate = (date) => dispatch({ type: 'SET_DATE', date: date })
    const toggleShowCal = () => dispatch({ type: 'TOGGLE_SHOWCAL' })

    return (
        <Container>
            <Arrow
                src={showCal ? "/img/left-arrow-grey.svg" : "/img/left-arrow.svg"}
                onClick={() => {!showCal && setDate(getYesterday(date))}}
            />
            <DateText onClick={() => toggleShowCal()}>{formatDate(date)}</DateText>
            <Arrow
                src={showCal ? "/img/right-arrow-grey.svg" : "/img/right-arrow.svg"}
                onClick={() => {!showCal && setDate(getTomorrow(date))}}
            />
        </Container>
    )
}
