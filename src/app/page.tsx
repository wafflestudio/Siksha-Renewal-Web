"use client";

import styled from "styled-components";
import LeftSide from "app/components/LeftSide";
import RightSide from "app/components/RightSide";
import Date from "app/components/Date";
import { useEffect } from "react";
import { formatISODate } from "../utils/FormatUtil";
import { useDispatchContext, useStateContext } from "../providers/ContextProvider";
import Meal from "app/components/Meal";
import MenuList from "app/components/MenuList";
import RestaurantInfo from "app/components/RestaurantInfo";
import { getMenuList } from "utils/api/menus";
import MobileNavigationBar from "components/general/MobileNavigationBar";
import useAuth from "hooks/UseAuth";
import useOrder from "hooks/UseOrder";
import useIsExceptEmpty from "hooks/UseIsExceptEmpty";
import useError from "hooks/useError";
import TwoColumnLayout from "styles/layouts/TwoColumnLayout";
import MobileFilterBar from "./components/MobileFilterBar";
import FestivalToggle from "./components/FestivalToggle";
import { initMixpanel } from "utils/MixPanel";

export default function Home() {
  const state = useStateContext();
  const { setLoading, setData } = useDispatchContext();

  const { date, showInfo, meal, isFilterFavorite } = state;

  const { authStatus, getAccessToken } = useAuth();
  const { onHttpError } = useError();
  const { orderList } = useOrder(isFilterFavorite ? "favorite" : "nonFavorite");
  const { isExceptEmpty } = useIsExceptEmpty();

  useEffect(() => {
    async function fetchData() {
      const dateString = formatISODate(date);

      setLoading(true);

      const orderHash = orderList.reduce((map, obj, idx) => {
        map.set(obj.id, { ...obj, order: idx });
        return map;
      }, new Map());

      const accessToken = await getAccessToken().catch((error) => "");
      if (!accessToken) {
        getMenuList(dateString, true)
          .then(({ result }) => {
            setData(result[0]);
          })
          .catch(onHttpError)
          .finally(() => {
            setLoading(false);
          });
      } else {
        getMenuList(dateString, isExceptEmpty, accessToken)
          .then(({ result }) => {
            const { BR, LU, DN } = result[0];

            const sortFunction = (a, b) => {
              const aOrder = orderHash.get(a.id)?.order ?? Infinity;
              const bOrder = orderHash.get(b.id)?.order ?? Infinity;
              if (aOrder === bOrder) return a.name_kr.localeCompare(b.name);
              else return aOrder - bOrder;
            };

            result[0].BR = BR.sort(sortFunction);
            result[0].LU = LU.sort(sortFunction);
            result[0].DN = DN.sort(sortFunction);

            setData(result[0]);
          })
          .catch(onHttpError)
          .finally(() => {
            setLoading(false);
          });
      }
    }

    fetchData();
  }, [date, authStatus, meal, isFilterFavorite]);

  return (
    <>
      <DesktopContainer>
        <LeftSide />
        <RightSide />
      </DesktopContainer>
      <MobileContainer>
        <Date />
        <div
          style={{
            display: "flex",
            position: "relative",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Meal />
        </div>
        <MobileFilterBar />
        <MenuList />
      </MobileContainer>
      {showInfo && (
        <Info>
          <RestaurantInfo />
        </Info>
      )}
      <MobileNavigationBar />
    </>
  );
}

const DesktopContainer = styled(TwoColumnLayout.Container)`
  display: flex;
  height: 903px; // leftSide + 100px
  padding-bottom: 100px;
  justify-content: center;

  @media (max-width: 900px) {
    padding: 0 16px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
  }
`;

const Info = styled.div`
  display: flex;
  z-index: 100;
`;
