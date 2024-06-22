import { createContext, Dispatch, useCallback, useContext, useReducer, useState } from "react";
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

const ContextProvider = ({ children }) => {
  const [state, setState] = useState<State>(initialState);

  // dispatch functions
  const setDate = (date: Date) => setState((prev) => ({ ...prev, date: date }));
  const setMeal = (meal: string) => setState((prev) => ({ ...prev, meal: meal }));
  const setData = (data: Data) => setState((prev) => ({ ...prev, data: data }));
  const setLoading = (loading: boolean) => setState((prev) => ({ ...prev, loading: loading }));
  const setInfoData = (infoData) => setState((prev) => ({ ...prev, infoData: infoData }));
  const toggleShowCal = () => setState((prev) => ({ ...prev, showCal: !prev.showCal }));
  const toggleShowInfo = () => setState((prev) => ({ ...prev, showInfo: !prev.showInfo }));
  const setLoginStatus = (loginStatus: boolean) =>
    setState((prev) => ({ ...prev, loginStatus: loginStatus }));
  const setLoginModal = (isLoginModal: boolean) =>
    setState((prev) => ({ ...prev, isLoginModal: isLoginModal }));
  const setUserInfo = (userInfo) => setState((prev) => ({ ...prev, userInfo: userInfo }));

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
