import styled from 'styled-components'
import classNames from 'classnames'
import { AiFillCaretLeft, AiFillCaretRight, AiOutlineCalendar } from 'react-icons/ai'
import { useDispatchContext, useStateContext } from '../../utils/hooks/ContextProvider'

const DateContainerBlock = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;

  margin-top: 5px;

  button {
    background: none;
    border: none;
    outline: none;
    color: #fa9a44;
  }

  .time-button {
    font-size: 13pt;
    font-family: 'NanumSquare';
    margin-left: 20px;
    font-weight: bold;
  }

  .arrow {
    font-size: 14pt;
    margin-top: 3px;
  }

  .calendar {
    font-size: 14pt;
    margin-top: 2px;
    margin-left: -4px;
    margin-right: 2px;
  }

  @media (max-width: 768px) {
    .time-button {
      font-size: 12pt;
    }
  }
`;

const convertDate = (date: string) => date.substring(0, 4) + '. ' + date.substring(5, 7) + '. ' + date.substring(8, 10)

const DateContainer: React.FC = () => {
  const state = useStateContext();
  const dispatch = useDispatchContext();

  const { date } = state;
  const setDate = (date: string) => dispatch({ type: 'SET_DATE', date: date });

  return (
    <DateContainerBlock>
      <button className="arrow left-button"><AiFillCaretLeft /></button>
      <button className="time-button">{convertDate(date)}</button>
      <button className="calendar"><AiOutlineCalendar /></button>
      <button className="arrow right-button"><AiFillCaretRight /></button>
    </DateContainerBlock>
  );
};

export default DateContainer;