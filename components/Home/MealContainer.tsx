import styled, { css } from 'styled-components'
import classNames from 'classnames'
import { useDispatchContext, useStateContext } from '../../utils/hooks/ContextProvider'
import { Meal } from '../../interfaces'
import styles from '../../public/css/my-icons/my-icons.module.css'

const MealContainerBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
`

const BreakfastIcon = styled.i`
  font-size: 29pt;
  margin-bottom: 2px;
`;

const LunchIcon = styled.i`
  font-size: 23pt;
`;

const DinnerIcon = styled.i`
  font-size: 20pt;
`;

const MealButton = styled.button<{ focused: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 85px;
  background: transparent;
  border: transparent;
  color: ${props => props.focused ? '#fa9a44' : '#bababa'};

  &:focus {
    outline: none;
  }

  &:hover {
    color: #fa9a44;
  }

  ${BreakfastIcon} {
    ${props => props.focused && css`font-size: 37pt;`}
  }

  ${LunchIcon} {
    ${props => props.focused && css`font-size: 29pt;`}
  }

  ${DinnerIcon} {
    ${props => props.focused && css`font-size: 25pt;`}
  }
`

const MealContainer: React.FC = () => {
  const state = useStateContext();
  const dispatch = useDispatchContext();

  const { meal } = state;
  const setMeal = (meal: Meal) => dispatch({ type: 'SET_MEAL', meal: meal });

  return (
    <MealContainerBlock>
      <MealButton focused={meal === 'BR'} onClick={() => setMeal('BR')}>
        <BreakfastIcon className={classNames(styles['my-icon'], styles['my-icon-noun_sunrise_333233_000000'])} />
      </MealButton>
      <MealButton focused={meal === 'LU'} onClick={() => setMeal('LU')}>
        <LunchIcon className={classNames(styles['my-icon'], styles['my-icon-noun_Morning_1015359_000000'])} />
      </MealButton>
      <MealButton focused={meal === 'DN'} onClick={() => setMeal('DN')}>
        <DinnerIcon className={classNames(styles['my-icon'], styles['my-icon-noun_Moon_600919_000000'])} />
      </MealButton>
    </MealContainerBlock>
  );
};

export default MealContainer;