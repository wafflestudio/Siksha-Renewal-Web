"use client";
import { useEffect, useState } from "react";
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
  const [restaurantOrderList, setRestaurantOrderList] = useState<RestaurantPreview[]>([]);

  const { favoriteRestaurants } = useFavorite();

  const { onHttpError } = useError();

  useEffect(authGuard, [authStatus]);

  useEffect(() => {
    getRestaurantList()
      .then((result) => {
        const restaurantsById = new Map(
          result.map(({ id, nameKr, nameEn }) => [id, { id, nameKr, nameEn }]),
        );

        // 1. localStorage에는 있는데, 받아온 데이터에는 없거나 즐겨찾기가 아닌 식당은 remove
        const newOrderList = orderList
          .map(({ id }) => restaurantsById.get(id))
          .filter(
            (restaurant): restaurant is RestaurantPreview =>
              !!restaurant && favoriteRestaurants.includes(restaurant.id),
          );

        // 2. localStorage에 없고, 받아온 데이터에 있는 식당을 추가
        let newRestaurants: RestaurantPreview[] = [];
        result.forEach(({ id, nameKr, nameEn }) => {
          if (!newOrderList.find((res) => res.id === id) && favoriteRestaurants.includes(id)) {
            newRestaurants = [...newRestaurants, { id, nameKr, nameEn }];
          }
        });

        const nextOrderList = [...newOrderList, ...newRestaurants];
        setRestaurantOrderList(nextOrderList);
        setNewOrderList(nextOrderList);
      })
      .catch(onHttpError);
  }, []);

  const reorder = (source: number, destination: number) => {
    const copyData = [...restaurantOrderList];
    const sourceData = copyData[source];
    copyData.splice(source, 1);
    copyData.splice(destination, 0, sourceData);
    setRestaurantOrderList(copyData);
    setNewOrderList(copyData);
  };

  return (
    <>
      <MobileSubHeader title="즐겨찾기 식당 순서 변경" handleBack={() => router.push("/account")} />
      <Container>
        <RestaurantOrderEditor order={restaurantOrderList} reorder={reorder} />
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
