import styled from 'styled-components';
import classNames from 'classnames';
import { useDispatchContext, useStateContext } from '../../utils/hooks/ContextProvider';
import { date } from '../../interfaces'

const DateContainerBlock = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-around;

  margin-top: 5px;

  .time-button {
    background: transparent;
    border: transparent;
    font-size: 13pt;
    font-family: 'NanumSquare';
    color: #bababa;

    &:focus {
      outline: none;
    }

    &:hover {
      color: #fa9a44;
    }
  }

  .focused-time {
    color: #fa9a44;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    .time-button {
      font-size: 12pt;
    }
  }
`;

const DateContainer: React.FC = () => {
  const state = useStateContext();
  const dispatch = useDispatchContext();

  const { date } = state;
  const setDate = (date: date) => dispatch({ type: 'SET_DATE', date: date });

  return (
    <DateContainerBlock>
      <button 
        className={classNames("time-button", { "focused-time": date === 'today' })}
        onClick={() => setDate('today')}
      >
        2021. 02. 01
      </button>
      <button 
        className={classNames("time-button", { "focused-time": date === 'tomorrow' })}
        onClick={() => setDate('tomorrow')}
      >
        2021. 02. 02
      </button>
    </DateContainerBlock>
  );
};

export default DateContainer;