import { useEffect, useState } from "react";
import RestaurantOrderEdit from "../../../components/Account/RestaurantOrderEdit";
import Header from "../../../components/Header";
import styled from "styled-components";
import { getRestaurantList } from "utils/api/restaurants";

interface FavoriteRestaurant {
  id: number;
  name_kr: string;
  name_en: string;
}

export default function Setting_NonFavorite() {
  const [orderData, setOrderData] = useState<FavoriteRestaurant[]>([]);

  useEffect(() => {
    const orderList: FavoriteRestaurant[] = JSON.parse(
      localStorage.getItem("orderList_nonFavorite") ?? "[]",
    );

    getRestaurantList()
      .then(({ result }) => {
        console.log(result);
        const favoriteList = JSON.parse(localStorage.getItem("orderList_nonFavorite") ?? "[]");

        for (let i = 0; i < orderList.length; i++) {
          if (
            !result.find(({ id }) => id === orderList[i].id) ||
            !favoriteList.includes(orderList[i].id)
          ) {
            orderList.splice(i, 1);
            i--;
          }
        }
        console.log(orderList);

        result.forEach(({ id, name_kr, name_en }) => {
          if (!orderList.some((menu) => Number(menu.id) === id))
            orderList.push({ id, name_kr, name_en });
        });
        console.log(orderList);
        setOrderData(orderList);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (!!orderData.length)
      localStorage.setItem("orderList_nonFavorite", JSON.stringify(orderData));
  }, [orderData]);

  const setNewOrderData = (source: number, destination: number) => {
    const copyData = [...orderData];
    const sourceData = copyData[source];
    copyData.splice(source, 1);
    copyData.splice(destination, 0, sourceData);
    setOrderData(copyData);
  };

  return (
    <Container>
      <RestaurantOrderEdit orderData={orderData} setNewOrderData={setNewOrderData} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 36.92px;

  @media (max-width: 768px) {
    margin-top: 0px;
    height: 100%;
  }
`;
