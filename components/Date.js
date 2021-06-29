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
`

export default function Date() {
    const state = useStateContext();
    const dispatch = useDispatchContext();

    const { date } = state;
    const setDate = (date) => dispatch({ type: 'SET_DATE', date: date })

    return (
        <Container>
            <Arrow
                src={"/img/left-arrow.svg"}
                onClick={() => setDate(getYesterday(date))}
            />
            <DateText>{formatDate(date)}</DateText>
            <Arrow
                src={"/img/right-arrow.svg"}
                onClick={() => setDate(getTomorrow(date))}
            />
        </Container>
    )
}
