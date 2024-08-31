import styled from "styled-components";
import LeftSide from "components/LeftSide";
import RightSide from "components/RightSide";
import Date from "components/Date";
import { useEffect } from "react";
import { formatISODate } from "../utils/FormatUtil";
import { useDispatchContext, useStateContext } from "../hooks/ContextProvider";
import Meal from "components/Meal";
import MenuList from "components/MenuList";
import RestaurantInfo from "components/RestaurantInfo";
import { getMenuList } from "utils/api/menus";
import MobileNavigationBar from "components/general/MobileNavigationBar";
import useAuth from "hooks/UseAuth";
import useOrder from "hooks/UseOrder";
import useIsExceptEmpty from "hooks/UseIsExceptEmpty";

export default function Home() {
  const state = useStateContext();
  const { setLoading, setData } = useDispatchContext();

  const { date, showInfo, meal, isFilterFavorite } = state;

  const { authStatus, getAccessToken } = useAuth();
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
          .catch((e) => {
            console.error(e);
          })
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
          .catch((e) => {
            console.error(e);
          })
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
        <Meal />
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

const DesktopContainer = styled.div`
  display: flex;
  justify-content: center;
  height: max(780px, 100vh - min(25vh, 271px));
  margin: 39px auto 0 auto;

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
  }
`;

const MobileCalendarWrapper = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    position: absolute;
    top: 113px;
    z-index: 100;
  }
`;

const Info = styled.div`
  display: flex;
  z-index: 100;
`;
