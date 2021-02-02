import React, { createContext, Dispatch, useContext, useReducer } from 'react';

const currHour: number = new Date().getHours();
let initMeal: Meal = 'BR';
if(currHour > 9 && currHour < 16) {
  initMeal = 'LU';
}
else if (currHour >= 16 && currHour < 20) {
  initMeal = 'DN';
}

export type Date = 'today' | 'tomorrow';
export type Meal = 'BR' | 'LU' | 'DN';

type State = {
  date: Date;
  meal: Meal;
}

type Action = 
  | { type: 'SET_DATE'; date: Date }
  | { type: 'SET_MEAL'; meal: Meal };

type dispatch = Dispatch<Action>;

const stateContext = createContext<State | null>(null);
const dispatchContext = createContext<dispatch | null>(null);

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_DATE' : 
      return { ...state, date: action.date };
    case 'SET_MEAL' : 
      return { ...state, meal: action.meal };
    default:
      throw new Error('Unhandled action');
  }
}

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    date: 'today',
    meal: initMeal
  })
  
  return (
    <stateContext.Provider value={state}>
      <dispatchContext.Provider value={dispatch}>
        {children}
      </dispatchContext.Provider>
    </stateContext.Provider>
  );
};

export function useStateContext() {
  const state = useContext(stateContext);
  if(!state) throw new Error('Cannot fine state');
  return state;
}

export function useDispatchContext() {
  const dispatch = useContext(dispatchContext);
  if(!dispatch) throw new Error('Cannot fine dispatch');
  return dispatch;
}

export default ContextProvider;