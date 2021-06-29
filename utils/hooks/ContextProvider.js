import { createContext, Dispatch, useContext, useReducer } from 'react'

let initMeal = 'BR'
const initDate = new Date()
const currHour = initDate.getHours()
if(currHour > 9 && currHour < 16) {
  initMeal = 'LU'
}
else if (currHour >= 16 && currHour < 20) {
  initMeal = 'DN'
}
else if (currHour >= 20 && currHour < 24) {
  initDate.setDate(initDate.getDate() + 1)
}
const initData = { count: 0, result: [] }

const stateContext = createContext(null);
const dispatchContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case 'SET_DATE' :
      return { ...state, date: action.date }
    case 'SET_MEAL' :
      return { ...state, meal: action.meal }
    case 'SET_DATA' :
      return { ...state, data: action.data }
    case 'TOGGLE_SHOWCAL' :
      return { ...state, showCal: !state.showCal }
    default:
      throw new Error('Unhandled action')
  }
}

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    date: initDate,
    meal: initMeal,
    data: initData,
    today: initDate,
    showCal: false,
  })

  return (
      <dispatchContext.Provider value={dispatch}>
        <stateContext.Provider value={state}>
          {children}
        </stateContext.Provider>
      </dispatchContext.Provider>
  )
}

export function useStateContext() {
  const state = useContext(stateContext)
  if(!state) throw new Error('Cannot find state')
  return state
}

export function useDispatchContext() {
  const dispatch = useContext(dispatchContext)
  if(!dispatch) throw new Error('Cannot find dispatch')
  return dispatch
}

export default ContextProvider
