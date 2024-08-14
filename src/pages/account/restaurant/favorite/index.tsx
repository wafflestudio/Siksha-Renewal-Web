import { useEffect, useState } from "react";
import RestaurantOrderEdit from "../../../../components/Account/RestaurantOrderEdit";
import styled from "styled-components";
import { getRestaurantList } from "utils/api/restaurants";
import useAuth from "hooks/UseAuth";
import MobileSubHeader from "components/MobileSubHeader";
import { useRouter } from "next/router";
import { FavoriteRestaurant } from "types";

export default function Setting_Favorite() {
  const [orderData, setOrderData] = useState<FavoriteRestaurant[]>([]);
  const { authStatus, authGuard } = useAuth();
  const router = useRouter();

  useEffect(authGuard, [authStatus]);

  useEffect(() => {
    const orderList: FavoriteRestaurant[] = JSON.parse(
      localStorage.getItem("orderList_Favorite") ?? "[]",
    );

    getRestaurantList()
      .then(({ result }) => {
        const favoriteList = JSON.parse(localStorage.getItem("favorite_restaurant") ?? "[]");

        for (let i = 0; i < orderList.length; i++) {
          if (
            !result.find(({ id }) => id === orderList[i].id) &&
            favoriteList.includes(orderList[i].id)
          ) {
            orderList.splice(i, 1);
            i--;
          }
        }
        result.forEach(({ id, nameKr, nameEn }) => {
          if (!orderList.some((menu) => Number(menu.id) === id) && favoriteList.includes(id))
            orderList.push({ id, nameKr, nameEn });
        });

        setOrderData(orderList);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (!!orderData.length) localStorage.setItem("orderList_Favorite", JSON.stringify(orderData));
  }, [orderData]);

  const setNewOrderData = (source: number, destination: number) => {
    const copyData = [...orderData];
    const sourceData = copyData[source];
    copyData.splice(source, 1);
    copyData.splice(destination, 0, sourceData);
    setOrderData(copyData);
  };

  return (
    <>
      <MobileSubHeader title="즐겨찾기 식당 순서 변경" handleBack={() => router.push("/account")} />
      <Container>
        <RestaurantOrderEdit orderData={orderData} setNewOrderData={setNewOrderData} />
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
