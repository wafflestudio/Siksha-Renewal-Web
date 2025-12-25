"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { State, RawMenuList, User } from "../types";
import { formatISODate } from "../utils/FormatUtil";

const initDate = new Date();

const initialState: State = {
  date: initDate,
  meal: initDate.getHours() < 9 ? "BR" : initDate.getHours() < 16 ? "LU" : "DN",
  data: { BR: [], LU: [], DN: [], date: formatISODate(initDate) },
  today: initDate,
  showInfo: false,
  loading: false,
  infoData: null,
  authStatus: "loading",
  isLoginModal: false,
  userInfo: null,
  isFilterFavorite: false,
};

interface dispatchers {
  setDate: (date: Date) => void;
  setMeal: (meal: string) => void;
  setData: (data: RawMenuList) => void;
  setLoading: (loading: boolean) => void;
  setInfoData: (info: any) => void;
  toggleShowInfo: () => void;
  setAuthStatus: (status: "loading" | "login" | "logout") => void;
  setUserInfo: (userInfo: User | null) => void;
  setIsFilterFavorite: (value: boolean) => void;
}

const stateContext = createContext<State | null>(null);
const dispatchContext = createContext<dispatchers | null>(null);

const ContextProvider = ({ children }) => {
  const [state, setState] = useState<State>(initialState);

  // dispatch functions
  // 추후 useCallback으로 memorization 해두는 건 어떨까요?
  const setDate = useCallback(
    (date: Date) => setState((prevState) => ({ ...prevState, date })),
    [],
  );
  const setMeal = useCallback(
    (meal: string) => setState((prevState) => ({ ...prevState, meal })),
    [],
  );
  const setData = useCallback(
    (data: RawMenuList) => setState((prevState) => ({ ...prevState, data })),
    [],
  );
  const setLoading = useCallback(
    (loading: boolean) => setState((prevState) => ({ ...prevState, loading })),
    [],
  );
  const setInfoData = useCallback(
    (infoData) => setState((prevState) => ({ ...prevState, infoData })),
    [],
  );
  const toggleShowInfo = useCallback(
    () => setState((prevState) => ({ ...prevState, showInfo: !prevState.showInfo })),
    [],
  );
  const setAuthStatus = useCallback(
    (status: "loading" | "login" | "logout") =>
      setState((prevState) => ({ ...prevState, authStatus: status })),
    [],
  );
  const setUserInfo = useCallback(
    (userInfo: User | null) => setState((prevState) => ({ ...prevState, userInfo })),
    [],
  );
  const setIsFilterFavorite = useCallback(
    (value: boolean) => setState((prevState) => ({ ...prevState, isFilterFavorite: value })),
    [],
  );

  const dispatchValue = useMemo(
    () => ({
      setDate,
      setMeal,
      setData,
      setLoading,
      setInfoData,
      toggleShowInfo,
      setAuthStatus,
      setUserInfo,
      setIsFilterFavorite,
    }),
    [
      setDate,
      setMeal,
      setData,
      setLoading,
      setInfoData,
      toggleShowInfo,
      setAuthStatus,
      setUserInfo,
      setIsFilterFavorite,
    ],
  );

  return (
    <dispatchContext.Provider value={dispatchValue}>
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
