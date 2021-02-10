import styled from 'styled-components'
import classNames from 'classnames'
import { useDispatchContext, useStateContext } from '../../utils/hooks/ContextProvider'
import { mealType } from '../../interfaces'
import styles from '../../public/css/my-icons/my-icons.module.css'

const MealContainerBlock = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;

  margin-bottom: 10px;

  .meal-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    width: 85px;

    background: transparent;
    border: transparent;
    color: #bababa;

    &:focus {
      outline: none;
    }

    &:hover {
      color: #fa9a44;
    }

    .breakfast-icon {
      font-size: 29pt;
      margin-bottom: 2px;
    }

    .lunch-icon {
      font-size: 23pt;
    }

    .dinner-icon {
      font-size: 20pt;
    }
  }

  .focused-meal {
    color: #fa9a44;
    font-weight: bold;
    margin-bottom: 1px;

    .breakfast-icon {
      font-size: 37pt;
    }

    .lunch-icon {
      font-size: 29pt;
    }

    .dinner-icon {
      font-size: 25pt;
    }
  }
`;

const MealContainer: React.FC = () => {
  const state = useStateContext();
  const dispatch = useDispatchContext();

  const { meal } = state;
  const setMeal = (meal: mealType) => dispatch({ type: 'SET_MEAL', meal: meal });

  return (
    <MealContainerBlock>
      <button 
        className={classNames("meal-button", { "focused-meal": meal === 'BR' })}
        onClick={() => setMeal('BR')}
      >
        <i className={classNames(styles['my-icon'], styles['my-icon-noun_sunrise_333233_000000'], 'breakfast-icon')}></i>
      </button>
      <button 
        className={classNames("meal-button", { "focused-meal": meal === 'LU' })}
        onClick={() => setMeal('LU')}
      >
        <i className={classNames(styles['my-icon'], styles['my-icon-noun_Morning_1015359_000000'], 'lunch-icon')}></i>
      </button>
      <button 
        className={classNames("meal-button", { "focused-meal": meal === 'DN' })}
        onClick={() => setMeal('DN')}
      >
        <i className={classNames(styles['my-icon'], styles['my-icon-noun_Moon_600919_000000'], 'dinner-icon')}></i>
      </button>
    </MealContainerBlock>
  );
};

export default MealContainer;