"use client";
import { useEffect, useState } from "react";
import RestaurantOrderEditor from "components/Account/RestaurantOrderEditor";
import styled from "styled-components";
import { getRestaurantList } from "utils/api/restaurants";
import MobileSubHeader from "components/general/MobileSubHeader";
import { useRouter } from "next/navigation";
import { RestaurantPreview } from "types";
import useOrder from "hooks/UseOrder";
import AccountLayout from "../layout";
import useAuth from "hooks/UseAuth";
import useError from "hooks/useError";

type RestaurantListItem = {
  id: number;
  nameKr?: string;
  nameEn?: string;
  name_kr?: string;
  name_en?: string;
};

const toRestaurantPreview = (restaurant: RestaurantListItem): RestaurantPreview => ({
  id: restaurant.id,
  nameKr: restaurant.nameKr ?? restaurant.name_kr ?? "",
  nameEn: restaurant.nameEn ?? restaurant.name_en ?? "",
});

export default function NonFavoriteOrderSetting() {
  const { authStatus, authGuard } = useAuth();
  const router = useRouter();
  const { orderList, setNewOrderList } = useOrder("nonFavorite");
  const [restaurantOrderList, setRestaurantOrderList] = useState<RestaurantPreview[]>([]);

  const { onHttpError } = useError();

  useEffect(authGuard, [authStatus]);

  useEffect(() => {
    getRestaurantList()
      .then((result) => {
        const restaurants = result.map(toRestaurantPreview);
        const restaurantsById = new Map(restaurants.map((restaurant) => [restaurant.id, restaurant]));

        // 1. localStorage에는 있는데, 받아온 데이터에는 없는 식당은 remove
        const newOrderList = orderList
          .map(({ id }) => restaurantsById.get(id))
          .filter((restaurant): restaurant is RestaurantPreview => !!restaurant);

        // 2. localStorage에 없고, 받아온 데이터에 있는 식당을 추가
        let newRestaurants: RestaurantPreview[] = [];
        restaurants.forEach(({ id, nameKr, nameEn }) => {
          if (!newOrderList.find((res) => res.id === id)) {
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
      <MobileSubHeader title="식당 순서 변경" handleBack={() => router.push("/account")} />
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
