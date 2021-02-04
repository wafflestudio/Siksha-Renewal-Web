import styled from 'styled-components'
import classNames from 'classnames'
import { useDispatchContext, useStateContext } from '../../utils/hooks/ContextProvider'
import { meal } from '../../interfaces'
import styles from '../../public/css/my-icons/my-icons.module.css'

const MealContainerBlock = styled.div`
  display: flex;
  justify-content: space-around;
  flex: 1;

  margin-bottom: 5px;

  .meal-button {
    display: inline-flex;
    align-items: center;

    width: 93px;
    padding: 0px 7px;

    background: transparent;
    border: transparent;
    color: #bababa;
    font-size: 13pt;
    font-family: 'NanumSquare';

    &:focus {
      outline: none;
    }

    &:hover {
      color: #fa9a44;
    }

    .breakfast-icon {
      font-size: 35pt;
      margin-bottom: 3px;
    }

    .lunch-icon {
      font-size: 25pt;
      margin-right: 5px;
    }

    .dinner-icon {
      font-size: 22pt;
      margin-right: 2px;
    }
  }

  .focused-meal {
    color: #fa9a44;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    .meal-button {
      font-size: 12pt;
    }
  }
`;

const MealContainer: React.FC = () => {
  const state = useStateContext();
  const dispatch = useDispatchContext();

  const { meal } = state;
  const setMeal = (meal: meal) => dispatch({ type: 'SET_MEAL', meal: meal });

  return (
    <MealContainerBlock>
      <button 
        className={classNames("meal-button", { "focused-meal": meal === 'BR' })}
        onClick={() => setMeal('BR')}
      >
        <i className={classNames(styles['my-icon'], styles['my-icon-noun_sunrise_333233_000000'], 'breakfast-icon')}></i>
        아침
      </button>
      <button 
        className={classNames("meal-button", { "focused-meal": meal === 'LU' })}
        onClick={() => setMeal('LU')}
      >
        <i className={classNames(styles['my-icon'], styles['my-icon-noun_Morning_1015359_000000'], 'lunch-icon')}></i>
        점심
      </button>
      <button 
        className={classNames("meal-button", { "focused-meal": meal === 'DN' })}
        onClick={() => setMeal('DN')}
      >
        <i className={classNames(styles['my-icon'], styles['my-icon-noun_Moon_600919_000000'], 'dinner-icon')}></i>
        저녁
      </button>
    </MealContainerBlock>
  );
};

export default MealContainer;