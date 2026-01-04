"use client";

import { MenuType, ReviewListType } from 'app/menu/[menuId]/Menu';
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

const initialState: MenuState = {
  menu: undefined,
  reviews: { result: [], total_count: 0 },
  menuLoading: true,
};

interface MenuState {
  menu: MenuType | undefined;
  reviews: ReviewListType;
  menuLoading: boolean;
}

interface MenuDispatchers {
  setMenu: (menu: MenuType) => void;
  setReviews: (reviews: ReviewListType) => void;
  setMenuLoading: (menuLoading: boolean) => void;
}

const MenuStateContext = createContext<MenuState | undefined>(undefined);
const MenuDispatchContext = createContext<MenuDispatchers | undefined>(undefined);

const MenuProvider: React.FC<{
  menuId: number,
  children: React.ReactNode
}> = ({ menuId, children }) => {
  const [state, setState] = useState<MenuState>(initialState);

  const setMenu = useCallback((menu: MenuType) =>
    setState((prevState) => ({ ...prevState, menu })), []);

  const setReviews = useCallback((reviews: ReviewListType) =>
    setState((prevState) => ({ ...prevState, reviews })), []);

  const setMenuLoading = useCallback((menuLoading: boolean) =>
    setState((prevState) => ({ ...prevState, menuLoading })), []);

  const dispatch = useMemo(() => ({ setMenu, setReviews, setMenuLoading }), [setMenu, setReviews, setMenuLoading]);


  return (
    <MenuDispatchContext.Provider value={dispatch}>
      <MenuStateContext.Provider value={state}>
        {children}
      </MenuStateContext.Provider>
    </MenuDispatchContext.Provider>
  );
};

export const useMenuStateContext = () => {
  const state = useContext(MenuStateContext);
  if (state === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return state;
};

export const useMenuDispatchContext = () => {
  const dispatch = useContext(MenuDispatchContext);
  if (dispatch === undefined) {
    throw new Error('useMenuDispatch must be used within a MenuProvider');
  }
  return dispatch;
}

export default MenuProvider;