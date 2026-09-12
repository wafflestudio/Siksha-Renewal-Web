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
import useLikedMenuIntro from "hooks/UseLikedMenuIntro";
import { getIsFestival } from "utils/api/festival";
import { isHardcodedFestivalDate } from "constants/festival";

export default function Home() {
  const state = useStateContext();
  const { setLoading, setData, setIsFestivalDate } = useDispatchContext();

  const { date, showInfo, meal, isFilterFavorite, isFestivalDate } = state;

  const { authStatus, getAccessToken } = useAuth();
  const { onHttpError } = useError();
  const { orderList } = useOrder(isFilterFavorite ? "favorite" : "nonFavorite");
  const { isExceptEmpty } = useIsExceptEmpty();

  // Show liked menu intro modal for first-time users
  useLikedMenuIntro();

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
            if (!result || !result[0]) {
              setData({ br: [], lu: [], dn: [], date: dateString });
              return;
            }
            setData(result[0]);
          })
          .catch(onHttpError)
          .finally(() => {
            setLoading(false);
          });
      } else {
        getMenuList(dateString, isExceptEmpty, accessToken)
          .then(({ result }) => {
            if (!result || !result[0]) {
              setData({ br: [], lu: [], dn: [], date: dateString });
              return;
            }

            const { br = [], lu = [], dn = [] } = result[0];

            const sortFunction = (a, b) => {
              const aOrder = orderHash.get(a.id)?.order ?? Infinity;
              const bOrder = orderHash.get(b.id)?.order ?? Infinity;
              if (aOrder === bOrder) return a.name_kr.localeCompare(b.name_kr);
              else return aOrder - bOrder;
            };

            result[0].br = br.sort(sortFunction);
            result[0].lu = lu.sort(sortFunction);
            result[0].dn = dn.sort(sortFunction);

            setData(result[0]);
          })
          .catch(onHttpError)
          .finally(() => {
            setLoading(false);
          });
      }
    }

    fetchData();
  }, [date, authStatus, meal, isFilterFavorite, orderList]); // TODO: meal, isFilterFavorite 의존성 배열에서 제거

  useEffect(() => {
    if (!date) return;

    // 날짜를 빠르게 전환할 때 이전 요청의 늦은 응답이 현재 날짜의 상태를 덮어쓰지 않도록 합니다.
    let ignore = false;

    const dateString = formatISODate(date);
    const fallback = isHardcodedFestivalDate(dateString);

    getIsFestival(dateString)
      .then((response) => {
        if (ignore) return;
        setIsFestivalDate(response.is_festival);
      })
      .catch(() => {
        if (ignore) return;
        setIsFestivalDate(fallback);
      });

    return () => {
      ignore = true;
    };
  }, [date]);

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
          <FestivalToggle />
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
