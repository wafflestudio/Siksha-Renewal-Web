"use client";
import { useEffect } from "react";
import RestaurantOrderEditor from "components/Account/RestaurantOrderEditor";
import styled from "styled-components";
import { getRestaurantList } from "utils/api/restaurants";
import MobileSubHeader from "components/general/MobileSubHeader";
import { useRouter } from "next/navigation";
import { RestaurantPreview } from "types";
import useOrder from "hooks/UseOrder";
import AccountLayout from "app/account/layout";
import useAuth from "hooks/UseAuth";
import useFavorite from "hooks/UseFavorite";
import useError from "hooks/useError";

export default function FavoriteOrderSetting() {
  const { authStatus, authGuard } = useAuth();
  const router = useRouter();
  const { orderList, setNewOrderList } = useOrder("favorite");

  const { favoriteRestaurants } = useFavorite();

  const { onHttpError } = useError();

  useEffect(authGuard, [authStatus]);

  useEffect(() => {
    getRestaurantList()
      .then((result) => {
        // 1. localStorage에는 있는데, 받아온 데이터에는 없는 식당은 remove

        let ghostRestaurantIds: number[] = [];
        orderList.forEach((res) => {
          if (!result.find(({ id }) => id === res.id) || !favoriteRestaurants.includes(res.id)) {
            ghostRestaurantIds = [...ghostRestaurantIds, res.id];
          }
        });

        const newOrderList = orderList.filter((res) => !ghostRestaurantIds.includes(res.id));

        // 2. localStorage에 없고, 받아온 데이터에 있는 식당을 추가
        let newRestaurants: RestaurantPreview[] = [];
        result.forEach(({ id, nameKr, nameEn }) => {
          if (!newOrderList.find((res) => res.id === id) && favoriteRestaurants.includes(id)) {
            newRestaurants = [...newRestaurants, { id, nameKr, nameEn }];
          }
        });

        setNewOrderList([...newOrderList, ...newRestaurants]);
      })
      .catch(onHttpError);
  }, []);

  const reorder = (source: number, destination: number) => {
    const copyData = [...orderList];
    const sourceData = copyData[source];
    copyData.splice(source, 1);
    copyData.splice(destination, 0, sourceData);
    setNewOrderList(copyData);
  };

  return (
    <>
      <MobileSubHeader title="즐겨찾기 식당 순서 변경" handleBack={() => router.push("/account")} />
      <Container>
        <RestaurantOrderEditor order={orderList} reorder={reorder} />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    margin-top: 0px;
    height: calc(100% - 60px);
  }
`;
