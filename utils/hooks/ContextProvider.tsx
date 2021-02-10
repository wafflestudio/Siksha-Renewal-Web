import { createContext, Dispatch, useContext, useReducer } from 'react'
import { mealType } from '../../interfaces'

const currHour: number = new Date().getHours();
let initMeal: mealType = 'BR';
if(currHour > 9 && currHour < 16) {
  initMeal = 'LU';
}
else if (currHour >= 16 && currHour < 20) {
  initMeal = 'DN';
}

let initDate = () => {
  const date = new Date()
  let month: string = (date.getMonth()+1).toString()
  if(date.getMonth()+1 < 10) {
    month = '0' + month
  }

  return `${date.getFullYear()}-${month}-${date.getDate()}`
}

type State = {
  date: string;
  meal: mealType;
}

type Action = 
  | { type: 'SET_DATE', date: string }
  | { type: 'SET_MEAL', meal: mealType }

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
    date: initDate(),
    meal: initMeal,
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