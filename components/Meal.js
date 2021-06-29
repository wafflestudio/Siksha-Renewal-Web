import styled from "styled-components";
import {useDispatchContext, useStateContext} from "../utils/hooks/ContextProvider";
import {useEffect, useState} from "react";

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
  width: 30px;
  height: 30px;
  padding-bottom: 6.84px;
`

const Dinner = styled.img`
  width: 20px;
  height: 22.21px;
  padding-bottom: 11.5px;
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

    const [isBR, setIsBR] = useState(false);
    const [isLU, setIsLU] = useState(false);
    const [isDN, setIsDN] = useState(false);

    useEffect(() => {
        if(meal == 'BR') {
            setIsBR(true);
            setIsLU(false);
            setIsDN(false);
        }
        else if(meal == 'LU') {
            setIsBR(false);
            setIsLU(true);
            setIsDN(false);
        }
        else if(meal == 'DN') {
            setIsBR(false);
            setIsLU(false);
            setIsDN(true);
        }
    }, [meal])

    return (
        <Container>
            <MealButton onClick={() => setMeal('BR')}>
                <Breakfast src={isBR ? "/img/breakfast-active.svg" : "/img/breakfast.svg"}/>
                <MealText active={isBR}>아침</MealText>
            </MealButton>
            <MealButton onClick={() => setMeal('LU')}>
                <Lunch src={isLU ? "/img/lunch-active.svg" : "/img/lunch.svg"}/>
                <MealText active={isLU}>점심</MealText>
            </MealButton>
            <MealButton onClick={() => setMeal('DN')}>
                <Dinner src={isDN ? "/img/dinner-active.svg" : "/img/dinner.svg"}/>
                <MealText active={isDN}>저녁</MealText>
            </MealButton>
        </Container>
    )
}
