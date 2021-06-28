import styled from "styled-components";
import {useDispatchContext, useStateContext} from "../utils/hooks/ContextProvider";

const Container = styled.div`
  display: flex;
  align-items: flex-end;
  padding-top: 22px;
  padding-bottom: 13px;
`

const MealButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 0 22px 0 22px;
`

const Breakfast = styled.img`
  width: 30.76px;
  height: 18.8px;
  padding-bottom: 13.67px;
`

const Lunch = styled.img`
  width: 34.18px;
  height: 34.18px;
  padding-bottom: 6.84px;
`

const Dinner = styled.img`
  width: 17.09px;
  height: 18.8px;
  padding-bottom: 13.67px;
`

const MealText = styled.div`
  font-size: 15px;
  font-weight: 100;
  color: ${props => props.active ? "#FE8C59" : "#919191"};
  
`

export default function Meal() {
    const state = useStateContext();
    const dispatch = useDispatchContext();

    const { meal } = state;
    const setMeal = (meal) => dispatch({ type: 'SET_MEAL', meal: meal })

    return (
        <Container>
            <MealButton onClick={() => setMeal('BR')}>
                <Breakfast src={meal == 'BR' ? "/img/breakfast-active.svg" : "/img/breakfast.svg"}/>
                <MealText active={meal == 'BR'}>아침</MealText>
            </MealButton>
            <MealButton onClick={() => setMeal('LU')}>
                <Lunch src={meal == 'LU' ? "/img/lunch-active.svg" : "/img/lunch.svg"}/>
                <MealText active={meal == 'LU'}>점심</MealText>
            </MealButton>
            <MealButton onClick={() => setMeal('DN')}>
                <Dinner src={meal == 'DN' ? "/img/dinner-active.svg" : "/img/dinner.svg"}/>
                <MealText active={meal == 'DN'}>저녁</MealText>
            </MealButton>
        </Container>
    )
}
