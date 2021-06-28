import styled from "styled-components";
import {useDispatchContext, useStateContext} from "../utils/hooks/ContextProvider";
import {formatDate, getTomorrow, getYesterday} from "../utils/hooks/FormatUtil";

const Container = styled.div`
  width: 380px;
  height: 302px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const DateContainer = styled.div`
  display: flex;
  padding-top: 33px;
`

const Arrow = styled.img`
    cursor: pointer;
`

const Date = styled.div`
  font-weight: 700;
  font-size: 15px;
  line-height: 17px;
  color: #F0976C;
  padding: 2px 105px 0px 105px;
`

export default function Calendar() {
    const state = useStateContext();
    const dispatch = useDispatchContext();

    const { date } = state;
    const setDate = (date) => dispatch({ type: 'SET_DATE', date: date })

    return (
        <Container>
            <DateContainer>
                <Arrow
                    src={"/img/left-arrow.svg"} width={"10px"}
                    onClick={() => setDate(getYesterday(date))}
                />
                <Date>{formatDate(date)}</Date>
                <Arrow
                    src={"/img/right-arrow.svg"}
                    onClick={() => setDate(getTomorrow(date))}
                />
            </DateContainer>
        </Container>
    );
}
