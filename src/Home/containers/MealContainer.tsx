import styled from 'styled-components'
import { useDispatchContext, useStateContext } from '../../utils/ContextProvider'
import { Meal } from '../../interfaces'
import SVG from '../../utils/svg'

const MealContainerBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
`

const MealButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  margin: 0 30px;

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    margin: 0 5vw;
  }
`

const MealContainer: React.FC = () => {
  const state = useStateContext()
  const dispatch = useDispatchContext()

  const { meal } = state
  const setMeal = (meal: Meal) => dispatch({ type: 'SET_MEAL', meal: meal })

  return (
    <MealContainerBlock>
      <MealButton onClick={() => setMeal('BR')}>
        <SVG name='breakfast' focused={meal === 'BR'} />
      </MealButton>
      <MealButton onClick={() => setMeal('LU')}>
        <SVG name='lunch' focused={meal === 'LU'} />
      </MealButton>
      <MealButton onClick={() => setMeal('DN')}>
        <SVG name='dinner' focused={meal === 'DN'} />
      </MealButton>
    </MealContainerBlock>
  )
}

export default MealContainer