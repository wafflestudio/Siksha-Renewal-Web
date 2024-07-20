import { useEffect, useState } from "react";
import RestaurantOrderEdit from "../../../../components/Account/RestaurantOrderEdit";
import styled from "styled-components";
import { getRestaurantList } from "utils/api/restaurants";

interface FavoriteRestaurant {
  id: number;
  name_kr: string;
  name_en: string;
}

export default function Setting_Favorite() {
  const [orderData, setOrderData] = useState<FavoriteRestaurant[]>([]);

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
        result.forEach(({ id, name_kr, name_en }) => {
          if (!orderList.some((menu) => Number(menu.id) === id) && favoriteList.includes(id))
            orderList.push({ id, name_kr, name_en });
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
