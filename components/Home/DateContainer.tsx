import styled from 'styled-components'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { useDispatchContext, useStateContext } from '../../utils/hooks/ContextProvider'

const DateContainerBlock = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-around;
  align-items: center;

  box-shadow: 1px 1px 17px rgba(0, 0, 0, 0.06);
  margin-top: 20px;
  background: white;
  width: 100%;

  button {
    background: none;
    border: none;
    outline: none;
  }

  .time-button {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13pt;
    font-family: 'NanumSquare';
    font-weight: bold;
    color: #fa9a44;
    height: 60px;
    width: 140px;
    border-bottom: solid 3px #fa9a44;
  }

  .arrow-button {
    font-size: 12pt;
    font-family: 'NanumSquare';
    color: #bababa;

    display: flex;
    align-items: center;

    svg {
      font-size: 13pt;
      margin: 0 10px;
      margin-top: -1px;
    }

    &:hover {
      color: #fa9a44;
    }
  }

  @media (max-width: 768px) {
    box-shadow: 0px 0.5px 2px rgba(0, 0, 0, 0.25);

    .time-button {
      font-size: 12pt;
      width: 120px;
    }

    .arrow-button {
      font-size: 11pt;

      svg {
        font-size: 12pt;
      }
    }
  }
`;

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
      <button className="arrow-button" onClick={() => setDate(getYesterday(date))}>
        <BsChevronLeft />
        {convertDate(getYesterday(date))}
      </button>
      <button className="time-button">{convertDate(date)}</button>
      <button className="arrow-button" onClick={() => setDate(getTomorrow(date))}>
        {convertDate(getTomorrow(date))}
        <BsChevronRight />
      </button>
    </DateContainerBlock>
  );
};

export default DateContainer;