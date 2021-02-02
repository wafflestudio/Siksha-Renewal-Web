import React from 'react';
import classNames from 'classnames';
import { Meal, useDispatchContext, useStateContext } from '../components/ContextProvider';

import '../my-icons/my-icons.css';
import '../styles/TopContainer.scss';

const MealContainer: React.FC = () => {
  const state = useStateContext();
  const dispatch = useDispatchContext();

  const { meal } = state;
  const setMeal = (meal: Meal) => dispatch({ type: 'SET_MEAL', meal: meal });

  return (
    <div className="meal-container">
      <button 
        className={classNames("time-button meal-button", { "focused-time": meal === 'BR' })}
        onClick={() => setMeal('BR')}
      >
        <i className="my-icon my-icon-noun_sunrise_333233_000000 breakfast-icon"></i>
        아침
      </button>
      <button 
        className={classNames("time-button meal-button", { "focused-time": meal === 'LU' })}
        onClick={() => setMeal('LU')}
      >
        <i className="my-icon my-icon-noun_Morning_1015359_000000 lunch-icon"></i>
        점심
      </button>
      <button 
        className={classNames("time-button meal-button", { "focused-time": meal === 'DN' })}
        onClick={() => setMeal('DN')}
      >
        <i className="my-icon my-icon-noun_Moon_600919_000000 dinner-icon"></i>
        저녁
      </button>
    </div>
  );
};

export default MealContainer;