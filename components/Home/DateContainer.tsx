import styled from 'styled-components';
import classNames from 'classnames';
import { useDispatchContext, useStateContext } from '../../utils/hooks/ContextProvider';

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

const convertDate = (date: string) => date.substring(0, 4) + '. ' + date.substring(5, 7) + '. ' + date.substring(8, 10)

const DateContainer: React.FC = () => {
  const state = useStateContext();
  const dispatch = useDispatchContext();

  const { date } = state;
  const setDate = (date: string) => dispatch({ type: 'SET_DATE', date: date });

  return (
    <DateContainerBlock>
      <button 
        className={classNames("time-button", { "focused-time": date === '2020-01-31' })}
      >
        {convertDate(date)}
      </button>
    </DateContainerBlock>
  );
};

export default DateContainer;