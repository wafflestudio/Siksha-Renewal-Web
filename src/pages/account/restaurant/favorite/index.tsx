import { useEffect, useState } from "react";
import RestaurantOrderEdit from "../../../../components/Account/RestaurantOrderEditer";
import styled from "styled-components";
import { getRestaurantList } from "utils/api/restaurants";
import useAuth from "hooks/UseAuth";
import MobileSubHeader from "components/MobileSubHeader";
import { useRouter } from "next/router";
import { RestaurantPreview } from "types";
import useFavorite from "hooks/UseFavorite";
import useOrder from "hooks/UseOrder";

export default function FavoriteOrderSetting() {
  const { authStatus, authGuard } = useAuth();
  const router = useRouter();
  const { orderList, setNewOrderList } = useOrder("favorite");

  const { favoriteRestaurants } = useFavorite();

  useEffect(authGuard, [authStatus]);

  console.log(favoriteRestaurants);

  useEffect(() => {
    getRestaurantList()
      .then(({ result }) => {
        // 1. localStorage에는 있는데, 받아온 데이터에는 없는 식당은 remove
        console.log(orderList);

        let ghostRestaurantIds: number[] = [];
        orderList.forEach((res) => {
          if (!result.find(({ id }) => id === res.id) || !favoriteRestaurants.includes(res.id)) {
            ghostRestaurantIds = [...ghostRestaurantIds, res.id];
          }
        });

        console.log("ghost:", ghostRestaurantIds);

        const newOrderList = orderList.filter((res) => !ghostRestaurantIds.includes(res.id));

        console.log(newOrderList);
        // 2. localStorage에 없고, 받아온 데이터에 있는 식당을 추가
        let newRestaurants: RestaurantPreview[] = [];
        result.forEach(({ id, nameKr, nameEn }) => {
          if (!newOrderList.find((res) => res.id === id) && favoriteRestaurants.includes(id)) {
            newRestaurants = [...newRestaurants, { id, nameKr, nameEn }];
          }
        });

        setNewOrderList([...newOrderList, ...newRestaurants]);
      })
      .catch((e) => {
        console.log(e);
      });
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
        <RestaurantOrderEdit order={orderList} reorder={reorder} />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 36.92px;

  @media (max-width: 768px) {
    margin-top: 0px;
  }
`;
