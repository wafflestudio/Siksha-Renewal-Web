import { createContext, Dispatch, useContext, useReducer } from "react";
import types from "../types";
import State = types.State;
import Action = types.Action;

const initDate = new Date();
const currHour = initDate.getHours();

const getInitialMeal = () => {
  if (currHour >= 0 && currHour < 9) {
    return "BREAKFAST";
  }
  if (currHour > 9 && currHour < 16) {
    return "LUNCH";
  }
  return "DINNER";
};

const initData = { count: 0, result: [] };

const stateContext = createContext<State>({
  date: initDate,
  meal: getInitialMeal(),
  data: initData,
  showCal: false,
  showInfo: false,
  loading: false,
  infoData: null,
  loginStatus: false,
});
const dispatchContext = createContext<Dispatch<Action>>(() => {});

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "SET_DATE":
      return { ...state, date: action.date };
    case "SET_MEAL":
      return { ...state, meal: action.meal };
    case "SET_DATA":
      return { ...state, data: action.data };
    case "SET_LOADING":
      return { ...state, loading: action.loading };
    case "SET_INFODATA":
      return { ...state, infoData: action.infoData };
    case "TOGGLE_SHOWCAL":
      return { ...state, showCal: !state.showCal };
    case "TOGGLE_SHOWINFO":
      return { ...state, showInfo: !state.showInfo };
    case "SET_LOGINSTATUS":
      return { ...state, loginStatus: action.loginStatus };
    default:
      throw new Error("Unhandled action");
  }
}

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    date: initDate,
    meal: getInitialMeal(),
    data: initData,
    showCal: false,
    showInfo: false,
    loading: false,
    infoData: null,
    loginStatus: false,
  });

  return (
    <dispatchContext.Provider value={dispatch}>
      <stateContext.Provider value={state}>{children}</stateContext.Provider>
    </dispatchContext.Provider>
  );
};

export function useStateContext() {
  const state = useContext(stateContext);
  if (!state) throw new Error("Cannot find state");
  return state;
}

export function useDispatchContext() {
  const dispatch = useContext(dispatchContext);
  if (!dispatch) throw new Error("Cannot find dispatch");
  return dispatch;
}

export default ContextProvider;
