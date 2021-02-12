import styled from 'styled-components'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { useDispatchContext, useStateContext } from '../../utils/hooks/ContextProvider'

const DateContainerBlock = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  background: white;
  box-shadow: 1px 1px 17px rgba(0, 0, 0, 0.06);

  @media (max-width: 768px) {
    box-shadow: 0px 0.5px 2px rgba(0, 0, 0, 0.25);
    margin-top: 0;
  }
`

const ArrowButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  outline: none;
  font-size: 12pt;
  font-family: 'NanumSquare';
  color: #bababa;

  svg {
    font-size: 13pt;
    margin: 0 10px;
    margin-top: -1px;
  }

  &:hover {
    color: #fa9a44;
  }

  @media (max-width: 768px) {
    font-size: 11pt;

    svg {
      font-size: 12pt;
    }
  }
`

const TimeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13pt;
  font-family: 'NanumSquare';
  font-weight: bold;
  color: #fa9a44;
  height: 60px;
  width: 140px;
  border: none;
  background: none;
  outline: none;
  border-bottom: solid 3px #fa9a44;

  @media (max-width: 768px) {
    font-size: 12pt;
    width: 120px;
  }
`

const convertDate = (date: string) => {
  const week: string[] = ['일', '월', '화', '수', '목', '금', '토']
  return `${date.substring(5, 7)}. ${date.substring(8, 10)}. ${week[new Date(date).getDay()]}`
}

const getYesterday = (date: string) => {
  const yesterday = new Date(date)
  yesterday.setDate(yesterday.getDate() - 1)
  return `${yesterday.getFullYear()}-${("0" + (yesterday.getMonth() + 1)).slice(-2)}-${("0" + yesterday.getDate()).slice(-2)}`
}

const getTomorrow = (date: string) => {
  const tomorrow = new Date(date)
  tomorrow.setDate(tomorrow.getDate() + 1)
  return `${tomorrow.getFullYear()}-${("0" + (tomorrow.getMonth() + 1)).slice(-2)}-${("0" + tomorrow.getDate()).slice(-2)}`
}

const DateContainer: React.FC = () => {
  const state = useStateContext();
  const dispatch = useDispatchContext();

  const { date } = state;
  const setDate = (date: string) => dispatch({ type: 'SET_DATE', date: date });

  return (
    <DateContainerBlock>
      <ArrowButton onClick={() => setDate(getYesterday(date))}>
        <BsChevronLeft />
        {convertDate(getYesterday(date))}
      </ArrowButton>
      <TimeButton>{convertDate(date)}</TimeButton>
      <ArrowButton onClick={() => setDate(getTomorrow(date))}>
        {convertDate(getTomorrow(date))}
        <BsChevronRight />
      </ArrowButton>
    </DateContainerBlock>
  );
};

export default DateContainer;