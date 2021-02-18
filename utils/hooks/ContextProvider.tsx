import { createContext, Dispatch, useContext, useReducer } from 'react'
import { Meal } from '../../interfaces'

const currHour: number = new Date().getHours()
let initMeal: Meal = 'BR'
const initDate: Date = new Date()
if(currHour > 9 && currHour < 16) {
  initMeal = 'LU'
}
else if (currHour >= 16 && currHour < 20) {
  initMeal = 'DN'
}
else if (currHour >= 20 && currHour < 24) {
  initDate.setDate(initDate.getDate() + 1)
}

type State = {
  date: Date;
  meal: Meal;
}

type Action = 
  | { type: 'SET_DATE', date: Date }
  | { type: 'SET_MEAL', meal: Meal }

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
    date: initDate,
    meal: initMeal,
  })
  
  return (
    <dispatchContext.Provider value={dispatch}>
      <stateContext.Provider value={state}>
        {children}
      </stateContext.Provider>
    </dispatchContext.Provider>
  );
};

export function useStateContext() {
  const state = useContext(stateContext);
  if(!state) throw new Error('Cannot find state');
  return state;
}

export function useDispatchContext() {
  const dispatch = useContext(dispatchContext);
  if(!dispatch) throw new Error('Cannot find dispatch');
  return dispatch;
}

export default ContextProvider;