import { createContext, Dispatch, useCallback, useContext, useReducer, useState } from "react";
import { State, Action, Data } from "../types";
import { formatISODate } from "../utils/FormatUtil";

const initDate = new Date();

const initialState = {
  date: initDate,
  meal: initDate.getHours() < 9 ? "BR" : initDate.getHours() < 16 ? "LU" : "DN",
  data: { BR: [], LU: [], DN: [], date: formatISODate(initDate) },
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
  isFilterFavorite: false,
  favoriteRestaurant: [],
  isExceptEmptyRestaurant: true,
};

interface dispatchers {
  setDate: (date: Date) => void;
  setMeal: (meal: string) => void;
  setData: (data: Data) => void;
  setLoading: (loading: boolean) => void;
  setInfoData: (info: any) => void;
  toggleShowCal: () => void;
  toggleShowInfo: () => void;
  setLoginStatus: (loginStatus: boolean) => void;
  setLoginModal: (isLoginModal: boolean) => void;
  setUserInfo: (userInfo: { id: number | null; nickname: string | null }) => void;
  setIsFilterFavorite: (value: boolean) => void;
  setFavoriteRestaurant: (favoriteRestaurant: number[]) => void;
  setIsExceptEmptyRestaurant: (except: boolean) => void;
}

const stateContext = createContext<State | null>(null);
const dispatchContext = createContext<dispatchers | null>(null);

const ContextProvider = ({ children }) => {
  const [state, setState] = useState<State>(initialState);

  // dispatch functions
  const setDate = (date: Date) => setState((prevState) => ({ ...prevState, date: date }));
  const setMeal = (meal: string) => setState((prevState) => ({ ...prevState, meal: meal }));
  const setData = (data: Data) => setState((prevState) => ({ ...prevState, data: data }));
  const setLoading = (loading: boolean) =>
    setState((prevState) => ({ ...prevState, loading: loading }));
  const setInfoData = (infoData) => setState((prevState) => ({ ...prevState, infoData: infoData }));
  const toggleShowCal = () =>
    setState((prevState) => ({ ...prevState, showCal: !prevState.showCal }));
  const toggleShowInfo = () =>
    setState((prevState) => ({ ...prevState, showInfo: !prevState.showInfo }));
  const setLoginStatus = (loginStatus: boolean) =>
    setState((prevState) => ({ ...prevState, loginStatus: loginStatus }));
  const setLoginModal = (isLoginModal: boolean) =>
    setState((prevState) => ({ ...prevState, isLoginModal: isLoginModal }));
  const setUserInfo = (userInfo) => setState((prevState) => ({ ...prevState, userInfo: userInfo }));
  const setIsFilterFavorite = (value) =>
    setState((prevState) => ({ ...prevState, isFilterFavorite: value }));
  const setFavoriteRestaurant = (favoriteRestaurant) =>
    setState((prevState) => ({ ...prevState, favoriteRestaurant: favoriteRestaurant }));
  const setIsExceptEmptyRestaurant = (except: boolean) =>
    setState((prevState) => ({ ...prevState, isExceptEmptyRestaurant: except }));

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
        setIsFilterFavorite,
        setFavoriteRestaurant,
        setIsExceptEmptyRestaurant,
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
