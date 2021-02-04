import { createContext, Dispatch, useContext, useReducer } from 'react'
import { meal, date } from '../../interfaces'

const currHour: number = new Date().getHours();
let initMeal: meal = 'BR';
if(currHour > 9 && currHour < 16) {
  initMeal = 'LU';
}
else if (currHour >= 16 && currHour < 20) {
  initMeal = 'DN';
}

type State = {
  date: date;
  meal: meal;
}

type Action = 
  | { type: 'SET_DATE', date: date }
  | { type: 'SET_MEAL', meal: meal }

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
  if(!state) throw new Error('Cannot find state');
  return state;
}

export function useDispatchContext() {
  const dispatch = useContext(dispatchContext);
  if(!dispatch) throw new Error('Cannot find dispatch');
  return dispatch;
}

export default ContextProvider;