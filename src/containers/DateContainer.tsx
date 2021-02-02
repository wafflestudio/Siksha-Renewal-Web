import React from 'react';
import classNames from 'classnames';
import { Date, useDispatchContext, useStateContext } from '../components/Provider';

import '../styles/TopContainer.scss';

const DateContainer = () => {
  const state = useStateContext();
  const dispatch = useDispatchContext();

  const { date } = state;
  const setDate = (date: Date) => dispatch({ type: 'SET_DATE', date: date });

  return (
    <div className="date-container">
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
    </div>
  );
};

export default DateContainer;