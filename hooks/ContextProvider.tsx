import { createContext, Dispatch, useCallback, useContext, useReducer } from "react";
import { State, Action, Data } from "../types";

const initDate = new Date();

const initialState = {
  date: initDate,
  meal: initDate.getHours() < 9 ? "BR" : initDate.getHours() < 16 ? "LU" : "DN",
  data: { count: 0, result: [] },
  today: initDate,
  showCal: false,
  showInfo: false,
  loading: false,
  infoData: null,
  loginStatus: false,
  isLoginModal: false,
  userInfo: {
    id: null,
    nickname: null,
  },
};

interface dispatchers {
  setDate: (datae: Date) => void;
  setMeal: (meal: string) => void;
  setData: (data: Data) => void;
  setLoading: (loading: boolean) => void;
  setInfoData: (info: any) => void;
  toggleShowCal: () => void;
  toggleShowInfo: () => void;
  setLoginStatus: (loginStatus: boolean) => void;
  setLoginModal: (isLoginModal: boolean) => void;
  setUserInfo: (userInfo: { id: number | null; nickname: string | null }) => void;
}

const stateContext = createContext<State | null>(null);
const dispatchContext = createContext<dispatchers | null>(null);

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
    case "SET_LOGINMODAL":
      return { ...state, isLoginModal: action.isLoginModal };
    case "SET_USERINFO":
      return { ...state, userInfo: action.userInfo };
    default:
      throw new Error("Unhandled action");
  }
}

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // dispatch functions
  const setDate = useCallback((date: Date) => dispatch({ type: "SET_DATE", date: date }), []);
  const setMeal = useCallback((meal: string) => dispatch({ type: "SET_MEAL", meal: meal }), []);
  const setData = useCallback((data: Data) => dispatch({ type: "SET_DATA", data: data }), []);
  const setLoading = useCallback(
    (loading: boolean) => dispatch({ type: "SET_LOADING", loading: loading }),
    [],
  );
  const setInfoData = useCallback(
    (infoData) => dispatch({ type: "SET_INFODATA", infoData: infoData }),
    [],
  );
  const toggleShowCal = useCallback(() => dispatch({ type: "TOGGLE_SHOWCAL" }), []);
  const toggleShowInfo = useCallback(() => dispatch({ type: "TOGGLE_SHOWINFO" }), []);
  const setLoginStatus = useCallback(
    (loginStatus: boolean) => dispatch({ type: "SET_LOGINSTATUS", loginStatus: loginStatus }),
    [],
  );
  const setLoginModal = useCallback(
    (isLoginModal: boolean) => dispatch({ type: "SET_LOGINMODAL", isLoginModal: isLoginModal }),
    [],
  );
  const setUserInfo = useCallback(
    (userInfo) => dispatch({ type: "SET_USERINFO", userInfo: userInfo }),
    [],
  );

  return (
    <dispatchContext.Provider
      value={{
        setDate,
        setMeal,
        setData,
        setLoading,
        setInfoData,
        toggleShowCal,
        toggleShowInfo,
        setLoginStatus,
        setLoginModal,
        setUserInfo,
      }}
    >
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
